<script context="module">
	export const load = async ({ fetch }) => {
		const res = await fetch('/api/posts');
		const data = await res.json();

		if (data) {
			console.log(data);
			return {
				props: {
					data
				}
			};
		}

		return {
			props: {}
		};
	};
</script>

<script>
	export let data;
</script>

<h1>Homepage</h1>

<p>{JSON.stringify(data)}</p>
