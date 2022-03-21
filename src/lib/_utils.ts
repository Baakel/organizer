import type { Goal, Task } from "$lib/types";
import { collection, doc, Firestore, getDocs, onSnapshot, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { db } from "$lib/firebase";
import type { Auth, Unsubscribe } from "firebase/auth";
import { maydos, user } from "$lib/stores";

export function getUserFromStorage() {
    const userKey = Object.keys(window.localStorage)
        .filter(it => it.startsWith('firebase:authUser'))[0];
    const user = userKey ? JSON.parse(localStorage.getItem(userKey)) : null;
    return user
}

export function isToday(date, now): boolean {
    const yearDate = date.getYear();
    const monthDate = date.getMonth();
    const dayDate = date.getDate();
    const yearNow = now.getYear();
    const monthNow = now.getMonth();
    const dayNow = now.getDate();
    if (yearDate === yearNow && monthDate === monthNow && dayDate === 
      dayNow) {
      return true
    }
    return false
}

export const getGoals = async (localAuth): Promise<Goal> => {
    let goal: Goal = {
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

export const getImportantTasks = async (localAuth): Promise<Task[]> => {
    if (!localAuth.currentUser) {
        return []
    } 
    const impTasksCollection = collection(db, "users", localAuth.currentUser.uid, "important_tasks")
    const q = query(impTasksCollection)
    const querySnapshot = await getDocs(q)
    // const updated = async (docu) => await updateDoc(doc(impTasksCollection, docu.id), {past: true})
    const taskArray = [] 
    querySnapshot.forEach((docu) => {
        let task: Task = {
            text: "",
            created: "",
            past: true,
            completed: false,
            id: "",
        }
        // const dateCreated = new Date(docu.get("created").seconds * 1000)
        // const currentDate = new Date()
        /* if (!isToday(dateCreated, currentDate)){
            created = dateCreated.toLocaleString()
            updated(docu)
            return task
        } */
        task.text = docu.get("text")
        task.created = docu.get("created")
        task.past = docu.get("past")
        task.completed = docu.get("completed")
        task.id = docu.id
        taskArray.push(task)
    })
    return taskArray
}

export async function getMayDos(localAuth: Auth, db: Firestore): Promise<Unsubscribe> {
    if (!localAuth.currentUser) {
        return;
    }
    const unsub = onSnapshot(query(collection(db, "users", localAuth.currentUser.uid, "important_tasks")), (querySnapshot) => {
        let tasks = []
        querySnapshot.forEach((doc) => {
            tasks.push(doc.data())
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

export async function getMayDosWithStore(localAuth: Auth, db: Firestore): Promise<void> {
    const unsub = onSnapshot(query(collection(db, "users", localAuth.currentUser.uid, "important_tasks")), maydos.subscribe((querySnapshot) => {console.log("logging from store", querySnapshot)}))
}