<template>
  <img
    :src="logo"
    class="__transltor_button"
    @mouseup.stop="e => e"
    @click.stop="handleClick"
  >
</template>

<script>
import logo from '@/assets/logo.svg'

export default {
  name: 'TranslatorButton',

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
