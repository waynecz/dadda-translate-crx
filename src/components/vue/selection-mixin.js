import { _calcPosition } from '@/utils'

export default {
  computed: {
    positionStyle() {
      const { x, y, isTop, maxHeight } = this.position
      return {
        left: x + 'px',
        maxHeight: maxHeight + 'px',
        [isTop ? 'top' : 'bottom']: y + 'px'
      }
    },

    resultPanelVisible() {
      const { selection, translateLoaded } = this
      return selection && translateLoaded
    }
  },

  data() {
    return {
      selection: '',
      translateLoaded: false,
      position: {
        x: 0,
        y: 0,
        maxHeight: 0,
        isTop: true
      },

      translationResult: Object.create(null)
    }
  },

  methods: {
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
