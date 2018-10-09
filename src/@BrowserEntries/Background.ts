import HotReload from '../hot-reload-extension'
import * as browser from 'webextension-polyfill'
import {
  TR_SETTING_BLACK_LIST_KEY,
  TR_SETTING_HAS_TOAST_KEY,
  TR_SETTING_IS_DIRECTLY_KEY,
  TR_SETTING_SKIP_CHINESE_KEY,
  TR_SETTING_YOUDAO_SYNC,
  TR_SETTING_SHANBAY_SYNC,
  TR_SETTING_AUTO_SPEAK,
  TR_SETTING_ENGLISH_MEANING,
  TR_SETTING_KEYBOARD_CONTROL,
  TR_SETTING_FONT_FAMILY,
  TR_SETTING_CLOSE_ALL_TOAST_KEY,
  TR_SETTING_TARGET_LANG_KEY,
  TR_SETTING_SOURCE_LANG_KEY,
  TR_SETTING_ENGINE_KEY
} from '@configs/storage-keys'
import Storage from '@tools/storage'
import Alarm from '@tools/alarm'
import { IAlarmConfig, IOLVocaMessage } from '@models/dadda'
import DaddaService from '@services/dadda'
import OLVocabularyServices from '@services/online-vocabulary';
import { hasPrefix, removePrefix } from '@tools/dadda'
import { sleep } from '@tools/utils'
import Vocabulary from '@tools/vocabulary'
import Toast from '@tools/toast'
import { DICTIONARY_HOST } from '@configs/hosts'

// tslint:disable-next-line
if (!PRODUCTION) {
  HotReload()
}

browser.runtime.onInstalled.addListener(async reason => {
  if (reason.reason !== 'update') {
    Storage.set(TR_SETTING_BLACK_LIST_KEY, {})
    Storage.set(TR_SETTING_HAS_TOAST_KEY, true)
    Storage.set(TR_SETTING_IS_DIRECTLY_KEY, false)
    Storage.set(TR_SETTING_SKIP_CHINESE_KEY, true)
    Storage.set(TR_SETTING_YOUDAO_SYNC, false)
    Storage.set(TR_SETTING_SHANBAY_SYNC, false)
    Storage.set(TR_SETTING_AUTO_SPEAK, false)
    Storage.set(TR_SETTING_ENGLISH_MEANING, true)
    Storage.set(TR_SETTING_KEYBOARD_CONTROL, false)
    Storage.set(TR_SETTING_FONT_FAMILY, 'song')
    Storage.set(TR_SETTING_CLOSE_ALL_TOAST_KEY, false)

    Storage.set(TR_SETTING_TARGET_LANG_KEY, 'en')
    Storage.set(TR_SETTING_SOURCE_LANG_KEY, 'zh-CHS')
    Storage.set(TR_SETTING_ENGINE_KEY, 'sougou')
  } else {
    const {
      data: { version, brief }
    } = await DaddaService.getUpdateinfo()
    browser.notifications.clear('updateInfo')
    browser.notifications.create('updateInfo', {
      iconUrl: 'http://p5grwrmf4.bkt.clouddn.com/dadda-ico.png',
      type: 'basic',
      title: `${version} 更新`,
      message: brief,
      priority: 2,
      eventTime: Date.now() + 100000
    })
  }
})

browser.runtime.onMessage.addListener(
  (request, sender, sendRes): void | boolean => {
    const { name: type } = request
    switch (type) {
      case 'translate': {
        return true
      }

      case 'add_alarm': {
        Alarm.add(request.alarmConfig as IAlarmConfig)
        return true
      }

      case 'remove_alarm': {
        const { wordTxt } = request
        Alarm.remove(wordTxt)
        return true
      }

      case 'sync_with_online_voca': {
        const { wordTxt, whichVoca, operation }: IOLVocaMessage = request

        OLVocabularyServices[whichVoca][operation](wordTxt).then(res => {
          sendRes(res)
        })

        return true
      }

      // used for testing
      case 'test': {
        console.count('test response!!')
      }
    }
  }
)

browser.alarms.onAlarm.addListener(
  async ({ name: alarmID }): Promise<void> => {
    const toastONOFF = await Storage.get(TR_SETTING_HAS_TOAST_KEY)

    if (toastONOFF && hasPrefix(alarmID)) {
      const wordTxt = removePrefix(alarmID)
      const word = await Vocabulary.get(wordTxt)
      if (word) {
        Toast(wordTxt, word.example)
      }
    }
  }
)

browser.notifications.onClosed.addListener(
  (notificationID, byUser): void => {
    if (hasPrefix(notificationID) && byUser) {
      const wordTxt = removePrefix(notificationID)
      Vocabulary.forward(wordTxt)
    }
  }
)

browser.notifications.onClosed.addListener(
  async (notificationID, byUser): Promise<void> => {
    const isCloseAllToast = await Storage.get(TR_SETTING_CLOSE_ALL_TOAST_KEY)

    if (hasPrefix(notificationID) && byUser && isCloseAllToast) {
      const notificationIDs = await browser.notifications.getAll()

      for (let key in notificationIDs) {
        await sleep(50)

        if (hasPrefix(key)) {
          const wordTxt = removePrefix(key)
          Vocabulary.forward(wordTxt)
          browser.notifications.clear(key)
        }
      }
    }
  }
)

browser.notifications.onButtonClicked.addListener(
  async (notificationID, buttonID): Promise<void> => {
    if (hasPrefix(notificationID) && buttonID === 0) {
      const wordTxt = removePrefix(notificationID)
      if (await Storage.get(TR_SETTING_SHANBAY_SYNC)) {
        ShanbayVocabularyService.delete(wordTxt)
      }

      if (await Storage.get(TR_SETTING_YOUDAO_SYNC)) {
        YoudaoVocabularyService.delete(wordTxt)
      }

      Vocabulary.remove(wordTxt)
    }
  }
)

browser.notifications.onClicked.addListener(
  async (notificationID): Promise<void> => {
    if (notificationID === 'updateInfo') {
      browser.tabs.create({
        url: 'https://github.com/waynecz/dadda-translate-crx/releases'
      })
    }
    if (hasPrefix(notificationID)) {
      const wordTxt = removePrefix(notificationID)
      browser.tabs.create({ url: `${DICTIONARY_HOST}${encodeURI(wordTxt)}` })
      Vocabulary.forward(wordTxt)
    }
  }
)
