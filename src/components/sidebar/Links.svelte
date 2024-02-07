<script>
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();

	export let linksData;

	const list = [
		{ id: 0, text: "End-to-start" },
		{ id: 1, text: "Start-to-start" },
		{ id: 2, text: "End-to-end" },
		{ id: 3, text: "Start-to-end" },
	];

	function onClick(e) {
		const { action, id } = e.target.dataset;
		if (action) {
			dispatch("action", { action, id });
		}
	}

	function onSelect(e) {
		const { id } = e.target.dataset;
		const value = e.target.value * 1;
		dispatch("action", { action: "update-link", id, obj: { type: value } });
	}
</script>

{#each linksData as links}
	{#if links.data.length}
		<div class="links">
			<p class="label">{links.title}</p>
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<table class="table" on:click={onClick}>
				{#each links.data as obj}
					<tr class="row">
						<td class="cell">
							<div class="task-name">
								{obj.task.text ||
									obj.task.textRight ||
									obj.task.textLeft}
							</div>
						</td>

						<td class="cell">
							<!-- svelte-ignore a11y-no-onchange -->
							<div class="wrapper">
								<select
									class="select"
									bind:value={obj.link.type}
									data-id={obj.link.id}
									on:change={onSelect}
								>
									{#each list as item}
										<option value={item.id}
											>{item.text}</option
										>
									{/each}
								</select>
								<div class="icon-more" />
							</div>
						</td>

						<td class="cell">
							<div
								class="icon-delete"
								data-action="delete-link"
								data-id={obj.link.id}
							/>
						</td>
					</tr>
				{/each}
			</table>
		</div>
	{/if}
{/each}

<style>
	.links {
		margin-bottom: 10px;
	}

	.label {
		margin-bottom: 10px;
		font: var(--wx-label-font);
		color: var(--wx-label-font-color);
	}

	.cell {
		text-align: center;
	}

	.task-name {
		font: var(--wx-input-font);
		color: var(--wx-input-font-color);
		width: 90px;
		text-align: left;
		overflow: hidden;
		white-space: nowrap;
	}

	.wrapper {
		width: 225px;
		position: relative;
		display: flex;
	}

	.select {
		width: 100%;
		padding: var(--wx-input-padding);
		border: var(--wx-input-border);
		border-radius: var(--wx-input-border-radius);
		font: var(--wx-input-font);
		color: var(--wx-input-font-color);
		outline: none;
		appearance: none;
	}

	.select:focus {
		border: 1px solid var(--wx-input-focus-color);
	}

	.icon-more {
		position: absolute;
		top: 50%;
		right: 11px;
		width: 20px;
		height: 20px;
		transform: translateY(-50%);
		background: var(--wx-show-more-icon) center center no-repeat;
		pointer-events: none;
	}

	.icon-delete {
		width: 20px;
		height: 20px;
		margin-left: 12px;
		background: var(--wx-remove-link-icon) center center no-repeat;
		opacity: 0.2;
		cursor: pointer;
	}

	.icon-delete:hover {
		opacity: 1;
	}
</style>
