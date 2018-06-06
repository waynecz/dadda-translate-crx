import React, { Component } from 'react'
import Storage from '@/utils/storage'
import { TR_SETTING_SHANBAY } from '@/utils/constant'

export default class Switch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: false
    }
  }

  async componentWillMount() {
    const value = await Storage.get(this.props.name, false)
    this.setState({
      status: value
    })
  }

  toggle = async e => {
    const { disabled, name } = this.props
    const { status } = this.state

    if (disabled) return

    if (name === TR_SETTING_SHANBAY && !status) {
      chrome.cookies.get({ url: 'http://www.shanbay.com', name: 'auth_token' }, async cookie => {
        if (!cookie) {
          chrome.tabs.create({ url: 'https://www.shanbay.com/web/account/login' })
        }
      })
    }

    Storage.set(name, !status)

    this.setState({
      status: !status
    })
  }

  render() {
    const { type, disabled, plain } = this.props
    const { status } = this.state

    return (
      <div
        className={`switch ${disabled ? 'disabled' : ''} ${status ? 'on' : ''} ${
          plain ? 'plain' : ''
        } ${type}`}
        onClick={this.toggle}
      />
    )
  }
}
