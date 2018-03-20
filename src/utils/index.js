import { POS_MAP } from './constant'

export const _hasEnglish = content => {
  return /[a-zA-Z]+/g.test(content)
}

/**
 * @summary 中英文混杂时剔除中文
 */
export const _stripChinese = content => {
  return content.replace(/[\u4e00-\u9fa5]/gm, '').trim()
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
 * @summary 计算popper 位置
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

  /**
   * @summary 大于百分之六指高度时弹框出现在上面
   */
  if (clientY > innerHeight * 0.6) {
    isTop = false
    y = innerHeight - clientY + 30
    maxHeight = innerHeight - y - 10
  } else {
    y = clientY + 10
    maxHeight = innerHeight - y - 10
  }

  return {
    panelX: x,
    panelY: y,
    buttonX: clientX,
    buttonY: clientY + 15,
    isTop,
    maxHeight
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

export const getDisplayName = component => component.displayName || component.name || 'Component'
