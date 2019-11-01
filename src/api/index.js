import { google as googleTranslate } from 'translation.js'
import { google, sougou, shanbay, cdn, youdao } from './client'
import axios from 'axios'
import { _sougouUuid } from '@/utils'
import md5 from 'md5'
import { DADDA_ERRORS } from '../utils/constant'

window.seccode = 8511813095152

function _encodeReplacer(match) {
  return encodeURIComponent(match)
}

function _escape(text) {
  return (
    text
      // All speical characters should be encoded
      .replace(
        /* eslint-disable no-useless-escape */
        /[\[\]\,.?"\(\)_*\/\\&\$#^@!%~`<>:;\{\}？，。·！￥……（）｛｝【】、|《》]/gi,
        _encodeReplacer
      )
      .replace(/[+]/g, _encodeReplacer)
      // All space should convert to +
      .replace(/\s/gi, '+')
  )
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

    const s = md5('' + from + to + text + window.seccode)

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
      const { errorCode } = res.translate

      if (errorCode === '10') {
        // Seccode not valid
        const lastSecode = window.seccode

        await getSeccode()

        if (window.seccode === lastSecode) {
          throw res
        } else {
          return this.sougouTranslate(text)
        }
      } else if (errorCode === '20') {
        const googleRes = await googleTranslate.translate(text)
        const { result = [] } = googleRes
        const resultStr = result.join('')

        return {
          translate: {
            errorCode: DADDA_ERRORS.VERIFICATION_NEEDED,
            dit: resultStr,
            source: 'google'
          }
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
