<!-- src/App.svelte -->
<script lang="ts">
	import type { InactionCardModel } from 'src/models/inaction-card.model';

	import InactionCard from '../components/InactionCard.svelte';
  
	let inactions: InactionCardModel[] = [
		{
			title: 'Return VHS to Blockbuster',
			dueDate: new Date('1992-02-29'),
			notes: "You've had it since 1998. What's the rush?"
		},
		{
			title: 'Fix the hole in the wall',
			dueDate: new Date(Date.now()),
			notes: 'Keeping it where it is adds character and nostalgia.'
		},
		{
			title: 'Do the dishes',
			dueDate: new Date('2024-02-29'),
			notes: 'Someone else will probably get to them. Just leave them in the sink.'
		}
	];
</script>

<main>
	<h1>To Don't List</h1>
	<p class="intro">Here is a list of things I'm not going to do:</p>

	{#each inactions as inaction}
		<InactionCard {inaction} />
	{/each}
</main>
