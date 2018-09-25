import request from '@tools/request'
import { CDN_HOST } from '@configs/hosts'
import { AxiosInstance } from 'axios'

const httpClient: AxiosInstance = request.create({
  baseURL: CDN_HOST
})

class Dadda {
  getUpdateinfo() {
    return httpClient(`/dadda-update-info.json?t=${Date.now()}`)
  }
}

export default new Dadda()
