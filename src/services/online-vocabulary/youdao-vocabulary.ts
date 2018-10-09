import request from 'axios'
import * as browser from 'webextension-polyfill'
import { YOUDAO_HOST } from '@configs/hosts'
import { AxiosInstance, AxiosPromise } from 'axios'

const youdaoLoginURL =
  'http://account.youdao.com/login?service=dict&back_url=http://dict.youdao.com/wordbook/wordlist%3Fkeyfrom%3Dnull'

const httpClient: AxiosInstance = request.create({
  baseURL: YOUDAO_HOST
})

const youdaoAPI = {
  add(wordTxt: string) {
    return httpClient('/wordbook/ajax', {
      params: {
        q: wordTxt,
        action: 'addword',
        date: encodeURI(new Date().toString()),
        le: 'eng'
      }
    })
  },

  delelte(wordTxt: string): AxiosPromise {
    return httpClient.put('/wordbook/ajax', {
      params: {
        q: wordTxt,
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

class youdaoVocabulary {
  @youdaoAuth
  public async add(wordTxt) {
    return youdaoAPI.add(wordTxt)
  }

  @youdaoAuth
  public async delete(wordTxt) {
    return youdaoAPI.delelte(wordTxt)
  }
}

const YoudaoVocabularyService = new youdaoVocabulary()

export default YoudaoVocabularyService
