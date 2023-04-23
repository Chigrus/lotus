<script>
	export let data;

	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
</script>

<svelte:head>
	<title>Идейный друг</title>
	<meta name="description" content="Идейный друг" />
</svelte:head>



<div class="wrap">
	<div class="work">
		{data.post[0].title}
	</div>
</div>

<style>
	
</style>
