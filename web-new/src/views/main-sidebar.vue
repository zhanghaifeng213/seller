<template>
    <aside class="wrap-sidebar">
        <ul>
            <li class="link"><router-link :to="{name: 'types'}">菜品分类管理</router-link></li>
            <li class="link"><router-link :to="{name: 'dishes'}">菜单管理</router-link></li>
            <li class="link"><router-link :to="{name: 'tables'}">桌号管理</router-link></li>
            <li class="link"><router-link :to="{name: 'order'}">订单管理</router-link></li>
            <li class="link"><router-link :to="{name: 'income'}" >收入管理</router-link></li>
            <li class="link"><router-link :to="{name: 'records'}">历史订单</router-link></li>
            <li class="link"><router-link :to="{name: 'info'}">用户管理</router-link></li>
        </ul>   
    </aside>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
    .wrap-sidebar{
        position: fixed;
        left:0px;
        top:50px;
        bottom:0px;
        width:230px;
        background:#002244;
       .link{
            padding:10px 0;
            a{
                color:#fff;
            }
        }
    }
    
</style>

