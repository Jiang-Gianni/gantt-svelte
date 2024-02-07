<script>
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();

	export let appearance = "primary";
	export let icon = "";
</script>

<button class="button {appearance}" on:click={() => dispatch('click')}>
	{#if icon}<span class="icon {icon}" />{/if}
</button>

<style>
	.button {
		width: 50px;
		height: 50px;
		border: none;
		outline: none;
		border-radius: 50%;
		cursor: pointer;
	}

	.primary {
		color: var(--wx-button-primary-font-color);
		background-color: var(--wx-button-primary-color);
	}

	.primary:hover {
		color: var(--wx-button-primary-font-color);
		background-color: var(--wx-button-primary-color-hover);
	}

	.icon {
		font-size: 20px;
	}
</style>
