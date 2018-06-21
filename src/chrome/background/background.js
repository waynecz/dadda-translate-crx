import api from '@/api'

import Vocabulary from '@/utils/vocabulary'
import Storage from '@/utils/storage'
import shanbay from '@/utils/shanbay.js'
import youdao from '@/utils/youdao.js'

import Toast from '@/chrome/toast'
import setNewAlarm from '@/chrome/alarm'

import { _removeTRId, _hasTRId, _wrapTRId, _sleep } from '@/utils'
import { SOUGOU_SPOKEN_URL, DICTIONARY_HOST } from '@/api/host'
import {
  DELAY_MINS_IN_EVERY_STAGE,
  TR_SETTING_HAS_TOAST_KEY,
  TR_SETTING_IS_DIRECTLY_KEY,
  TR_SETTING_BLACK_LIST_KEY,
  TR_SETTING_SKIP_CHINESE_KEY,
  TR_SETTING_AUTO_SPEAK,
  TR_SETTING_FONT_FAMILY,
  TR_STORAGE_KEY,
  TR_SETTING_SHANBAY,
  TR_SETTING_YOUDAO,
  TR_SETTING_ENGLISH_MEANING,
  TR_SETTING_KEYBOARD_CONTROL,
  TR_SETTING_CLOSE_ALL_TOAST_KEY
} from '@/utils/constant'

import HotReload from './hot-reload'

// 开发环境热加载
HotReload()

// 将单词推入下一个阶段
const moveWord2NextStage = async word => {
  const nextStage = await Vocabulary.setStage({ word, acc: true })

  const delayInMinutes = DELAY_MINS_IN_EVERY_STAGE[nextStage]

  setNewAlarm({ delayInMinutes, word })
}

/**
 * @summary 插件第一次安装时设置初始值
 */
chrome.runtime.onInstalled.addListener(async reason => {
  if (reason.reason !== 'update') {
    Storage.set(TR_SETTING_BLACK_LIST_KEY, {})
    Storage.set(TR_SETTING_HAS_TOAST_KEY, true)
    Storage.set(TR_SETTING_IS_DIRECTLY_KEY, false)
    Storage.set(TR_SETTING_SKIP_CHINESE_KEY, true)
    Storage.set(TR_SETTING_SHANBAY, false)
    Storage.set(TR_SETTING_YOUDAO, false)
    Storage.set(TR_SETTING_AUTO_SPEAK, false)
    Storage.set(TR_SETTING_ENGLISH_MEANING, true)
    Storage.set(TR_SETTING_KEYBOARD_CONTROL, false)
    Storage.set(TR_SETTING_FONT_FAMILY, 'song')
    Storage.set(TR_SETTING_CLOSE_ALL_TOAST_KEY, false)
  } else {
    const { version, breif } = await api.getUpdateInfo()
    chrome.notifications.clear('updateInfo')
    chrome.notifications.create('updateInfo', {
      iconUrl: 'http://p5grwrmf4.bkt.clouddn.com/dadda-ico.png',
      type: 'basic',
      title: `${version} 更新`,
      message: breif,
      priority: 2,
      eventTime: Date.now() + 100000
    })
  }
})

// 兼容 1.0.0 版本的在 Chrome 云端同步的数据
chrome.storage['sync'].get(TR_STORAGE_KEY, async data => {
  data = data || {}
  const currentVocabulary = Vocabulary.get()
  const synchronousVoca = data[TR_STORAGE_KEY] || []

  if (synchronousVoca.length) {
    await Promise.all(
      synchronousVoca.map(wordObj => {
        chrome.alarms.clear(_wrapTRId(wordObj.t))
        return Vocabulary.add(wordObj, null, wordObj.s)
      })
    )
    chrome.storage.sync.set({ [TR_STORAGE_KEY]: [] })
  }
})

/**
 * @summary chrome 通信
 */
chrome.runtime.onMessage.addListener((request, sender, sendRes) => {
  const { name: type } = request
  switch (type) {
    case 'translate': {
      api.sougouTranslate(request.text).then(async res => {
        if (!request.inExtension) {
          await _sleep(100)
        }
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

    case 'addToShanbay': {
      const { word } = request
      shanbay.addToShanbayVocabulary(word).then(res => {
        sendRes(res)
      })
      return true
    }

    case 'delInShanbay': {
      const { word } = request
      shanbay.delInShanbayVocabulary(word).then(res => {
        sendRes(res)
      })
      return true
    }

    case 'addToYoudao': {
      const { word } = request
      youdao.addToVocabulary(word).then(res => {
        sendRes(res)
      })
      return true
    }

    case 'delInYoudao': {
      const { word } = request
      youdao.delInVocabulary(word).then(res => {
        sendRes(res)
      })
      return true
    }

    /**
     * @summary 用来测试样一些非 content 页面的打点之类的
     */
    case 'test': {
      console.count('test response!!')
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

    Toast(word, 'Click to see at dictionary.com')
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
 * @summary 点击关闭所有吐司,将单词推入下一步
 */
chrome.notifications.onClosed.addListener(async (notiId, byUser) => {
  const isCloseAllToast = await Storage.get(TR_SETTING_CLOSE_ALL_TOAST_KEY)
  if (_hasTRId(notiId) && byUser && isCloseAllToast) {
    chrome.notifications.getAll(async (notifications) => {
      for (let key in notifications) {
        await new Promise(resolve => {
          setTimeout(resolve, 50)
        })
        if (_hasTRId(key)) {
          const word = _removeTRId(key)
          moveWord2NextStage(word)
          chrome.notifications.clear(key)
        }
      }
    })
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
  if (notiId === 'updateInfo') {
    chrome.tabs.create({ url: 'https://github.com/waynecz/dadda-translate-crx/releases' })
  }
  if (_hasTRId(notiId)) {
    const word = _removeTRId(notiId)
    chrome.tabs.create({ url: `${DICTIONARY_HOST}${word}` })
    moveWord2NextStage(word)
  }
})
