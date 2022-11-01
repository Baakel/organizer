<script lang="ts">
    import {addDoc, collection} from "firebase/firestore";
    import {auth, db} from "$lib/firebase";
    import TextInput from "$lib/TextInput.svelte";
    import {pixelColors} from "$lib/stores";

    let value: string;
    let colorPicked = "#15b75b"
    let selectedColor: string;

    export const setNewColor = async () => {
        const colorsCollection = collection(db, "users", auth.currentUser.uid, "colors")
        await addDoc(colorsCollection, {
            title: value,
            color: colorPicked
        })
    }
</script>

<div>
    <label for="colpick" class="flex m-auto w-8 h-8 rounded-full" style="background-color: {colorPicked}">
    </label>
    <input id="colpick" class="hidden" type="color" bind:value={colorPicked} />
    <select id="userColors" bind:value={selectedColor} style="background-color: {selectedColor}">
        {#await $pixelColors}
            <p class="text-neutral-300">Getting your colors...</p>
        {:then}
            {#each $pixelColors as pcolor}
                <option style="background-color: {pcolor.color}" value="{pcolor.color}">{pcolor.title}</option>
            {/each}
        {/await}
    </select>
    <TextInput bind:value placeholder="Day's description" />
    <button class="bg-gradient-to-r mb-4 from-violet-500 to-fuchsia-500 px-4 py-2 rounded-full capitalize font-bold" on:click={setNewColor}>add</button>
</div>