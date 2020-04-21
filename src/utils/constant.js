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

// 字体选择
export const TR_SETTING_FONT_FAMILY = '__TR_FONT_FAMILY__'

// 同步扇贝单词
export const TR_SETTING_SHANBAY = '__TR_SHANBAY__'
// 同步扇贝单词
export const TR_SETTING_YOUDAO = '__TR_YOUDAO__'

// 是否显示英英释义
export const TR_SETTING_ENGLISH_MEANING = '__TR_ENGLISH_MEANING__'

// 按键后显示翻译
export const TR_SETTING_KEYBOARD_CONTROL = '__TR_ENGLISH_KEYBOARD_CONTROL__'

// 是否批量关闭吐司弹窗
export const TR_SETTING_CLOSE_ALL_TOAST_KEY = '__TR_SETTING_CLOSE_ALL_TOAST_KEY__'

// 是否注册右键菜单
export const TR_SETTING_HIDE_CONTEXT_MENU_OPTION = '__TR_SETTING_HIDE_CONTEXT_MENU_OPTION__'

// 点击吐司时跳转到 vocabualry.com 而不是 sogou.com
export const TR_SETTING_USE_VOCABULARYCOM = '__TR_SETTING_USE_VOCABULARYCOM__'

// 导出内容
export const TR_SETTING_EXPORT_ALL_WORDS = '__TR_SETTING_EXPORT_ALL_WORDS__'

export const TR_SETTING_CALLOUT_INPUT = '__TR_SETTING_EXPORT_CALLOUT_INPUT__'

export const TR_SETTING_LASTING_TOAST = '__TR_SETTING_EXPORT_LASTING_TOAST__'

// 只显示英英翻译
export const TR_SETTING_ONLY_OXFORD = '__TR_SETTING_ONLY_OXFORD__'

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
  default: '缺省'
}

/**
 * @summary  吐司提醒时间间隔
 */
export const DELAY_MINS_IN_EVERY_STAGE = {
  1: 5,
  2: 30,
  3: 60,
  4: 6 * 60,
  5: 12 * 60
}

export const FONT_SIZES_PER_LENGTH = {
  0: '30px|43px',
  20: '25px',
  30: '20px',
  40: '15px'
}

export const DADDA_ERRORS = {
  VERIFICATION_NEEDED: 'VERIFICATION_NEEDED'
}
