<script lang='ts'>
    import type {Nodes} from '../routes/types';

    import type { ComponentType } from 'svelte';
	import Editor from 'cl-editor';

    import Popup from '../components/Popup.svelte';
    import TagsInsert from '../components/TagsInsert.svelte';

    export let nodes: Nodes;

	// @ts-ignore
	const cedit: ComponentType = Editor;

    let actions = ['b', 'i', 'a', 'undo', 'redo', ];
    let fields = ['base', 'separator'];  // 'base', 'separator', 'code'

    let isAddNode = false;
    let idAddNode:number;

    function clickNode(id:number){
        for (let node of nodes){
            node.isEdit = false;
        }
        nodes[id].isEdit = true;
    }

    function editHtml(e:CustomEvent, id:number){
		//console.log(e.detail, id);
		nodes[id].content = e.detail;
	}

    function createNode(id:number){
        console.log(id);
        isAddNode = true;
        idAddNode = id;
    }

    function addNode(id:number, type:string, content:string){
        //console.log(id, type, content);

        let addNode = [...nodes];
        addNode.splice(id+1, 0, {type: type, content: content, isEdit: true});
        if(id !== -1){
            nodes[id].isEdit = false;
        }
        nodes = addNode;

        isAddNode = false;
    }

    function delNode(id:number){

        let delNode = [...nodes];
        delNode.splice(id, 1);
        nodes = delNode;

    }

    function upNode(id:number){
        if(id !== 0){
            let tempNode = nodes[id-1];
            nodes[id-1] = nodes[id];
            nodes[id] = tempNode;
        }
    }

    function downNode(id:number){
        if(id !== nodes.length-1){
            let tempNode = nodes[id+1];
            nodes[id+1] = nodes[id];
            nodes[id] = tempNode;
        }
    }
</script>

<Popup bind:isOpen={isAddNode}>
	<slot slot="title">
		Добавить новый блок
	</slot>
	<slot slot="content">
		<TagsInsert on:onSelectNode={(e) => addNode(idAddNode, e.detail.typeNode, e.detail.contentInner)} fields={fields} />
	</slot>
</Popup>

{#each nodes as node, index}
    <div class="content">
        <div class="main" on:mousedown={() => clickNode(index)}>
            {#if node.isEdit}
                {#if node.type === 'sep1'}
                    <div class="seporator">
                        <div class="seporator_top"></div>
                        <div class="seporator_container">
                            <div class="sep1"></div>
                        </div>
                    </div>
                {:else}
                    <svelte:component this={cedit} actions={actions} html={node.content} on:change="{(e) => editHtml(e, index)}" height='auto' />
                {/if}
            {:else}
                {#if node.type === 'h1'}
                    <h1>{@html node.content}</h1>
                {/if}
                {#if node.type === 'h2'}
                    <h2>{@html node.content}</h2>
                {/if}
                {#if node.type === 'h3'}
                    <h3>{@html node.content}</h3>
                {/if}
                {#if node.type === 'h4'}
                    <h4>{@html node.content}</h4>
                {/if}
                {#if node.type === 'p'}
                    <p>{@html node.content}</p>
                {/if}
                {#if node.type === 'ul'}
                    <ul>{@html node.content}</ul>
                {/if}
                {#if node.type === 'ol'}
                    <ol>{@html node.content}</ol>
                {/if}
                {#if node.type === 'sep1'}
                    <div class="sep1"></div>
                {/if}
            {/if}
        </div>
        {#if node.isEdit}
            <div class="edit-list">
                <div class="edit-item add" title="Добавить тэг" on:mousedown={() => createNode(index)}></div>
                <div class="edit-item del" title="Удалить тэг" on:mousedown={() => delNode(index)}></div>
            </div>
            <div class="move-list">
                <div class="move-item up" title="Выше" on:mousedown={() => upNode(index)}></div>
                <div class="move-item down" title="Ниже" on:mousedown={() => downNode(index)}></div>
            </div>
        {/if}
    </div>
{/each}

<div class="addNewNode" on:mousedown={() => createNode(nodes.length-1)}>Добавить блок</div>

<style lang="scss">
.content{
    position: relative;
    margin: 10px 0;
}

.main{
    width: calc(100% - 45px);
}

.move-list{
    position: absolute;
    top: -1px;
    right: 0;
    width: 40px;
}

.move-item{
    width: 100%;
    height: 40px;
    margin-bottom: 5px;
    cursor: pointer;
    background-image: url(/svg/down.svg);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 18px auto;
    &:hover{
        background-color: rgba(0,0,0,0.05);
    }
    &.up{
        transform: rotate(180deg);
    }
    &:last-child{
        margin-bottom: 0;
    }
}

.edit-list{
    position: absolute;
    z-index: 1;
    top: 0;
    right: 45px;
    display: flex;
    height: 35px;
}

.edit-item{
    width: 35px;
    height: 100%;
    margin-right: 5px;
    cursor: pointer;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 18px auto;
    &:last-child{
        margin-right: 0;
    }
    &:hover{
        background-color: rgba(0,0,0,0.05);
    }
    &.del{
        background-image: url(/svg/close.svg);
    }
    &.add{
        background-image: url(/svg/add-black.svg);
    }
}

.addNewNode{
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    padding: 5px 25px;
    background-color: rgba(0,0,0,0.1);
    cursor: pointer;
    font-weight: 500;
}

:global.cl-content{
    min-height: 47px;
}

h1{
    font-size: 1.5em;
}

h2{
  font-size: 1.4em;
}

h3{
  font-size: 1.3em;
}

h4{
  font-size: 1.3em;
}

p{
  font-size: 1.3em;
  line-height: 1.7em;
}

ul :global(li){
  font-size: 1.3em;
}

ol :global(li){
  font-size: 1.3em;
}
/*************************** Для разделителей ********************/
.seporator{
    position: relative;
    width: 100%;
    background-color: #fff;
    box-sizing: border-box;
    border: 1px solid rgba(10, 10, 10, 0.1);
    .seporator_top{
        display: block;
        width: 100%;
        height: 35px;
        background-color: #ecf0f1;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(10, 10, 10, 0.1);
    }
    .seporator_container{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px 0;
    }
}

.sep1{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 15px 0;
    &::before{
        content: '';
        display: block;
        width: 250px;
        height: 18px;
        background-image: url(/svg/sep1.svg);
        background-position: center center;
        background-repeat: no-repeat;
        background-size: contain;
    }
}
/*************************** Для разделителей ********************/
</style>