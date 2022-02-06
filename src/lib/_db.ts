import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
    apiKey: process.env.FB_EIPIAI_CHA,
    authDomain: process.env.FB_AUTH_DOM,
    projectId: process.env.FB_PROJ_ID,
    storageBucket: process.env.FB_STOR_BUCKET,
    messagingSenderId: process.env.FB_MSG_SEND_ID,
    appId: process.env.FB_APP_ID,
    measurementId: process.env.FB_MES_ID
}

export const provider = new GoogleAuthProvider();
export const auth = getAuth();
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore();

// export default db;