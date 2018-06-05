import React, { Component } from 'react'
import Storage from '@/utils/storage'

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

  toggle = e => {
    const { disabled, name } = this.props
    const { status } = this.state

    if (disabled) return

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
