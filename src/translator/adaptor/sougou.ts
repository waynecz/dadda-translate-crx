import { ISougouTranslateResult } from '@models/sougou-result'
import {
  IStdTranslateResult,
  ISourceDefinitions,
  ITargetDefinitions,
  IDefinition,
  IPhonetic
} from '@models/standard-result'
import { removeTags } from '@tools/utils'
import { SOUGOU_READ_URL } from '@configs/hosts'

// Adaptor for sougou
export default function sougouAdaptor(
  rawResult: ISougouTranslateResult
): IStdTranslateResult {
  if (!rawResult.translate) {
    return { error: { code: 'API_SERVER_ERROR' } }
  }

  let result: IStdTranslateResult = Object.create(null)

  const { isHasOxford } = rawResult
  const { dit: translation2Target, text: originText } = rawResult.translate

  if (isHasOxford) {
    let sourceDefs: ISourceDefinitions = {}
    let targetDefs: ITargetDefinitions = {}
    const oxfordTranslations = rawResult.dictionary.content

    for (let translation of oxfordTranslations) {
      for (let {
        item: { core, pos }
      } of translation.content) {
        const definitions = core.map(({ example, detail }) => {
          let definition: IDefinition = Object.create(null)
          definition.definition = detail.en

          if (example && example.length) {
            let EnExample: string
            example.some(item => {
              const tmp = removeTags(item.en)
              if (tmp) {
                EnExample = tmp
              }
              return true
            })
            definition.example = EnExample
          }

          return definition
        })

        const thisPosDefs = sourceDefs[pos]
        sourceDefs[pos] = thisPosDefs
          ? [...thisPosDefs, ...definitions]
          : definitions
      }

      for (let { pos, values } of translation.usual) {
        const thisPosDefs = targetDefs[pos]
        targetDefs[pos] = thisPosDefs ? [...thisPosDefs, ...values] : values
      }
    }

    result.definitions_in_source = sourceDefs
    result.definitions_in_target = targetDefs

    result.phonetic = oxfordTranslations[0].phonetic.map(
      (item): IPhonetic => {
        return {
          uri: item.filename,
          text: item.text,
          type: item.type
        }
      }
    )
  } else {
    result.phonetic = [
      {
        uri: SOUGOU_READ_URL + encodeURIComponent(originText)
      }
    ]
  }

  result.translation_to_target = [translation2Target]

  return result
}
