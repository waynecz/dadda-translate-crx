import { google, sougou, shanbay, cdn, youdao } from './client'
import { _sougouUuid } from '@/utils'
import md5 from '@xn-02f/md5'

let token = 'b33bf8c58706155663d1ad5dba4192dc'
export default {
  sougouTranslate(text) {
    const from = 'auto'
    const to = 'zh-CHS'
    // 搜狗 API 新增加的一个字段，后面固定的 `front_xxxxx` 目前意义不明
    const s = md5('' + from + to + text + token)
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
      // 如果翻译失败,尝试从js源码中获取token
      let s = await sougou.get('/')
      let m = /js\/app\.([^.]+)/.exec(s)
      if (!m) throw res
      s = await sougou.get('https://dlweb.sogoucdn.com/translate/pc/static/js/app.' + m[1] + '.js')
      m = /""\+\w\+\w\+\w\+"(\w{32})"/.exec(s)
      if (!m) throw res
      if (token === m[1]) throw res
      token = m[1]
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
