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
				<a href="/" class="logo">Главная</a>
				<nav class="menu">
					<Nav />
				</nav>
			</div>
		</div>
	</div>
	<div class="wrap wrap__header">
		<div class="work">
			<div class="title_header">Идейный друг</div>
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

.title_header{
	display: flex;
	justify-content: center;
	width: 100%;
	padding: 50px 0;
	text-transform: uppercase;
	font-weight: 500;
	font-size: 36px;
	letter-spacing: 2px;
}
</style>
