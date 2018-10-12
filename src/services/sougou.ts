import request from 'axios'
import { SOUGOU_HOST } from '@configs/hosts'
import { AxiosInstance } from 'axios'
import { ITranslateDTO } from '@models/dadda'
import { ISougouTranslateResult } from '@models/sougou-result'

const uuid = (): string => {
  let t
  let e
  let n = ''
  for (t = 0; t < 32; t++) {
    ;(e = (16 * Math.random()) | 0),
      (t !== 8 && t !== 12 && t !== 16 && t !== 20) || (n += '-'),
      (n += (t === 12 ? 4 : t === 16 ? (3 & e) | 8 : e).toString(16))
  }

  return n
}

const httpClient: AxiosInstance = request.create({
  baseURL: SOUGOU_HOST,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

class Sougou {
  async translate(options: ITranslateDTO) {
    let payload: any = {
      from: 'auto',
      to: 'zh-CHS',
      client: 'pc',
      fr: 'browser_pc',
      text: encodeURIComponent(options.text),
      useDetect: 'on',
      useDetectResult: 'on',
      needQc: 1,
      uuid: uuid(),
      oxford: 'on',
      isReturnSugg: 'off'
    }

    payload = Object.keys(payload).reduce((a, b) => {
      return a + `${b === 'from' ? '' : '&'}${b}=${payload[b]}`
    }, '')

    const { data } = await httpClient
      .post('/reventondc/translate', payload)
      .catch(_ => {
        return Promise.resolve({ data: {} })
      })

    return data as ISougouTranslateResult
  }
}

const SougouService = new Sougou()

export default SougouService
