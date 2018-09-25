import request from '@tools/request'
import * as browser from 'webextension-polyfill'
import { SHANBAY_HOST } from '@configs/hosts'
import { AxiosInstance, AxiosPromise } from 'axios'

const shanbayLoginURL = `${SHANBAY_HOST}/web/account/login`

const httpClient: AxiosInstance = request.create({
  baseURL: SHANBAY_HOST
})

const shanbayAPI = {
  translate(text): AxiosPromise {
    return httpClient(`/api/v1/bdc/search/?word=${text}`)
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

class ShanbayVocabulary {
  @shanbayAuth
  public async add(word) {
    const { data } = await shanbayAPI.translate(word)

    return shanbayAPI.add(data.id)
  }

  @shanbayAuth
  public async delete(word) {
    const { data } = await shanbayAPI.translate(word)
    if (data.learning_id) {
      return shanbayAPI.delelte(data.learning_id)
    }
  }
}

export default new ShanbayVocabulary()
