
<template>
  <div
    class="switch"
    :class="[{'disabled': disabled, 'on': status, 'plain': plain }, type]"
    @click="toggle"
  />
</template>
<script>
export default {
  name: 'Switcher',

  props: {
    type: {
      type: String,
      default: ''
    },
    value: {
      type: Boolean,
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

  data() {
    return {
      status: false
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
