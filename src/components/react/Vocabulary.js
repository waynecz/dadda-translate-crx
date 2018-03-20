import React, { Component } from 'react'
import { connect } from 'react-redux'
import withView from './@View'
import mapState from '@/utils/mapState'

import WordCard from './Word-Card'

@withView
@connect(mapState)
class Vocabulary extends Component {
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
    const { dispatch, words, currentLink } = this.props

    return words.map(word => <WordCard key={word.t} word={word} />)
  }
}

export default Vocabulary
