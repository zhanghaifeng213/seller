<template>
    <main class="wrap-main">
        <div>
            <keep-alive>
                <router-view />
            </keep-alive>
        </div>  
    </main>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
    .wrap-main{
        padding:15px;
        background:#fff;
        height:calc(100vh - 80px);
    }
</style>

