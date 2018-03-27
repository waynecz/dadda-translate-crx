<template>
  <div class="popup">
    <h1 class="popup_title">划词翻译</h1>

    <div class="popup_item">
      <div class="popup_label">是否直接翻译</div>
      <div class="popup_content">
        <Switcher v-model="translateDirectly"/>
      </div>
    </div>

    <div class="popup_item">
      <div class="popup_label">是否吐司弹词</div>
      <div class="popup_content">
        <Switcher v-model="hasToast"/>
      </div>
    </div>

    <div class="popup_button" @click="goVocabularry">
      <i class="__icon __icon-vocabulary"></i>
      查看生词簿
    </div>
  </div>
</template>

<script>
import { TR_SETTING_HAS_TOAST_KEY, TR_SETTING_IS_DIRECTLY_KEY } from '@/utils/constant'

export default {
  name: 'popup',

  async created() {
    this.translateDirectly = await this.$storage.get(TR_SETTING_IS_DIRECTLY_KEY, false)
    this.hasToast = await this.$storage.get(TR_SETTING_HAS_TOAST_KEY, true)
  },

  data() {
    return {
      translateDirectly: false,
      hasToast: true
    }
  },

  watch: {
    async translateDirectly(val) {
      await this.$storage.set(TR_SETTING_IS_DIRECTLY_KEY, val)
      chrome.runtime.sendMessage({ name: 'settingChange' })
    },

    hasToast(val) {
      this.$storage.set(TR_SETTING_HAS_TOAST_KEY, val)
    }
  },

  methods: {
    goVocabularry() {
      chrome.tabs.create({ url: chrome.runtime.getURL('options/options.html') })
    }
  }
}
</script>
