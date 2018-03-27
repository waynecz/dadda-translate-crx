import api from '@/api'
import HotReload from './hot-reload'
import Vocabulary from '@/utils/vocabulary'
import Storage from '@/utils/storage'
import Toast from '@/chrome/toast'
import { _removeTRId, _hasTRId, _wrapTRId } from '@/utils'
import { DELAY_MINS_IN_EVERY_STAGE, CAMBRIDGR_DICT_HOST, TR_SETTING_HAS_TOAST_KEY, TR_SETTING_IS_DIRECTLY_KEY } from '@/utils/constant'

HotReload()

const vocabularyBackgroundURL = chrome.runtime.getURL('options/options.html')

const setNewAlarm = ({ delayInMinutes, word }) => {
  const alarmId = _wrapTRId(word)

  chrome.alarms.clear(alarmId, wasCleared => {
    chrome.alarms.create(alarmId, {
      delayInMinutes,
      periodInMinutes: delayInMinutes
    })
  })
}

const moveWord2NextStage = async word => {
  const currentVocabulary = await Vocabulary.get()

  const targetWordObj = currentVocabulary.find(wordObj => wordObj.t === word)

  const { s: currentStage } = targetWordObj

  targetWordObj.s = currentStage + 1

  await Vocabulary.save(currentVocabulary)

  const delayInMinutes = DELAY_MINS_IN_EVERY_STAGE[targetWordObj.s]

  setNewAlarm({ delayInMinutes, word })
}

/**
 * @summary 插件第一次安装时设置初始值
 */
chrome.runtime.onInstalled.addListener(async reason => {
  if (reason.reason !== 'update') {
    Storage.set(TR_SETTING_HAS_TOAST_KEY, true)
    Storage.set(TR_SETTING_IS_DIRECTLY_KEY, false)
  }
})

/**
 * @summary chrome 通信
 */
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
      const { delayInMinutes, word } = request.alarmOption
      setNewAlarm({ delayInMinutes, word })
      return true
    }

    case 'clearAlarm': {
      const { word } = request
      chrome.alarms.clear(_wrapTRId(word))
      return true
    }
  }
})

/**
 * @summary 定时吐司
 * @param { alarm.name } 插件 ID 前缀加单词
 */
chrome.alarms.onAlarm.addListener(async alarm => {
  const toastLock = await Storage.get(TR_SETTING_HAS_TOAST_KEY)
  if (_hasTRId(alarm.name) && toastLock) {
    const currentVocabulary = await Vocabulary.get()
    const word = _removeTRId(alarm.name)

    const { d: translation } = currentVocabulary.find(wordObj => wordObj.t === word) || { d: '暂无翻译' }

    Toast(word, translation)
  }
})

/**
 * @summary 点击关闭将单词推入下一步
 */
chrome.notifications.onClosed.addListener(async (notiId, byUser) => {
  if (_hasTRId(notiId) && byUser) {
    const word = _removeTRId(notiId)
    moveWord2NextStage(word)
  }
})

/**
 * @summary 删除这个单词
 */
chrome.notifications.onButtonClicked.addListener(async (notiId, btnId) => {
  if (_hasTRId(notiId) && btnId === 0) {
    const word = _removeTRId(notiId)
    Vocabulary.remove(word)
  }
})

/**
 * @summary 点击 notification 打开剑桥辞典并且将单词推入下一步
 */
chrome.notifications.onClicked.addListener(async notiId => {
  if (_hasTRId(notiId)) {
    const word = _removeTRId(notiId)
    chrome.tabs.create({ url: `${CAMBRIDGR_DICT_HOST}${word}` })
    moveWord2NextStage(word)
  }
})
