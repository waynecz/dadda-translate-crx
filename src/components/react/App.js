import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapState from '@/utils/mapState'
import VocabularyMachine from '@/utils/vocabulary'

import Sidebar from '@/components/react/Sidebar'
import VocabularyToolBar from '@/components/react/Vocabulary-Tool-Bar'
import Vocabulary from '@/components/react/Vocabulary'
import Setting from '@/components/react/Setting'
import { ToastContainer, toast } from 'react-toastify'

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
    toast('Wow so easy !')
  }

  toSetting = () => {
    this.props.dispatch({ type: 'changeLink', link: 'setting' })
  }

  changeRoute = link => {
    this.props.dispatch({ type: 'changeLink', link })
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
      </div>
    )
  }
}

export default App
