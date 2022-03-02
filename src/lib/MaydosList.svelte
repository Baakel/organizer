<script>
    export let tasks;
    import { db, auth } from "$lib/firebase";
    import { collection, updateDoc, doc } from "firebase/firestore";

    const handleComplete = async (task) => {
        let taskCollection = collection(db, 'users', auth.currentUser.uid, "maydos")
        await updateDoc(doc(taskCollection, task.id), {completed: !task.completed})
        task.completed = !task.completed
        let index = tasks.indexOf(task)
        tasks.splice(index, 1)
        tasks = [...tasks, task]
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
                class="cursor-pointer">
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
                class="cursor-pointer font-normal">
                    🗑
                </div>
            </div>
        {/if}
    {/each}
</ul>