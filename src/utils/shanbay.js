import api from '@/api'

const addToShanbayVocabulary = word => {
  return new Promise((resolve, reject) => {
    chrome.cookies.get({ url: 'http://www.shanbay.com', name: 'auth_token' }, async cookie => {
      debugger
      if (cookie) {
        const { data } = await api.shanbayTranslate(word)
        const res = await api.addToShanbayVocabulary(data.id)
        resolve(res)
      } else {
        chrome.tabs.create({ url: 'https://www.shanbay.com/web/account/login' })
      }
    })
  })
}

const delInShanbayVocabulary = word => {
  return new Promise((resolve, reject) => {
    chrome.cookies.get({ url: 'http://www.shanbay.com', name: 'auth_token' }, async cookie => {
      if (cookie) {
        const { data } = await api.shanbayTranslate(word)
        if (data.learning_id) {
          const res = await api.delInShanbayVocabulary(data.learning_id)
          resolve(res)
        }
      } else {
        chrome.tabs.create({ url: 'https://www.shanbay.com/web/account/login' })
      }
    })
  })
}

export default {
  addToShanbayVocabulary,
  delInShanbayVocabulary
}
