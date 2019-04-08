import { _calcPosition, _inBlackList, _isAllPunctuation, _isAllChinese, _isAllNumber } from '@/utils'

import { TR_SETTING_IS_DIRECTLY_KEY, TR_SETTING_SKIP_CHINESE_KEY, TR_SETTING_KEYBOARD_CONTROL } from '@/utils/constant'

export default {
  computed: {
    buttonPositionStyle() {
      const { buttonX, buttonY } = this.position
      return {
        left: buttonX,
        top: buttonY
      }
    },

    panelPositionStyle() {
      const { panelX, panelY, isTop, maxHeight } = this.position

      return {
        left: panelX,
        maxHeight,
        top: panelY,
        transform: `translateY(${isTop ? 0 : '-100%'})`
      }
    },

    resultPanelVisible() {
      const { panelVisible, selection, translateLoaded } = this
      let result = translateLoaded && panelVisible && selection

      return result
    }
  },

  data() {
    return {
      selection: '',
      panelVisible: true,
      translateLoaded: false,
      position: {
        panelX: 0,
        panelY: 0,
        buttonX: 0,
        buttonY: 0,
        maxHeight: 0,
        isTop: true
      },

      translationResult: Object.create(null),

      hasKeyboardDisplayControl: false
    }
  },

  async mounted() {
    this.hasKeyboardDisplayControl = (await this.$storage.get(TR_SETTING_KEYBOARD_CONTROL, false)) && !this.$root.inExtension

    if (this.hasKeyboardDisplayControl) {
      document.addEventListener('keydown', this.onControlKeyDown)
    }
  },

  methods: {
    /**
     * ! 按键控制开启翻译
     */
    onControlKeyDown(e) {
      if (this.selection && e.altKey) {
        this.panelVisible = true
      }
    },

    hidePanel() {
      this.selection = ''
      this.translateLoaded = false
      this.panelVisible = false
    },

    async showPanel(text) {
      // 如果设置了直接翻译则直接显示结果面板
      const {
        $root: { inExtension },
        $storage
      } = this
      const showPanelDirectlyWhatever = await $storage.get(TR_SETTING_IS_DIRECTLY_KEY)

      if (inExtension) {
        this.panelVisible = true
      } else {
        this.panelVisible = showPanelDirectlyWhatever
      }
      this.translationResult = null
      this.translateLoaded = false

      // 发送翻译请求
      this.translateText(text)
    },

    async translateText(text) {
      const {
        $root,
        $root: { inExtension }
      } = this
      chrome.runtime.sendMessage({ name: 'translate', text, inExtension }, res => {
        if (!res.isHasOxford && /^[A-Z][a-zA-Z]*$/.test(text)) {
          return this.translateText(text.toLowerCase())
        }
        this.translationResult = res
        this.translateLoaded = true
        this.$root.count = ++$root.count
      })
    },

    /**
     * 监听 MouseUp 事件来怕段划词完成，触发情况有两种：划词、双击
     * ! 注意这里是 async
     */
    async onMouseUp(e) {
      const inBlackList = await _inBlackList()
      const skipChinese = await this.$storage.get(TR_SETTING_SKIP_CHINESE_KEY, false)

      /**
       * @summary 以下判断是否开启翻译关键语句
       * @param {inBlackList} 网站是在黑名单中则不翻译
       * @param {inExtension} 在插件页面中则不翻译
       * @param {isAllNumber} 全数字不翻译
       * @param {skipChinese} 若开启全中文不翻译则不翻译
       */
      if ((inBlackList && !this.$root.inExtension) || this.resultAsDialog) return

      if (e.button === 0) {
        const text = window
          .getSelection()
          .toString()
          .trim()

        // --------- 内容判断开始 ---------

        if (_isAllNumber(text) || _isAllPunctuation(text)) return

        if (_isAllChinese(text) && skipChinese) return

        // --------- 内容判断结束 ---------

        this.selection = text

        this.position = _calcPosition(e)

        if (text) {
          this.showPanel(text)
        }
      }
    }
  }
}
