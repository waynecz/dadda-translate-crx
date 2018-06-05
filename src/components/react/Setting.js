import React, { Component } from 'react'
import { connect } from 'react-redux'
import withView from './@View'
import Switch from './Switch'
import mapState from '@/utils/mapState'

import WordCard from './Word-Card'

import {
  TR_SETTING_IS_DIRECTLY_KEY,
  TR_SETTING_HAS_TOAST_KEY,
  TR_SETTING_SKIP_CHINESE_KEY,
  TR_SETTING_AUTO_SPEAK,
  TR_SETTING_SHANBAY,
  TR_SETTING_ENGLISH_MEANING
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
        key: TR_SETTING_IS_DIRECTLY_KEY,
        label: '是否直接翻译',
        tip: <small className="setting_tip">开启后划词将直接弹出翻译</small>
      },
      {
        key: TR_SETTING_AUTO_SPEAK,
        label: '自动朗读',
        tip: <small className="setting_tip">开启后翻译见自动朗读</small>
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
      }
    ]
  }

  change = key => {}

  render() {
    const { settings } = this

    return settings.map(item => (
      <div className="setting_card" key={item.key}>
        <i className="__icon __icon-setting" />
        <span className="setting_label">
          {item.label}
          {item.tip ? item.tip : null}
        </span>
        <Switch change={this.change} name={item.key} />
      </div>
    ))
  }
}

export default Setting
