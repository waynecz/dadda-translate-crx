const getStorageLocation = async _ => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get('__T_R_VOCA_LOCATION__', result => {
      resolve(result.__T_R_VOCA_LOCATION__ || 'local')
    })
  })
}

class Storage {
  constructor(storagePosition) {
    this.changePosition(storagePosition)
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
        console.log(await this.get(key))
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
        resolve()
      })
    })
  }
}

const StorageConstructor = async _ => {
  const position = await getStorageLocation()

  return new Storage(position)
}

export default StorageConstructor
