/* import { getAuth, signInWithRedirect, signOut as _signOut, signInWithPopup, GoogleAuthProvider, getRedirectResult, setPersistence, browserLocalPersistence } from "firebase/auth";
import type { UserCredential } from "firebase/auth";
import { app } from "$lib/firebase";

const createAuth = () => {
    function providerFor(name: string) {
        switch (name) {
            case 'google': return new GoogleAuthProvider()
            default: throw "unknown provider" + name
        }
    }

    async function signInWith(name: string) {
        const auth = getAuth(app)
        await setPersistence(auth, browserLocalPersistence)
        const provider = providerFor(name)
        const creds = await signInWithPopup(auth, provider)
        return creds
    }

    async function signOut() {
        const auth = getAuth(app)
        await _signOut(auth)
    }

    return {
        signInWith,
        signOut,
    }
}

export const auth = createAuth() */

// Not needed anymore, keeping it for reference
export {}