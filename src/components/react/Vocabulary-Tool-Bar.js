import React, { Component } from 'react'
import { connect } from 'react-redux'
import withTop from './@Top'
import mapState from '@/utils/mapState'

@withTop
@connect(mapState)
class VocabularyToolBar extends Component {
  constructor() {
    super()
    this.state = {
      filter: {
        keyword: '',
        stage: 1
      },

      wordsCount: 0,
      historyWordsCount: 0
    }
  }

  async componentDidMount() {
    const { dispatch, words, currentLink } = this.props
  }

  render() {
    return <div>111</div>
  }
}

export default VocabularyToolBar
