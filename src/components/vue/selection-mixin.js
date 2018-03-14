import { _calcPosition } from '@/utils'

export default {
  computed: {
    buttonPositionStyle() {
      const { buttonX, buttonY } = this.position
      return {
        left: buttonX + 'px',
        top: buttonY + 'px'
      }
    },

    panelPositionStyle() {
      const { panelX, panelY, isTop, maxHeight } = this.position
      return {
        left: panelX + 'px',
        maxHeight: maxHeight + 'px',
        [isTop ? 'top' : 'bottom']: panelY + 'px'
      }
    },

    resultPanelVisible() {
      const { showPanel, selection, translateLoaded } = this
      return translateLoaded && showPanel
    }
  },

  data() {
    return {
      selection: '',
      showPanel: false,
      translateLoaded: false,
      position: {
        panelX: 0,
        panelY: 0,
        buttonX: 0,
        buttonY: 0,
        maxHeight: 0,
        isTop: true
      },

      translationResult: Object.create(null)
    }
  },

  methods: {
    hidePanel() {
      this.translateLoaded = false
      this.showPanel = false
    },

    onMouseDown(e) {
      if (e.button === 0) {
        this.position = _calcPosition(e)

        const text = window
          .getSelection()
          .toString()
          .trim()

        this.selection = text

        if (text) {
          this.translationResult = null
          this.translateLoaded = false

          chrome.runtime.sendMessage({ name: 'translate', text }, res => {
            this.translationResult = res
            this.translateLoaded = true
          })
        }
      }
    }
  }
}
