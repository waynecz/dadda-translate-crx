import React, { Component } from 'react'
import { connect } from 'react-redux'
import withTop from './@Top'
import mapState from '@/utils/mapState'
import NumberCount from './Number-Count'

@withTop
@connect(mapState)
class VocabularyToolBar extends Component {
  constructor() {
    super()
    this.state = {
      stages: [1, 2, 3, 4, 5],
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

  keyWordChange = e => {
    this.setState({
      filter: {
        keyword: e.target.value
      }
    })
  }

  stageChange = stage => {
    this.setState({
      filter: {
        stage
      }
    })
  }

  render() {
    const { stages, filter: { keyword, stage: currentStage } } = this.state

    return (
      <div className="tool">
        <div className="input">
          <i className="__icon __icon-search" />
          <input type="text" placeholder="Search words" onChange={this.keyWordChange} className="input_inner" />
        </div>
        <div className="stage">
          {stages.map(stage => (
            <div key={stage} className={`stage_dot stage_dot--${stage} ${currentStage === stage ? 'active' : ''}`} onClick={e => this.stageChange(stage)} />
          ))}
        </div>
        <div className="count">
          <NumberCount text="REMAIN WORDS" count={this.props.words.length} />
        </div>
      </div>
    )
  }
}

export default VocabularyToolBar
