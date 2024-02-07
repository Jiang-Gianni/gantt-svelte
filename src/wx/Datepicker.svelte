<script>
	import Calendar from "./Calendar.svelte";
	import { uid } from "./helpers/uid";

	export let value = null;
	export let date = value || new Date();
	export let readonly = false;
	export let label = "";
	export let placeholder = "";

	export let format = v =>
		v.getFullYear() + "." + zeros(v.getMonth() + 1) + "." + zeros(v.getDate());
	export let parse = v => new Date(v);

	let show = false;
	let node;

	function zeros(value) {
		const str = value.toString();
		return str.length === 1 ? "0" + str : str;
	}

	function selectDate() {
		show = false;
	}

	function down(e) {
		if (node && !node.contains(e.target)) {
			show = false;
		}
	}

	function onBlur() {
		if (!readonly) {
			const d = parse(value);
			if (isDate(d)) value = date = d;
		}
	}

	function isDate(date) {
		return date instanceof Date && !isNaN(date.valueOf());
	}

	const id = uid();
</script>

<svelte:body on:mousedown={down} />

<div class="datepicker">
	<label class="label" for={id}>{label}</label>
	<div class="input-wrapper">
		<input
			{id}
			class="input"
			type="text"
			{readonly}
			{placeholder}
			value={value ? format(value) : ''}
			on:focus={() => (show = true)}
			on:blur={onBlur} />
		{#if show}
			<div class="wrapper" bind:this={node}>
				<Calendar {date} bind:value on:selectDate={selectDate} />
			</div>
		{/if}
		<div class="icon" />
	</div>
</div>

<style>
	.datepicker {
		position: relative;
		margin-bottom: 20px;
	}

	.label {
		display: block;
		margin-bottom: 10px;
		font: var(--wx-label-font);
		color: var(--wx-label-font-color);
	}

	.input-wrapper {
		position: relative;
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

	.icon {
		position: absolute;
		top: 50%;
		right: 11px;
		transform: translateY(-50%);
		width: 20px;
		height: 20px;
		background: var(--wx-calendar-icon) center center no-repeat;
		pointer-events: none;
	}

	.wrapper {
		position: absolute;
		z-index: 1;
		background: white;
	}
</style>
