<script lang="ts">
	import { getManifest } from '$lib';
	import Download from '$lib/components/Download.svelte';
	import logo from '$lib/assets/logo.png';
	import Spinner from '$lib/components/Spinner.svelte';
	import { page } from '$app/state';
	const params = new URL(page.url).searchParams;
	const manifest = params.get('manifest');
</script>

<main>
	<div class="brand">
		<img class="logo" src={logo} alt="Big Bucket" />
		<h1>Big Bucket</h1>
	</div>
	<div class="content">
		{#await getManifest(manifest)}
			<Spinner />
		{:then data}
			<Download manifest={data} />
		{:catch error}
			<pre>{error}</pre>
		{/await}
	</div>
</main>

<style>
	main {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
	}
	.brand {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.brand h1 {
		margin-top: -1.25rem;
	}
	.logo {
		width: 10rem;
	}
	.content {
		width: 100%;
		max-width: 50rem;

		display: flex;
		flex-direction: column;
		gap: 1rem;
		flex: 1 0 0;
	}
</style>
