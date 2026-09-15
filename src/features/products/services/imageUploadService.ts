import { auth } from "../../../services/firebase/firebaseConfig";

interface UploadUrlResponse {
  uploadUrl: string;
  key: string;
}

const getUploadUrl = async (
  file: File,
): Promise<UploadUrlResponse> => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Usuario no autenticado.");
  }

  const token = await user.getIdToken();

  const response = await fetch("/api/generateUploadUrl", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      fileName: file.name,
      fileType: file.type,
    }),
  });

  if (!response.ok) {
    throw new Error("No se pudo generar la URL de subida.");
  }

  return response.json();
};

export const uploadProductImage = async (
  file: File,
): Promise<string> => {
  const { uploadUrl } = await getUploadUrl(file);

  const response = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error("No se pudo subir la imagen.");
  }

  return uploadUrl.split("?")[0];
};