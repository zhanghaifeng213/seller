<template>
  <div>record</div>
</template>
<script>
import { list } from "@/api/order.js";
import { mapState } from "vuex";
export default {
  mounted() {
    this.getList();
  },
  computed: {
    ...mapState(["id", "number"])
  },
  methods: {
    getList() {
      if (this.id) {
        list(this.id).then(res => {});
      }
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
</style>
