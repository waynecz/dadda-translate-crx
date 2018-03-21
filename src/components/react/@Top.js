import React, { Component } from 'react'
import { _getDisplayName } from '@/utils'

export default WrappedComponent => {
  return class Top extends Component {
    static displayName = `Top(${_getDisplayName(WrappedComponent)})`
    render() {
      return (
        <div className="voca_top">
          <WrappedComponent {...this.props} />
        </div>
      )
    }
  }
}
