<script>
    import { collection, addDoc, serverTimestamp } from "firebase/firestore";
    import { db, auth } from "$lib/firebase";
    import { createEventDispatcher } from "svelte";

    export let placeholder="dunno";
    let value;
    let inputNode;
    const dispatch = createEventDispatcher();
    
    export const setImpTask = async () => {
        if (value === "") {
            return
        }
        const impTaskCollection = collection(db, "users", auth.currentUser.uid, "important_tasks")
        await addDoc(impTaskCollection, {
            text: value,
            past: false,
            completed: false,
            created: serverTimestamp(),
        })
        dispatch('createdImpTask')
        value = "";
        inputNode.blur()

    }
</script>

<form on:submit|preventDefault={setImpTask} class="mx-8">
    <div class="bg-neutral-900 shadow-sunk mb-4 rounded-full text-center">
        <input type="text" placeholder={placeholder} class="w-full rounded-full p-2 bg-neutral-900 text-gray-300 text-center" bind:value bind:this={inputNode}>
    </div>
</form>

