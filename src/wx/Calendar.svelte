<script>
	import { createEventDispatcher, getContext } from "svelte";

	export let startOnMonday = false;
	export let value = null;
	export let date = new Date();
	export let dayCss = () => {};

	export let showPrev = true;
	export let showNext = true;

	// locale
	const locale = getContext("wx-i18n")._("__dates");

	const shiftDays = startOnMonday ? 1 : 0;
	const dispatch = createEventDispatcher();

	// rearrange week day labels
	let dayNames = locale.days;
	if (shiftDays) dayNames = dayNames.slice(1).concat(dayNames[6]);

	let start, year, month;
	let dates = [];

	$: {
		year = date.getFullYear();
		month = date.getMonth();

		start = new Date(date);
		start.setDate(1);
		const sDay = -start.getDay() - shiftDays + 2;
		start.setDate(sDay);

		const valueHash = hashDate(value);
		const now = new Date(start);

		dates = [];
		for (let i = 0; i < 6 * 7; i++) {
			const nowDay = now.getDay();
			const nowMonth = now.getMonth();

			const weekDay = nowDay == 0 || nowDay == 6;
			const currentMonth = nowMonth === month;
			const selected = valueHash === hashDate(now);

			dates.push({
				v: now.getDate(),
				c:
					"date " +
					(selected ? "selected " : "") +
					(weekDay ? "weekend " : "") +
					(!currentMonth ? "outside " : "") +
					(dayCss(now) || ""),
			});

			now.setDate(now.getDate() + 1);
		}
	}

	function hashDate(d) {
		if (!d) return 0;
		return d.getFullYear() * 12 * 40 + d.getMonth() * 40 + d.getDate();
	}

	function changeMonth(dir) {
		const temp = new Date(date);
		temp.setMonth(temp.getMonth() + dir);
		date = temp;

		dispatch("changeMonth", { date, dir });
	}

	function selectDate(e) {
		let ind = e.target.getAttribute("data-index");
		if (!ind) ind = e.target.parentNode.getAttribute("data-index");
		if (!ind) return;

		const temp = new Date(start);
		temp.setDate(temp.getDate() + ind * 1);
		value = temp;

		dispatch("selectDate", { date: temp });
	}
</script>

<div class="calendar">
	<div class="control">
		{#if showPrev}
			<div class="icon mdi mdi-chevron-left" on:click={() => changeMonth(-1)} />
		{/if}
		<div class="month">{locale.months[month]} {year}</div>
		{#if showNext}
			<div class="icon mdi mdi-chevron-right" on:click={() => changeMonth(1)} />
		{/if}
	</div>

	<div class="days">
		{#each dayNames as day}
			<div class="day">{day}</div>
		{/each}
	</div>

	<div class="dates" on:click={e => selectDate(e)}>
		{#each dates as date, index}
			<div class={date.c} data-index={index}><span>{date.v}</span></div>
		{/each}
	</div>
</div>

<style>
	.calendar {
		box-sizing: border-box;
		width: 183px;
		padding: 7px;
		border: var(--wx-calendar-border);
	}

	.control {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.icon {
		font-size: 20px;
		color: rgba(0, 0, 0, 0.5);
		cursor: pointer;
		user-select: none;
		transition: color 0.15s ease-in;
	}

	.month {
		font: var(--wx-calendar-month-font);
		color: var(--wx-calendar-month-font-color);
	}

	.days {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		grid-template-rows: 28px;
	}

	.day {
		font: var(--wx-calendar-days-font);
		color: var(--wx-calendar-days-font-color);
		align-self: center;
		text-align: center;
	}

	.dates {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		grid-template-rows: repeat(6, 24px);
		font: var(--wx-calendar-dates-font);
		color: var(--wx-calendar-dates-font-color);
	}

	.date {
		cursor: pointer;
		align-self: center;
		text-align: center;
	}

	.weekend {
		color: var(--wx-input-focus-color);
	}

	.outside {
		color: rgba(0, 0, 0, 0.3);
	}

	.selected span {
		display: inline-block;
		color: #fff;
		background-color: var(--wx-input-focus-color);
		width: 20px;
		height: 20px;
		line-height: 20px;
		border-radius: 50%;
	}
</style>
