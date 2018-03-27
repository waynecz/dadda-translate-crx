import { TR_STORAGE_KEY, DELAY_MINS_IN_EVERY_STAGE } from '@/utils/constant'
import { _wrapTRId } from '@/utils'
import Storage from '@/utils/storage'

class Vocabulary {
  constructor() {
    this.storageKey = TR_STORAGE_KEY
  }

  // 获取词汇表
  get() {
    return Storage.get(this.storageKey)
  }

  save(vocabulary) {
    return Storage.set(this.storageKey, vocabulary)
  }

  // 判断词汇是否已经在内
  async has(word, vocabulary) {
    const currentVocabulary = vocabulary || (await this.get())
    return currentVocabulary.some(wordObj => wordObj.t.toLowerCase() === word.toLowerCase())
  }

  // 添加词汇
  async add(wordObj, vocabulary) {
    const currentVocabulary = vocabulary || (await this.get())

    const newVocabulary = [wordObj, ...currentVocabulary]

    await this.save(newVocabulary)

    const alarmOption = {
      delayInMinutes: DELAY_MINS_IN_EVERY_STAGE[1],
      word: wordObj.t
    }

    return chrome.runtime.sendMessage({ name: 'setAlarm', alarmOption })
  }

  // 删除词汇
  async remove(word, vocabulary) {
    const currentVocabulary = vocabulary || (await this.get())

    const index = currentVocabulary.findIndex(wordObj => wordObj.t === word)

    if (index === -1) {
      return console.warn('[T & R]:', `【${this.text}】is not in the vocabulary!`)
    }

    currentVocabulary.splice(index, 1)

    await this.save(currentVocabulary)

    if (chrome.alarms) {
      chrome.alarms.clear(_wrapTRId(word))
    } else {
      chrome.runtime.sendMessage({ name: 'clearAlarm', word })
    }
  }

  // 改变词汇阶段
  async setStage({ word, stage }, vocabulary) {
    const currentVocabulary = vocabulary || (await this.get())

    const wordObj = currentVocabulary.find(wordObj => wordObj.t === word)

    wordObj.s = stage > 5 ? 5 : stage

    const alarmOption = {
      delayInMinutes: DELAY_MINS_IN_EVERY_STAGE[stage],
      word
    }

    chrome.runtime.sendMessage({ name: 'setAlarm', alarmOption })

    return this.save(currentVocabulary)
  }
}

export default new Vocabulary()
