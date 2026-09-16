import type { App } from "firebase-admin/app";

let adminApp: App | undefined;

export async function getFirebaseAdmin() {
  const { cert, getApps, initializeApp } = await import(
    "firebase-admin/app"
  );

  const { getAuth } = await import("firebase-admin/auth");
  const { getFirestore } = await import(
    "firebase-admin/firestore"
  );

  adminApp =
    adminApp ??
    getApps()[0] ??
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(
          /\\n/g,
          "\n",
        ),
      }),
    });

  return {
    adminAuth: getAuth(adminApp),
    adminDb: getFirestore(adminApp),
  };
}