import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  EXPO_PUBLIC_API_KEY: process.env.EXPO_PUBLIC_API_KEY,
    EXPO_PUBLIC_AUTH_DOMAIN: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
    EXPO_PUBLIC_PROJECT_ID: process.env.EXPO_PUBLIC_PROJECT_ID,
    EXPO_PUBLIC_STORAGE_BUCKET: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
    EXPO_PUBLIC_MESSAGING_SENDER_ID: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
    EXPO_PUBLIC_APP_ID: process.env.EXPO_PUBLIC_APP_ID,
};


let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}


export const db = getFirestore(app);

export const TODOS_REF = 'todos';

console.log('Firebase config -> ', firebaseConfig);

