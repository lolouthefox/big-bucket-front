<script lang="ts">
	import favicon from '$lib/assets/favicon.png';
	import '$lib/assets/fonts/switzer.css';
	import '$lib/assets/fonts/clash-display.css';
	import '$lib/assets/fonts/jet-brains-mono.css';
	import '@phosphor-icons/web/fill';
	import '../global.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Big Bucket</title>
</svelte:head>

{@render children()}
