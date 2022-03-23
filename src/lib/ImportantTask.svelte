<script>
    import { collection, addDoc, serverTimestamp } from "firebase/firestore";
    import { db, auth } from "$lib/firebase";
    import TextInput from "$lib/TextInput.svelte";
    import { getImportantTasks } from "$lib/_utils";

    export let placeholder="dunno";
    let value;
    let inputNode;
    
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
        await getImportantTasks(auth, db)
        value = "";
        inputNode.blur()

    }
</script>

<form on:submit|preventDefault={setImpTask}>
    <TextInput bind:placeholder bind:value bind:element={inputNode} />
</form>

