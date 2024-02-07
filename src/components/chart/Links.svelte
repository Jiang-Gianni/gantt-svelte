<script>
	export let links;
	export let width;
	export let height;
</script>

<svg class="links" width="{width}px" height="{height}px">
	{#each links as link (link.id)}
		<polyline class="line" points={link.$p} />
	{/each}
</svg>

<style>
	.links {
		position: absolute;
		top: 0;
		left: 0;
	}

	.line {
		user-select: auto;
		pointer-events: stroke;
		position: relative;
		cursor: pointer;
		stroke: var(--wx-gantt-link-color);
		stroke-width: 2;
		z-index: 0;
		fill: transparent;
	}
</style>
