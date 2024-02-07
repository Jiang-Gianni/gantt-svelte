<script>
	import { placeLink } from "@dhtmlx/trial-lib-gantt";

	export let layer;
	export let start;
	export let end;

	let box, link;

	$: {
		box = layer.getBoundingClientRect();
		link = placeLink(box, start, end);
	}
</script>

{#if link}
	<svg
		class="new"
		width={link.width}
		height={link.height}
		style="left:{link.left}px;top:{link.top}px;">
		<polyline class="line" points={link.p} />
	</svg>
{/if}

<style>
	.new {
		position: absolute;
		pointer-events: none;
	}
	.new polyline {
		stroke: var(--wx-gantt-link-color);
		stroke-width: 2;
		fill: none;
	}
</style>
