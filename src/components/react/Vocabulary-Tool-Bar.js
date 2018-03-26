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
      stages: [0, 1, 2, 3, 4, 5],

      wordsCount: 0,
      historyWordsCount: 0
    }
  }

  keyWordChange = e => {
    const { stage } = this.props.filter
    const newFilter = {
      keyword: e.target.value,
      stage
    }
    this.props.dispatch({ type: 'filterChange', filter: newFilter })
  }

  stageChange = stage => {
    const { keyword } = this.props.filter
    const newFilter = {
      keyword,
      stage
    }
    this.props.dispatch({ type: 'filterChange', filter: newFilter })
  }

  render() {
    const { stages } = this.state
    const { filter: { stage: currentStage } } = this.props

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
          <NumberCount text="REMAIN WORDS" count={this.props.vocabulary.length} />
        </div>
      </div>
    )
  }
}

export default VocabularyToolBar
