import { POS_MAP, TR_ID_PREFIX, TR_SETTING_BLACK_LIST_KEY } from './constant'
import Storage from './storage'

export const _hasEnglish = content => {
  return /[a-zA-Z]+/g.test(content)
}

export const _stripChinese = content => {
  return content.replace(/[\u4e00-\u9fa5]/gm, '').trim()
}

export const _isAllChinese = content => {
  return /^[\u4e00-\u9fa5]+$/gm.test(content.trim())
}

export const _isAllNumber = content => {
  return /^[\d]+$/gm.test(content.trim())
}

export const _isAllPunctuation = content => {
  /* eslint-disable no-useless-escape */
  const reg = /^([\[\]\,.?"\(\)+_*\/\\&\$#^@!%~`<>:;\{\}？，。·！￥……（）+｛｝【】、|《》]|(?!\s)'\s+|\s+'(?!\s))+$/gi
  return /^[\d]+$/gm.test(content.trim())
}

/**
 * @summary 搜狗 API 调用 UUID 计算
 */
export const _sougouUuid = _ => {
  let t
  let e
  let n = ''
  for (t = 0; t < 32; t++) {
    /* eslint-disable no-unused-expressions */
    /* eslint-disable no-sequences */
    /* eslint-disable indent */
    ;(e = (16 * Math.random()) | 0),
      (t !== 8 && t !== 12 && t !== 16 && t !== 20) || (n += '-'),
      (n += (t === 12 ? 4 : t === 16 ? (3 & e) | 8 : e).toString(16))
  }

  return n
}

/**
 * @summary 计算 panel 展示位置
 */
export const _calcPosition = e => {
  let x
  let y
  let maxHeight
  let isTop = true
  const { clientX, clientY } = e
  const { innerHeight, innerWidth } = window

  const offsetX = innerWidth - clientX - 550

  if (offsetX <= 0) {
    x = clientX + offsetX - 30
  } else {
    x = clientX - 10
  }

  // 大于百分之六指高度时弹框出现在上面
  if (clientY > innerHeight * 0.6) {
    isTop = false
    y = innerHeight - clientY + 30
    maxHeight = innerHeight - y - 10
  } else {
    y = clientY + 15
    maxHeight = innerHeight - y - 10
  }

  return {
    panelX: x + 'px',
    panelY: y + 'px',
    buttonX: clientX + 'px',
    buttonY: clientY + 15 + 'px',
    isTop,
    maxHeight: maxHeight + 'px'
  }
}

/**
 * @summary 计算 panel 作为 dialog 展示时的位置
 */
export const _calcPositionAsDialog = _ => {
  return {
    panelX: '0',
    panelY: '0',
    maxHeight: '96vh',
    isTop: true
  }
}

/**
 * @summary 移除搜狗翻译返回的字段有 Tag 包裹
 */
export const _removeTag = str => str.replace(/<.*>(.*)<.*>/g, '$1')

/**
 * @summary 词性简写
 */
export const _abridgePOS = POS => {
  if (POS.length <= 4) {
    return {
      abbr: POS,
      meaning: POS_MAP[POS]
    }
  }

  let flag = ' '

  if (POS.includes('&') || POS.includes(',')) {
    flag = /\s&\s|,\s/g
  }

  const POSes = POS.split(flag)

  let abbr = POSes.map(pos => pos.charAt(0)).join('')

  return {
    abbr,
    meaning: POSes.filter(_ => _)
      .map(pos => POS_MAP[pos])
      .join(';')
  }
}

export const _sleep = time => {
  return new Promise(resolve => {
    setTimeout(_ => {
      resolve()
    }, time)
  })
}

/**
 * @summary HOC 组件获取被包裹组件名字
 */
export const _getDisplayName = component => component.displayName || component.name || 'Component'

/**
 * @summary 生成页面内 Node 唯一 id
 */
export const _uuid = _ => {
  const nonstr = Math.random()
    .toString(36)
    .substring(3, 8)

  return document.getElementById(nonstr) ? uuid() : nonstr
}

/**
 * @summary 添加插件命名空间
 */
export const _wrapTRId = str => TR_ID_PREFIX + str

/**
 * @summary 是否拥有插件命名空间
 */
export const _hasTRId = str => str.slice(0, TR_ID_PREFIX.length) === TR_ID_PREFIX

/**
 * @summary 移除插件命名空间
 */
export const _removeTRId = str => str.slice(TR_ID_PREFIX.length)

/**
 * @summary 解析 url
 */
export const _parseURL = url => {
  // @ref http://harttle.land/2016/02/23/javascript-regular-expressions.html
  const parseReg = /^(?:(.+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/
  const result = parseReg.exec(url)
  const fields = ['url', 'scheme', 'slash', 'host', 'port', 'path', 'query', 'hash']

  return {
    protocol: result[1],
    host: result[3],
    port: result[4],
    path: result[5]
  }
}

/**
 * @summary 是否在黑名单里
 */
export const _inBlackList = async (host = window.location.host) => {
  const blackList = await Storage.get(TR_SETTING_BLACK_LIST_KEY, {})

  return blackList[host] || false
}
