<script>
    export let tasks;
    import { db, auth } from "$lib/firebase";
    import { collection, updateDoc, doc, deleteDoc } from "firebase/firestore";
    import { getMayDos } from "$lib/_utils";

    const handleComplete = async (task) => {
        let taskCollection = collection(db, 'users', auth.currentUser.uid, "maydos")
        await updateDoc(doc(taskCollection, task.id), {completed: !task.completed})
        task.completed = !task.completed
    }

    const handleDelete = async (task) => {
        let taskCollection = collection(db, "users", auth.currentUser.uid, "maydos")
        await deleteDoc(doc(taskCollection, task.id))
        await getMayDos(auth, db)
    }
</script>

<ul>
    {#each tasks as task}
        {#if !task.completed}
            <div class="my-2 mx-8 bg-neutral-900 shadow-sunk py-0.5 pl-4 pr-2 text-left rounded-md flex justify-between">
                <div 
                class="cursor-pointer" 
                on:click={() => handleComplete(task)}>
                    {task.text}
                </div>
                <div
                class="cursor-pointer"
                on:click={() => handleDelete(task)}>
                    🗑
                </div>
            </div>
        {/if}
        {#if task.completed}
            <div class="my-2 mx-8 bg-neutral-900 shadow-sunk py-0.5 pl-4 pr-2 text-left rounded-md text-neutral-500 flex justify-between">
                <div class="cursor-pointer italic line-through" on:click={() => handleComplete(task)}>
                    {task.text}
                </div>
                <div
                class="cursor-pointer font-normal"
                on:click={() => handleDelete(task)}>
                    🗑
                </div>
            </div>
        {/if}
    {/each}
</ul>