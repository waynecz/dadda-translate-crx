/**
 * Sophisticated as the result from https://fanyi.sougou.com is
 * I apart it into these pieces below reluctantly
 * If you compose them, it will be looks with the object at the end of the file alike
 */
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

enum EPhoneticTypes {
  uk = 'uk',
  usa = 'usa'
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

const SougouTranslateResultSample: ISougouTranslateResult = {
  dictionary: {
    content: [
      {
        content: [
          {
            item: {
              core: [
                { detail: { zh: '', en: '' }, example: [{ zh: '', en: '' }] }
              ],
              pos: ''
            }
          }
        ],
        origin: [''],
        phonetic: [{ filename: '', text: '', type: 'uk' }]
      }
    ]
  },
  isHasOxford: false,
  translate: {
    text: '',
    dit: ''
  }
}
