<script>
	import { uid } from "./helpers/uid";

	export let value = "";
	export let placeholder = "";
	export let label = "";
	export let readonly = false;
	export let disabled = false;

	const id = uid();
</script>

<div class="area">
	<label class="label" for={id}>{label}</label>
	<textarea
		{id}
		class="textarea"
		bind:value
		{readonly}
		{disabled}
		{placeholder} />
</div>

<style>
	.area {
		margin-bottom: 20px;
		font: var(--wx-font);
	}

	.label {
		display: block;
		margin-bottom: 10px;
		font: var(--wx-label-font);
		color: var(--wx-label-font-color);
	}

	.textarea {
		box-sizing: border-box;
		width: 100%;
		height: 70px;
		padding: var(--wx-input-padding);
		border: var(--wx-input-border);
		border-radius: var(--wx-input-border-radius);
		font: var(--wx-input-font);
		color: var(--wx-input-font-color);
		resize: vertical;
		outline: none;
	}

	.textarea:focus {
		border: 1px solid var(--wx-input-focus-color);
	}
</style>
