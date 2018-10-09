import { youdao } from 'translation.js'

export default {
  translate(text) {
    return youdao.translate(text)
  }
}