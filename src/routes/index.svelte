<script lang="ts">
    import Input from "$lib/input.svelte";
    //import { auth, provider } from "$lib/_db"
    //import { driver, session } from "$lib/_neo4jdb"
    //import { auth } from "$lib/auth";
    import {doLogin} from "$lib/login"

    export let uid;
    export let displayName;

</script>

<title>Organizer</title>

<div class="p-8 m-0 h-full text-center">
    <h1 class="text-center text-6xl text-white mb-10">Today's goal</h1>
    <Input placeholder="  What do you want to accomplish today?"/>
    <p class="text-red-600">Testing this other paragraph</p>
    <p class="text-white">Your user id is {uid} and your display name is {displayName}</p>

    <button on:click={() => {doLogin()}}> Sign in with google</button>
    <button>Sign out</button>
</div>
