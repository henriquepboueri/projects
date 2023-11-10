<script>
	let name;
	let email;
	let showForm = true;

	const handleFormSubmit = async () => {
		const res = await fetch('/api/contact', {
			method: 'POST',
			body: JSON.stringify({ name, email })
		});
		const data = await res.json();

		showForm = !data;
	};
</script>

<h1>Contact</h1>

{#if showForm}
	<form on:submit|preventDefault={handleFormSubmit}>
		<label for="">
			Name:
			<input type="text" name="name" id="name" bind:value={name} />
		</label>
		<label for="email">
			E-mail address:
			<input type="email" name="email" id="email" bind:value={email} />
		</label>
		<input type="submit" value="Submit!" />
	</form>
{:else}
	<p>Your submission has been successful!</p>
{/if}

<style>
	label {
		display: block;
		margin-bottom: 2rem;
	}
</style>
