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

const newVersionResult = {
  detect: { zly: 'zly', detect: 'en', errorCode: '0', language: '英语', id: '4fade5ed-c1c7-4f5b-ba11-4cc001d1228e', text: 'type' },
  translate: {
    qc_type: '1',
    zly: 'zly',
    errorCode: '0',
    index: 'content0',
    from: 'en',
    source: 'sogou',
    text: 'type',
    to: 'zh-CHS',
    id: '4fade5ed-c1c7-4f5b-ba11-4cc001d1228e',
    dit: '类型',
    orig_text: 'type',
    md5: ''
  },
  common_dict: {
    oxford: {
      precisely: true,
      dict: [
        {
          ori_word: 'type',
          content: [
            {
              derivatives: ['<Bold>typal</Bold> <Italic>adjective</Italic>　（ 〈罕〉 ）.'],
              phonetic: [
                { filename: '//dlweb.sogoucdn.com/phonetic/typeDELIMITER_gb_1.mp3', text: 'tʌɪp', type: 'uk' },
                { filename: '//dlweb.sogoucdn.com/phonetic/typeDELIMITER_us_1.mp3', text: 'taɪp', type: 'usa' }
              ],
              usual: [
                { pos: 'n.', values: ['类型；种类；品种；象征；印刷文字；图案；预示；预兆性人物'] },
                { pos: 'v.', values: ['打；输入；测定类型；分类；ＴＹＰＥＣＡＳＴ的简称'] }
              ],
              is_show_for_vr: 1,
              origin: [
                "late 15th cent. （in the sense　‘symbol,  emblem’）：  from French,  or from Latin <Italic>typus</Italic>,  from Greek <Italic>tupos</Italic> ‘impression,  figure,  type',  from <Italic>tuptein</Italic> ‘to strike'. The use in printing dates from the early 18th cent.:  the general sense ‘category with common characteristics' arose in the mid 19th cent."
              ],
              rarelyWordDict: { rarelyWordList: [], isHaveRarelyWord: 0 },
              keyword_score: 1890,
              phrases: ['<Bold>in type</Bold> <Italic>Printing</Italic>　composed and ready for printing 【印刷】 排好版（准备付印）的。'],
              no_show_char_list: [],
              word: '<Bold>type</Bold>',
              content: [
                {
                  item: {
                    core: [
                      {
                        index: '<Bold>1</Bold>',
                        detail: { en: 'a category of people or things having common characteristics', zh: '类型；种类；品种' },
                        branch: [
                          {
                            detail: {
                              en: 'a person,  thing,  or event  considered as a representative of such a category',
                              zh: '具有代表性的人（物，事件）；典型；榜样'
                            },
                            example: [
                              {
                                en: "<Italic>it's not the type of car I'd want my daughter to drive</Italic>.",
                                zh: '这不是我想让女儿开的那种型号车'
                              },
                              { en: "<Italic>I'm an adventurous type</Italic>.", zh: '我是冒险型的人。' }
                            ]
                          },
                          {
                            detail: {
                              en: '[with  adj. or noun modifier]<Italic>informal</Italic> a person of a specified character or nature',
                              zh: '〈非正式〉 具有某种特点的人；具有某种性情的人'
                            },
                            example: [{ en: '<Italic>two sporty  types in tracksuits</Italic>.', zh: '穿着田径服的两个运动型人物。' }]
                          },
                          {
                            detail: {
                              en: "(<Bold>one's type</Bold>)<Italic>informal</Italic> the sort of person one likes or finds attractive",
                              zh: '〈非正式〉 　喜爱类型的人；有吸引力类型的人'
                            },
                            example: [{ en: "<Italic>she's not really my type</Italic>.", zh: '她不是我真正喜爱的那类人。' }]
                          },
                          {
                            detail: {
                              en:
                                '<Italic>Linguistics</Italic> an abstract category or class of linguistic item or unit,  as distinct from actual occurrences in speech or writing',
                              zh: '【语言学】 　类型，型。比较<Bold>ＴＯＫＥＮ</Bold>.'
                            }
                          }
                        ],
                        example: [
                          {
                            en: '<Italic>this type of heather grows better in a drier habitat</Italic>.',
                            zh: '此类欧石楠在更干燥的地方长势更好'
                          },
                          { en: '<Italic>blood types</Italic>.', zh: '血型。' }
                        ]
                      },
                      {
                        index: '<Bold>2</Bold>',
                        detail: {
                          en: 'a person or thing symbolizing or exemplifying the ideal  or defining characteristics of something',
                          zh: '象征'
                        },
                        branch: [
                          {
                            detail: {
                              en: 'an object,  conception,  or work of art serving as a model for subsequent artists',
                              zh: '（艺术的）　典型；榜样。'
                            }
                          },
                          {
                            detail: {
                              en:
                                '<Italic>Botany</Italic> & <Italic>Zoology</Italic> an organism or taxon chosen as having the essential characteristics of its group',
                              zh: '【植，动】 型；种；模式种；模式属；模式标本。'
                            }
                          },
                          { detail: { en: 'short for <Bold>TYPE SPECIMEN</Bold>.', zh: '<Bold>TYPE SPECIMEN</Bold>的简称。' } }
                        ],
                        example: [
                          {
                            en: '<Italic>she characterized his witty sayings as the type of modern wisdom</Italic>.',
                            zh: '她把他的机智言论描绘成现代智慧的象征。'
                          }
                        ]
                      },
                      {
                        index: '<Bold>3</Bold>',
                        detail: { en: '[mass  noun]   printed characters or letters', zh: '印刷文字' },
                        branch: [
                          {
                            detail: {
                              en:
                                '[count  noun]a piece of metal with a raised letter or character on its upper surface,  for use in letterpress printing',
                              zh: '（印刷）铅字，活字。'
                            }
                          },
                          { detail: { en: 'such pieces collectively', zh: '铅字版，活字版。' } }
                        ],
                        example: [{ en: '<Italic>bold or italic type</Italic>.', zh: '黑体或斜体印刷文字。' }]
                      },
                      { index: '<Bold>4</Bold>', detail: { en: 'a design on either side of a medal or coin', zh: '（奖章或硬币）图案。' } },
                      {
                        index: '<Bold>5</Bold>',
                        detail: {
                          en:
                            '<Italic>Theology</Italic> a foreshadowing in the Old Testament of a person or event  of the Christian dispensation',
                          zh: '【神学】 预示，预兆；（《圣经· 旧约》有关基督教教规）预兆性人物（或事件）。'
                        }
                      }
                    ],
                    pos: 'n.',
                    posCoreInfoList: []
                  }
                },
                {
                  item: {
                    core: [
                      {
                        index: '<Bold>1</Bold>',
                        detail: { en: 'write (something) on a typewriter or computer by pressing the keys', zh: '（用键盘）打；输入' },
                        example: [
                          { en: '<Italic>he</Italic> <Bold>typed out</Bold> <Italic> the second draft</Italic>.', zh: '他打出二稿' },
                          { en: '[no obj.]<Italic>I am learning how to type</Italic>.', zh: '我在学打字。' }
                        ]
                      },
                      {
                        index: '<Bold>2</Bold>',
                        detail: {
                          en: '<Italic>Medicine </Italic>determine the type to which (a person or their blood or tissue) belongs',
                          zh: '【医】 　测定类型；（按类型）分类'
                        },
                        example: [{ en: '<Italic>the kidney was typed</Italic>.', zh: '肾的类型已测定。' }]
                      },
                      {
                        index: '<Bold>3</Bold>',
                        detail: { en: 'short for <Bold>TYPECAST</Bold>.', zh: '<Bold>ＴＹＰＥＣＡＳＴ</Bold>的简称。' }
                      }
                    ],
                    pos: 'v.',
                    posCoreInfoList: ['[with  obj.]']
                  }
                }
              ],
              exchange_info: { word_done: ['typed'], word_pl: ['types'], word_third: ['types'], word_ing: ['typing'], word_past: ['typed'] }
            }
          ]
        }
      ]
    },
    is_cache: true
  },
  bilingual: {
    code: 0,
    data: {
      list: [
        {
          summary: { source: 'a new type of remotely controlled torpedo.', type: 1, url: '牛津词典', target: '新型遥控鱼雷。' },
          forward: [],
          title_length: 7,
          title: 'a new type of remotely controlled torpedo.',
          type: 1,
          url: 'http://bisentence_enzh.sogou.com/d00ad057895de32c3d2640d6d9cc16b2',
          content: '',
          'expire-time': 2524579200,
          'build-time': 1525622400,
          pagerank: 1,
          strict: 1,
          page_status: 'normal',
          key: ['bisentence_enzh']
        },
        {
          summary: { source: 'she was a type he found threatening.', type: 1, url: '牛津词典', target: '他发现她是具有威胁性的那种人。' },
          forward: [],
          title_length: 7,
          title: 'she was a type he found threatening.',
          type: 1,
          url: 'http://bisentence_enzh.sogou.com/a541fa6a341a95d35022b1777a9bc3ae',
          content: '',
          'expire-time': 2524579200,
          'build-time': 1525622400,
          pagerank: 1,
          strict: 1,
          page_status: 'normal',
          key: ['bisentence_enzh']
        },
        {
          summary: { source: 'I am learning how to type.', type: 1, url: '牛津词典', target: '我在学打字。' },
          forward: [],
          title_length: 6,
          title: 'I am learning how to type.',
          type: 1,
          url: 'http://bisentence_enzh.sogou.com/cabf2a8e92d98c96ec87a77edb96c980',
          content: '',
          'expire-time': 2524579200,
          'build-time': 1525622400,
          pagerank: 1,
          strict: 1,
          page_status: 'normal',
          key: ['bisentence_enzh']
        },
        {
          summary: { source: 'type in the text to be inset.', type: 1, url: '牛津词典', target: '把要嵌入的文字打进文本。' },
          forward: [],
          title_length: 7,
          title: 'type in the text to be inset.',
          type: 1,
          url: 'http://bisentence_enzh.sogou.com/1e5757c89c5a15855dfb34c7667f7d93',
          content: '',
          'expire-time': 2524579200,
          'build-time': 1525622400,
          pagerank: 1,
          strict: 1,
          page_status: 'normal',
          key: ['bisentence_enzh']
        },
        {
          summary: { source: 'a headline in thick black type.', type: 1, url: '牛津词典', target: '粗黑体字写成的标题。' },
          forward: [],
          title_length: 6,
          title: 'a headline in thick black type.',
          type: 1,
          url: 'http://bisentence_enzh.sogou.com/c3c33950f2f5aa2a87e127fc63e46464',
          content: '',
          'expire-time': 2524579200,
          'build-time': 1525622400,
          pagerank: 1,
          strict: 1,
          page_status: 'normal',
          key: ['bisentence_enzh']
        },
        {
          summary: { source: 'sacral horns of a Minoan type.', type: 1, url: '牛津词典', target: '弥诺斯式的圣礼号角。' },
          forward: [],
          title_length: 6,
          title: 'sacral horns of a Minoan type.',
          type: 1,
          url: 'http://bisentence_enzh.sogou.com/f645353c4c346dc2228cf2331a468e1c',
          content: '',
          'expire-time': 2524579200,
          'build-time': 1525622400,
          pagerank: 1,
          strict: 1,
          page_status: 'normal',
          key: ['bisentence_enzh']
        },
        {
          summary: { source: 'what type of fish is this, please?', type: 1, url: '牛津词典', target: '请问这是什么鱼?' },
          forward: [],
          title_length: 7,
          title: 'what type of fish is this, please?',
          type: 1,
          url: 'http://bisentence_enzh.sogou.com/29ab82e3c568a8b0ca309571bbee5b1f',
          content: '',
          'expire-time': 2524579200,
          'build-time': 1525622400,
          pagerank: 1,
          strict: 1,
          page_status: 'normal',
          key: ['bisentence_enzh']
        },
        {
          summary: {
            source: 'leave blanks to type in the appropriate names.',
            type: 1,
            url: '牛津词典',
            target: '留下空白以便打上适当的名称。'
          },
          forward: [],
          title_length: 8,
          title: 'leave blanks to type in the appropriate names.',
          type: 1,
          url: 'http://bisentence_enzh.sogou.com/d11e53864d6739bb6a3bc9c628c392ee',
          content: '',
          'expire-time': 2524579200,
          'build-time': 1525622400,
          pagerank: 1,
          strict: 1,
          page_status: 'normal',
          key: ['bisentence_enzh']
        },
        {
          summary: {
            source: 'his fads about the type of coffee he must have.',
            type: 1,
            url: '牛津词典',
            target: '他对自己所喝咖啡品种的苛求。'
          },
          forward: [],
          title_length: 10,
          title: 'his fads about the type of coffee he must have.',
          type: 1,
          url: 'http://bisentence_enzh.sogou.com/55642f412fb4531e5e94c5b5211f8218',
          content: '',
          'expire-time': 2524579200,
          'build-time': 1525622400,
          pagerank: 1,
          strict: 1,
          page_status: 'normal',
          key: ['bisentence_enzh']
        },
        {
          summary: {
            source: 'the words had been printed in dark, inky type.',
            type: 1,
            url: '牛津词典',
            target: '这些文字已经用黑色油墨印成。'
          },
          forward: [],
          title_length: 9,
          title: 'the words had been printed in dark, inky type.',
          type: 1,
          url: 'http://bisentence_enzh.sogou.com/f14775ad6b5f4be4dbe55db60f17823a',
          content: '',
          'expire-time': 2524579200,
          'build-time': 1525622400,
          pagerank: 1,
          strict: 1,
          page_status: 'normal',
          key: ['bisentence_enzh']
        }
      ]
    }
  }
}

export default Translation
