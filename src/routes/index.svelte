<script>
    import * as game from '$lib/game';
import { onMount } from 'svelte';
import { fade, fly } from 'svelte/transition';
let start = true;
onMount(() => {
    game.init();

    game.start();
});

</script>
{#if !start}
<h1 class="empty" in:fly="{{y:200,duration:1000}}" out:fade>
    Physics Simluation (PONG)
</h1>
{/if}
<canvas id="game" width="800" hidden={!start} height="600"></canvas>

<style>
    canvas {
        display: block;
        margin: 0 ;
        background: rgb(53,53,53);
    }
    .empty{
        background: rgb(255, 100, 52);
    }

</style>