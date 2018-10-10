import request from 'axios'
import * as browser from 'webextension-polyfill'
import { YOUDAO_HOST, YOUDAo_LOGIN_URL } from '@configs/hosts'
import { youdao } from 'translation.js'
import { ITranslateDTO } from '@models/dadda'
import { AxiosInstance, AxiosPromise } from 'axios'

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
        url: YOUDAo_LOGIN_URL
      })
    }
  }

  return descriptor
}

class Youdao {
  translate(options: ITranslateDTO) {
    return youdao.translate(options)
  }

  @youdaoAuth
  public async add(wordTxt) {
    return youdaoAPI.add(wordTxt)
  }

  @youdaoAuth
  public async delete(wordTxt) {
    return youdaoAPI.delelte(wordTxt)
  }
}

const YoudaoService = new Youdao()

export default YoudaoService
