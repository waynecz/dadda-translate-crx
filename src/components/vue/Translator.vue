<template>
  <div 
    class="__transltor" 
    :class="{ 
      '__is-dialog-wrap': resultAsDialog 
    }"
  >

    <translator-button
      v-if="!panelVisible && selection"
      :style="buttonPositionStyle" 
      @click="panelVisible = true"
    />

    <div class="__transltor_loading" :style="buttonPositionStyle" v-if="!$root.inExtension && panelVisible && !translateLoaded && selection" />
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
import { TR_SETTING_IS_DIRECTLY_KEY } from '@/utils/constant'

export default {
  name: 'translator',

  mixins: [selectionMixin],

  data() {
    return {
      // 当前实例下的 ResultPanel 作为 dialog 展现
      resultAsDialog: false
    }
  },

  async created() {
    this.$root.inExtension = window.location.href.includes(chrome.runtime.getURL(''))

    this.$root.translateDirectly = await this.$storage.get(TR_SETTING_IS_DIRECTLY_KEY)

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

