<script>
	import { uid } from "./helpers/uid";

	export let label = "";
	export let value = "";
	export let options = [];

	const id = uid();
</script>

<div class="select-container">
	<label class="label" for={id}>{label}</label>
	<div class="select-wrapper">
		<!-- svelte-ignore a11y-no-onchange -->
		<select {id} class="select" bind:value>
			{#each options as option}
				<option value={option}>{option}</option>
			{/each}
		</select>
		<div class="icon" />
	</div>
</div>

<style>
	.select-container {
		margin-bottom: 20px;
	}

	.label {
		display: block;
		margin-bottom: 10px;
		font: var(--wx-label-font);
		color: var(--wx-label-font-color);
	}

	.select-wrapper {
		position: relative;
		display: flex;
	}

	.select {
		width: 100%;
		padding: var(--wx-input-padding);
		border: var(--wx-input-border);
		border-radius: var(--wx-input-border-radius);
		font: var(--wx-input-font);
		color: var(--wx-input-font-color);
		text-transform: capitalize;
		outline: none;
		appearance: none;
	}

	.select:focus {
		border: 1px solid var(--wx-input-focus-color);
	}

	.icon {
		position: absolute;
		top: 50%;
		right: 11px;
		transform: translateY(-50%);
		width: 20px;
		height: 20px;
		background: var(--wx-show-more-icon) center center no-repeat;
		pointer-events: none;
	}
</style>
