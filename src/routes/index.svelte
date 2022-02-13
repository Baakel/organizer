<script lang="ts">
    //import { browser } from "$app/env";
    import Input from "$lib/input.svelte";
    import {doLogin, doLogout} from "$lib/login"
    import { user } from "$lib/stores";
    import { collection, doc, getDocs, getDoc, query, where, updateDoc } from "firebase/firestore"
    import { db } from "$lib/firebase"
    import { getAuth } from "firebase/auth"
    import type { Goal } from "$lib/types"
    import { isToday } from "$lib/_utils";

    const localAuth = getAuth()
    user.set(localAuth.currentUser)

    const getGoals = async (): Promise<Goal> => {
        let goal: Goal = {
            text: "",
            created: "",
            past: true
        } 
        const goalsCollection = collection(db, "users", localAuth.currentUser.uid, "goals")
        const q = query(goalsCollection, where("past", "==", false))
        const querySnapshot = await getDocs(q)
        const updated = async (docu) => await updateDoc(doc(goalsCollection, docu.id), {past: true})
        querySnapshot.forEach((docu) => {
            console.log(docu.id + " => " + docu.data(), docu.get("text"))
            const text = docu.get("text")
            const dateCreated = new Date(docu.get("created").seconds * 1000)
            const currentDate = new Date()
            let created;
            if (!isToday(dateCreated, currentDate)){
                console.log(isToday(dateCreated, currentDate))
                created = dateCreated.toLocaleString()
                updated(docu)
            }
            created = dateCreated.toLocaleString()
            const past = docu.get("past")
            goal.text = text
            goal.created = created
            goal.past = past
            console.log(goal, "goal is")
        })
        return goal
    }

    let goals = getGoals();

    function handleNewGoal() {
        goals = getGoals()
    }

</script>

<title>Organizer</title>

<div class="p-8 m-0 h-full text-center">
    <h1 class="text-center text-6xl text-white mb-10">Today's goal</h1>
    {#await goals}
        <p class="font-bold text-gray-300 text-lg">Getting your goals...</p>
    {:then goal}
        {#if !goal.past}
            <p class="text-gray-300 m-3">{goal.text} created on {goal.created} and it is {goal.past}</p>
        {:else}
            <Input placeholder="  What do you want to accomplish today?" on:createdGoal={handleNewGoal}/>
        {/if}
    {/await}
    <p class="text-red-600">Testing this other paragraph</p>
    {#if $user}
        <p class="text-white">Your user id is {$user.uid} and your display name is {$user.displayName}</p>
        <p class="text-gray-300">Also your email is {$user.email}</p>
    {:else}
        <button class="bg-blue-500 p-2.5 m-2 rounded-full font-bold text-gray-300" on:click={() => {doLogin()}}> Sign in</button>
    {/if}

    <button on:click={() => {doLogout()}}>Sign out</button>
</div>
