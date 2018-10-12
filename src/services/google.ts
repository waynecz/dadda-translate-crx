import { google } from 'translation.js'
import { ITranslateDTO } from '@models/dadda'

const GoogleService = {
  translate(options: ITranslateDTO) {
    return google.translate({ ...options })
  }
}

export default GoogleService
