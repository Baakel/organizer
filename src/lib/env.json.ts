const apiKey = import.meta.env.VITE_FB_EIPIAI_CHA.toString()
const authDom = import.meta.env.VITE_FB_AUTH_DOM.toString()
const projectId = import.meta.env.VITE_FB_PROJ_ID.toString()
const storageBucket = import.meta.env.VITE_FB_STOR_BUCKET.toString()
const messageSenderId = import.meta.env.VITE_FB_MSG_SEND_ID.toString()
const appId = import.meta.env.VITE_FB_APP_ID.toString()
const measureId = import.meta.env.VITE_FB_MES_ID.toString()

export const env = {
    apiKey: apiKey,
    authDom: authDom,
    projectId: projectId,
    storageBucket: storageBucket,
    messageSenderId: messageSenderId,
    appId: appId,
    measureId: measureId
}