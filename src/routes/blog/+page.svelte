<script lang='ts'>
	export let data:{
		posts: Record<string, string>[];
	};

	let posts = data.posts;

	import Post from '../../components/Post.svelte';
</script>

<svelte:head>
	<title>Блог</title>
</svelte:head>

<div class="wrap">
	<div class="work">
		<div class="posts">
			{#each posts as post}
				<Post post={post} />
			{/each}
		</div>
	</div>
</div>

<style lang="scss">

</style>