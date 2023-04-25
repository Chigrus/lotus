<script>
    import {menu} from '../lib/menu';
</script>

<ul class="mainmenu">
    {#each $menu as item (item.id)}
        <li class="item {item.active ? 'active' : ''}">
            <a class="link" href="/{item.url}">{item.title}</a>
        </li>
    {/each}
</ul>

<style lang="scss">

.mainmenu{
  display: flex;
  height: 100%;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.item{
    position: relative;
    height: 100%;
    &.active{
		&:before{
            content: '';
            position: absolute;
            z-index: 1;
            left: 0;
            bottom: -2px;
            width: 100%;
            height: 2px;
            background-color: rgba(0,0,0,0.75);
        }
        .link{
            color: #000;
        }
    }
}

.link{
    display: flex;
    height: 100%;
    padding: 0 10px;
    align-items: center;
    color: #272727;
    text-decoration: none;
}

@media only screen and (max-width: 639px){

}
</style>