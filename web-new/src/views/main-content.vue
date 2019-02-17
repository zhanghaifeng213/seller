<template>
    <main class="wrap-main">
        <div>
            <!-- <keep-alive><router-view /></keep-alive> -->
            <!-- 去掉了keep-alive, 保证每次且切换到对应模块数据能够刷新 -->
            <router-view />
        </div>
    </main>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
    .wrap-main{
        padding:30px;
        background:#fff;
        height:calc(100vh - 80px);
    }
</style>

