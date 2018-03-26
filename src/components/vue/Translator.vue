<template>
  <div 
    class="__transltor" 
    :class="{ 
      '__is-dialog-wrap': resultAsDialog 
    }"
  >
    <div 
      @mouseup.stop="e => e" 
      @click.stop="showPanel = true" 
      class="__transltor_button" 
      :style="buttonPositionStyle" 
      v-if="!showPanel && selection"
    >译</div>
    <div class="__transltor_loading" :style="panelPositionStyle" v-if="!translateLoaded && selection">Loading</div>
    <result-panel 
      v-if="resultPanelVisible" 
      :hide="hidePanelInRoot" 
      :text="selection"
      :is-dialog="resultAsDialog" 
      :style="panelPositionStyle"
      :isDialog="resultAsDialog" 
      :result="translationResult"
    ></result-panel>
  </div>
</template>

<script>
import selectionMixin from '@/components/vue/Selection-mixin'
import { _calcPositionAsDialog } from '@/utils'

export default {
  name: 'translator',

  mixins: [selectionMixin],

  data() {
    return {
      // 当前实例下的 ResultPanel 作为 dialog 展现
      resultAsDialog: false
    }
  },

  created() {
    this.$root.inExtension = window.location.href.includes(chrome.runtime.getURL(''))

    if (this.$root.inExtension) {
      window.translator = this
    }
  },

  mounted() {
    const { onMouseDown } = this

    document.addEventListener('mouseup', onMouseDown)
  },

  methods: {
    hidePanelInRoot() {
      this.hidePanel()
      this.resultAsDialog = false
    },

    showPanelAsDialog(text) {
      this.resultAsDialog = true
      this.position = _calcPositionAsDialog()
      this.selection = text
      this.showPanel(text)
    }
  }
}
</script>

