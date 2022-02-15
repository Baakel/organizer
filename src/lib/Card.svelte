<script>

</script>
<div class="my-4 bg-neutral-800 rounded-2xl shadow-[1px_1px_2px_0_rgb(17,19,30),-1px_-1px_2px_0_rgb(53,57,84)]">
    <slot name="title"></slot>
    <hr class="border-t-[#0e1018] border-b-[#2d3150] border-y-[0.8px] mx-14 my-2">
    <slot name="content"></slot>
    {#if $$slots.footer}
        <hr class="border-t-[#0e1018] border-b-[#2d3150] border-y-[0.8px] mx-14 my-2">
        <slot name="footer"></slot>
    {/if}
</div>