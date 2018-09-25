import { IWord, TVocabulary } from './../models/dadda'
import { TR_VOCABULARY_STORE_KEY } from '@configs/Storage-keys'
import storage from '@tools/storage'
import * as browser from 'webextension-polyfill'
import { DELAY_MINS_IN_EVERY_STAGE } from '@configs/dadda'
import logger from '@tools/logger'

class Vocabulary {
  get(): Promise<TVocabulary> {
    return storage.get(TR_VOCABULARY_STORE_KEY, [] as TVocabulary)
  }

  save(vocabulary: TVocabulary): Promise<void> {
    return storage.set(TR_VOCABULARY_STORE_KEY, vocabulary)
  }

  // decide if the word is already in vocabulary
  async has(text: string, vocabulary?: TVocabulary): Promise<boolean> {
    const currentVocabulary = vocabulary || (await this.get())
    return currentVocabulary.some(
      word => word.text.toLowerCase() === text.toLowerCase()
    )
  }

  // add word or phrase to vocabulary
  async add(word: IWord, stage: number = 1): Promise<void> {
    const currentVocabulary = await this.get()
    const newVocabulary = [word, ...currentVocabulary]

    await this.save(newVocabulary)

    const alarmConfig = {
      delayInMinutes: DELAY_MINS_IN_EVERY_STAGE[stage],
      text: word.text
    }

    browser.runtime.sendMessage({ name: 'setAlarm', alarmConfig })
  }

  // remove
  async remove(text: string): Promise<void> {
    const currentVocabulary = await this.get()

    const index = currentVocabulary.findIndex(word => word.text === text)

    if (index === -1) {
      return logger(`"${text}" is not in vocabulary!`)
    }

    currentVocabulary.splice(index, 1)

    await this.save(currentVocabulary)

    browser.runtime.sendMessage({ name: 'clearAlarm', text })
  }

  // set the stage of word
  async setStage(text: string, stage: number, vocabulary?: TVocabulary): Promise<void> {
    vocabulary = vocabulary || (await this.get())

    const word = vocabulary.find(word => word.text === text)

    word.stage = stage

    const alarmConfig = {
      delayInMinutes: DELAY_MINS_IN_EVERY_STAGE[stage],
      text
    }

    browser.runtime.sendMessage({ name: 'setAlarm', alarmConfig })

    await this.save(vocabulary)
  }

  // move word to next stage
  async forward(text: string): Promise<void> {
    const vocabulary = await this.get()

    const word = vocabulary.find(word => word.text === text)

    const currentStage = word.stage
    let nextStage: number

    if (currentStage < 5) {
      nextStage = currentStage + 1
    } else if (currentStage >= 5) {
      nextStage = 5
    }

    await this.setStage(text, nextStage)
  }

  // move word to previous stage
  async back(text: string): Promise<void> {
    const vocabulary = await this.get()

    const word = vocabulary.find(word => word.text === text)

    const currentStage = word.stage
    let nextStage: number

    if (currentStage > 1) {
      nextStage = currentStage - 1
    } else if (currentStage <= 1) {
      nextStage = 1
    }

    await this.setStage(text, nextStage)
  }
}

export default new Vocabulary()
