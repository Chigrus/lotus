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
				<div class="widget">
					<div class="widget_title">Свежие статьи</div>
					<ul class="widget_content">
						<li>
							<a href="/blog/meaning-of-life">В чем смысл жизни?</a>
						</li>
						<li>
							<a href="/blog/finding-a-hobby">Как найти свое любимое дело?</a>
						</li>
					</ul>
					<div class="widget_content">
						<div class="advertising">
							<div class="adv_block"></div>
						</div>
					</div>
				</div>
			</div>
			<div class="content">
				<div class="content_about">
					<div class="content_title">О проекте</div>
					<div class="about_info">
						<div class="content_img">
							<img src="/uploads/about.jpg" alt="Александра Чернова" />
						</div>
						<div class="about_line">
							<h3 class="about_line_title">О таком не говорят даже с мамой и друзьями</h3>
							<div class="about_line_text">Бывало ли вам скучно оттого, что люди вокруг говорят лишь о бытовухе и новостях? А о своих внутренних переживаниях, 
								мечтах, о смысле жизни вам даже поговорить не с кем. Если да — то приглашаю вас в свой мир идейных друзей! 
								Здесь "летать в облаках" — не странно, а нормально!</div>
							<div class="about_line_btn">
								<a href="/about" class="about_line_link">Подробнее</a>
							</div>
						</div>
					</div>
				</div>
				<div class="content_posts">
					<article class="content_post">
						<!-- <div class="content_post-top">Май 05, 2023</div> -->
						<a href="/blog/meaning-of-life" class="content_post-title">В чем смысл жизни?</a>
						<div class="content_post-text">В чем смысл жизни? Глупый вопрос? – не думаю. Если не понимаешь, ради чего живешь, то как сможешь 
							выбирать поступки, которые осчастливят, а не разочаруют? В этой статье я рассказываю, из-за чего мы теряем смысл жизни и где его найти.</div>
						<a href="/blog/meaning-of-life" class="content_post-more">Читать далее</a>
					</article>
					<article class="content_post">
						<!-- <div class="content_post-top">Май 07, 2023</div> -->
						<a href="/blog/finding-a-hobby" class="content_post-title">Как найти свое любимое дело?</a>
						<div class="content_post-text">Почему так сложно понять, чем вы хотите заниматься в жизни? Может, вы просто боитесь своих 
							настоящих интересов и не решаетесь их реализовать?</div>
						<a href="/blog/finding-a-hobby" class="content_post-more">Читать далее</a>
					</article>
				</div>
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
	width: 260px;
	box-sizing: border-box;
	padding: 60px 0;
	border-right-width: 1px;
	border-right-style: solid;
	border-color: var(--bg-5);
}

.widget{
	width: 100%;
	box-sizing: border-box;
	padding-right: 30px;
}

.widget_title{
	width: 100%;
	font-size: 16px;
	color: var(--hover-primary);
	font-weight: 500;
	text-transform: uppercase;
}

.widget_content{
	width: 100%;
	list-style-type: none;
	padding: 0;
	margin: 0;
	margin-top: 20px;
}

.advertising{
	display: flex;
	justify-content: center;
	width: 100%;
	border-top: 1px solid rgba(212, 212, 212, 0.5);
	border-bottom: 1px solid rgba(212, 212, 212, 0.5);
	padding: 40px 0;
	margin-top: 40px;
}

.adv_block{
	width: 240px;
	height: 400px;
	background-color: rgba(0,0,0,0.03);
}

.widget_content li{
	position: relative;
	width: 100%;
	box-sizing: border-box;
	padding: 4px 0 4px 20px;
	&::before{
		content: '';
		position: absolute;
		top: 16px;
    	left: 7px;
		width: 3px;
		height: 3px;
		background-color: var(--bg-secondary);
	}
	&:hover{
		&::before{
			background-color: var(--bg-hover-1);
		}
	}
}

.widget_content li a{
	color: var(--text-primary);
	text-decoration: none;
	font-size: 18px;
	font-family: var(--font-text);
	transition: color 0.3s ease-in-out;
	text-transform: capitalize;
	&:hover{
		color: var(--hover-primary);
		transition: color 0.3s ease-in-out;
	}
}

