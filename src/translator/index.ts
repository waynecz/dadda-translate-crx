import Adaptor from './adaptor'
import {
  EEngines,
  ITranslatorAcceptableDTO,
  ITranslateDTO
} from '@models/dadda'
import { ISougouTranslateResult } from '@models/sougou-result'
import { TranslateResult } from 'translation.js/declaration/api/types'

import SougouServices from '@services/sougou'
import GoogleService from '@services/google'
import YoudaoService from '@services/youdao'

const Translator = async ({
  engine,
  text,
  from,
  to
}: ITranslatorAcceptableDTO) => {
  let rawResult: ISougouTranslateResult | TranslateResult

  const options: ITranslateDTO = { text, from, to }

  switch (engine) {
    case EEngines.sougou:
      rawResult = await SougouServices.translate(options)
      break
    case EEngines.google:
      rawResult = await GoogleService.translate(options)
      break
    case EEngines.youdao:
      rawResult = await YoudaoService.translate(options)
      break
    default:
      rawResult = { isHasOxford: false, translate: { text: '', dit: '' } }
  }

  return Adaptor(rawResult, engine)
}

export default Translator
