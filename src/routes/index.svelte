<script lang="ts">
    //import { browser } from "$app/env";
    import Input from "$lib/Input.svelte";
    import ImportantTask from "$lib/ImportantTask.svelte";
    import ImpTaskList from "$lib/ImpTaskList.svelte";
    import {doLogin, doLogout} from "$lib/login"
    import { user, maydos, importantTasks } from "$lib/stores";
    import { collection, doc, getDocs, getDoc, query, where, updateDoc } from "firebase/firestore"
    import { db, auth } from "$lib/firebase"
    import {browserLocalPersistence, getAuth, setPersistence} from "firebase/auth"
    import Card from "$lib/Card.svelte";
    import { getGoals, getImportantTasks, getColors, getMayDos } from "$lib/_utils";
    import { onMount } from 'svelte';
    import MaydosList from "$lib/MaydosList.svelte";
    import Pixels from "$lib/Pixels.svelte";
    import Maydos from "$lib/Maydos.svelte"

    onMount(async () => {
      await setPersistence(auth, browserLocalPersistence)
      auth.onAuthStateChanged(userObs => {
        user.set(userObs)
      })
    })

    const localAuth = auth;
    user.set(localAuth.currentUser)

    let goals = getGoals(localAuth);
    getImportantTasks(localAuth, db);
    getMayDos(localAuth, db);
    getColors(localAuth, db);
    $: {
        if ($user) {
            goals = getGoals(localAuth);
            getImportantTasks(localAuth, db)
            getMayDos(localAuth, db)
            getColors(localAuth, db);
        }
    }

    function handleNewGoal() {
        goals = getGoals(localAuth)
    }

</script>

<title>Organizer</title>

<div class="p-8 m-0 h-full text-center">
    <Card>
        <span slot="title" class="text-4xl">
            Today's goal
        </span>
        <div slot="content" class="p-8">
            {#await goals}
                <p class="font-bold text-gray-300 text-2xl">Getting your goals...</p>
            {:then goal}
                {#if !goal.past && $user}
                    <p class="text-gray-300 font-semibold text-2xl">{goal.text}</p>
                {:else if $user}
                    <Input placeholder="  What do you want to accomplish today?" on:createdGoal={handleNewGoal}/>
                {:else}
                    <p class="text-gray-300 text-lg">Please log in to continue</p>
                {/if}
            {/await}
        </div>
    </Card>
    <div class="grid gap-x-4 grid-cols-1 md:grid-cols-6">
        <div class="md:col-span-3">
            <Card>
                <span slot="title">
                    Important Todos
                </span>
                <div slot="content" class="p-6 text-gray-300">
                    {#if $user}
                        <ImportantTask placeholder=" Add a new task" />
                        {#await $importantTasks}
                            <p class="text-lg">
                                Getting your importantTasks...
                            </p>
                        {:then}
                            <ImpTaskList tasks={$importantTasks} />
                        {/await}
                    {/if}
                    {#if $user}
                        <p class="">Your user id is {$user.uid} and your display name is {$user.displayName}</p>
                        <p class="">Also your email is {$user.email}</p>
                        <button class="bg-purple-600 p-2.5 m-2 rounded-full font-bold" on:click={doLogout}>Sign out</button>
                    {:else}
                        <button class="bg-blue-500 p-2.5 m-2 rounded-full font-bold" on:click={doLogin}> Sign in</button>
                    {/if}
                </div>
            </Card>
        </div>
        <div class="text-gray-300 md:col-span-2">
            <Card>
                <span slot="title">
                    May-dos
                </span>
                <div slot="content" class="py-6">
                    {#if $user}
                        <Maydos placeholder=" Add an easy task" />
                        <MaydosList tasks={$maydos} />
                    {/if}
                </div>
            </Card>
        </div>
        <div class="md:col-span-1">
            <Card>
                <span slot="title">
                    Year in pixels
                </span>
                <div slot="content" class="py-6">
                    {#if $user}
                        <Pixels />
                    {/if}
                </div>
            </Card>
        </div>
    </div>
</div>
