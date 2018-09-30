export const hasAnyEnglishLetters = (content: string): boolean => {
  return /[a-zA-Z]+/g.test(content)
}

export const isTotallyChinese = (content: string): boolean => {
  return /^[\u4e00-\u9fa5？，。·！￥……（）+｛｝【】、|《》；：“”‘’『』「」﹃﹄〔〕—～﹏]+$/gm.test(
    content.trim()
  )
}

export const isTotallyNumbers = (content: string): boolean => {
  return /^[\d]+$/gm.test(content.trim())
}

export const isTotallyPunctuations = (content: string): boolean => {
  return /^[\d]+$/gm.test(content.trim())
}

export const removeChinese = (content: string) => {
  return content.replace(/[\u4e00-\u9fa5]/gm, '').trim()
}

export const removeTags = (content: string): string => {
  return content.replace(/<[^>]+>/g, '')
}

export const parseQuery = (search: string = window.location.hash): object => {
  const query = {}

  if (search) {
    search
      .slice(1)
      .split('&')
      .forEach(string => {
        const temp = string.split('=')
        query[temp[0]] = temp[1]
      })
  }

  return { ...query }
}

export const normalizeQuery = (query: object = parseQuery()): string => {
  const search = Object.keys(query)
    .map(key => {
      return `${key}=${query[key]}`
    })
    .join('&')

  return `${search}`
}

export const uuid = (): string => {
  const nonstr = Math.random()
    .toString(36)
    .substring(3, 8)

  return document.getElementById(nonstr) ? uuid() : nonstr
}

export const sleep = <T>(duration: number): Promise<T> => {
  return new Promise(resolve => {
    setTimeout(_ => {
      resolve()
    }, duration)
  })
}
