<script>
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();

	import NewLink from "./NewLink.svelte";
	import { locate, locateID } from "@dhtmlx/trial-lib-gantt";

	export let tasks;
	export let drag = false;
	export let newLink = false;
	export let cellWidth;
	export let templates;

	let ignoreNextClick = false;

	// link creation
	let layer, start, end;
	// task moving
	let taskMove = null;

	let touched;
	let touchTimer;

	function mousedown(e) {
		const node = locate(e);
		if (!node) return;

		down(node, e.target, e);
	}

	function touchstart(e) {
		const node = locate(e);
		if (node) {
			const target = e.target;
			touchTimer = setTimeout(() => {
				touched = true;
				down(node, target, e.touches[0]);
			}, 300);
		}
	}

	function down(node, target, point) {
		const { clientX, clientY } = point;
		const id = node.dataset.id;
		const css = target.classList;

		if (css.contains("link")) {
			start = {
				id,
				start: css.contains("left"),
				x: clientX,
				y: clientY,
			};
			startDrag();
		} else {
			let mode = getMoveMode(node, point) || "move";

			taskMove = {
				id,
				mode,
				node,
				x: clientX,
				dx: 0,
				l: parseInt(node.style.left),
				w: parseInt(node.style.width),
			};
			startDrag();
		}
	}

	function getMoveMode(node, e) {
		if (getTask(node.dataset.id).type === "milestone") return "";

		const rect = node.getBoundingClientRect();
		const p = (e.clientX - rect.left) / rect.width;
		let delta = 0.2 / (rect.width > 200 ? rect.width / 200 : 1);

		if (p < delta) return "start";
		if (p > 1 - delta) return "end";
		return "";
	}

	function touchmove(e) {
		if (touched) {
			e.preventDefault();
			move(e, e.touches[0]);
		} else if (touchTimer) {
			clearTimeout(touchTimer);
			touchTimer = null;
		}
	}

	function mousemove(e) {
		move(e, e);
	}

	function move(e, point) {
		const { clientX, clientY } = point;

		if (start) {
			end = { x: clientX, y: clientY };
		} else if (taskMove && drag) {
			const { node, mode, l, w, x, id, start } = taskMove;
			const dx = (taskMove.dx = clientX - x);
			if (!start && Math.abs(dx) < 20) return;

			if (mode === "start") {
				node.style.left = `${l + dx}px`;
				node.style.width = `${w - dx}px`;
			} else if (mode === "end") {
				node.style.width = `${w + dx}px`;
			} else if (mode === "move") {
				node.style.left = `${l + dx}px`;
			}

			taskMove.start = true;
			dispatch("action", {
				action: "move-task",
				id,
				obj: {
					width: parseInt(node.style.width),
					left: parseInt(node.style.left),
				},
			});
		} else {
			const mnode = locate(e);
			if (mnode) {
				const mode = getMoveMode(mnode, point);
				mnode.style.cursor = mode ? "col-resize" : "pointer";
			}
		}
	}

	function mouseup(e) {
		up(e);
	}

	function touchend(e) {
		touched = null;
		if (touchTimer) {
			clearTimeout(touchTimer);
			touchTimer = null;
		}

		up(e.changedTouches[0]);
	}

	function up(point) {
		if (start) {
			const { clientX, clientY } = point;

			const source = start.id;
			const fromStart = start.start;
			start = end = null;

			const targetNode = document.elementFromPoint(clientX, clientY);
			const node = locate(targetNode);
			if (!node) return;

			const css = node.classList;
			const target = node.dataset.id;
			if (!target || source == target) return;

			let toStart = true;
			if (css.contains("link")) {
				if (css.contains("right")) {
					toStart = false;
				}
			} else {
				const rect = node.getBoundingClientRect();
				const x = clientX - rect.left;
				const w = rect.width;
				toStart = x < w / 2;
			}

			const type = (fromStart ? 1 : 0) + (toStart ? 0 : 2);
			if (newLink) {
				dispatch("action", {
					action: "add-link",
					obj: { source, target, type },
				});
			}
			endDrag();
		} else if (taskMove) {
			const { id, mode, dx, node, l, w, start } = taskMove;
			taskMove = null;

			if (!start) return;

			const time = Math.round(dx / cellWidth);
			// restore node position
			if (!time) {
				node.style.left = `${l}px`;
				node.style.width = `${w}px`;
			}
			dispatch("action", {
				action: "update-task-time",
				id,
				obj: { mode, time },
			});
			ignoreNextClick = true;
			endDrag();
		}
	}

	function startDrag() {
		document.body.style.userSelect = "none";
	}
	function endDrag() {
		document.body.style.userSelect = "";
	}

	function onDblClick(e) {
		const id = locateID(e.target);
		if (id) dispatch("action", { action: "show-details", id });
	}
	function onClick(e) {
		if (ignoreNextClick) {
			ignoreNextClick = false;
			return;
		}

		const id = locateID(e.target);
		if (id) dispatch("action", { action: "select-task", id });
	}
	function getTask(id) {
		return tasks.find(a => a.id == id);
	}
	function taskStyle(task) {
		return `left:${task.$x}px;top:${task.$y}px;width:${task.$w}px;height:${task.$h}px`;
	}

	function contextmenu(ev) {
		if (touched || touchTimer) {
			ev.preventDefault();
			return false;
		}
	}
