import React, { Component } from 'react'
import { _getDisplayName } from '@/utils'

export default WrappedComponent => {
  return class View extends Component {
    static displayName = `View(${_getDisplayName(WrappedComponent)})`
    render() {
      return (
        <div className="voca_content">
          <WrappedComponent {...this.props} />
        </div>
      )
    }
  }
}
