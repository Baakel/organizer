<script>
    import { collection, addDoc, serverTimestamp } from "firebase/firestore";
    import { db, auth } from "$lib/firebase";
    import { getMayDos } from "$lib/_utils";
    import TextInput from "$lib/TextInput.svelte";

    export let placeholder="dunno";
    let value;
    let inputNode;
    
    export const setMaydo = async () => {
        if (value === "") {
            return
        }
        const maydoCollection = collection(db, "users", auth.currentUser.uid, "maydos")
        await addDoc(maydoCollection, {
            text: value,
            past: false,
            completed: false,
            created: serverTimestamp(),
        })
        value = "";
        inputNode.blur()

    }
</script>

<form on:submit|preventDefault={setMaydo}>
    <TextInput bind:placeholder bind:value bind:element={inputNode} />
</form>