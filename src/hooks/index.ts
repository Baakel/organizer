import { getUserFromStorage } from "$lib/_utils";
import { browser } from "$app/env";
import { getAuth } from "firebase/auth";
import { auth } from "$lib/firebase"

export async function handle({ event, resolve}) {
    //const auth = getAuth(app);
    //console.log(auth, "from hook")
    event.locals.user = browser ? getUserFromStorage() : null
    return await resolve(event)
}

export function getSession({ locals }) {
    //console.log("logging locals", locals)
    return {
        user: locals.user && {
            username: locals.user.displayName,
            email: locals.user.email,
            uid: locals.user.uid
        }
    };
}