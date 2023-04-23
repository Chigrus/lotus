<script lang='ts'>
	type Article = {
		id: number;
		type: string;
		content: string;
	}
	type User = {
		isAdmin: boolean;
		isEditor: boolean;
	}
	type OG = {
		title: string;
		description: string;
		og_type: string;
		og_title: string;
		og_description: string;
		og_url: string;
		og_image: string;
		og_image_type: string;
		og_image_width: string;
		og_image_height: string;
		og_article: Object;
		og_profile: Object;
		og_video: Object;
	}
	type InfoEditBlock = {
		field: string;
		type: string;
		title: string;
	}

	export let data:{
		post: {
			[key: string]: any;
			title: string;
			text: string;
			post: Article[];
		}[];
		og_data: OG[];
		user: User;
	};

	let post = data.post[0];
	let og_data = data.og_data[0];
	let user = data.user;

	let edit_field:{popup: boolean; info: InfoEditBlock} = {
		popup: false,
		info: {
			field: '',
			type: '',
			title: '',
		},
	};

	import PostTag from '../../../components/PostTag.svelte';
	import Popup from '../../../components/Popup.svelte';
	import TagsInsert from '../../../components/TagsInsert.svelte';
	import AdminButtons from '../../../components/AdminButtons.svelte';
	import BtnAdminEdit from '../../../components/BtnAdminEdit.svelte';
	import OpenGraphEditor from '../../../components/OpenGraphEditor.svelte';
	import BtnEditBlock from '../../../components/BtnEditBlock.svelte';

	let isEdited = false;
	let isAddNode = false;
	let idAddNode:number;

	let isOpenGraphEdit = false;

	$: textPost = post.post.sort((a, b) => a.id - b.id);

	function editPost(){
		isEdited = true;
	}

	function previewPost(){
		isEdited = false;
	}

	function delPost(id:number){
		textPost = textPost.filter((item) => item.id !== id);
		for (let i = id-1; i < textPost.length; i++) {
			textPost[i].id = textPost[i].id - 1;
		}
	}

	function upPost(id:number){
		if(id != 1){
			textPost[id-1].id = id-1;
			textPost[id-2].id = id;
			textPost.sort((a, b) => a.id - b.id);
		};
	}

	function downPost(id:number){
		if(id != textPost.length){
			textPost[id-1].id = id+1;
			textPost[id].id = id;
			textPost.sort((a, b) => a.id - b.id);
		};
	}

	function addPost(id:number){
		isAddNode = true;
		idAddNode = id;
	}

	function addNode(typeNode:string, contentInner:string){
		if(idAddNode === textPost.length){
			textPost = [...textPost, {id: idAddNode+1, type: typeNode, content: contentInner}];
		}else{
			for (let i = idAddNode-1; i < textPost.length; i++) {
				textPost[i].id = textPost[i].id + 1;
			}
			textPost = [...textPost, {id: idAddNode+1, type: typeNode, content: contentInner}];
			textPost.sort((a, b) => a.id - b.id);
		}
		isAddNode = false;
	}

	async function savePostFn(){

		const response = await fetch('/api/add', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({ textPost }),
		});

		let total = await response.json();

		console.log(total);

	}

	function openGraphEdit(){
		isOpenGraphEdit = true;
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

<Popup bind:isOpen={isAddNode}>
	<slot slot="title">
		Добавить новый блок1
	</slot>
	<slot slot="content">
		<TagsInsert on:onSelectNode={(event) => addNode(event.detail.typeNode, event.detail.contentInner)} />
	</slot>
</Popup>

<Popup isOpen={edit_field.popup}>
	<slot slot="title">
		{edit_field.info.title}
	</slot>
	<slot slot="content">
		{post[edit_field.info.field]} 
	</slot>
</Popup>

{#if isOpenGraphEdit}
	<OpenGraphEditor bind:dataOpenGraph={og_data}  bind:isOpenGraphEdit={isOpenGraphEdit} />
{/if}

{#if user.isAdmin}
<AdminButtons>
	<BtnAdminEdit title="" bg="opengraph" on:click="{openGraphEdit}" />
</AdminButtons>
{/if}

<div class="wrap">
	<div class="work">
		{#if user.isAdmin}
		<div class="btns">
			<button class="btn edit" on:click={editPost}>Редактор</button>
			<button class="btn preview" on:click={previewPost}>Просмотр</button>
			<button class="btn save" on:click={savePostFn}>Сохранить</button>
		</div>
		{/if}
		<article class="post">
			<div class="data">Апрель 07, 2023</div>
			<div class="title">
				{post.title}
				<BtnEditBlock 
					on:getData={(event) => { edit_field = event.detail; }}
					info={{field: 'title', type: 'input', title: 'Редактирования названия поста:'}}
				/>
			</div>
			<div class="text">
				{post.text}
				<BtnEditBlock 
					on:getData={(event) => { edit_field = event.detail; }}
					info={{field: 'text', type: 'input', title: 'Редактирования краткой записи:'}}
				/>
			</div>
			{#each post.post as single_post}
			<PostTag 
				post={single_post} 
				isEdited={isEdited}
				on:addPostNode={(event) => addPost(event.detail.idPost)}
				on:upPostNode={(event) => upPost(event.detail.idPost)}
				on:downPostNode={(event) => downPost(event.detail.idPost)}
				on:delPostNode={(event) => delPost(event.detail.idPost)}
			/>
			{/each}
		</article>
	</div>
</div>

<style lang="scss">
.post{
	position: relative;
	width: 100%;
	padding: 50px 0;
}

.data{
    width: 100%;
    text-align: center;
    color: var(--text-third);
    text-transform: uppercase;
    letter-spacing: 2px;
}

.title{
	position: relative;
    width: 100%;
    color: var(--text-primary);
    text-align: center;
    font-size: 28px;
    margin-top: 20px;
}

.text{
	position: relative;
    width: 100%;
    color: var(--text-primary);
    text-align: left;
    font-size: 16px;
    line-height: 1.8em;
    margin-top: 30px;
}

:global(p) {
  font-size: 16px;
  line-height: 1.7em;
}

:global(h3) {
  font-size: 24px;
}
</style>