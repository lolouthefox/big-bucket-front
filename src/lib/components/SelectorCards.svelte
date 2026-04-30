<script lang="ts">
	let {
		options,
		selection = $bindable(null)
	}: { options: Record<string, string>; selection: string | null } = $props();

	$effect(() => {
		selection = Object.keys(options)[0];
	});
</script>

<div class="cards">
	{#each Object.keys(options) as key (key)}
		{@const displayName = options[key]}
		<button
			class="card"
			onclick={() => {
				selection = key;
			}}
			disabled={selection == key}
		>
			{displayName}
		</button>
	{/each}
</div>

<style>
	.cards {
		display: flex;
		gap: 0.5rem;
	}
	.card {
		padding: 0.5rem 1rem;
		border-radius: 90px;
		border: none;
		background-color: rgb(from var(--secondary-color) r g b / 0.25);
		box-shadow: inset 0 0 0 1px rgb(from var(--secondary-color) r g b / 0.5);
		transition-duration: 0.25s;
	}
	.card:hover {
		background-color: rgb(from var(--secondary-color) r g b / 0.5);
		box-shadow: inset 0 0 0 4px rgb(from var(--secondary-color) r g b / 0.5);
	}
	.card:disabled {
		background-color: var(--secondary-color);
		color: var(--text-color);
	}
</style>
