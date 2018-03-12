<template>
  <div class="__transltor">
    <div class="__transltor_button"></div>
    <result-panel 
      v-if="resultPanelVisible" 
      @hide="translateLoaded = false" 
      :text="selection" 
      :style="positionStyle" 
      :result="translationResult"
    ></result-panel>
  </div>
</template>

<script>
import selectionMixin from '@/components/vue/selection-mixin'

export default {
  name: 'app-content',

  mixins: [selectionMixin],

  mounted() {
    const { onMouseDown } = this

    document.addEventListener('mouseup', onMouseDown)
  }
}
</script>

