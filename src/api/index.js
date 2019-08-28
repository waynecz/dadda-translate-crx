import { google, sougou, shanbay, cdn, youdao } from './client'
import { _sougouUuid } from '@/utils'
import md5 from 'md5'

window.seccode = 'b33bf8c58706155663d1ad5dba4192dc'

export default {
  sougouTranslate(text) {
    const from = 'auto'
    const to = 'zh-CHS'

    const s = md5('' + from + to + text + window.seccode)
    text = encodeURIComponent(text).replace(/%20/g, '+')

    const payload = {
      from,
      to,
      client: 'pc',
      fr: 'browser_pc',
      text,
      useDetect: 'on',
      useDetectResult: 'on',
      needQc: 1,
      uuid: _sougouUuid(),
      oxford: 'on',
      pid: 'sogou-dict-vr',
      isReturnSugg: 'on',
      s
    }

    const data = Object.entries(payload)
      .map(([k, v]) => k + '=' + v)
      .join('&')

    return sougou.post('/reventondc/translate', data).then(async res => {
      if (res.errorCode === 0) return res
      // 如果翻译失败,尝试从源码中获取token
      const tokenInsertScript = await sougou.get('https://fanyi.sogou.com/logtrace')
      console.log('TCL: sougouTranslate -> s', tokenInsertScript)

      // eslint-disable-next-line no-eval
      eval(tokenInsertScript)

      console.log(window.seccode)

      if (!window.seccode) throw res

      return this.sougouTranslate(text)
    })
  },

  // ------------------------------ 扇 贝 ---------------------------------------------

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
  },

  // ------------------------------ 有 道 ---------------------------------------------

  addToYoudao(word) {
    return youdao('/wordbook/ajax', {
      params: {
        q: word,
        action: 'addword',
        date: encodeURI(new Date().toString()),
        le: 'eng'
      }
    })
  },

  delInYoudao(word) {
    return youdao(`/wordbook/ajax`, {
      params: {
        q: word,
        action: 'delword',
        date: encodeURI(new Date().toString())
      }
    })
  },

  getUpdateInfo() {
    return cdn(`/dadda-update-info.json?t=${Date.now()}`)
  }
}
