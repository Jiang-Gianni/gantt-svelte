<script>
	import { grid } from "@dhtmlx/trial-lib-gantt";
	export let width;
	export let height;
	export let borders = "";

	let color = "#ebebeb";
</script>

<div
	style="width:100%; height:100%; background:url({grid(
		width,
		height,
		color,
		borders,
	)})"
/>
