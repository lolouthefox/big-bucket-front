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

	async function copyText(text: string) {
		try {
			await navigator.clipboard.writeText(text);
			alert('Copied to clipboard.');
		} catch (error) {
			console.error(error);
		}
	}

	// Automatically select the first option from the versions dropdown
	$effect(() => {
		let serverType = category.types[selectedServerTypeKey];
		selectedServerVersionKey = Object.keys(serverType.versions)[0];
	});
</script>

{#if category.enabled}
	<div class="category">
		<div class="header">
			<h3>{category.friendly_name}</h3>
			<SelectorCards
				bind:selection={selectedServerTypeKey}
				options={Object.fromEntries(
					Object.keys(category.types).map((key) => [key, idToDisplayName(key)])
				)}
			/>
		</div>

		{#if selectedServerTypeKey != ''}
			{@const serverType = category.types[selectedServerTypeKey]}
			<div class="server-version">
				<label for="{uid}-version-select">Choose a version:</label>
				<select id="{uid}-version-select" bind:value={selectedServerVersionKey}>
					{#each Object.keys(serverType.versions) as versionKey (versionKey)}
						<option value={versionKey}>{versionKey}</option>
					{/each}
				</select>
			</div>
			{#if selectedServerTypeKey != ''}
				{@const version = serverType.versions[selectedServerVersionKey]}
				<div class="about">
					{#if version}
						{#if version.url}
							{#each version.url as downloadUrl (downloadUrl)}
								<div class="info">
									<p>Download URL:</p>
									<pre>{downloadUrl}</pre>
									<div class="button-group">
										<button
											class="download-link"
											onclick={() => {
												copyText(downloadUrl);
											}}>Copy <i class="ph-fill ph-copy"></i></button
										>
										<a href={downloadUrl} rel="external" class="download-link"
											>Download <i class="ph-fill ph-download-simple"></i></a
										>
									</div>
								</div>
							{/each}
						{/if}

						<div class="info">
							<p>File hash (SHA-256):</p>
							<pre>{version.sha256}</pre>
							<div class="button-group">
								<button
									class="download-link"
									onclick={() => {
										copyText(version.sha256);
									}}>Copy <i class="ph-fill ph-copy"></i></button
								>
							</div>
						</div>
						{#if version.loader_version}
							<div class="info">
								<p>Loader version:</p>
								<pre>{version.loader_version}</pre>
							</div>
						{/if}
					{/if}
				</div>
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
		gap: 2rem;
		width: 100%;
	}
	.header {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	h3 {
		font-size: 1.75rem;
	}
	.server-version {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		font-weight: bold;
	}
	.about {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		padding: 1rem;
		padding-top: 2rem;
		border-top: solid 1px var(--secondary-color);
	}
	.info {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.info p {
		font-weight: bold;
	}
	.info pre {
		font-family: var(--mono-font);
		font-weight: normal;
		opacity: 0.75;
	}
	.download-link {
		background-color: var(--primary-color);
		color: var(--background-color);
		padding: 0.5rem 1rem;
		border-radius: 9rem;
		font-size: 1rem;

		font-weight: normal;
		opacity: 1;
		transition: opacity 0.25s;
		border: none;
		text-decoration: none;
		cursor: pointer;
	}
	.download-link:hover {
		opacity: 0.75;
	}
	.download-link:active {
		outline: solid 1px var(--secondary-color);
	}
	.download-link i {
		margin-left: 0.25rem;
	}
	.button-group {
		display: flex;
		gap: 0.5rem;
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