.content{
	width: calc(100% - 260px);
	box-sizing: border-box;
	padding: 20px 0 30px 50px;
}

.content_about{
	width: 100%;
}

.content_title{
	position: relative;
	width: 100%;
	font-size: 36px;
	font-family: var(--font-h1);
	font-weight: 600;
	font-style: italic;
	padding-bottom: 10px;
	margin-bottom: 30px;
	&::before{
		content: '';
		position: absolute;
		left: 0;
		bottom: 3px;
		width: 100%;
		height: 2px;
		background-color: #d4d4d4;
	}
	&::after{
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 1px;
		background-color: #d4d4d4;
	}
}

.about_info{
	display: flex;
	width: 100%;
}

.content_img{
	width: calc(100% - 300px);
	img{
		max-width: 100%;
		height: auto;
	}
}

.about_line{
	width: 300px;
	box-sizing: border-box;
	padding-left: 20px;
}

.about_line_title{
	width: 100%;
	font-family: var(--font-title);
	font-size: 28px;
	font-weight: 600;
	text-transform: capitalize;
	text-align: left;
}

.about_line_text{
	width: 100%;
	margin-top: 10px;
	font-family: var(--font-text);
	font-size: 17px;
}

.about_line_btn{
	display: flex;
	justify-content: flex-end;
	width: 100%;
	margin-top: 20px;
	padding-top: 20px;
	border-top: 1px solid rgba(0,0,0,0.1);
}

.about_line_link{
	position: relative;
	text-decoration: none;
	text-transform: uppercase;
	font-size: 14px;
	font-weight: 500;
	transition: color 0.3s ease-in-out;
	padding-right: 18px;
	line-height: 1em;
	&::after{
		content: '';
		position: absolute;
		top: 50%;
		right: 0;
		width: 16px;
		height: 16px;
		margin-top: -8px;
		background-image: url(/svg/arrow-next.svg);
		background-repeat: no-repeat;
		background-position: top right;
		background-size: 14px auto;
	}
	&:hover{
		color: var(--hover-primary);
		transition: color 0.3s ease-in-out;
	}
}

.content_posts{
	width: 100%;
}

.content_post{
	width: 100%;
	border-top-style: solid;
	border-top-width: 1px;
	border-top-color: rgba(212, 212, 212, 0.5);
	padding-top: 30px;
	margin-top: 30px;
}

.content_post-top{
	width: 100%;
	margin-bottom: 10px;
	color: var(--hover-primary);
	text-transform: uppercase;
}

.content_post-title{
	margin-top: 10px;
	font-family: var(--font-h1);
	font-weight: 700;
	font-size: 32px;
	line-height: 1.2em;
	text-decoration: none;
	border-bottom-width: 1px;
    border-bottom-style: solid;
	border-color: transparent;
	text-transform: capitalize;
	transition: border-color .3s ease-in-out;
	&:hover{
		border-color: var(--outline-primary);
		transition: border-color .3s ease-in-out;
	}
}

.content_post-text{
	width: 100%;
	margin-top: 15px;
	margin-bottom: 20px;
	font-family: var(--font-text);
	font-weight: 400;
	font-size: 18px;
	line-height: 1.5em;
}

.content_post-more{
	text-decoration: none;
	text-transform: uppercase;
	font-weight: 500;
	transition: color 0.3s ease-in-out;
	&:hover{
		color: var(--hover-primary);
		transition: color 0.3s ease-in-out;
	}
}

@media only screen and (max-width: 979px){
	.content{
		padding: 20px 0 30px 30px;
	}

	.about_info{
		flex-wrap: wrap;
	}

	.content_img{
		width: 100%;
	}

	.about_line{
		width: 100%;
		padding-left: 0;
		margin-top: 20px;
	}
}

@media only screen and (max-width: 767px){
	.maincontent{
		flex-direction: column-reverse;
	}

	.content{
		width: 100%;
		padding: 20px 0 30px 0;
	}

	.left-sidebar{
		width: 100%;
	}
}
</style>
