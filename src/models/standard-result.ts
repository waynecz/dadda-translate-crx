import { EPhoneticTypes } from './dadda'

// Dadda's standard ouput translate result
export interface IStdTranslateResult {
  definitions_in_source?: ISourceDefinitions
  definitions_in_target?: ITargetDefinitions
  translation_to_target?: string[]
  phonetic?: IPhonetic[]
  error?: { code: string } | null
}

export interface ISourceDefinitions {
  [pos: string]: IDefinition[]
}

export interface ITargetDefinitions {
  [pos: string]: string[]
}

export interface IPhonetic {
  uri: string
  text?: string
  type?: EPhoneticTypes
}

export interface IDefinition {
  definition: string
  example?: string
}

// Suppose source is English, target is Chinese
/* tslint:disable */
const StdTranslateResultSample: IStdTranslateResult = {
  // this field will be undefined if the source text is not an English word
  definitions_in_source: {
    'n.': [
      {
        definition: '',
        example: ''
      }
    ]
  },
  // For Google: this field will be undefined if the source text is not an English word
  // Other engines: be undefined only if the text is an an English word, the target-language is Chinese
  definitions_in_target: {
    'n.': ['一个中文释义']
  },

  // display transition when there is no definitions
  translation_to_target: ['中文翻译'],

  phonetic: [
    {
      uri: '',
      text: '',
      type: EPhoneticTypes.uk
    }
  ]
}
