<script lang="ts">
	import type { Manifest } from '$lib';
	import DownloadCategory from './DownloadCategory.svelte';

	let { manifest }: { manifest: Manifest } = $props();
</script>

<DownloadCategory category={manifest.mc_java_servers} />
<DownloadCategory category={manifest.mc_java_proxies} />
