import { IWord, TVocabulary, TSage } from './../models/dadda'
import { TR_VOCABULARY_STORE_KEY } from '@configs/Storage-keys'
import Storage from '@tools/Storage'
import * as browser from 'webextension-polyfill'
import { DELAY_MINS_IN_EVERY_STAGE } from '@configs'
import logger from '@tools/logger';

class Vocabulary {
  get(): Promise<TVocabulary> {
    return Storage.get(TR_VOCABULARY_STORE_KEY, [] as TVocabulary)
  }

  save(vocabulary: TVocabulary): Promise<void> {
    return Storage.set(TR_VOCABULARY_STORE_KEY, vocabulary)
  }

  // decide if the word is already in vocabulary
  async has(text: string, vocabulary?: TVocabulary): Promise<boolean> {
    const currentVocabulary = vocabulary || (await this.get())
    return currentVocabulary.some(
      word => word.text.toLowerCase() === text.toLowerCase()
    )
  }

  async add(
    word: IWord,
    stage: TSage = 1,
    vocabulary?: TVocabulary
  ): Promise<void> {
    const currentVocabulary = vocabulary || (await this.get())
    const newVocabulary = [word, ...currentVocabulary]

    await this.save(newVocabulary)

    const alarmConfig = {
      delayInMinutes: DELAY_MINS_IN_EVERY_STAGE[stage],
      text: word.text
    }

    browser.runtime.sendMessage({ name: 'setAlarm', alarmConfig })
  }

  async remove(text: string, vocabulary: TVocabulary): Promise<void> {
    const currentVocabulary = vocabulary || (await this.get())

    const index = currentVocabulary.findIndex(word => word.text === text)

    if (index === -1) {
      return logger(`"${text}" is not in vocabulary!`)
    }

    currentVocabulary.splice(index, 1)

    await this.save(currentVocabulary)

    browser.runtime.sendMessage({ name: 'clearAlarm', text })
  }

  async setStage
}

export default new Vocabulary()
