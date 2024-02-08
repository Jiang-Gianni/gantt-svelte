<script>
	import {
		createEventDispatcher,
		onDestroy,
		getContext,
		setContext,
	} from "svelte";
	const dispatch = createEventDispatcher();

	import TimeScales from "./TimeScale.svelte";
	import Grid from "./grid/Grid.svelte";
	import Chart from "./chart/Chart.svelte";
	import Sidebar from "./sidebar/SideBar.svelte";
	import Tooltip from "../wx/Tooltip.svelte";
	import IconButton from "../wx/IconButton.svelte";
	import enLocale from "../wx/locales/en.js";

	import { SvelteLocalData, SvelteLocalState } from "../state/local";

	export let templates = {};
	export let markers = [];
	export let taskTypes = ["task", "project", "milestone"];
	export let tasks = [];
	export let links = [];
	export let scales = [
		{ unit: "month", step: 1, format: "MMMM yyy" },
		{ unit: "day", step: 1, format: "d" },
	];
	export let start = null;
	export let end = null;
	export let cellWidth = 100;
	export let cellHeight = 38;
	export let scaleHeight = 30;
	export let readonly = false;
	export let grid = true;

	if (!getContext("wx-i18n")) setContext("wx-i18n", enLocale());

	let tasksData, linksData, scalesData, renderTasks, markersData;
	let noDrag, noEdit, noNewLink;

	let fullWidth, fullHeight;

	// resize

	let compactWith = 650;
	let compactMode = false;

	const ro = new ResizeObserver(resize);

	ro.observe(document.body);

	function resize(data) {
		for (let obj of data) {
			if (obj.target === document.body) {
				compactMode = obj.contentRect.width <= compactWith;
			}
		}
	}

	onDestroy(() => {
		ro.disconnect();
	});

	// local data
	export const store = new SvelteLocalData(dispatch);
	$: {
		store.init({
			tasks,
			links,
			start,
			end,
			cellWidth,
			cellHeight,
			scaleHeight,
			scales,
		});
		const state = store.state;

		tasksData = state.tasks;
		linksData = state.links;
		scalesData = state.scales;
	}

	// local state
	export const state = new SvelteLocalState();
	const {
		details,
		selected,
		scrollTop,
		scrollLeft,
		dataStart,
		dataEnd,
		from,
	} = state.getState();
	const stateActions = state.actions(store, dispatch);
	const actions = (ev) => stateActions(ev.detail);

	$: {
		const { start, diff } = $scalesData;
		markersData = markers.map((marker) => {
			marker.left = diff(marker.start, start) * cellWidth;
			return marker;
		});
	}

	$: {
		fullWidth = $scalesData.width;
		fullHeight = $tasksData.length * cellHeight;
	}

	$: {
		noDrag = readonly.noDrag || readonly;
		noEdit = readonly.noEdit || readonly;
		noNewLink = readonly.noNewLink || readonly;
	}

	$: gridWidth = compactMode ? 50 : grid.width || 400;

	$: renderTasks = $tasksData.slice($dataStart, $dataEnd);

	function getTooltipData(id) {
		return store.getTask(id);
	}
</script>

<div class="layout">
	{#if grid}
		<Grid
			{compactMode}
			width={gridWidth}
			tasks={renderTasks}
			scales={$scalesData}
			scrollTop={$scrollTop}
			scrollDelta={$from}
			{cellHeight}
			selected={$selected}
			on:action={actions}
		/>
	{/if}

	<div class="content">
		<TimeScales scales={$scalesData} scrollLeft={$scrollLeft} />

		<Chart
			drag={!noDrag}
			newLink={!noNewLink}
			markers={markersData}
			tasks={renderTasks}
			links={$linksData}
			scrollTop={$scrollTop}
			scrollLeft={$scrollLeft}
			selected={$selected}
			{cellWidth}
			{cellHeight}
			{fullWidth}
			{fullHeight}
			{templates}
			on:action={actions}
		/>
	</div>

	{#if $details && !noEdit}
		<Sidebar
			{compactMode}
			{taskTypes}
			{templates}
			task={$details}
			links={$linksData}
			tasksMap={store.state.tasksMap}
			on:action={actions}
		/>
	{/if}

	{#if compactMode && !$details}
		<div class="icon">
			<IconButton
				icon="mdi mdi-plus"
				on:click={() => stateActions({ action: "add-task", id: 0 })}
			/>
		</div>
	{/if}
</div>

<style>
	.layout {
		position: absolute;
		display: flex;
		height: 100%;
		width: 100%;
		background-color: #fff;
	}

	.content {
		position: relative;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.icon {
		position: absolute;
		right: 25px;
		bottom: 35px;
		z-index: 4;
	}
</style>
