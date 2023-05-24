<script lang='ts'>
	export let data;

	import "../app.scss";
	import Nav from "../components/Nav.svelte";
	import Footer from "../components/Footer.svelte";
	import "./styles.css";
	import {menuData} from '../lib/menu';

	$: $menuData = data.menu;

</script>

<div class="app">

	<div class="wrap wrap__topheader">
		<div class="work">
			<div class="topheader">
				<div class="left">
					<a href="/" class="logo">Главная</a>
					<div class="author">Авторский блог Александры Черновой</div>
				</div>
				<nav class="menu">
					<Nav />
				</nav>
			</div>
		</div>
	</div>
	<div class="wrap wrap__header">
		<div class="work">
			<div class="name">
				<div class="title">Идейный друг</div>
				<div class="subtitle">идеи, которые помогают найти себя и осмелиться жить по-своему</div>
			</div>
		</div>
	</div>

	<main>
		<slot />
	</main>

	<Footer />

</div>

<style lang="scss">
.app{
  position: relative;
}

.wrap__topheader{
	background-color: transparent;
}

.topheader{
	width: 100%;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.left{
	display: flex;
	align-items: center;
}

.author{
	font-family: var(--font-subtitle);
	margin-left: 15px;
	font-weight: 400;
	font-size: 14px;
}

.logo{
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	font-size: 0;
	border: none;
	user-select: none;
	background-color: transparent;
	background-image: url(/svg/logo.svg);
	background-repeat: no-repeat;
	background-position: left center;
	background-size: 40px 40px;
	border: 2px solid rgba(0,0,0,0);
	cursor: pointer;
	&:focus{
		outline: none;
	}
}

.menu{
	height: 100%;
}

.name{
	width: 100%;
	padding: 30px 0;
}

.title{
	display: flex;
	justify-content: center;
	width: 100%;
	font-family: var(--font-h1);
	font-weight: 800;
	font-size: 80px;
	letter-spacing: 1px;
	line-height: 1em;
}

.subtitle{
	display: flex;
	justify-content: center;
	width: 100%;
	font-family: var(--font-subtitle);
	font-size: 16px;
	margin-top: 15px;
	font-weight: 300;
	font-style: italic;
}

@media only screen and (max-width: 979px){
	.title{
		font-size: 64px;
	}	
}

@media only screen and (max-width: 639px){
	.title{
		font-size: 48px;
	}
	
	.author{
		display: none;
	}
}

@media only screen and (max-width: 479px){
	.title{
		font-size: 42px;
	}
}
</style>
