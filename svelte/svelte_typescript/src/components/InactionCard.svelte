<!-- src/components/InactionCard.svelte -->
<script lang="ts">
	import type { InactionCardModel } from 'src/models/inaction-card.model';

	export let inaction: InactionCardModel;
</script>

<div class="inaction">
	<h2 class="title">{inaction.title}</h2>
	<span class="due-date">{inaction.dueDate}</span>
	<div class="notes">{inaction.notes}</div>
</div>

<style>
	.inaction {
		background-color: var(--color-purple-100);
		border-left: 0.25rem solid var(--color-purple-300);
		border-top-right-radius: 0.5rem;
		border-bottom-right-radius: 0.5rem;
		margin-bottom: 1rem;
		padding: 1rem 1.5rem;
		position: relative;
	}
	.title {
		color: var(--color-purple-500);
		font-size: 1rem;
		line-height: 1;
		margin: 0 0 0.5rem;
	}
	.notes {
		font-size: 0.85rem;
	}
	button {
		background-color: transparent;
		border: none;
		color: var(--color-gray-300);
		height: 1.25rem;
		padding: 0;
		position: absolute;
		right: 0.5rem;
		top: 0.5rem;
		transition: color 0.25s ease;
		width: 1.25rem;
		z-index: 1;
	}
	button:hover {
		cursor: pointer;
		color: var(--color-purple-500);
	}
</style>
