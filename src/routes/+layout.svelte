<script lang='ts'>
	export let data;

	import "../app.scss";
	import Nav from "../components/Nav.svelte";
	import "./styles.css";
	import {menuData} from '../lib/menu';

	$: $menuData = data.menu;

</script>

<div class="app">

  <div class="wrap wrap__header">
    <div class="work">
      <div class="header">
        <a href="/" class="logo">Главная</a>
        <nav class="menu">
          <Nav />
        </nav>
      </div>
    </div>
  </div>

  <main>
    <slot />
  </main>
</div>

<style lang="scss">
.app{
  position: relative;
}

.wrap__header{
	background-color: transparent;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.header{
	width: 100%;
	height: 70px;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.logo{
	display: flex;
	align-items: center;
	justify-content: center;
	width: 50px;
	height: 50px;
	font-size: 0;
	border: none;
	user-select: none;
	background-color: transparent;
	background-image: url(/svg/logo.svg);
	background-repeat: no-repeat;
	background-position: left center;
	background-size: 50px 50px;
	border: 2px solid rgba(0,0,0,0);
	cursor: pointer;
	&:focus{
		outline: none;
		border: 2px solid rgba(0,0,0,0.2);
	}
}

.menu{
	height: 100%;
}
</style>
