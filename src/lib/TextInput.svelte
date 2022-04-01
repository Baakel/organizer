<script lang="ts">
    export let placeholder: string;
    export let value = "";
    export let element = undefined;
</script>

<div class="bg-neutral-900 shadow-sunk mb-4 rounded-full text-center mx-10">
    <input type="text" placeholder={placeholder} class="w-full rounded-full p-2 bg-neutral-900 text-gray-300 text-center" bind:value bind:this={element}>
</div>