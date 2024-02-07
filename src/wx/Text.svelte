<script>
	import { onMount } from "svelte";
	import { uid } from "./helpers/uid";

	export let value = "";
	export let placeholder = "";
	export let label = "";
	export let readonly = false;
	export let disabled = false;
	export let autofocus = false;

	let el = null;
	if (autofocus) {
		onMount(() => el.focus());
	}

	const id = uid();
</script>

<div class="text">
	<label class="label" for={id}>{label}</label>
	<input
		{id}
		type="text"
		class="input"
		bind:value
		bind:this={el}
		{readonly}
		{disabled}
		{placeholder} />
</div>

<style>
	.text {
		margin-bottom: 20px;
	}

	.label {
		display: block;
		margin-bottom: 10px;
		font: var(--wx-label-font);
		color: var(--wx-label-font-color);
	}

	.input {
		box-sizing: border-box;
		width: 100%;
		padding: var(--wx-input-padding);
		border: var(--wx-input-border);
		border-radius: var(--wx-input-border-radius);
		font: var(--wx-input-font);
		color: var(--wx-input-font-color);
		outline: none;
	}

	.input:focus {
		border: 1px solid var(--wx-input-focus-color);
	}
</style>
