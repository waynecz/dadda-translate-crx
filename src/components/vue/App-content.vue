<template>
  <div class="__transltor">
    <div 
      @mouseup.stop="e => e" 
      @click.stop="showPanel = true" 
      class="__transltor_button" 
      :style="buttonPositionStyle" 
      v-if="!showPanel && selection"
    >译</div>
    <result-panel 
      v-if="resultPanelVisible" 
      :hide="hidePanel" 
      :text="selection" 
      :style="panelPositionStyle" 
      :result="translationResult"
    ></result-panel>
  </div>
</template>

<script>
import selectionMixin from '@/components/vue/Selection-mixin'

export default {
  name: 'app',

  mixins: [selectionMixin],

  mounted() {
    const { onMouseDown } = this

    document.addEventListener('mouseup', onMouseDown)
  }
}
</script>

