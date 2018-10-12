import { TranslateResult as IGeneralTranslation } from 'translation.js/declaration/api/types'
import { IStdTranslateResult, ITargetDefinitions } from '@models/standard-result'
import { baidu } from 'translation.js';

// Adaptor for translation.js (youdao / google)
export default async function generalAdaptor(
  rawResult: IGeneralTranslation
): IStdTranslateResult {
  console.log('TCL: rawResult', rawResult)
  let result: IStdTranslateResult = Object.create(null)
  
  const { dict } = rawResult
  let a = await baidu.audio({
    text: 'better',
    from: 'en-GB'
  })
  console.log(a)
  
  if (dict) {
    let targetDefs: ITargetDefinitions = {}
    dict.forEach(item => {
      const [pos, value] = item.split(/[.|：]/)
      targetDefs[pos] = [value]
    })
    result.definitions_in_target = targetDefs
  }

  result.translation_to_target = rawResult.result
  return result
}
