import { google, sougou, shanbay, cdn, youdao } from './client'
import axios from 'axios'
import { _sougouUuid } from '@/utils'
import md5 from 'md5'

window.seccode = 8511813095152

function _escape(text) {
  const ele = document.createElement('div')
  ele.appendChild(document.createTextNode(text))
  return ele.innerHTML
}

// 获取 seccode
async function getSeccode() {
  const { data: tokenInsertScript } = await axios.get(
    'https://fanyi.sogou.com/logtrace',
    { withCredentials: true }
  )

  // eslint-disable-next-line no-eval
  eval(tokenInsertScript)
}

export default {
  sougouTranslate(text) {
    getSeccode()
    const from = 'auto'
    const to = 'zh-CHS'

    const textAfterEscape = _escape(text)

    const s = md5('' + from + to + textAfterEscape + window.seccode)

    const payload = {
      from,
      to,
      client: 'pc',
      fr: 'browser_pc',
      text: textAfterEscape,
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
      if (res.translate.errorCode !== '0') {
        const lastSecode = window.seccode

        await getSeccode()

        if (window.seccode === lastSecode) {
          throw res
        } else {
          return this.sougouTranslate(text)
        }
      }

      return res
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
