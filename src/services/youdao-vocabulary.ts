import request from '@tools/request'
import * as browser from 'webextension-polyfill'
import { YOUDAO_HOST } from '@configs/hosts'
import { AxiosInstance, AxiosPromise } from 'axios'

const youdaoLoginURL =
  'http://account.youdao.com/login?service=dict&back_url=http://dict.youdao.com/wordbook/wordlist%3Fkeyfrom%3Dnull'

const httpClient: AxiosInstance = request.create({
  baseURL: YOUDAO_HOST
})

const youdaoAPI = {
  add(word) {
    return httpClient('/wordbook/ajax', {
      params: {
        q: word,
        action: 'addword',
        date: encodeURI(new Date().toString()),
        le: 'eng'
      }
    })
  },

  delelte(word): AxiosPromise {
    return httpClient.put('/wordbook/ajax', {
      params: {
        q: word,
        action: 'delword',
        date: encodeURI(new Date().toString())
      }
    })
  }
}

function youdaoAuth(target, key: string, descriptor) {
  const originalMethod = descriptor.value

  descriptor.value = async function() {
    const cookie = await browser.cookies.get({
      url: YOUDAO_HOST,
      name: 'DICT_SESS'
    })

    if (cookie) {
      return originalMethod()
    } else {
      return browser.tabs.create({
        url: youdaoLoginURL
      })
    }
  }

  return descriptor
}

class YoudaoVocabulary {
  @youdaoAuth
  public async add(word) {
    return youdaoAPI.add(word)
  }

  @youdaoAuth
  public async delete(word) {
    return youdaoAPI.delelte(word)
  }
}

export default new YoudaoVocabulary()
