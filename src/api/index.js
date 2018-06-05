import { google, sougou, shanbay } from './client'
import { _sougouUuid } from '@/utils'

export default {
  googleTranslate(text, tk) {
    return google('/translate_a/single', {
      params: {
        client: 't',
        sl: 'auto',
        tl: 'zh-CN',
        hl: 'zh-CN',
        tk,
        dt: ['at', 'bd', 'ex', 'ld', 'md', 'qca', 'rw', 'rm', 'ss', 't'],
        ie: 'UTF-8',
        oe: 'UTF-8',
        otf: '1',
        ssel: '0',
        tsel: '0',
        kc: '7',
        q: text
      }
    })
  },

  sougouTranslate(text) {
    const payload = {
      from: 'auto',
      to: 'zh-CHS',
      client: 'pc',
      fr: 'browser_pc',
      text,
      useDetect: 'on',
      useDetectResult: 'on',
      needQc: 1,
      uuid: _sougouUuid(),
      oxford: 'on',
      isReturnSugg: 'on'
    }

    const data = Object.keys(payload).reduce((a, b) => {
      return a + `${b === 'from' ? '' : '&'}${b}=${payload[b]}`
    }, '')

    return sougou.post('/reventondc/translate', data)
  },

  shanbayTranslate(word) {
    return shanbay(`/bdc/search/?word=${word}`)
  },

  addToShanbayVocabulary(id) {
    return shanbay.post('/bdc/learning/', {
      content_type: 'vocabulary',
      id
    })
  },

  delInShanbayVocabulary(learningId) {
    return shanbay.put(`/bdc/learning/${learningId}`, {
      retention: 1
    })
  }
}
