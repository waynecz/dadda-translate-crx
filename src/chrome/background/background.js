import api from '@/api'
import HotReload from './hot-reload'
import VocabularyMachine from '@/utils/vocabulary'
import Toast from '@/chrome/toast'
import { _removeTRId, _hasTRId, _wrapTRId } from '@/utils'
import { DELAY_MINS_IN_EVERY_STAGE } from '@/utils/constant'

const vocabularyBackgroundURL = chrome.runtime.getURL('options/options.html')

HotReload()

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
 * @param { alarm.name } 插件 ID 前缀加单词
 */
chrome.alarms.onAlarm.addListener(async alarm => {
  if (_hasTRId(alarm.name)) {
    const currentVocabulary = await VocabularyMachine.get()
    const word = _removeTRId(alarm.name)
    const target = currentVocabulary.find(wordObj => wordObj.t === word)

    const { d: translation, s: stage } = target

    Toast(word, translation)

    // 一次弹出后立即进入下个阶段
    if (stage < 5) {
      targetWord.s = stage + 1

      chrome.alarms.create(alarm.name, {
        delayInMinutes: DELAY_MINS_IN_EVERY_STAGE[target.s]
      })

      // 注意这里 vocabulary 已经被更新了！！
      VocabularyMachine.save(currentVocabulary)
    } else {
      chrome.runtime.sendMessage({ name: 'clearAlarm', word })
    }
  }
})

chrome.notifications.onClosed.addListener(async (notiId, byUser) => {
  console.log('notiId', notiId)
})

chrome.notifications.onClicked.addListener(async notiId => {
  if (_hasTRId(notiId)) {
    chrome.tabs.create({ url: vocabularyBackgroundURL })
  }
})
