const getStorageLocation = async _ => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get('__T_R_VOCA_LOCATION__', result => {
      resolve(result.__T_R_VOCA_LOCATION__ || 'local')
    })
  })
}

const StorageConstructor = async _ => {
  const position = await getStorageLocation()

  return {
    async set(key, value) {
      return new Promise((resolve, reject) => {
        chrome.storage[position].set({ [key]: value }, _ => {
          resolve()
        })
      })
    },

    async get(key) {
      return new Promise((resolve, reject) => {
        chrome.storage[position].get(key, result => {
          resolve(result[key])
        })
      })
    },

    async remove(key) {
      return new Promise((resolve, reject) => {
        chrome.storage[position].remove(key, result => {
          resolve()
        })
      })
    }
  }
}

export default StorageConstructor
