import generalAdaptor from './general'
import sougouAdaptor from './sougou'
import { EEngines, IStdTranslateResult } from '@models/dadda';
import { ISougouTranslateResult } from '@models/sougou';
import { TranslateResult } from 'translation.js/declaration/api/types';

const Adaptor = (rawResult: ISougouTranslateResult | TranslateResult, engine: EEngines): IStdTranslateResult => {
  if (engine === EEngines.sougou) {
    return sougouAdaptor(rawResult as ISougouTranslateResult)
  }

  return generalAdaptor(rawResult as TranslateResult)
}

export default Adaptor
