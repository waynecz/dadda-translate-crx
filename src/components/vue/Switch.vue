
<template>
  <div class="switch" @click="toggle" :class="[{'disabled': disabled, 'on': status, 'plain': plain }, type]"/>
</template>
<script>
export default {
  name: 'Switcher',

  props: {
    type: String,
    value: {
      default: false
    },
    disabled: {
      default: false,
      type: Boolean
    },
    plain: {
      default: false,
      type: Boolean
    }
  },

  watch: {
    value(val) {
      this.status = val
    }
  },

  created() {
    this.init()
  },

  data() {
    return {
      status: false
    }
  },

  methods: {
    init() {
      this.status = this.value
    },

    toggle() {
      if (this.disabled) return
      this.status = !this.status
      this.$emit('input', this.status)
      this.$emit('change', this.status)
    }
  }
}
</script>
