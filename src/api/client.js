import axios from 'axios'
import { GOOGLE_HOST, SOUGOU_HOST, SHANBAY_HOST, CDN_HOST, YOUDAO_HOST } from './host'

export const google = axios.create({
  baseURL: GOOGLE_HOST
})

export const sougou = axios.create({
  baseURL: SOUGOU_HOST,
  headers: {
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,ja;q=0.7',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

export const shanbay = axios.create({
  baseURL: SHANBAY_HOST
})

export const cdn = axios.create({
  baseURL: CDN_HOST
})

export const youdao = axios.create({
  baseURL: YOUDAO_HOST
})

google.interceptors.response.use(res => res.data, error => error)
youdao.interceptors.response.use(res => res.data, error => error)
sougou.interceptors.response.use(res => res.data, error => error)
cdn.interceptors.response.use(res => res.data, error => error)
shanbay.interceptors.response.use(
  res => res.data,
  error => {
    console.warn('同步扇贝失败，请至扇贝手动操作')
    return Promise.reject(error)
  }
)
