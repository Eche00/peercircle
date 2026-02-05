import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHVz6J-EhocCHPEHbFvaGCbos2CLvuO30",
  authDomain: "peercircle-auth.firebaseapp.com",
  projectId: "peercircle-auth",
  storageBucket: "peercircle-auth.firebasestorage.app",
  messagingSenderId: "707060834745",
  appId: "1:707060834745:web:d83995c9aedaba4f169668",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
