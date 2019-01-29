<template>
    <nav class="wrap-navbar">
        <div class="wrap-navbar-title"></div>
        <div class="wrap-navbar-content"></div>
    </nav>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
    .wrap-navbar{
        position: fixed;
        top:0px;
        left:0px;
        right:0px;
        height:50px;
        -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
        background-color: #17B3A3;
        z-index:1000;
        .wrap-navbar-title{
            width: 230px;
            height: 50px;
            overflow: hidden;
        }
    }
</style>

