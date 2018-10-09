export interface IVersionInfo {
  version: string
  brief: string
}

export interface IAlarmConfig {
  delayInMinutes: number
  wordTxt: string
}

export interface IWord {
  text: string
  example: string
  refer: string
  phonetics: string
  createTime: number
  stage: number
}

type OLVocabulary = 'shanbay' | 'youdao'

// OL just mean `online`, Im sorry about this a little bit lazy
export interface IOLVocaMessage {
  wordTxt: string
  whichVoca: OLVocabulary
  operation: 'add' | 'delete'
}

export type TVocabulary = IWord[]

export interface ISougouTranslateResult {
  dictionary
}

// standard ouput translate result schema
export interface IStdTranslateResult {
  english: []
}
