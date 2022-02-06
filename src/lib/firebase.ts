import { initializeApp } from "firebase/app";
import { env } from "$lib/env.json";

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