<script lang='ts'>
	import type {OG, User} from './types'

	export let data:{
		og_data: OG[];
		user: User;
	};

	let og_data = data.og_data[0];
	let user = data.user;

	let isOpenGraphEdit = false;

	import AdminButtons from '../components/AdminButtons.svelte';
	import BtnAdminEdit from '../components/BtnAdminEdit.svelte';
	import OpenGraphEditor from '../components/OpenGraphEditor.svelte';

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

{#if user.isAdmin}
<AdminButtons>
	<BtnAdminEdit title="OpenGraph" bg="opengraph" on:click="{openGraphEdit}" />
</AdminButtons>
{/if}

{#if isOpenGraphEdit}
	<OpenGraphEditor bind:dataOpenGraph={og_data}  bind:isOpenGraphEdit={isOpenGraphEdit} />
{/if}

<div class="wrap">
	<div class="work">
		<div class="maincontent">
			<div class="left-sidebar">
				ccdsfdsf
			</div>
		</div>
	</div>
</div>

<style lang="scss">
.maincontent{
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	border-top-width: 2px;
	border-top-style: solid;
	border-color: var(--outline-primary);
}

.left-sidebar{
	width: 240px;
	box-sizing: border-box;
	padding: 60px 0;
	border-right-width: 1px;
	border-right-style: solid;
	border-color: var(--bg-5);
}
</style>
