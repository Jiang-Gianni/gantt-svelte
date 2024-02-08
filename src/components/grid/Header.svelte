<script>
	import { createEventDispatcher, getContext } from "svelte";
	const dispatch = createEventDispatcher();

	export let compactMode;
	export let columns;
	export let height;

	const _ = getContext("wx-i18n").__;

	function getCellStyle(column) {
		const align = `text-align:${column.align}`;
		const width =
			column.width === "100%" ? `flex:1` : `width:${column.width}`;
		return `${width};${align}
		`;
	}

	function addTask() {
		dispatch("action", { action: "add-task", id: 0 });
	}

	function showGrid() {
		dispatch("action", { action: "toggle-grid" });
	}
</script>

<div class="table">
	<div class="row" style="height:{height}px">
		{#each columns as column}
			<div class="cell" style={getCellStyle(column)}>
				{#if column.action}
					{#if compactMode}
						<span class="mdi mdi-menu" on:click={showGrid} />
					{:else}<span class="add" on:click={addTask} />{/if}
				{:else}{_("gantt", column.label)}{/if}
			</div>
		{/each}
	</div>
</div>

<style>
	.table {
		position: relative;
		width: 100%;
		box-shadow: var(--wx-grid-header-shadow);
		background-color: #fff;
		z-index: 1;
	}

	.row {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		border-bottom: 1px solid var(--wx-border-color);
	}

	.cell {
		box-sizing: border-box;
		flex: 0 0 auto;
		padding: 0 5px;
		box-sizing: border-box;
		font: var(--wx-grid-header-font);
		text-transform: var(--wx-grid-header-text-transform);
		color: var(--wx-grid-header-font-color);
	}

	.add {
		display: inline-block;
		width: 12px;
		height: 12px;
		background: var(--wx-add-btn-icon) center center no-repeat;
		opacity: 0.54;
		cursor: pointer;
	}

	.add:hover {
		opacity: 1;
	}

	.mdi-menu {
		cursor: pointer;
		font-size: 20px;
		color: var(--wx-button-primary-color);
	}
</style>
