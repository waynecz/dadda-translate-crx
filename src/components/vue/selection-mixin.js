import {
  _calcPosition,
  _inBlackList,
  _isAllPunctuation,
  _isAllChinese,
  _isAllNumber
} from '@/utils'

import {
  TR_SETTING_IS_DIRECTLY_KEY,
  TR_SETTING_SKIP_CHINESE_KEY,
  TR_SETTING_KEYBOARD_CONTROL
} from '@/utils/constant'

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
        maxHeight: maxHeight,
        [isTop ? 'top' : 'bottom']: panelY
      }
    },

    resultPanelVisible() {
      const { panelVisible, selection, translateLoaded, hasAltControl, hasAltPressed } = this

      let condition = translateLoaded && panelVisible && selection
      
      if (hasAltControl) {
        condition = condition && hasAltPressed
      }

      return condition
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

      hasAltControl: false,
      hasAltPressed: false
    }
  },

  async mounted() {
    this.hasAltControl = (await this.$storage.get(TR_SETTING_KEYBOARD_CONTROL, false)) && !this.$root.inExtension

    if (this.hasAltControl) {
      document.addEventListener('keydown', this.onAltKeyDown)
    }
  },

  methods: {
    /**
     * ! 按键控制开启翻译
     */
    onAltKeyDown(e) {
      if (this.selection && e.altKey) {
        this.hasAltPressed = true
      }
    },

    hidePanel() {
      this.selection = ''
      this.translateLoaded = false
      this.hasAltPressed = false
    },

    async showPanel(text) {
      const { $root, $root: { count, translateDirectly, inExtension }, $storage } = this
      // 如果设置了直接翻译则直接显示结果面板
      const isDirectly = await $storage.get(TR_SETTING_IS_DIRECTLY_KEY)
      const keyboardCtrl = await $storage.get(TR_SETTING_KEYBOARD_CONTROL)
      if (inExtension) {
        this.panelVisible = true
      } else {
        this.panelVisible = isDirectly || keyboardCtrl
      }
      this.translationResult = null
      this.translateLoaded = false

      // 发送翻译请求
      this.translateText(text)
    },

    async translateText(text) {
      const { $root, $root: { count, translateDirectly, inExtension }, $storage } = this
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
