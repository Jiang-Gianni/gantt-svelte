<script>
	export let scales;
	export let scrollLeft;
</script>

<div class="scale" style="width:{scales.width}px;left:{-scrollLeft}px">
	{#each scales.rows as row}
		<div class="row" style="height:{row.height}px">
			{#each row.cells as cell}
				<div class="cell {cell.css}" style="width:{cell.width}px">
					{cell.value}
				</div>
			{/each}
		</div>
	{/each}
</div>

<style>
	.scale {
		position: relative;
		box-shadow: var(--wx-top-shadow);
	}

	.row {
		box-sizing: border-box;
		display: flex;
		border-bottom: 1px solid var(--wx-border-color);
	}

	.cell {
		display: flex;
		justify-content: center;
		align-items: center;
		border-right: var(--wx-timescale-border);
		font: var(--wx-timescale-font);
		text-transform: var(--wx-timescale-text-transform);
		color: var(--wx-timescale-font-color);
	}
</style>