</script>

<div
	class="bars"
	style="line-height: {tasks.length ? tasks[0].$h : 0}px"
	bind:this={layer}
	on:contextmenu={contextmenu}
	on:mousedown={mousedown}
	on:mouseup={mouseup}
	on:mousemove={mousemove}
	on:touchstart={touchstart}
	on:touchmove={touchmove}
	on:touchend={touchend}
	on:click={onClick}
	on:dblclick={onDblClick}
	on:dragstart={() => false}>
	{#each tasks as task (task.id)}
		<div
			class="bar {task.type || 'task'}"
			class:touch={touched && taskMove && task.id == taskMove.id}
			style={taskStyle(task)}
			data-tooltip-id={task.id}
			data-id={task.id}>
			<div class="link left" />

			{#if task.type !== 'milestone'}
				{#if task.progress}
					<div class="progress-wrapper">
						<div class="progress-percent" style="width:{task.progress}%" />
					</div>
				{/if}
				{#if task.textLeft}
					<div class="textLeft">{task.textLeft}</div>
				{/if}
				{#if task.textRight}
					<div class="textRight">{task.textRight}</div>
				{/if}
				{#if templates.taskText}
					<svelte:component this={templates.taskText} data={task} />
				{:else}
					<div class="text">{task.text}</div>
				{/if}
			{:else}
				<div class="content" />
				<div class="textRight">{task.text || task.textRight}</div>
			{/if}

			<div class="link right" />
		</div>
	{/each}

	{#if start && end && newLink}
		<NewLink {layer} {start} {end} />
	{/if}
</div>

<style>
	.bars {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.bar {
		box-sizing: border-box;
		position: absolute;
		border-radius: var(--wx-gantt-bar-border-radius);
		font: var(--wx-gantt-bar-font);
		white-space: nowrap;
		line-height: inherit;
		text-align: center;
		cursor: pointer;

		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	}

	.bar.touch {
		opacity: 0.5;
	}

	.task {
		border: 1px solid var(--wx-gantt-task-border-color);
		border-color: var(--wx-gantt-task-border-color);
		color: var(--wx-gantt-task-font-color);
		background-color: var(--wx-gantt-task-color);
	}

	.project {
		border: 1px solid var(--wx-gantt-project-border-color);
		border-color: var(--wx-gantt-project-border-color);
		color: var(--wx-gantt-project-font-color);
		background-color: var(--wx-gantt-project-color);
	}

	.content {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.text {
		position: relative;
		z-index: 2;
		display: inline;
	}

	.textRight,
	.textLeft {
		position: absolute;
		line-height: normal;
		display: block;
		left: 100%;
		color: var(--wx-font-color);
		pointer-events: none;
		padding: 0 10px;
	}
	.textLeft {
		left: auto;
		right: 100%;
	}

	.milestone .textRight {
		padding: 0;
	}

	.milestone .content {
		height: 100%;
		background-color: var(--wx-gantt-milestone-color);
		transform: rotate(45deg) scale(0.75);
	}

	.progress-wrapper {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: transparent;
		border-radius: var(--wx-gantt-bar-border-radius);
		overflow: hidden;
	}

	.progress-percent {
		height: 100%;
	}

	.task .progress-percent {
		background-color: var(--wx-gantt-task-fill-color);
	}

	.project .progress-percent {
		background-color: var(--wx-gantt-project-fill-color);
	}

	.link {
		position: absolute;
		z-index: 2;
		top: 50%;
		transform: translateY(-50%);
		width: 16px;
		height: 16px;
		border-radius: 50%;
		border: 1px solid #929292;
		background-color: #f0f0f0;
		cursor: pointer;
		opacity: 0;
	}

	.link.left {
		left: -8px;
	}

	.link.right {
		right: -8px;
	}

	.bar:hover .link,
	.link:hover {
		opacity: 1;
	}

	.milestone .link.left {
		left: -16px;
	}
	.milestone .link.right {
		right: -16px;
	}
</style>
