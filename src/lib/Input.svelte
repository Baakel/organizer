<script>
    import { collection, addDoc, serverTimestamp } from "firebase/firestore";
    import { db, auth } from "$lib/firebase";
    import { createEventDispatcher } from "svelte";
    import TextInput from "$lib/TextInput.svelte"

    export let placeholder;
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
    <TextInput bind:placeholder bind:value />
</form>

