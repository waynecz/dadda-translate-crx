import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapState from '@/utils/mapState'
import VocabularyMachine from '@/utils/vocabulary'
import { _parseQuery, _normalizeQuery } from '@/utils'

import Sidebar from '@/components/react/Sidebar'
import VocabularyToolBar from '@/components/react/Vocabulary-Tool-Bar'
import Vocabulary from '@/components/react/Vocabulary'
import Setting from '@/components/react/Setting'
import { ToastContainer } from 'react-toastify'
import SpeakEnglishWithYLS from './YLS'

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
    window.addEventListener('hashchange', () => {
      const query = _parseQuery()
      this.changeRoute(query.link)
    });
    const vocabulary = await VocabularyMachine.get()
    const { dispatch, currentLink } = this.props

    dispatch({ type: 'updateVocabulary', vocabulary })
  }

  toSetting = () => {
    this.changeRoute('setting')
  }

  changeRoute = link => {
    this.props.dispatch({ type: 'changeLink', link })
    const query = _parseQuery()
    query.link = link

    window.location.hash = _normalizeQuery(query)
  }

  render() {
    const { links } = this.state
    const { dispatch, currentLink } = this.props

    const View = (_ => {
      switch (currentLink) {
        case 'vocabulary': {
          return <Vocabulary />
        }

        case 'setting': {
          return <Setting />
        }
      }
    })()

    return (
      <div className="voca">
        <ToastContainer />
        <VocabularyToolBar />
        {View}
        <Sidebar
          changeRoute={this.changeRoute}
          toSetting={this.toSetting}
          currentLink={currentLink}
          links={links}
          handleLink={this.handleLink}
        />
        <SpeakEnglishWithYLS />
      </div>
    )
  }
}

export default App
