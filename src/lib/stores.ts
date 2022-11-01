import {writable} from "svelte/store";
import type {User} from "firebase/auth";
import type {Writable} from "svelte/store";


export const user: Writable<null | User>  = writable(null);
export const maydos = writable([]);
export const importantTasks = writable([]);
export const pixelColors = writable([]);