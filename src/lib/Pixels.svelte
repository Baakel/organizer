<script lang="ts">
    // import { collection, addDoc } from 'firebase/firestore';
    // import { db, auth } from '$lib/firebase';
    import {pixelColors} from "$lib/stores";
    import PixelsColors from "$lib/PixelsColors.svelte";
    import gear from "$lib/assets/icons/gear.svg";
    // import PixelsColors from "$lib/PixelsColors";

    const currentDate = new Date();
    let colored: boolean;
    let dayClicked: number;
    // let colorPicked = "#15b75b";
    // let value: string;
    let selectedColor: string;

    $: console.log(selectedColor)

    const handleClick = (t) => {
    	console.log("Clicked", t.innerText)
            colored = true;
        dayClicked = Number(t.innerText)
        console.log(dayClicked)
    }
</script>

<div class="grid grid-cols-7 mx-10 text-gray-300 gap-1">
    {#each [...Array(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()).keys()] as day}
        <div 
            class="shadow-sunk w-4 h-4 text-xs bg-neutral-900"
            style="background-color: {colored && day+1 === dayClicked ? selectedColor: ''}"
            on:click={(e) => handleClick(e.target)}
        >
            <span class="opacity-20" class:opacity-80="{day+1 === currentDate.getDate()}">{day + 1}</span>
        </div>
    {/each}
</div>
<div>
    <PixelsColors />
    <div class="relative flex flex-col my-2 mx-5 px-4 py-2 items-center text-neutral-500 bg-neutral-900 shadow-sunk">
        <span class="absolute right-0 top-0 fill-white stroke-white">
	    <img class="fill-white stroke-white" src={gear} alt="settings" />
	</span>
        {#each $pixelColors as color}
            <div class="flex flex-row items-center w-full border-b-neutral-300 border-b">
                <div class="w-4 h-4 rounded-full mr-4" style="background-color: {color.color}"></div>
                <p class="">{color.title}</p>
            </div>
        {/each}
    </div>
</div>
