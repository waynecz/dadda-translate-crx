import { TR_VOCABULARY_STORE_KEY } from '@configs/storage-keys'
import {EStoragePosition} from '@models/browser'
import * as browser from 'webextension-polyfill'
import logger from '@tools/logger'

class storage {
  readonly position = EStoragePosition.local

  async set(key: string, value): Promise<void> {
    console.log(this.position)
    await browser.storage[this.position].set({ [key]: value })

    if (key === TR_VOCABULARY_STORE_KEY) {
      browser.runtime.sendMessage({ name: 'vocabularyChange' })
    }
  }

  async get<T>(key: string, defaultValue: T = undefined): Promise<T> {
    const result = await browser.storage[this.position].get(key)

    if (result[key] || typeof result[key] === 'boolean') {
      return result[key]
    }

    return defaultValue
  }

  async remove(key: string): Promise<void> {
    await browser.storage[this.position].remove(key)
    logger(key, ' has been removed!')
  }
}

const Storage = new storage()

export default Storage
