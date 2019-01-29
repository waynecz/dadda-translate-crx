<template>
  <img
    :src="logo"
    @mouseup.stop="e => e"
    @click.stop="handleClick"
    class="__transltor_button"
  />
</template>

<script>
import logo from '@/assets/logo.svg'

export default {
  name: 'translator-button',

  data() {
    return {
      logo
    }
  },

  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>
