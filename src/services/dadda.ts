import request from 'axios'
import { CDN_HOST } from '@configs/hosts'
import { AxiosInstance, AxiosPromise } from 'axios'
import { IVersionInfo } from '@models/dadda';

const httpClient: AxiosInstance = request.create({
  baseURL: CDN_HOST
})

class Dadda {
  getUpdateinfo(): AxiosPromise<IVersionInfo> {
    return httpClient.get(`/dadda-update-info.json?t=${Date.now()}`)
  }
}

const DaddaService = new Dadda()

export default DaddaService

