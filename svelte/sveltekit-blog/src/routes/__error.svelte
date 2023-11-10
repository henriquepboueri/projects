<script context="module">
	export const load = ({ error, status }) => {
		return {
			props: {
				error,
				status
			}
		};
	};
</script>

<script>
	export let error;
	export let status;
</script>

<!-- <h1>Generic error page</h1> -->

<h1>{error.name}</h1>
<p>Status: {status}</p>
