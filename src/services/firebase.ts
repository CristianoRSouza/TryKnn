import * as admin from "firebase-admin";

const privateKey = process.env.NEXT_PUBLIC_QUIZ_FIREBASE_PRIVATE_KEY?.replace(
  /\\n/g,
  "\n"
);

if (!admin.apps.length) {
  if (!privateKey) {
    throw new Error("FIREBASE_PRIVATE_KEY environment variable is not set.");
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_QUIZ_FIREBASE_PROJECT_ID,
      clientEmail: process.env.NEXT_PUBLIC_QUIZ_FIREBASE_CLIENT_EMAIL,
      privateKey,
    }),
    databaseURL:
      "https://firestore.googleapis.com/v1/projects/webtech-af9f0/databases/(default)/documents",
  });
}

const firestore = admin.firestore();
const auth = admin.auth();

export { admin, firestore, auth };
