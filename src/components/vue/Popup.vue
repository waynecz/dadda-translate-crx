<template>
  <div class="popup">
    <div class="popup_banner"/>

    <div class="popup_item">
      <div class="popup_label">当前站点禁用</div>
      <div class="popup_content">
        <Switcher v-model="disabledInThisSite"/>
      </div>
    </div>

    <div class="popup_item">
      <div class="popup_label">是否直接翻译</div>
      <div class="popup_content">
        <Switcher v-model="translateDirectly"/>
      </div>
    </div>

    <div class="popup_item">
      <div class="popup_label">不翻译纯中文</div>
      <div class="popup_content">
        <Switcher v-model="skipChinese"/>
      </div>
    </div>

    <div class="popup_item">
      <div class="popup_label">自动朗读</div>
      <div class="popup_content">
        <Switcher v-model="autoSpeak"/>
      </div>
    </div>

    <div class="popup_item">
      <div class="popup_label">吐司弹词</div>
      <div class="popup_content">
        <Switcher v-model="hasToast"/>
      </div>
    </div>

    <div class="popup_button" @click="goVocabularry">
      <i class="__icon __icon-mao"/>
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
import {
  TR_SETTING_HAS_TOAST_KEY,
  TR_SETTING_IS_DIRECTLY_KEY,
  TR_SETTING_SKIP_CHINESE_KEY,
  TR_SETTING_BLACK_LIST_KEY,
  TR_SETTING_AUTO_SPEAK
} from '@/utils/constant'

import { _parseURL, _inBlackList } from '@/utils'

export default {
  name: 'popup',

  async created() {
    this.translateDirectly = await this.$storage.get(TR_SETTING_IS_DIRECTLY_KEY, false)
    this.hasToast = await this.$storage.get(TR_SETTING_HAS_TOAST_KEY, true)
    this.skipChinese = await this.$storage.get(TR_SETTING_SKIP_CHINESE_KEY, false)
    this.autoSpeak = await this.$storage.get(TR_SETTING_AUTO_SPEAK, false)

    chrome.tabs.query({ active: true, windowId: chrome.windows.WINDOW_ID_CURRENT }, async tabs => {
      const currentTab = tabs[0]
      this.currentHost = _parseURL(currentTab.url).host
      this.disabledInThisSite = await _inBlackList(this.currentHost)
    })
  },

  data() {
    return {
      currentHost: null,
      translateDirectly: false,
      hasToast: true,
      autoSpeak: false,
      skipChinese: false,
      disabledInThisSite: false
    }
  },

  watch: {
    translateDirectly(val) {
      this.$storage.set(TR_SETTING_IS_DIRECTLY_KEY, val)
    },

    hasToast(val) {
      this.$storage.set(TR_SETTING_HAS_TOAST_KEY, val)
    },

    skipChinese(val) {
      this.$storage.set(TR_SETTING_SKIP_CHINESE_KEY, val)
    },

    autoSpeak(val) {
      this.$storage.set(TR_SETTING_AUTO_SPEAK, val)
    },

    async disabledInThisSite(val) {
      const blackList = await this.$storage.get(TR_SETTING_BLACK_LIST_KEY, {})
      blackList[this.currentHost] = val

      this.$storage.set(TR_SETTING_BLACK_LIST_KEY, blackList)
    }
  },

  methods: {
    goVocabularry() {
      let isActive = false
      const vocabularyPath = chrome.runtime.getURL('options/options.html')
      chrome.tabs.query({ windowId: chrome.windows.WINDOW_ID_CURRENT }, tabs => {
        tabs.forEach(tab => {
          if (tab.url === vocabularyPath) {
            isActive = true
            chrome.tabs.update(tab.id, { active: true })
          }
        })

        if (!isActive) {
          chrome.tabs.create({ url: vocabularyPath })
        }
      })
    }
  }
}
</script>
