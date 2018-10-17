<template>
  <div class="__transltor" :class="{ 
      '__is-dialog-wrap': resultAsDialog 
    }">

    <translator-button :class="{ '__is-show': !panelVisible && selection && !hasKeyboardControl }" :style="buttonPositionStyle" @click="panelVisible = true" />

    <result-panel v-if="resultPanelVisible" :hide="hidePanelInRoot" :text="selection" :is-dialog="resultAsDialog" :style="panelPositionStyle" :isDialog="resultAsDialog" :result="translationResult" />
  </div>
</template>

<script>
import selectionMixin from '@/components/vue/Selection-mixin'
import { _calcPositionAsDialog, _inBlackList } from '@/utils'
import { TR_SETTING_IS_DIRECTLY_KEY, TR_SETTING_KEYBOARD_CONTROL } from '@/utils/constant'

export default {
  name: 'translator',

  mixins: [selectionMixin],

  data() {
    return {
      // 当前实例下的 ResultPanel 作为 dialog 展现
      resultAsDialog: false,
      hasKeyboardControl: true
    }
  },

  async created() {
    // 判断是否在插件里面（生词簿）
    this.$root.inExtension = window.location.href.includes(chrome.runtime.getURL(''))

    this.$root.translateEnable = await _inBlackList()

    this.hasKeyboardDisplayControl = await this.$storage.get(TR_SETTING_KEYBOARD_CONTROL, false)

    if (this.$root.inExtension) {
      window.translator = this
    }
  },

  async mounted() {
    const { onMouseUp, onAltKeyDown, showWhateverChange } = this

    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('keydown', showWhateverChange)
  },

  methods: {
    hidePanelInRoot() {
      this.resultAsDialog = false
      this.hidePanel()
    },

    showPanelAsDialog(text) {
      this.selection = text
      this.resultAsDialog = true
      this.position = _calcPositionAsDialog()
      this.showPanel(text)
    },

    async showWhateverChange(e) {
      if (e.altKey && e.shiftKey && e.keyCode === 68) {
        const showPanelDirectlyWhatever = await this.$storage.get(TR_SETTING_IS_DIRECTLY_KEY)
        if (showPanelDirectlyWhatever) {
        }
        this.$storage.set(TR_SETTING_IS_DIRECTLY_KEY, !showPanelDirectlyWhatever)
      }
    }
  }
}
</script>

