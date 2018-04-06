// 设置闹钟和 notication 等用到的 ID 前缀
export const TR_ID_PREFIX = '__TR__'

// 生词存储键名
export const TR_STORAGE_KEY = '__TR_VOCABULARY__'

// 是否启用划词直接翻译（不需要点击翻译按钮
export const TR_SETTING_IS_DIRECTLY_KEY = '__TR_BUTTON__'

// 网站黑名单
export const TR_SETTING_BLACK_LIST_KEY = '__TR_DISABLED__'

// 是否启用吐司弹词
export const TR_SETTING_HAS_TOAST_KEY = '__TR_TOAST__'

// 是否不翻译纯中文
export const TR_SETTING_SKIP_CHINESE_KEY = '__TR_SKIP_CHINESE__'

// 是否自动朗读
export const TR_SETTING_AUTO_SPEAK = '__TR_SKIP_AUTO_SPEAK__'

/**
 * @summary 词性 (part of speech) 对应中文
 */
export const POS_MAP = {
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
  default: '暂无收录'
}

/**
 * @summary  吐司提醒时间
 */
export const DELAY_MINS_IN_EVERY_STAGE = {
  1: 5,
  2: 30,
  3: 60,
  4: 6 * 60,
  5: 12 * 60
}

// For test
// export const DELAY_MINS_IN_EVERY_STAGE = {
//   1: 0.1,
//   2: 0.2,
//   3: 0.3,
//   4: 0.4,
//   5: 0.5
// }
