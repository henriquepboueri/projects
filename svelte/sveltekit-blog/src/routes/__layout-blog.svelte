<!-- Este layout é um 'named template'
	formato: __layout-[nome].svelte -->
<script>
	import Nav from '$lib/Nav.svelte';
</script>

<p>This is the blog layout!</p>

<div class="container">
	<Nav />

	<slot />
</div>
