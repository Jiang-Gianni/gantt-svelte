<script>
	import { afterUpdate, createEventDispatcher, onMount } from "svelte";
	const dispatch = createEventDispatcher();

	import CellGrid from "./CellGrid.svelte";
	import Bars from "./Bars.svelte";
	import Links from "./Links.svelte";

	export let drag;
	export let newLink;
	export let markers;
	export let tasks;
	export let links;
	export let selected;
	export let scrollLeft;
	export let scrollTop;
	export let cellHeight;
	export let cellWidth;
	export let fullWidth;
	export let fullHeight;
	export let templates;
	export let borders;

	let chart = {};
	let extraRows = 0;
	let markersHeight = 0;
	let selectStyle = "";

	$: if (selected && cellHeight) {
		selectStyle = `height: ${cellHeight - 1}px;top: ${selected.$y - 3}px`;
		scrollToTask(selected);
		onScroll();
	}

	$: markersHeight =
		fullHeight > chart.clientHeight ? chart.clientHeight : fullHeight;

	onMount(() => {
		dataRequest();
	});

	afterUpdate(() => {
		chart.scrollTop = scrollTop;
		chart.scrollLeft = scrollLeft;
		if (scrollTop != chart.scrollTop)
			dispatch("action", {
				action: "scroll-chart",
				top: chart.scrollTop,
			});
	});

	function onScroll() {
		dispatch("action", {
			action: "scroll-chart",
			top: chart.scrollTop,
			left: chart.scrollLeft,
		});
		dataRequest();
	}

	function dataRequest() {
		const clientHeight = chart.clientHeight || 0;
		const num = Math.ceil(clientHeight / cellHeight) + 1;
		const pos = Math.floor(chart.scrollTop / cellHeight);
		const start = Math.max(0, pos - extraRows);
		const end = pos + num + extraRows;

		const from = start * cellHeight;
		dispatch("action", { action: "data-request", start, end, from });
	}

	function scrollToTask(task) {
		const { clientWidth, clientHeight } = chart;

		if (task.$x <= scrollLeft) {
			scrollLeft = task.$x - cellWidth;
		} else if (
			task.$x + task.$w >= clientWidth + scrollLeft &&
			task.$w < clientWidth
		) {
			scrollLeft = task.$x + task.$w - clientWidth + cellWidth;
		} else if (task.$w > clientWidth) {
			scrollLeft = task.$x - cellWidth;
		}

		if (task.$y < scrollTop) {
			scrollTop = task.$y - cellHeight;
		} else if (task.$y + task.$h >= clientHeight + scrollTop) {
			scrollTop = task.$y - clientHeight + cellHeight;
		}
	}
</script>

<svelte:window on:resize={dataRequest} />

<div class="chart" bind:this={chart} on:scroll={onScroll}>
	{#if markers.length}
		<div
			class="markers"
			style="height:{markersHeight}px;left:{-scrollLeft}px"
		>
			{#each markers as marker}
				<div
					class="marker {marker.css || 'default'}"
					style="left:{marker.left}px"
				>
					<div class="content">{marker.text}</div>
				</div>
			{/each}
		</div>
	{/if}

	<div class="area" style="width:{fullWidth}px;height:{fullHeight}px">
		<CellGrid width={cellWidth} height={cellHeight} {borders} />

		{#if selected}
			<div class="selection" style={selectStyle} />
		{/if}

		<Links {links} width={fullWidth} height={fullHeight} />
		<Bars {cellWidth} {tasks} {drag} {newLink} {templates} on:action />
	</div>
</div>

<style>
	.chart {
		flex: 1 1 auto;
		overflow: auto;
	}

	.markers {
		position: absolute;
	}

	.marker {
		position: absolute;
		z-index: 5;
		width: 2px;
		height: 100%;
		text-align: center;
		user-select: none;
		transform: scaleX(-1);
	}
	.default {
		background: var(--wx-gantt-marker-color);
	}

	.content {
		position: absolute;
		min-width: 80px;
		padding: 4px 8px;
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
		font: var(--wx-gantt-marker-font);
		color: var(--wx-gantt-marker-font-color);
		background-color: inherit;
		white-space: nowrap;
		transform: scaleX(-1);
	}

	.area {
		position: relative;
	}

	.selection {
		position: absolute;
		box-sizing: border-box;
		left: 0;
		width: 100%;
		background: var(--wx-gantt-select-color);
	}
</style>
