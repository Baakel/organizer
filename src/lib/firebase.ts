import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { env } from "$lib/env.json";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";

const firebaseConfig = {
    apiKey: env.apiKey,
    authDomain: env.authDom,
    projectId: env.projectId,
    storageBucket: env.storageBucket,
    messagingSenderId: env.messageSenderId,
    appId: env.appId,
    measurementId: env.measureId
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth();
await setPersistence(auth, browserLocalPersistence)
export const db = getFirestore();