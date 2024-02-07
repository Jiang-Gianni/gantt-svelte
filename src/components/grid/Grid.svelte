<script>
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();

	import Header from "./Header.svelte";
	import Body from "./Body.svelte";

	export let compactMode;
	export let width;
	export let tasks;
	export let columns;
	export let scales;
	export let scrollTop;
	export let scrollDelta;
	export let selected;
	export let cellHeight;

	let cols;
	let basis;
	let showFull = false;

	function action(e) {
		const { action } = e.detail;

		switch (action) {
			case "toggle-grid":
				showFull = !showFull;
				break;

			default:
				dispatch("action", e.detail);
				break;
		}
	}

	$: {
		cols = compactMode
			? [columns[columns.length - 1], ...columns.slice(0, columns.length - 1)]
			: columns;

		if (!compactMode) showFull = false;

		basis = showFull ? "100%" : `${width}px`;
	}
</script>

<div class="grid" style="flex: 0 0 {basis}">
	<Header
		{compactMode}
		columns={cols}
		height={scales.height}
		on:action={action} />
	<Body
		{tasks}
		columns={cols}
		{cellHeight}
		{scrollTop}
		{scrollDelta}
		{selected}
		on:action={action} />
</div>

<style>
	.grid {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		border-right: 1px solid var(--wx-border-color);
		overflow: hidden;
	}
</style>
