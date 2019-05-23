<template>
  <div class="__transltor" :class="{
      '__is-dialog-wrap': resultAsDialog
    }">

    <translator-button :class="{ '__is-show': !showPanelDirectlyWhatever && !panelVisible && selection && !hasKeyboardDisplayControl }" :style="buttonPositionStyle" @click="panelVisible = true" />

    <result-panel v-if="resultPanelVisible" :inputVisible="inputVisible" :hide="hidePanelInRoot" :text="selection" :is-dialog="resultAsDialog" :style="panelPositionStyle" :isDialog="resultAsDialog" :result="translationResult" />

    <transition name="fade" @after-enter="inputEntered">
      <div v-if="inputVisible" class="__transltor_input" :ctrl-key="ctrlKey">
        <textarea id="__TR_INPUTER" :style="inputStyle" v-model="userInput" @keydown.meta.enter="translateThis" placeholder="Type something" class="__transltor_input-inner" />
        </div>
    </transition>

  </div>
</template>

<script>
import selectionMixin from '@/components/vue/selection-mixin'
import { _calcPositionAsDialog, _inBlackList, _isMac } from '@/utils'
import { TR_SETTING_IS_DIRECTLY_KEY, TR_SETTING_KEYBOARD_CONTROL, FONT_SIZES_PER_LENGTH, TR_SETTING_CALLOUT_INPUT } from '@/utils/constant'

export default {
  name: 'translator',

  mixins: [selectionMixin],

  data() {
    return {
      // 当前实例下的 ResultPanel 作为 dialog 展现
      resultAsDialog: false,
      ctrlKey: 'Win',
      hasKeyboardControl: true,

      inputVisible: false,

      altDownCount: 0,
      altCountTimer: null,
      altDownTime: 0,

      inputShowTimer: null,
      userInput: '',
      inputStyle: {
        fontSize: '30px',
        lineHeight: '43px'
      }
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

    this.ctrlKey = _isMac() ? '⌘' : 'Ctrl'
  },

  async mounted() {
    const { onMouseUp, changeDirectSetting, onEscDown, toggleInput } = this

    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('keydown', changeDirectSetting)
    document.addEventListener('keydown', toggleInput)
    document.addEventListener('keydown', onEscDown)
    document.addEventListener('contextMenuClick', (e) => {
      onMouseUp({clientX: 0, clientY: 0, pageY: 0}, e.detail.text)
    })
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

    onEscDown(e) {
      if (e.keyCode === 27) {
        this.hidePanel()
        this.hideInput()
      }
    },

    async changeDirectSetting(e) {
      if (e.altKey && e.shiftKey && !e.ctrlKey && !e.metaKey && e.keyCode === 71) {
        const showPanelDirectlyWhatever = await this.$storage.get(TR_SETTING_IS_DIRECTLY_KEY)

        await this.$storage.set(TR_SETTING_IS_DIRECTLY_KEY, !showPanelDirectlyWhatever)
        // 在修改是否直接显示翻译结果的配置后修改 badget
        chrome.runtime.sendMessage({ name: 'toggleGo' })
        this.altDownCount = 0
      }
    },

    async toggleInput(e) {
      if (await this.$storage.get(TR_SETTING_CALLOUT_INPUT, false)) {
        if (e.altKey && e.shiftKey && !e.ctrlKey && !e.metaKey && e.keyCode === 68) {
          if (this.inputVisible) {
            this.hideInput()
            return
          }

          this.inputVisible = true
        }
      }
    },

    hideInput() {
      this.inputVisible = false
      this.userInput = ''
    },

    translateThis() {
      document.getElementById('__TR_INPUTER').select()
      this.$nextTick(async () => {
        const text = window.getSelection().toString()
        this.selection = text

        await this.showPanel(text)
        this.panelVisible = true
      })
    },

    inputEntered(element) {
      if (this.inputVisible) {
        const inputEl = document.getElementById('__TR_INPUTER')
        if (inputEl) {
          inputEl.focus()
          inputEl.value = ''
        }
      }
    }
  },

  watch: {
    userInput(val) {
      let fontSize = '30px'
      let lineHeight = '43px'
      const contentLength = val.length
      Object.keys(FONT_SIZES_PER_LENGTH).every(breakpoint => {
        if (contentLength > breakpoint) {
          const temp = FONT_SIZES_PER_LENGTH[breakpoint].split('|')
          fontSize = temp[0]
          lineHeight = temp[1]
          return true
        }
        return false
      })

      this.inputStyle = {
        fontSize,
        lineHeight
      }
    }
  }
}
</script>

