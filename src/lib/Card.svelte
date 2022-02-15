<script lang="ts">
    
</script>

<div class="my-4 bg-neutral-800 rounded-2xl shadow-[1px_1px_2px_0_rgb(17,19,30),-1px_-1px_2px_0_rgb(63,63,70)]">
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