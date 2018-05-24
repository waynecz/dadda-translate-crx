import { TR_STORAGE_KEY } from '@/utils/constant'

class Storage {
  constructor() {
    this.changePosition('local')
  }

  /**
   * @deprecated 因为 sync 的存储大小有很大的限制，所以改用 local
   * @Last-version 更改生词簿存储位置，可选 local 和 sync
   */
  changePosition(storagePosition) {
    this.position = storagePosition
  }

  async set(key, value) {
    return new Promise((resolve, reject) => {
      chrome.storage['local'].set({ [key]: value }, async _ => {
        if (key === TR_STORAGE_KEY) {
          chrome.runtime.sendMessage({ name: 'vocabularyChange' })
        }
        resolve()
      })
    })
  }

  async get(key, defaultValue = undefined) {
    return new Promise((resolve, reject) => {
      if (key === TR_STORAGE_KEY) {
        chrome.storage['local'].get(key, localData => {
          const localVoca = localData[key] || []
          resolve(localVoca)
        })
      } else {
        chrome.storage[this.position].get(key, result => {
          if (result[key] || typeof result[key] === 'boolean') {
            resolve(result[key])
          }

          resolve(defaultValue)
        })
      }
    })
  }

  async remove(key) {
    return new Promise((resolve, reject) => {
      chrome.storage[this.position].remove(key, result => {
        console.log(key, 'remove done!')
        resolve()
      })
    })
  }
}

export default new Storage()
