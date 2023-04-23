<script>
  import "../app.scss";
  export let data;

  import Nav from "../components/Nav.svelte";
  import "./styles.css";

  let menu = data.menu;

</script>

<div class="app">

  <div class="wrap wrap__header">
    <div class="work">
      <div class="header">
        <div href="/" class="logo"></div>
        <nav class="menu">
          <Nav bind:menu />
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
	background-image: url(/svg/logo.svg);
	background-repeat: no-repeat;
	background-position: left center;
	background-size: 50px 50px;
	font-size: 23px;
	text-transform: uppercase;
	font-weight: 600;
}

.menu{
	height: 100%;
}
</style>
