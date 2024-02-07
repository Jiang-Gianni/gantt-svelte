<script lang="ts">
	import { afterUpdate } from "svelte";

	export let content = null;
	export let data: Function = () => {};

	let tooltip, id, tooltipData, tooltipNode, tooltipCoords;
	let target, targetCoords;
	let area, areaCoords;
	let pos;

	function findAttrubute(node) {
		while (node) {
			if (node.getAttribute) {
				const id = node.getAttribute("data-tooltip-id");
				const tooltip = node.getAttribute("data-tooltip");
				if (id || tooltip) return { id, tooltip, target: node };
			}
			node = node.parentNode;
		}

		return { id: null, tooltip: null, target: null };
	}

	afterUpdate(() => {
		if (tooltipNode) {
			tooltipCoords = tooltipNode.getBoundingClientRect();
			if (tooltipCoords.right >= areaCoords.right) {
				pos.left = areaCoords.width - tooltipCoords.width - 5;
			}
			if (tooltipCoords.bottom >= areaCoords.bottom) {
				pos.top = targetCoords.top - tooltipCoords.height - 5;
			}
		}
	});

	function move(e) {
		({ id, tooltip, target } = findAttrubute(e.target));

		if (!id && !tooltip) return;

		if (id && data) {
			tooltipData = data(id);
		}

		targetCoords = target.getBoundingClientRect();
		areaCoords = area.getBoundingClientRect();

		const top = targetCoords.top + targetCoords.height - areaCoords.top;
		const left = targetCoords.left - areaCoords.left;

		pos = { top, left };
	}
</script>

<div class="area" bind:this={area} on:mousemove={move}>
	{#if (id && content) || tooltip}
		<div
			class="tooltip"
			bind:this={tooltipNode}
			style="top:{pos.top}px;left:{pos.left}px"
		>
			{#if id}
				<svelte:component this={content} data={tooltipData} />
			{:else}{tooltip}{/if}
		</div>
	{/if}

	<slot />
</div>

<style>
	.area {
		position: relative;
		height: 100%;
		width: 100%;
	}

	:global(.tooltip) {
		position: absolute;
		z-index: 10;
		font: var(--wx-small-font);
		color: var(--wx-font-color);
		background-color: #fff;
	}
</style>
