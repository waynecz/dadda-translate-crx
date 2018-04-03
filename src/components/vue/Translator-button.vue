<template>
  <div 
    @mouseup.stop="e => e" 
    @click.stop="handleClick" 
    class="__transltor_button" 
  />
</template>

<script>
import { TR_SETTING_HAS_TOAST_KEY, TR_SETTING_IS_DIRECTLY_KEY } from '@/utils/constant'

export default {
  name: 'translator-button',

  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>
