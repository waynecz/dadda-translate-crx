import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapState from '@/utils/mapState'
import VocabularyMachine from '@/utils/vocabulary'

import Sidebar from '@/components/react/Sidebar'
import VocabularyToolBar from '@/components/react/Vocabulary-Tool-Bar'
import Vocabulary from '@/components/react/Vocabulary'

/**
 * @summary option.html 页面不支持路由，所以 GG
 */

@connect(mapState)
class App extends Component {
  constructor() {
    super()
    this.state = {
      links: ['vocabulary']
    }
  }

  async componentDidMount() {
    const vocabulary = await VocabularyMachine.get()
    const { dispatch, currentLink } = this.props

    dispatch({ type: 'updateVocabulary', vocabulary })
  }

  handleLink(link) {
    this.setState({
      currentLink: link
    })
  }

  render() {
    const { links } = this.state
    const { dispatch, currentLink } = this.props

    return (
      <div className="voca">
        <VocabularyToolBar />
        <Vocabulary />
        <Sidebar currentLink={currentLink} links={links} handleLink={this.handleLink} />
      </div>
    )
  }
}

export default App
