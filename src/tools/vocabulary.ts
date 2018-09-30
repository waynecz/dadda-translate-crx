import { IWord, TVocabulary } from './../models/dadda'
import { TR_VOCABULARY_STORE_KEY } from '@configs/storage-keys'
import Storage from '@tools/storage'
import * as browser from 'webextension-polyfill'
import { DELAY_MINS_IN_EVERY_STAGE } from '@configs/dadda'
import logger from '@tools/logger'

class vocabulary {
  getAll(): Promise<TVocabulary> {
    return Storage.get(TR_VOCABULARY_STORE_KEY, [] as TVocabulary)
  }

  save(vocabulary: TVocabulary): Promise<void> {
    if (!)
    return Storage.set(TR_VOCABULARY_STORE_KEY, vocabulary)
  }

  // decide if the word is already in vocabulary
  async has(wordTxt: string, vocabulary?: TVocabulary): Promise<boolean> {
    if (!wordTxt) {
      logger(`param: wordTxt required!`)
      return null 
    }
    const currentVocabulary = vocabulary || (await this.getAll())
    return currentVocabulary.some(
      word => word.text.toLowerCase() === wordTxt.toLowerCase()
    )
  }

  async get(wordTxt: string, vocabulary?: TVocabulary): Promise<IWord> {
    if (!wordTxt) {
      logger(`param: wordTxt required`)
      return null 
    }
    const currentVocabulary = vocabulary || (await this.getAll())

    return currentVocabulary.find(
      word => word.text.toLowerCase() === wordTxt.toLowerCase()
    )
  }

  // add word or phrase to vocabulary
  async add(word: IWord, stage: number = 1): Promise<void> {
    const currentVocabulary = await this.getAll()
    const newVocabulary = [word, ...currentVocabulary]

    await this.save(newVocabulary)

    const alarmConfig = {
      delayInMinutes: DELAY_MINS_IN_EVERY_STAGE[stage],
      text: word.text
    }

    browser.runtime.sendMessage({ name: 'add_alarm', alarmConfig })
  }

  // remove
  async remove(wordTxt: string): Promise<void> {
    const currentVocabulary = await this.getAll()

    const index = currentVocabulary.findIndex(word => word.text === wordTxt)

    if (index === -1) {
      return logger(`"${wordTxt}" is not in vocabulary!`)
    }

    currentVocabulary.splice(index, 1)

    await this.save(currentVocabulary)

    browser.runtime.sendMessage({ name: 'remove_alarm', wordTxt })
  }

  // set the stage of word
  async setStage(wordTxt: string, stage: number, vocabulary?: TVocabulary): Promise<void> {
    vocabulary = vocabulary || (await this.getAll())

    const word = vocabulary.find(word => word.text === wordTxt)

    word.stage = stage

    const alarmConfig = {
      delayInMinutes: DELAY_MINS_IN_EVERY_STAGE[stage] as number,
      wordTxt
    }

    browser.runtime.sendMessage({ name: 'add_alarm', alarmConfig })

    await this.save(vocabulary)
  }

  // move word to next stage
  async forward(wordTxt: string): Promise<void> {
    const vocabulary = await this.getAll()

    const word = vocabulary.find(word => word.text === wordTxt)

    const currentStage = word.stage
    let nextStage: number

    if (currentStage < 5) {
      nextStage = currentStage + 1
    } else if (currentStage >= 5) {
      nextStage = 5
    }

    await this.setStage(wordTxt, nextStage)
  }

  // move word to previous stage
  async back(wordTxt: string): Promise<void> {
    const vocabulary = await this.getAll()

    const word = vocabulary.find(word => word.text === wordTxt)

    const currentStage = word.stage
    let nextStage: number

    if (currentStage > 1) {
      nextStage = currentStage - 1
    } else if (currentStage <= 1) {
      nextStage = 1
    }

    await this.setStage(wordTxt, nextStage)
  }
}

const Vocabulary = new vocabulary()

export default Vocabulary

