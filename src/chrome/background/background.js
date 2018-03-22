import api from '@/api'
import HotReload from './hot-reload'
import StorageConstructor from '@/utils/storage'
import Toast from '@/chrome/toast'
import { _removeTRId, _hasTRId, _wrapTRId } from '@/utils'
import { DELAY_MINS_IN_EVERY_STAGE } from '@/utils/constant'

HotReload()
const Storage = new StorageConstructor()

/**
 * @summary chrome 通信
 */
/* eslint-disable no-undef */
chrome.runtime.onMessage.addListener((request, sender, sendRes) => {
  const { name: type } = request
  switch (type) {
    case 'translate': {
      api.sougouTranslate(request.text).then(res => {
        sendRes(res)
      })
      return true
    }

    case 'setAlarm': {
      let { delayInMinutes, word } = request.initAlarmOption
      let wordWithId = _wrapTRId(word)
      chrome.alarms.create(wordWithId, {
        delayInMinutes
      })
      return true
    }

    case 'clearAlarm': {
      let { word } = request
      chrome.alarms.clear(_wrapTRId(word))
      return true
    }
  }
})

/**
 * @summary 定时吐司 Handler
 */
chrome.alarms.onAlarm.addListener(async alarm => {
  if (_hasTRId(alarm.name)) {
    const words = await Storage.get('__T_R_VOCABULARY__')
    const wordText = _removeTRId(alarm.name)
    const targetWord = words.find(word => word.t === wordText)

    const { t: text, d: translation, s: stage } = targetWord

    Toast(text, translation)

    // 一次弹出后立即进入下个阶段
    if (stage < 5) {
      targetWord.s = stage + 1

      chrome.alarms.create(alarm.name, {
        delayInMinutes: DELAY_MINS_IN_EVERY_STAGE[targetWord.s]
      })

      // 注意这里 words 已经被更新了！！
      Storage.set('__T_R_VOCABULARY__', words)
    } else {
      chrome.runtime.sendMessage({ name: 'clearAlarm', word: wordText })
    }
  }
})
