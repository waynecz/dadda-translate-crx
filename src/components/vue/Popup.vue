<template>
  <div class="popup">
    <div class="popup_banner"/>

    <div class="popup_item">
      <div class="popup_label">启用插件</div>
      <div class="popup_content">
        <Switcher v-model="endableTranslate"/>
      </div>
    </div>

    <div class="popup_item">
      <div class="popup_label">是否直接翻译</div>
      <div class="popup_content">
        <Switcher v-model="translateDirectly"/>
      </div>
    </div>

    <div class="popup_item">
      <div class="popup_label">吐司弹词</div>
      <div class="popup_content">
        <Switcher v-model="hasToast"/>
      </div>
    </div>

    <div class="popup_button" @click="goVocabularry">
      <i class="__icon __icon-paw"/>
      查看生词簿
    </div>

    <div class="popup_footer">
      <a href="https://github.com/waynecz/dadda-translate-crx" target="_blank" class="popup_link">
        <i class="__icon __icon-git"/>
      </a>
    </div>
  </div>
</template>

<script>
import { TR_SETTING_HAS_TOAST_KEY, TR_SETTING_IS_DIRECTLY_KEY, TR_SETTING_IS_ENABLE_KEY } from '@/utils/constant'

export default {
  name: 'popup',

  async created() {
    this.translateDirectly = await this.$storage.get(TR_SETTING_IS_DIRECTLY_KEY, false)
    this.hasToast = await this.$storage.get(TR_SETTING_HAS_TOAST_KEY, true)
    this.endableTranslate = await this.$storage.get(TR_SETTING_IS_ENABLE_KEY, true)
  },

  data() {
    return {
      translateDirectly: false,
      hasToast: true,
      endableTranslate: true
    }
  },

  watch: {
    translateDirectly(val) {
      this.$storage.set(TR_SETTING_IS_DIRECTLY_KEY, val)
    },

    hasToast(val) {
      this.$storage.set(TR_SETTING_HAS_TOAST_KEY, val)
    },

    endableTranslate(val) {
      this.$storage.set(TR_SETTING_IS_ENABLE_KEY, val)
    }
  },

  methods: {
    goVocabularry() {
      chrome.tabs.create({ url: chrome.runtime.getURL('options/options.html') })
    }
  }
}
</script>
