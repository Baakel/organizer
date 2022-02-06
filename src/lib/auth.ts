import { getAuth, signInWithRedirect, signOut as _signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import type { User } from "firebase/auth";
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
        const provider = providerFor(name)
        await signInWithRedirect(auth, provider)
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

export const auth = createAuth()