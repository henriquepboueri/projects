<script lang="ts">
	import Button from '@smui/button';

	let count = 0;
</script>

{#if count}
	<p>You clicked {count} times</p>
{/if}

<Button on:click={() => count++}>MUI Button</Button>
<Button color="secondary">Secondary color</Button>
