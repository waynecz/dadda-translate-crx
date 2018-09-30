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

// OL just mean `online`, Im sorry about this a little bit lazy
export interface IOLVocaMessage {
  wordTxt: string
  whichVoca: string
  operation: TOLVocaOperation
}

export type TVocabulary = IWord[]

// online vocabulary operations
export type TOLVocaOperation = 'add' | 'delete'
