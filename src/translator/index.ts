import Adaptors from './adaptors'
import { IStdTranslateResult, ISougouTranslateResult } from '@models/dadda'
import { TranslateResult } from 'translation.js/declaration/api/types'
import SougouServices from '@services/translate/sougou-translate'

interface ITranslateDTO {
  enginee: EEnginees
  text: string
  from: string
  to: string
}

enum EEnginees {
  sougou = 'sougou',
  google = 'google',
  youdao = 'youdao'
}

const Translator = async ({
  enginee,
  text,
  from,
  to
}: ITranslateDTO): IStdTranslateResult => {
  let rawResult: ISougouTranslateResult | TranslateResult

  if (enginee === EEnginees.sougou) {
    rawResult = await SougouServices.translate({ text, from, to })
  }
  return Adaptors[enginee]()
}

export default Translator
