<!-- Este script é executado antes de ser renderizado -->
<script context="module">
	let _page;
	export const load = (page, fetch, session, stuff) => {
		_page = page;
		const id = page.params.id;
		return {
			props: {
				id
			}
		};
	};
</script>

<!-- Variáveis exportadas aqui podem ser utilizadas pelo componente -->
<script>
	export let page = _page;
	export let id;
</script>

<h1>Blog post {id}</h1>

<p>
	{JSON.stringify(page)}
</p>
