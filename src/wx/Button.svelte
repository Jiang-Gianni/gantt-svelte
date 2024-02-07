<script>
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();
	export let appearance = "primary";
</script>

<button
	class="btn"
	class:btn-primary={appearance === 'primary'}
	class:btn-danger={appearance === 'danger'}
	on:click={() => dispatch('click')}>
	<slot />
</button>

<style>
	.btn {
		min-width: 82px;
		padding: 8px 16px;
		border: none;
		border-radius: var(--wx-button-radius);
		font: var(--wx-button-font);
		text-transform: uppercase;
		cursor: pointer;
	}

	.btn:active {
		outline: none;
		opacity: 0.7;
	}

	.btn:focus {
		outline: none;
	}

	.btn-primary {
		margin-right: 20px;
		color: var(--wx-button-primary-font-color);
		background-color: var(--wx-button-primary-color);
	}

	.btn-primary:hover {
		margin-right: 20px;
		color: var(--wx-button-primary-font-color);
		background-color: var(--wx-button-primary-color-hover);
	}

	.btn-danger {
		color: var(--wx-button-danger-font-color);
		background-color: var(--wx-button-danger-color);
	}

	.btn-danger:hover {
		background-color: var(--wx-button-danger-color-hover);
	}
</style>
