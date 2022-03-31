import type {Goal} from "$lib/types";
import {collection, doc, Firestore, getDocs, onSnapshot, query, updateDoc, where} from "firebase/firestore";
import {db} from "$lib/firebase";
import type {Auth, Unsubscribe} from "firebase/auth";
import {importantTasks, maydos, user} from "$lib/stores";

export function getUserFromStorage() {
    const userKey = Object.keys(window.localStorage)
        .filter(it => it.startsWith('firebase:authUser'))[0];
    return userKey ? JSON.parse(localStorage.getItem(userKey)) : null
}

export function isToday(date, now): boolean {
    const yearDate = date.getYear();
    const monthDate = date.getMonth();
    const dayDate = date.getDate();
    const yearNow = now.getYear();
    const monthNow = now.getMonth();
    const dayNow = now.getDate();
    return yearDate === yearNow && monthDate === monthNow && dayDate ===
        dayNow;
}

export const getGoals = async (localAuth): Promise<Goal> => {
    const goal: Goal = {
        text: "",
        created: "",
        past: true
    }
    if (!localAuth.currentUser) {
        return goal
    } 
    const goalsCollection = collection(db, "users", localAuth.currentUser.uid, "goals")
    const q = query(goalsCollection, where("past", "==", false))
    const querySnapshot = await getDocs(q)
    const updated = async (docu) => await updateDoc(doc(goalsCollection, docu.id), {past: true})
    querySnapshot.forEach((docu) => {
        const text = docu.get("text")
        const dateCreated = new Date(docu.get("created").seconds * 1000)
        const currentDate = new Date()
        let created: string;
        if (!isToday(dateCreated, currentDate)){
            created = dateCreated.toLocaleString()
            updated(docu)
            return goal
        }
        created = dateCreated.toLocaleString()
        const past = docu.get("past")
        goal.text = text
        goal.created = created
        goal.past = past
    })
    return goal
}

export async function getImportantTasks(localAuth: Auth, db: Firestore): Promise<Unsubscribe> {
    if (!localAuth.currentUser) {
        return
    } 
    const unsub = onSnapshot(query(collection(db, "users", localAuth.currentUser.uid, "important_tasks")), (querySnapshot) => {
        const tasks = []
        querySnapshot.forEach((doc) => {
            tasks.push({...doc.data(), "id": doc.id})
        })
        importantTasks.set(tasks)
    })
    user.subscribe(value => {
        if(!value) {
            unsub();
        }
    })
    return unsub
}

export async function getMayDos(localAuth: Auth, db: Firestore): Promise<Unsubscribe> {
    if (!localAuth.currentUser) {
        return;
    }
    const unsub = onSnapshot(query(collection(db, "users", localAuth.currentUser.uid, "maydos")), (querySnapshot) => {
        const tasks = []
        querySnapshot.forEach((doc) => {
            tasks.push({...doc.data(), "id": doc.id})
        })
        maydos.set(tasks)
    })
    user.subscribe(value => {
        if (!value) {
            unsub();
        }
    })

    return unsub
}

// export async function getMayDosWithStore(localAuth: Auth, db: Firestore): Promise<void> {
//     const unsub = onSnapshot(query(collection(db, "users", localAuth.currentUser.uid, "important_tasks")), maydos.subscribe((querySnapshot) => {console.log("logging from store", querySnapshot)}))
// }