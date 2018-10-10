import { Omit } from '@tools/typescript'

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

type OLVocabularies = 'shanbay' | 'youdao'

// OL means `online`
export interface IOLVocabularyDTO {
  wordTxt: string
  vocabulary: OLVocabularies
  operation: 'add' | 'delete'
}

export type TVocabulary = IWord[]

// standard ouput translate result schema
export interface IStdTranslateResult {
  english: []
}

// extension translate data transform object
export interface ITranslatorAcceptableDTO {
  engine: EEngines
  text: string
  from: string
  to: string
}

export interface ITranslateDTO
  extends Omit<ITranslatorAcceptableDTO, 'engine'> {}

export enum EEngines {
  sougou = 'sougou',
  google = 'google',
  youdao = 'youdao'
}
