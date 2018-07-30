import React, { Component } from 'react'
import { connect } from 'react-redux'
import withView from './@View'
import Switch from './Switch'
import mapState from '@/utils/mapState'
import VocabularyMachine from '@/utils/vocabulary'
import exportFile from '@/utils/exportFile'

import {
  TR_SETTING_IS_DIRECTLY_KEY,
  TR_SETTING_HAS_TOAST_KEY,
  TR_SETTING_SKIP_CHINESE_KEY,
  TR_SETTING_AUTO_SPEAK,
  TR_SETTING_YOUDAO,
  TR_SETTING_SHANBAY,
  TR_SETTING_ENGLISH_MEANING,
  TR_SETTING_KEYBOARD_CONTROL,
  TR_SETTING_CLOSE_ALL_TOAST_KEY,
  TR_SETTING_EXPORT_ALL_WORDS
} from '@/utils/constant'

@withView
@connect(mapState)
class Setting extends Component {
  constructor() {
    super()
    this.settings = [
      {
        key: TR_SETTING_SHANBAY,
        label: '与扇贝单词同步',
        tip: (
          <small className="setting_tip">
            该功能需要{' '}
            <a target="_blank" href="https://www.shanbay.com/web/account/login">
              登录 Web 版扇贝单词
            </a>
          </small>
        )
      },
      {
        key: TR_SETTING_YOUDAO,
        label: '与有道单词同步',
        tip: (
          <small className="setting_tip">
            该功能需要{' '}
            <a
              target="_blank"
              href="http://account.youdao.com/login?service=dict&back_url=http://dict.youdao.com/wordbook/wordlist%3Fkeyfrom%3Dnull"
            >
              登录 Web 版有道
            </a>
          </small>
        )
      },
      {
        key: TR_SETTING_KEYBOARD_CONTROL,
        label: '开启 ALT 键控制',
        tip: (
          <small className="setting_tip">
            开启后需要摁一下 <kbd>alt</kbd> 才会显示翻译
          </small>
        )
      },
      {
        key: TR_SETTING_CLOSE_ALL_TOAST_KEY,
        label: '批量关闭吐司',
        tip: (
          <small className="setting_tip">
            吐司过多时，关闭一个既关闭所有并让<br />所有单词推入下一阶段
          </small>
        ),
        isNew: true
      },
      {
        key: TR_SETTING_IS_DIRECTLY_KEY,
        label: '是否直接翻译',
        tip: <small className="setting_tip">开启后划词后将直接弹出翻译</small>
      },
      {
        key: TR_SETTING_AUTO_SPEAK,
        label: '自动朗读',
        tip: <small className="setting_tip">开启后翻译将自动朗读</small>
      },
      {
        key: TR_SETTING_SKIP_CHINESE_KEY,
        label: '不翻译纯中文',
        tip: <small className="setting_tip">若划词均为中文将忽略</small>
      },
      {
        key: TR_SETTING_HAS_TOAST_KEY,
        label: '开启吐司弹词',
        tip: <small className="setting_tip">关闭后将不再进行弹词记忆</small>
      },
      {
        key: TR_SETTING_ENGLISH_MEANING,
        label: '显示英文释义(开发中)',
        tip: <small className="setting_tip">关闭后将不再显示英文释义</small>
      },
      {
        key: TR_SETTING_EXPORT_ALL_WORDS,
        label: '导出单词内容(Beta)',
        tip: <small className="setting_tip">点击导出单词内容为文件 <kbd>.csv</kbd><br />仅导出单词和例句</small>,
        disabled: true,
        isNew: true,
        type: 'invisible',
        click: async function () {
          const vocabulary = await VocabularyMachine.get()
          exportFile(vocabulary)
        }
      }
    ]
  }

  render() {
    const { settings } = this

    return settings.map(item => (
      <div className="setting_card" key={item.key} onClick={item.click}>
        <i className="__icon __icon-setting" />
        <span className="setting_label">
          {item.label}
          {item.tip ? item.tip : null}
        </span>
        <Switch change={this.change} name={item.key} disabled={item.disabled} plain={item.plain} type={item.type} />
        {item.isNew ? <span className="setting_new" /> : null}
      </div>
    ))
  }
}

export default Setting
