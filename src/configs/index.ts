// *  词性 (part of speech) 对应中文
export const POS_MAP: object = {
  'n.': '名词',
  'v.': '动词',
  'prep.': '介词',
  preposition: '介词',
  'pron.': '代词',
  pronoun: '代词',
  'adj.': '形容词',
  'adv.': '副词',
  adverb: '副词',
  'det.': '限定词',
  determiner: '限定词',
  'conj.': '连词',
  conjunction: '连词',
  predeterminer: '前限定词',
  'modal verb': '情态动词',
  'cardinal number': '数字',
  'interrogative adverb': '疑问副词',
  'relative pronoun': '关系代词',
  'relative adverb': '关系副词',
  'infinitive marker': '不定式標記',
  default: '缺省'
}

// * 吐司提醒时间间隔
export const DELAY_MINS_IN_EVERY_STAGE: object = {
  1: 5,
  2: 30,
  3: 60,
  4: 6 * 60,
  5: 12 * 60
}
