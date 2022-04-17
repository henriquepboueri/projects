<script>
	let rangeValue = 0;
</script>

<label for="customRange1" class="form-label">Example range</label>
<input type="range" class="form-range" id="customRange1" bind:value={rangeValue} />

<p>Value now is {rangeValue}</p>
