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
        .link{
            color: rgba(0,0,0,0.6);
        }
    }
    &:before{
        content: '';
        position: absolute;
        z-index: 1;
        top: 50%;
        right: 0;
        width: 1px;
        height: 12px;
        margin-top: -6px;
        background-color: rgba(0,0,0,0.3);
    }
    &:last-child{
        &:before{
            content: none;
        }
    }
}

.link{
    display: flex;
    height: 100%;
    padding: 0 10px;
    align-items: center;
    color: var(--text-primary);
    text-decoration: none;
    text-transform: uppercase;
    font-size: 12px;
}

@media only screen and (max-width: 639px){

}
</style>