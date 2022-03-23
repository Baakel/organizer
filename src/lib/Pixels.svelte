<script>
    const currentDate = new Date();
</script>


<div class="grid grid-cols-7 mx-10 text-gray-300 gap-1">
    {#each [...Array(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()).keys()] as day}
        <div 
            class="shadow-sunk bg-neutral-900 w-4 h-4 text-xs"
        >
            <span class="opacity-20" class:opacity-80="{day+1 === currentDate.getDate()}">{day + 1}</span>
        </div>
    {/each}
</div>