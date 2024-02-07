<script>
	import { createEventDispatcher, getContext } from "svelte";
	import { getDiffer, getAdder } from "@dhtmlx/trial-lib-gantt";

	import Button from "../../wx/Button.svelte";
	import Text from "../../wx/Text.svelte";
	import Textarea from "../../wx/Textarea.svelte";
	import Select from "../../wx/Select.svelte";
	import Slider from "../../wx/Slider.svelte";
	import DatePicker from "../../wx/Datepicker.svelte";
	import Counter from "../../wx/Counter.svelte";
	import Links from "./Links.svelte";

	export let compactMode;
	export let templates;
	export let taskTypes;
	export let task;
	export let links;
	export let tasksMap;

	const dispatch = createEventDispatcher();
	const _ = getContext("wx-i18n").__;

	let linksData = [];
	let milestone = false;

	$: milestone = task.type === "milestone";

	$: {
		const inLinks = links
			.filter(a => a.target == task.id)
			.map(link => ({ link, task: tasksMap[link.source] }));

		const outLinks = links
			.filter(a => a.source == task.id)
			.map(link => ({ link, task: tasksMap[link.target] }));

		linksData = [
			{ title: _("gantt", "Predecessors"), data: inLinks },
			{ title: _("gantt", "Successors"), data: outLinks },
		];
	}

	$: {
		task.duration = getDiffer("day")(task.end_date, task.start_date);
		dispatch("action", { action: "update-task", id: task.id, obj: task });
	}

	function deleteTask() {
		dispatch("action", { action: "delete-task", id: task.id });
		dispatch("action", { action: "hide-details" });
	}

	function hide() {
		dispatch("action", { action: "hide-details" });
	}

	function onDurationChange(e) {
		task.duration = e.detail.value * 1;
		task.end_date = getAdder("day")(task.start_date, task.duration);
	}
</script>

<div class="sidebar" class:compact={compactMode}>
	<div class="header">
		<div class="icon-close" on:click={hide} />
		<div class="buttons">
			<Button on:click={hide}>{_('gantt', 'Save')}</Button>
			<Button appearance="danger" on:click={deleteTask}>
				{_('gantt', 'Delete')}
			</Button>
		</div>
	</div>

	<div class="body">
		{#if templates.sidebarForm}
			<svelte:component
				this={templates.sidebarForm}
				bind:task
				{linksData}
				on:action />
		{:else}
			<Text
				autofocus={true}
				label={_('gantt', 'Name')}
				bind:value={task.text} />

			<Textarea label={_('gantt', 'Description')} bind:value={task.details} />

			{#if taskTypes.length > 1}
				<Select
					label={_('gantt', 'Type')}
					bind:value={task.type}
					options={taskTypes} />
			{/if}

			<DatePicker
				label={_('gantt', 'Start Date')}
				bind:value={task.start_date}
				readonly />

			{#if !milestone}
				<DatePicker
					label={_('gantt', 'End Date')}
					bind:value={task.end_date}
					readonly />
				<Counter
					label={_('gantt', 'Duration')}
					bind:value={task.duration}
					min={1}
					max={100}
					on:change={onDurationChange} />

				<Slider
					label="{_('gantt', 'Progress')}: {task.progress}%"
					bind:value={task.progress} />

			{/if}

			<Links {linksData} on:action />
		{/if}
	</div>
</div>

<style>
	.sidebar {
		flex: 0 0 400px;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		height: 100%;
		background: #fff;
		box-shadow: 0px 1px 30px rgba(0, 0, 0, 0.25);
		overflow: hidden;
	}

	.sidebar.compact {
		position: absolute;
		width: 100%;
		z-index: 5;
	}

	.header {
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 11px 20px;
		border-bottom: 1px solid var(--wx-border-color);
	}

	.body {
		flex: 1 1 auto;
		padding: 20px;
		overflow: auto;
	}

	.icon-close {
		width: 24px;
		height: 27px;
		background: var(--wx-close-sb-icon) center center no-repeat;
		cursor: pointer;
	}
</style>
