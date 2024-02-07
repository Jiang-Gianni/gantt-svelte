<script>
	import { createEventDispatcher } from "svelte";
	import { uid } from "./helpers/uid";

	export let label = "";
	export let value = 0;
	export let step = 1;
	export let min = 0;
	export let max = Infinity;

	const dispatch = createEventDispatcher();
	const digits = new RegExp("^[0-9]+$");

	let error = false;

	$: counter = value;

	function dec() {
		if (counter <= min) return;
		counter -= step;
		dispatch("change", { value: counter });
	}

	function inc() {
		if (counter >= max) return;
		counter += step;
		dispatch("change", { value: counter });
	}

	function blur() {
		const tValue =
			Math.round(Math.min(max, Math.max(value, min)) / step) * step;
		value = isNaN(tValue) ? 0 : tValue;
	}

	function input(e) {
		let v = e.target.value;
		if (digits.test(v)) {
			error = false;
			dispatch("change", { value: v });
		} else {
			error = true;
		}
	}

	const id = uid();
</script>

<div class="counter">
	<label class="label" for={id}>{label}</label>
	<div class="controls">
		<button class="btn btn-dec" on:click={dec}>
			<svg
				class="dec"
				width="12"
				height="2"
				viewBox="0 0 12 2"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path d="M11.2501 1.74994H0.750092V0.249939H11.2501V1.74994Z" />
			</svg>
		</button>
		<input
			{id}
			type="text"
			class="input"
			class:error
			required
			bind:value={counter}
			on:blur={blur}
			on:input={input} />
		<button class="btn btn-inc" on:click={inc}>
			<svg
				class="inc"
				width="12"
				height="12"
				viewBox="0 0 12 12"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M11.2501
					6.74994H6.75009V11.2499H5.25009V6.74994H0.750092V5.24994H5.25009V0.749939H6.75009V5.24994H11.2501V6.74994Z" />
			</svg>
		</button>
	</div>
</div>

<style>
	.counter {
		margin-bottom: 20px;
	}

	.label {
		display: block;
		margin-bottom: 10px;
		font: var(--wx-label-font);
		color: var(--wx-label-font-color);
	}

	.controls {
		display: flex;
	}

	.input {
		box-sizing: border-box;
		width: 40px;
		height: 32px;
		border: var(--wx-input-border);
		border-radius: var(--wx-input-border-radius);
		font: var(--wx-input-font);
		color: var(--wx-input-font-color);
		text-align: center;
		outline: none;
	}

	.input:focus {
		border: 1px solid var(--wx-input-focus-color);
	}

	.input.error {
		border: 1px solid var(--wx-danger-color);
	}

	.btn {
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 30px;
		height: 32px;
		border: var(--wx-input-border);
		border-radius: var(--wx-input-border-radius);
		font: var(--wx-input-font);
		color: var(--wx-input-font-color);
		background-color: inherit;
		outline: none;
		cursor: pointer;
	}

	.btn:active {
		border: var(--wx-input-border);
		border-color: var(--wx-input-focus-color);
	}

	.btn-dec {
		border-right: 1px solid transparent;
		border-radius: 2px 0 0 2px;
	}
	.btn-inc {
		border-left: 1px solid transparent;
		border-radius: 0 2px 2px 0;
	}

	.dec,
	.inc {
		fill: var(--wx-input-focus-color);
	}
</style>
