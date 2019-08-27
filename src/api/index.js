import { google, sougou, shanbay, cdn, youdao, getTokenFromSougou } from './client'
import { _sougouUuid } from '@/utils'
import { TR_SOUGOU_TOKEN } from '@/utils/constant.js'
import md5 from 'md5'

let tokenTask = new Promise((resolve) => {
  try {
    resolve(localStorage.getItem(TR_SOUGOU_TOKEN) || '')
  } catch (e) {
    resolve('')
  }
})

function trySougouToken() {
  return getTokenFromSougou()
    .then(token => {
      try {
        localStorage.setItem(TR_SOUGOU_TOKEN, token)
      } catch (e) {
        // Do Nothing
      }
      return token
    })
}

const MAX_TOKEN_TRY_TIMES = 10
let sogouTried = 0

export default {
  async sougouTranslate(text) {
    const from = 'auto'
    const to = 'zh-CHS'

    let token = await tokenTask

    if (!token) {
      tokenTask = trySougouToken()
      token = await tokenTask
    }

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
      if (res.errorCode === 0) {
        sogouTried = 0
        return res
      }

      if (sogouTried <= MAX_TOKEN_TRY_TIMES) {
        sogouTried++
        // 尝试重新获取 token
        tokenTask = trySougouToken()
        return this.sougouTranslate(text)
      } else {
        return {}
      }
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
