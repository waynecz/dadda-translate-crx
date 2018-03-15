import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'

import Sidebar from '@/components/react/Side-bar'
import View from '@/components/react/View'
import Top from '@/components/react/Top'

/**
 * @summary option.html 页面不支持路由，所以 GG
 */
class App extends Component {
  constructor() {
    super()
    const { dispatch, words, currentLink } = this.props
    this.state = {
      currentLink: 'words',
      links: ['words']
    }

    Store.dispatch({ type: 'getVocabulary' })
  }

  handleLink(link) {
    this.setState({
      currentLink: link
    })
  }

  render() {
    const { currentLink, links } = this.state
    const { dispatch } = this.props

    return (
      <div className="voca">
        <Top currentLink={currentLink} />
        <View currentLink={currentLink} />
        <Sidebar currentLink={currentLink} links={links} handleLink={this.handleLink} />
      </div>
    )
  }
}

function select(state) {
  const { currentLink, words } = state
  return { currentLink, words }
}

export default connect(select)(App)
