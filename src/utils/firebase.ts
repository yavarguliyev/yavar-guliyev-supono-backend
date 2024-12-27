import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import admin from 'firebase-admin';

interface FirebaseServices {
  auth: Auth;
  db: FirebaseFirestore.Firestore;
  adminAuth: admin.auth.Auth;
}

export const initializeFirebase = (): FirebaseServices => {
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  };

  const app: FirebaseApp = initializeApp(firebaseConfig);

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
  }

  console.log('Firebase initialized successfully');

  return {
    auth: getAuth(app), // Firebase client-side authentication
    db: admin.firestore(), // Firestore database instance
    adminAuth: admin.auth() // Admin authentication
  };
};
