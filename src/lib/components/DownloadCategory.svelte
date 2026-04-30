<script lang="ts">
	import type { ServerCategory } from '$lib';
	import SelectorCards from './SelectorCards.svelte';

	let { category }: { category: ServerCategory } = $props();

	let selectedServerTypeKey = $state('');
	let selectedServerVersionKey = $state('');
	const uid = $props.id();

	function idToDisplayName(id: string): string {
		const text = id.replaceAll('-', ' ');
		return text.charAt(0).toLocaleUpperCase() + text.slice(1);
	}

	$effect(() => {
		let serverType = category.types[selectedServerTypeKey];
		if (!serverType.versions[0]) selectedServerVersionKey = serverType.versions[0];
	});
</script>

{#if category.enabled}
	<div class="category">
		<h3>{category.friendly_name}</h3>
		<SelectorCards
			bind:selection={selectedServerTypeKey}
			options={Object.fromEntries(
				Object.keys(category.types).map((key) => [key, idToDisplayName(key)])
			)}
		/>

		{#if selectedServerTypeKey != ''}
			{@const serverType = category.types[selectedServerTypeKey]}
			<label for="{uid}-version-select">Choose a version:</label>
			<select id="{uid}-version-select" bind:value={selectedServerVersionKey}>
				{#each Object.keys(serverType.versions) as versionKey (versionKey)}
					<option value={versionKey}>{versionKey}</option>
				{/each}
			</select>
			{#if selectedServerTypeKey != ''}
				{@const version = serverType.versions[selectedServerVersionKey]}
				{#if version}
					{#if version.url}
						{#each version.url as downloadUrl (downloadUrl)}
							<span>
								Download URL: <a href={downloadUrl} rel="external"
									>{downloadUrl}<i class="ph-fill ph-download-simple"></i></a
								>
							</span>
						{/each}
					{/if}

					<span>
						File hash (SHA-256): <pre>{version.sha256}</pre>
					</span>
					{#if version.loader_version}
						<span>
							Loader version: <pre>{version.loader_version}</pre>
						</span>
					{/if}
				{/if}
			{/if}
		{/if}
	</div>
{/if}

<style>
	.category {
		padding: 1.5rem;
		border-radius: 1.5rem;
		border: solid 1px var(--secondary-color);

		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
	}
	h3 {
		font-size: 1.5rem;
	}
	span pre {
		font-family: var(--mono-font);
		font-weight: normal;
		opacity: 0.75;
	}
	span {
		font-weight: bold;
	}
	span a {
		color: var(--primary-color);
		font-weight: normal;
		font-family: var(--mono-font);
		opacity: 0.75;
		transition: opacity 0.25s;
	}
	span a:hover {
		opacity: 1;
	}
	span a:active {
		color: var(--secondary-color);
	}
	span a i {
		margin-left: 0.25rem;
	}
	select {
		padding: 1rem 1.5rem;
		border-radius: 90px;
		border: none;
		background-color: rgb(from var(--secondary-color) r g b / 0.25);
		box-shadow: inset 0 0 0 1px rgb(from var(--secondary-color) r g b / 0.5);
		transition-duration: 0.25s;

		width: fit-content;
		min-width: 200px;
	}
	select:hover {
		background-color: rgb(from var(--secondary-color) r g b / 0.5);
		box-shadow: inset 0 0 0 4px rgb(from var(--secondary-color) r g b / 0.5);
	}
</style>
