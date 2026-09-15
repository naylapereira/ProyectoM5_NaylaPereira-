import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { adminAuth, adminDb } from "./firebaseAdmin.js";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
  },
});

export default async function handler(
  request: {
    method?: string;
    headers: { authorization?: string };
    body?: { fileName?: string; fileType?: string };
  },
  response: {
    status: (code: number) => {
      json: (data: object) => void;
    };
  },
) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Método no permitido." });
  }
  
  const authorization = request.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    return response.status(401).json({ error: "No autorizado." });
  }

  try {
    const token = authorization.replace("Bearer ", "");
    const decodedToken = await adminAuth.verifyIdToken(token);

    const userDoc = await adminDb
      .collection("users")
      .doc(decodedToken.uid)
      .get();

    if (!userDoc.exists || userDoc.data()?.role !== "admin") {
      return response.status(403).json({ error: "Acceso denegado." });
    }
  } catch {
    return response.status(401).json({ error: "Token inválido." });
  }

  const { fileName, fileType } = request.body ?? {};

  if (!fileName || !fileType) {
    return response.status(400).json({ error: "Archivo inválido." });
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedTypes.includes(fileType)) {
    return response.status(400).json({
      error: "Formato de imagen no permitido.",
    });
  }

  const key = `products/${Date.now()}-${fileName}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    ContentType: fileType,
  });

  const uploadUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 60,
  });

  return response.status(200).json({ uploadUrl, key });
}