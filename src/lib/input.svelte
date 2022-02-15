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
    <input type="text" placeholder={placeholder} class="w-2/3 rounded-full p-2 bg-gray-600 text-white" bind:value>
</form>

