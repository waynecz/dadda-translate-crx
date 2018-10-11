import generalAdaptor from './general'
import sougouAdaptor from './sougou'
import { EEngines } from '@models/dadda'
import { IStdTranslateResult } from '@models/standard-result'
import { ISougouTranslateResult } from '@models/sougou-result'
import { TranslateResult } from 'translation.js/declaration/api/types'

const Adaptor = (
  rawResult: ISougouTranslateResult | TranslateResult,
  engine: EEngines
): IStdTranslateResult => {
  if (engine === EEngines.sougou) {
    return sougouAdaptor(rawResult as ISougouTranslateResult)
  }

  return generalAdaptor(rawResult as TranslateResult)
}

export default Adaptor
