//import { auth } from "$lib/auth"
import { auth, db } from "$lib/firebase";
import { getRedirectResult, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { user } from "$lib/stores"
import { getDoc, collection, doc, addDoc, setDoc } from "firebase/firestore";

//const res =  async () => await auth.signInWith("google");

export async function doLogin() {
    const provider = new GoogleAuthProvider();
    const userCreds = await signInWithPopup(auth, provider)
    user.set(userCreds.user)
    const usersCollection = collection(db, "users")
    const document = await setDoc(doc(usersCollection, auth.currentUser.uid), {
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        pic: auth.currentUser.photoURL,
        sub: false,
    }, { merge: true })

    console.log(document)
    

    /* const result2 = await getRedirectResult(auth)
    console.log(result2, "result 2")
    console.log(result2.user)
    if (result2) {
        user.set(result2.user)
    }
    return result2 */
}

export async function doLogout () {
    await auth.signOut()
    user.set(null)
}