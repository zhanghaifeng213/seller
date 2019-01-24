<template>
  <icons :is="iconType" :type="iconName" :color="iconColor" :size="iconSize"></icons>
</template>

<script>
import Icons from '_c/icons'
export default {
  name: 'CommonIcon',
  components: { Icons },
  props: {
    type: {
      type: String,
      required: true
    },
    color: String,
    size: Number
  },
  computed: {
    iconType() {
      console.log(this.type)
      return this.type.indexOf('_') === 0 ? 'i' : 'i'
    },
    iconName() {
      return this.iconType === 'i' ? this.type : this.type
    },
    iconSize() {
      return this.size || (this.iconType === 'i' ? 12 : undefined)
    },
    iconColor() {
      return this.color || ''
    }
  },
  methods: {
    getCustomIconName(iconName) {
      return iconName.slice(1)
    }
  }
}
</script>

<style>
</style>
