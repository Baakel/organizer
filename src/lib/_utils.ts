import type { Goal, Task } from "$lib/types";
import { collection, doc, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { db } from "$lib/firebase";

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
        taskArray.push(task)
    })
    return taskArray
}