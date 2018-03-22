class Storage {
  constructor(position = 'sync') {
    this.changePosition(position)
  }

  /**
   * 更改生词簿存储位置，可选 local 和 sync
   */
  changePosition(storagePosition) {
    this.position = storagePosition
  }

  async set(key, value) {
    return new Promise((resolve, reject) => {
      chrome.storage[this.position].set({ [key]: value }, async _ => {
        if (key === '__T_R_VOCABULARY__') {
          chrome.runtime.sendMessage({ name: 'vocabularyChange' })
        }
        resolve()
      })
    })
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      chrome.storage[this.position].get(key, result => {
        resolve(result[key])
      })
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

export default Storage
