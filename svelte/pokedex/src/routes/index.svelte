<script>
	import { pokemon } from '../stores/pokestore';
	// pokemon.subscribe(console.log)
	// $: console.log($pokemon);
</script>

<svelte:head>
	<title>Svelte Kit Pokedex!</title>
</svelte:head>

<h1 class="text-4xl text-center my-8 uppercase">Svelte Kit - Pokedex</h1>

{#each $pokemon as poke}
	<p>{poke.name}</p>
{/each}
