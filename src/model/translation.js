/**
 * @summary 一条典型的搜狗翻译结果对象结构
 */
class Translation {
  constructor() {
    Object.assign(this, {
      translate: {
        text: '',
        dit: ''
      },
      dictionary: {
        zly: 'zly',
        content: [
          {
            phonetic: [
              /**
               * @field {phonetic} 为对象列表，每个对象有 filename、text、type 三个字段
               */
            ],
            usual: [{ pos: '', values: [] }],
            phrases: [],
            content: [
              {
                item: {
                  core: [
                    {
                      index: '',
                      detail: { en: '', zh: '' },
                      example: [{ en: 'no example', zh: '' }]
                    }
                  ],
                  pos: '',
                  posCoreInfoList: []
                }
              }
            ]
          }
        ],
        dicType: 'oxford'
      },
      isHasOxford: false,
      isHasChinese: false
    })
  }
}

export default Translation
