<script>
    export let title = 'Кнопка';
    export let bg = '';
</script>

<button class="btn {bg}" {title} on:click></button>

<style lang="scss">
.btn{
    width: 40px;
    height: 40px;
    border: none;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    margin-bottom: 4px;
    background-color: #423232;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 80% 80%;
}

.btn:hover{
    background-color: #ee3f02;
}

.btn.opengraph{
    background-image: url(/svg/openGraph.svg);
}

.btn.url{
    background-image: url(/svg/link.svg);
    background-size: 60% 60%;
}

.btn.addpost{
    background-image: url(/svg/addpost.svg);
    background-size: 60% 60%;
}

.btn.save{
    background-image: url(/svg/save.svg);
    background-size: 60% 60%;
}
</style>