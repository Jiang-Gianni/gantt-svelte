<script>
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();

	import { locateID } from "../../config/locate";
	import { reorder } from "./actions/reorder";

	export let tasks;
	export let columns;
	export let cellHeight;
	export let scrollTop;
	export let scrollDelta;
	export let selected;

	let delta = 20;
	let touchY = null;
	let scroll = true;

	function onClick(e) {
		const id = locateID(e);
		if (!id) return;

		const action = e.target.dataset.action;
		if (action) {
			dispatch("action", { id, action });
			e.preventDefault();
		} else {
			dispatch("action", { action: "select-task", id });
		}
	}

	function onDblClick(e) {
		const id = locateID(e);
		if (id) dispatch("action", { action: "show-details", id });
	}

	function onWheel(e) {
		const step = e.deltaMode ? e.deltaY * 18 : e.deltaY;
		const top = Math.max(0, scrollTop + step);
		dispatch("action", { action: "scroll-chart", top });
	}

	function endScroll() {
		scroll = false;
	}

	function onTouchstart(e) {
		scroll = true;
		touchY = e.touches[0].clientY + scrollTop;
	}

	function onTouchmove(e) {
		if (scroll) {
			const delta = touchY - e.touches[0].clientY;
			dispatch("action", { action: "scroll-chart", top: delta });
			e.preventDefault();
			return false;
		}
	}

	function getStyle(task) {
		return `padding-left: ${(task.$level - 1) * delta}px`;
	}

	function getCellStyle(column) {
		const align = `text-align:${column.align}`;
		const width =
			column.width === "100%" ? `flex:1` : `width:${column.width}`;
		return `${width};${align}
		`;
	}

	function getIcon(task) {
		if (!task.data) return "";
		return task.open ? "icon-close" : "icon-open";
	}

	function startReorder({ id }) {
		id *= 1;
		const task = tasks.find((a) => a.id === id);
		if (!task) return;

		if (task.open) dispatch("action", { id, action: "toggle-task" });
		dispatch("action", { action: "hide-details" });
	}

	function endReorder(result) {
		let id = result.id * 1;
		const { before, after } = result;
		const target = (before || after) * 1;

		if (!target) {
			dispatch("action", { id, action: "repaint-task" });
			return;
		}

		const mode = before ? "before" : "after";
		dispatch("action", {
			id,
			action: "reorder-task",
			obj: { id, mode, target },
		});
	}

	function moveReorder({ id, top }) {
		dispatch("action", {
			action: "move-task",
			id,
			obj: { top: top + scrollDelta },
		});
	}
</script>

<svelte:window on:touchend={endScroll} />
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	style="top:{-(scrollTop - scrollDelta)}px;"
	class="table"
	use:reorder={{
		start: startReorder,
		touchStart: endScroll,
		end: endReorder,
		move: moveReorder,
	}}
	on:touchstart={onTouchstart}
	on:touchmove={onTouchmove}
	on:click={onClick}
	on:dblclick={onDblClick}
	on:wheel|passive={onWheel}
>
	{#each tasks as task (task.id)}
		<div
			class="row"
			class:selected={selected && selected.id == task.id}
			style="height:{cellHeight}px"
			data-id={task.id}
		>
			{#each columns as column}
				<div class="cell" style={getCellStyle(column)}>
					{#if column.name === "text"}
						<div class="content" style={getStyle(task)}>
							<div
								class="icon {getIcon(task)}"
								data-action="toggle-task"
							/>
							{column.template(task)}
						</div>
					{:else if column.action}
						<span class="add" data-action={column.action} />
					{:else}{column.template(task)}{/if}
				</div>
			{/each}
		</div>
	{/each}
</div>

<style>
	.table {
		position: relative;
		width: 100%;
		font: var(--wx-grid-body-font);
		color: var(--wx-grid-body-font-color);
	}

	.row {
		display: flex;
		align-items: center;
		box-sizing: border-box;
		border-bottom: var(--wx-grid-body-row-border);
	}

	:global(.wx-reorder-card).row {
		width: 100%;
		background: white;
		border-top: var(--wx-grid-body-row-border);
		opacity: 50%;
	}

	:global(.wx-reorder).row {
		opacity: 50%;
	}

	.row.selected {
		background: var(--wx-gantt-select-color);
	}

	.cell {
		box-sizing: border-box;
		flex: 0 0 auto;
		padding: 0 5px;
		overflow: hidden;
	}

	.content {
		width: 100%;
		white-space: nowrap;
		display: flex;
		justify-content: start;
		align-items: center;
	}

	.icon {
		width: 12px;
		min-width: 12px;
		height: 12px;
		margin: 0 5px;
		pointer-events: none;
	}

	.icon-close,
	.icon-open {
		cursor: pointer;
		pointer-events: auto;
	}

	.icon-close {
		background: var(--wx-close-btn-icon) center center no-repeat;
	}

	.icon-open {
		background: var(--wx-open-btn-icon) center center no-repeat;
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
</style>
