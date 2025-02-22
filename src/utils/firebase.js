import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

// Mishela Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Log the config to check values
// console.log("Firebase Config after declaration:", firebaseConfig);
// console.log("firebase.apps.length:", firebase.apps.length);

const mishelaweb = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig, "mishelaweb")
  : firebase.app("mishelaweb");

// Authentication function
export const authenticateFirebase = async () => {
  try {
    const auth = firebase.auth(mishelaweb);
    await auth.signInWithEmailAndPassword(
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMAIL,
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_PASSWORD
    );
    return true;
  } catch (error) {
    console.error("Firebase authentication error:", error);
    return false;
  }
};

// Database reference
export const database = firebase.database(mishelaweb);

export { mishelaweb };
