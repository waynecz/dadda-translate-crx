import axios from 'axios'
import { GOOGLE_HOST, SOUGOU_HOST } from './host'

export const google = axios.create({
  baseURL: GOOGLE_HOST
})

export const sougou = axios.create({
  baseURL: SOUGOU_HOST,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

google.interceptors.response.use(res => res.data, error => error)
sougou.interceptors.response.use(res => res.data, error => error)
