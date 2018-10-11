
import { EPhoneticTypes } from './dadda'
import { Omit } from '@tools/typescript';

// Dadda's standard ouput translate result
export interface IStdTranslateResult {
  source_language_definitions?: IDefinition[]
  target_language_definitions?: IDefinitionWithoutExample[]
  target_language_meaning: string[]
  phonetic: IPhonetic[]
}

interface IPhonetic {
  uri: string,
  text: string,
  type?: EPhoneticTypes
}

interface IDefinition {
  definition: string
  example: string
  pos?: string
}

interface IDefinitionWithoutExample extends Omit<IDefinition, 'example'> {}


// Suppose source is English, target is Chinese
const StdTranslateResultSample: IStdTranslateResult = {
  // this field will be undefined if the source is not an English word so far
  source_language_definitions: [
    {
      definition: '',
      example: '',
      pos: ''
    }
  ],
  // For Google: this field will be undefined if the source is not an English word so far
  // Other engines: be undefined only if the source is an an English word, the target-language is Chinese
  target_language_definitions: [
    {
      definition: '一个中文释义',
      pos: 'n.'
    }
  ],

  target_language_meaning: ['中文翻译'],

  phonetic: [
    {
      uri: '',
      text: '',
      type: EPhoneticTypes.uk
    }
  ]
}