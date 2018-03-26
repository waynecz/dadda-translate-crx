import { TR_STORAGE_KEY } from '@/utils/constant'
import StorageConstructor from '@/utils/storage'

const Storage = new StorageConstructor()

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
    return currentVocabulary.some(wordObj => wordObj.t === word)
  }

  // 添加词汇
  async add(wordObj, vocabulary) {
    const currentVocabulary = vocabulary || (await this.get())

    const newVocabulary = [wordObj, ...currentVocabulary]

    return this.save(newVocabulary)
  }

  // 删除词汇
  async remove(word, vocabulary) {
    const currentVocabulary = vocabulary || (await this.get())

    const index = currentVocabulary.findIndex(wordObj => wordObj.t === word)

    if (index === -1) {
      return console.warn('[T & R]:', `【${this.text}】is not in the vocabulary!`)
    }

    currentVocabulary.splice(index, 1)

    return this.save(currentVocabulary)
  }

  // 改变词汇阶段
  async setStage({ word, stage }, vocabulary) {
    const currentVocabulary = vocabulary || (await this.get())

    const wordObj = currentVocabulary.find(wordObj => wordObj.t === word)

    wordObj.s = stage > 5 ? 5 : stage

    return this.save(currentVocabulary)
  }
}

export default new Vocabulary()
