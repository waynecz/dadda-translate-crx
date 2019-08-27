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

export function getTokenFromSougou() {
  // 尝试获取 token
  return new Promise(async (resolve, reject) => {
    function failed() {
      reject(new Error('Sougou translate get token failed'))
    }

    let token = ''
    let m = null

    let s = await sougou.get('/')
    let lt = await sougou.get('/logtrace').catch(() => '')

    m = lt.match(/['"](.+?)['"]/g)

    if (m && m.length > 0) {
      token = m.reduce((result, i) => {
        result += i.replace(/['"]/g, '')
        return result
      }, '')
    } else {
      m = /js\/app\.([^.]+)/.exec(s)
      if (!m) return failed()
      s = await sougou.get('https://dlweb.sogoucdn.com/translate/pc/static/js/app.' + m[1] + '.js')
      m = /""\+\w\+\w\+\w\+"(\w{32})"/.exec(s)
      if (!m) return failed()
      token = m[1]
    }

    if (!token || token.length !== 32) {
      failed()
    } else {
      resolve(token)
    }
  })
}
