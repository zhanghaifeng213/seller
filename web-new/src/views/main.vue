<template>
  <div>
    main
    <div @click="logout">logout</div>
    <router-link :to="{name: 'types'}">types</router-link>
    <router-link :to="{name: 'dishes'}">dishes</router-link>
    <router-link :to="{name: 'tables'}">tables</router-link>
    <router-link :to="{name: 'info'}">info</router-link>
    <router-link :to="{name: 'income'}">income</router-link>
    <router-link :to="{name: 'records'}">records</router-link>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "main-index",
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        console.log('push')
        this.$router.push({ path: "/login" })
      });
    }
  },
  mouted() {}
};
</script>

<style>
</style>
