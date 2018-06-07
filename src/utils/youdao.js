import api from '@/api'

const url = 'http://dict.youdao.com'
const loginURL =
  'http://account.youdao.com/login?service=dict&back_url=http://dict.youdao.com/wordbook/wordlist%3Fkeyfrom%3Dnull'

const addToVocabulary = word => {
  return new Promise((resolve, reject) => {
    chrome.cookies.get({ url, name: 'DICT_SESS' }, async cookie => {
      if (cookie) {
        const res = await api.addToYoudao(word)
        resolve(res)
      } else {
        chrome.tabs.create({
          url: loginURL
        })
      }
    })
  })
}

const delInVocabulary = word => {
  return new Promise((resolve, reject) => {
    chrome.cookies.get({ url, name: 'DICT_SESS' }, async cookie => {
      if (cookie) {
        const res = await api.delInYoudao(word)
        resolve(res)
      } else {
        chrome.tabs.create({
          url: loginURL
        })
      }
    })
  })
}

export default {
  addToVocabulary,
  delInVocabulary
}
