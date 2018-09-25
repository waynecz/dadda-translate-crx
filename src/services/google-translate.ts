import { google } from 'translation.js'

export default {
  translate(text) {
    return google.translate(text)
  }
}