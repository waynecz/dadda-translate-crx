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
        stage: 0
      },

      wordsCount: 0,
      historyWordsCount: 0
    }
  }

  async componentDidMount() {
    const { dispatch, words, currentLink } = this.props
  }

  render() {
    const { dispatch, words, currentLink, filter } = this.props

    return words
      .filter(word => {
        const reg = new RegExp(filter.keyword, 'g')
        console.log('reg', reg)
        return (word.s === filter.stage || filter.stage === 0) && reg.test(word.t)
      })
      .map(word => <WordCard key={word.t} word={word} />)
  }
}

export default Vocabulary
