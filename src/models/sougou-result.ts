/**
 * Since the result from Sougou is supremely complex
 * a lot of interfaces below have been parted from
 * you don't have to understand every interface for composing a picture in ur mind
 * just inspect the sample object at the end of the file if you want
 */
import { EPhoneticTypes } from './dadda'

interface IOxfordDetailOrExample {
  en: string
  zh: string
}

interface IOxfordItemCore {
  detail: IOxfordDetailOrExample
  example: IOxfordDetailOrExample[]
}

interface IOxfordItem {
  core: IOxfordItemCore[]
  pos: string
}

interface IOxfordContent {
  item: IOxfordItem
}

interface IOxfordPhonetic {
  filename: string
  text: string
  type: EPhoneticTypes
}

interface IOneOfOxfordTranslation {
  content: IOxfordContent[]
  origin: string[]
  phonetic: IOxfordPhonetic[]
}

interface IOxfordResult {
  content: IOneOfOxfordTranslation[]
}

interface ISougouSimpleTranlate {
  text: string
  dit: string
}

export interface ISougouTranslateResult {
  dictionary?: IOxfordResult
  isHasOxford: boolean
  translate: ISougouSimpleTranlate
}

// Suppose source is English, target is Chinese
const SougouTranslateResultSample: ISougouTranslateResult = {
  // `dictionary` field existed only when isHasOxford === true
  dictionary: {
    content: [
      {
        content: [
          {
            item: {
              core: [
                { detail: { zh: '一个中文释义', en: 'an English defination' }, example: [{ zh: '这个释义的例句中文翻译', en: 'an English expample of this defination' }] }
              ],
              pos: 'part of speach'
            }
          }
        ],
        origin: [''],
        phonetic: [{ filename: '//xx.com/deduce.mp3', text: 'dɪˈdjuːs', type: EPhoneticTypes.uk }]
      }
    ]
  },
  isHasOxford: true,
  translate: {
    text: 'deduce',
    dit: '推断'
  }
}
