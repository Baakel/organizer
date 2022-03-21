<script>
    import { collection, addDoc, serverTimestamp } from "firebase/firestore";
    import { db, auth } from "$lib/firebase";
    import { createEventDispatcher } from "svelte";

    export let placeholder="dunno";
    let value;
    const dispatch = createEventDispatcher();
    
    export const setGoal = async () => {
        if (value === "") {
            return
        }
        const goalsCollection = collection(db, "users", auth.currentUser.uid, "goals")
        await addDoc(goalsCollection, {
            text: value,
            past: false,
            created: serverTimestamp()
        })
        dispatch('createdGoal')
    }
</script>

<form on:submit|preventDefault={setGoal}>
    <div class="bg-neutral-900 shadow-sunk mb-4 rounded-full text-center mx-10">
        <input type="text" placeholder={placeholder} class="w-full rounded-full p-2 bg-neutral-900 text-gray-300 text-center" bind:value>
    </div>
</form>

