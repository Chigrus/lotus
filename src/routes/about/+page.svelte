<script lang='ts'>

	import type {OG, User, Post} from '../types';

	import PostNodesEditor from '../../components/PostNodesEditor.svelte';
	import PostNodesShow from '../../components/PostNodesShow.svelte';
	import AdminButtons from '../../components/AdminButtons.svelte';
	import BtnAdminEdit from '../../components/BtnAdminEdit.svelte';
	import OpenGraphEditor from '../../components/OpenGraphEditor.svelte';

	export let data:{
		og_data: OG[];
		post: string;
		user: User;
	};

	let og_data = data.og_data[0];
	let post:Post = JSON.parse(new TextDecoder().decode(Uint8Array.from(data.post.match(/.{2}/g)!, b => parseInt(b, 16))));
	let user = data.user;

	let isOpenGraphEdit = false;

	async function savePostFn(){

		for (let node of post.post){
            delete node.isEdit;
        }

		const response = await fetch('api/updatepost', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({ post: post.post, id: post.id }),
		});

	}

	function openGraphEdit(){
		isOpenGraphEdit = true;
	}

	function editNode(id:number){
		console.log(id);
	}

</script>

<svelte:head>
	<title>{og_data.title}</title>
	<meta name="description" content="{og_data.description}" />
	<meta property="og:type" content="{og_data.og_type}" />
	<meta property="og:title" content="{og_data.og_title}" />
	<meta property="og:description" content="{og_data.og_description}" />
	<meta property="og:url" content="{og_data.og_url}">
	<meta property="og:image" content="{og_data.og_image}">
	<meta property="og:image:type" content="{og_data.og_image_type}" />
	<meta property="og:image:width" content="{og_data.og_image_width}">
	<meta property="og:image:height" content="{og_data.og_image_height}">
	<meta name="twitter:title" content="{og_data.title}">
	<meta name="twitter:description" content="{og_data.description}">
</svelte:head>

{#if isOpenGraphEdit}
	<OpenGraphEditor bind:dataOpenGraph={og_data}  bind:isOpenGraphEdit={isOpenGraphEdit} />
{/if}

{#if user.isAdmin}
<AdminButtons>
	<BtnAdminEdit title="OpenGraph" bg="opengraph" on:click="{openGraphEdit}" />
	<BtnAdminEdit title="Сохранить" bg="save" on:click={savePostFn} />
</AdminButtons>
{/if}

<div class="wrap wrap_about">
	<div class="work">

		{#if user.isAdmin}
			<div class="btns">
				<button class="btn save" on:click={savePostFn}>Сохранить</button>
			</div>
		{/if}

		<article class="post">
			{#if user.isAdmin}
				<PostNodesEditor bind:nodes={post.post} />
			{:else}
				<PostNodesShow bind:nodes={post.post} />
			{/if}
		</article>

	</div>
</div>

<style lang="scss">

.wrap_about{
	border-top-width: 2px;
	border-top-style: solid;
	border-color: var(--outline-primary);
	padding: 40px 0;	
}

.btns{
	width: 100%;
	margin-bottom: 20px;
	display: flex;
	justify-content: flex-end;
}

.btn{
	padding: 7px 14px;
	background-color: #000;
	border: none;
	outline: none;
	color: #fff;
	margin-left: 10px;
	cursor: pointer;
	font-size: 12px;
	&:hover{
		background-color: rgba(0,0,0,0.75);
	}
}

.btn:first-child{
	margin-left: 0;
}

.post{
	width: 100%;
}

:global(h1, h2, h3, h4) {
  text-align: center;
  font-family: var(--font-h1);
  font-weight: 700;
  margin-top: 25px;
}

:global(p, ul li, ol li) {
  font-family: var(--font-text);
}

</style>