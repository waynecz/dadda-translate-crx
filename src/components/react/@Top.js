import React, { Component } from 'react'
import { getDisplayName } from '@/utils'

export default WrappedComponent => {
  return class Top extends Component {
    static displayName = `Top(${getDisplayName(WrappedComponent)})`
    render() {
      return (
        <div className="voca_top">
          <WrappedComponent {...this.props} />
        </div>
      )
    }
  }
}
