<script lang='ts'>
	import type {Post, EditField, OG, User, EditUrl} from './types'
	import { goto } from '$app/navigation';

	export let data:{
		post: Post[];
		og_data: OG[];
		user: User;
	};

	let post = data.post[0];
	let og_data = data.og_data[0];
	let user = data.user;

	let actions = ['b', 'i', 'u', 'strike', 'undo', 'redo', 'viewHtml', ];

	let edit_field:EditField = {
		popup: false,
		info: {
			id: 0,
			field: '',
			type: '',
			title: '',
		},
	};

	let edit_url:EditUrl = {
		popup: false,
		url: '',
	};

	import PostTag from '../../../components/PostTag.svelte';
	import Popup from '../../../components/Popup.svelte';
	import TagsInsert from '../../../components/TagsInsert.svelte';
	import AdminButtons from '../../../components/AdminButtons.svelte';
	import BtnAdminEdit from '../../../components/BtnAdminEdit.svelte';
	import OpenGraphEditor from '../../../components/OpenGraphEditor.svelte';
	import BtnEditBlock from '../../../components/BtnEditBlock.svelte';
	import Button from '../../../components/Button.svelte';
	import Switch from '../../../components/Switch.svelte';

	import Editor from 'cl-editor';

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

		const response = await fetch('/api/updatepost', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({ post: textPost, id: post.id }),
		});

		let total = await response.json();

		console.log(total);

	}

	function openGraphEdit(){
		isOpenGraphEdit = true;
	}

	function editHtml(e:CustomEvent){
		//console.log(e.detail);
		post[edit_field.info.field] = e.detail;
	}

	async function saveBlock(dataField:EditField){
		//console.log(dataField);
		//console.log(post[dataField.info.field]);
		const response = await fetch('/api/update', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({ id: dataField.info.id, field: dataField.info.field, value: post[dataField.info.field]  }),
		});

		let total = await response.json();

		console.log(total);
	}

	function urlEdit(url:string){
		edit_url.popup = true;
		edit_url.url = url;
	}

	async function saveUrl(url:string){
		const response = await fetch('/api/getcount', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({ slug: url }),
		});

		let count:number = await response.json();

		if(count > 0){
			console.log('Запись с таким url: '+url+' уже существует!');
		}else{
			const response = await fetch('/api/updateslug', {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify({ slug: url, id: post.id }),
			});
			//let total = await response.json();
			goto('/blog/'+url);
			edit_url.popup = false;
			post.slug = url;
		}
	}

	async function changeStatus(){

		post.publication = !post.publication;

		const response = await fetch('/api/update', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({ id: post.id, field: 'publication', value: post.publication  }),
		});

		let res = await response.json();

		console.log(res);
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
		Добавить новый блок
	</slot>
	<slot slot="content">
		<TagsInsert on:onSelectNode={(event) => addNode(event.detail.typeNode, event.detail.contentInner)} />
	</slot>
</Popup>

<Popup bind:isOpen={edit_url.popup}>
	<slot slot="title">
		Редактировать url поста
	</slot>
	<slot slot="content">
		<input class="editUrl" type="text" bind:value={edit_url.url} />
	</slot>
	<slot slot="bottom">
		<Button title="Сохранить" on:click="{() => saveUrl(edit_url.url)}" />
	</slot>
</Popup>

<Popup isOpen={edit_field.popup}>
	<slot slot="title">
		{edit_field.info.title}
	</slot>
	<slot slot="content">
		{#if edit_field.info.field === 'title'}
			<Editor actions={actions} html={post['title']} on:change="{(e) => editHtml(e)}" />
		{/if}
		{#if edit_field.info.field === 'text'}
			<Editor actions={actions} html={post['text']} on:change="{(e) => editHtml(e)}" />
		{/if}
		<!-- @ts-ignore -->
		<!-- <Editor actions={actions} html={post[edit_field.info.field]} on:change="{(e) => editHtml(e)}" /> -->
	</slot>
	<slot slot="bottom">
		<Button title="Сохранить" on:click="{() => saveBlock(edit_field)}" />
	</slot>
</Popup>

{#if isOpenGraphEdit}
	<OpenGraphEditor bind:dataOpenGraph={og_data}  bind:isOpenGraphEdit={isOpenGraphEdit} />
{/if}

{#if user.isAdmin}
<AdminButtons>
	<BtnAdminEdit title="OpenGraph" bg="opengraph" on:click="{openGraphEdit}" />
	<BtnAdminEdit title="URL" bg="url" on:click="{() => urlEdit(post.slug)}" />
</AdminButtons>
{/if}

<div class="wrap">
	<div class="work">
		{#if post.publication || user.isAdmin}
		<article class="post">
			{#if user.isAdmin}<div class="publication"><Switch status={post.publication} on:click={changeStatus} /></div>{/if}
			<div class="data">Апрель 07, 2023</div>
			<div class="title">
				{@html post.title}
				{#if user.isAdmin}<BtnEditBlock 
					on:getData={(event) => { edit_field = event.detail; }}
					info={{id: post.id, field: 'title', type: 'input', title: 'Редактирования названия поста:'}}
				/>{/if}
			</div>
			<div class="text">
				{@html post.text}
				{#if user.isAdmin}<BtnEditBlock 
					on:getData={(event) => { edit_field = event.detail; }}
					info={{id: post.id, field: 'text', type: 'input', title: 'Редактирования краткой записи:'}}
				/>{/if}
			</div>
			{#if user.isAdmin}
			<div class="btns">
				<button class="btn edit" on:click={editPost}>Редактор</button>
				<button class="btn preview" on:click={previewPost}>Просмотр</button>
				<button class="btn save" on:click={savePostFn}>Сохранить</button>
			</div>
			{/if}
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
			<div class="share">
				<div class="share-title">Поделиться:</div>
				<div class="ya-share2" 
					data-curtain data-color-scheme="whiteblack" 
					data-services="vkontakte,odnoklassniki,telegram,viber,whatsapp,skype">
				</div>
			</div>
		</article>
		{/if}
	</div>
</div>

<style lang="scss">
.btns{
	width: 100%;
	margin: 20px 0;
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

.editUrl{
	width: 100%;
	box-sizing: border-box;
	outline: none;
	border: 1px solid #000;
	padding: 7px 10px;
}

.share{
	display: flex;
	align-items: center;
	justify-content: flex-start;
	width: 100%;
}

.share-title{
	font-weight: 600;
	margin-right: 5px;
}

:global(p) {
  font-size: 16px;
  line-height: 1.7em;
}

:global(h1) {
  font-size: 24px;
}

:global(h2) {
  font-size: 20px;
}

:global(h3) {
  font-size: 18px;
}
</style>