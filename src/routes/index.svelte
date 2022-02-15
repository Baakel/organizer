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
    import Card from "$lib/card.svelte";

    const localAuth = getAuth()
    user.set(localAuth.currentUser)

    const getGoals = async (): Promise<Goal> => {
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
            let created;
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
    let goals = getGoals();
    $: {
        if ($user) {
            goals = getGoals();
        }
    }

    function handleNewGoal() {
        goals = getGoals()
    }

</script>

<title>Organizer</title>

<div class="p-8 m-0 h-full text-center">
    <Card>
        <div slot="title">
            <h1 class="text-center font-extrabold text-4xl text-gray-300 pb-6 pt-8">Today's goal</h1>
        </div>
        <div slot="content">
            {#await goals}
                <p class="font-bold text-gray-300 text-2xl">Getting your goals...</p>
            {:then goal}
                {#if !goal.past && $user}
                    <p class="text-gray-300 p-8 font-semibold text-2xl">{goal.text}</p>
                {:else if $user}
                    <Input placeholder="  What do you want to accomplish today?" on:createdGoal={handleNewGoal}/>
                {/if}
            {/await}
        </div>
    </Card>
    <Card>
        <div slot="title">
            <h1 class="text-gray-300 text-xl font-extrabold pt-4 pb-2">Important Todos</h1>
        </div>
        <div slot="content" class="p-6">
            {#if $user}
                <p class="text-white">Your user id is {$user.uid} and your display name is {$user.displayName}</p>
                <p class="text-gray-300">Also your email is {$user.email}</p>
                <button class="bg-purple-600 p-2.5 m-2 rounded-full font-bold text-gray-300" on:click={doLogout}>Sign out</button>
            {:else}
                <button class="bg-blue-500 p-2.5 m-2 rounded-full font-bold text-gray-300" on:click={doLogin}> Sign in</button>
            {/if}
        </div>
    </Card>
</div>
