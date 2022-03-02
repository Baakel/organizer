<script lang="ts">
    
</script>

<div class="my-4 bg-neutral-800 rounded-2xl shadow-raised">
    <h1 class="text-gray-300 text-xl font-extrabold py-4">
        <slot name="title"></slot>
    </h1>
    {#if $$slots.content}
        <hr class="border-t-[#0e1018] border-b-[#3F3F46] border-y-[0.8px] mx-14">
        <slot name="content"></slot>
    {/if}
    {#if $$slots.footer}
        <hr class="border-t-[#0e1018] border-b-[#3F3F46] border-y-[0.8px] mx-14">
        <slot name="footer"></slot>
    {/if}
</div>