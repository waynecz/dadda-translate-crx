export interface IWord {
  text: string
  example: string
  refer: string
  phonetic: string
  createTime: number
  stage: number
}

export type TVocabulary = IWord[]

export type TSage = 1 | 2 | 3 | 4 | 5