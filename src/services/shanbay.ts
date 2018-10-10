import request from 'axios'
import * as browser from 'webextension-polyfill'
import { SHANBAY_HOST } from '@configs/hosts'
import { AxiosInstance, AxiosPromise } from 'axios'

const shanbayLoginURL = `${SHANBAY_HOST}/web/account/login`

const httpClient: AxiosInstance = request.create({
  baseURL: SHANBAY_HOST
})

const shanbayAPI = {
  translate(wordTxt): AxiosPromise {
    return httpClient(`/api/v1/bdc/search/?word=${wordTxt}`)
  },

  add(id): AxiosPromise {
    return httpClient.post('/api/v1/bdc/learning/', {
      content_type: 'vocabulary',
      id
    })
  },

  delelte(learningId): AxiosPromise {
    return httpClient.put(`/api/v1/bdc/learning/${learningId}`, {
      retention: 1
    })
  }
}

function shanbayAuth(target, key: string, descriptor) {
  const originalMethod = descriptor.value

  descriptor.value = async function() {
    const cookie = await browser.cookies.get({
      url: SHANBAY_HOST,
      name: 'auth_token'
    })

    if (cookie) {
      return originalMethod()
    } else {
      return browser.tabs.create({
        url: shanbayLoginURL
      })
    }
  }

  return descriptor
  
}

class Shanbay {
  @shanbayAuth
  public async add(wordTxt) {
    const { data } = await shanbayAPI.translate(wordTxt)

    return shanbayAPI.add(data.id)
  }

  @shanbayAuth
  public async delete(wordTxt) {
    const { data } = await shanbayAPI.translate(wordTxt)
    if (data.learning_id) {
      return shanbayAPI.delelte(data.learning_id)
    }
  }
}

const ShanbayService = new Shanbay()

export default ShanbayService

