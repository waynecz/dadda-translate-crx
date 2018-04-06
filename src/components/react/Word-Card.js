import React, { Component } from 'react'
import Vocabulary from '@/utils/vocabulary'

const speak = (word, type) => {
  const audio = document.getElementById(`${word}_${type}`)
  audio && audio.play()
}

const delWord = async word => {
  await Vocabulary.remove(word.t)
  window.Store.dispatch({ type: 'updateVocabulary', vocabulary: await Vocabulary.get() })
}

/**
 * @summary 改变词汇阶段
 * @param {boolean} flag true 代表减，反之为增
 */
const setStage = async (word, flag = false) => {
  const stage = flag ? --word.s : ++word.s
  await Vocabulary.setStage({ word: word.t, stage })
  window.Store.dispatch({ type: 'updateVocabulary', vocabulary: await Vocabulary.get() })
}

// 显示弹框
const lookDetailInDialog = word => {
  window.translator.showPanelAsDialog(word.t)
}

// -------------------------------- 卡 片 代 码 ----------------------------------------------------
let WordCard = ({ word }) => {
  const phonetics = JSON.parse(word.p)

  return (
    <div
      className={`word word--${word.s}`}
      onMouseUp={e => {
        e.stopPropagation()
        lookDetailInDialog(word)
      }}
    >
      <div className="word_time">{new Date(word.c).toLocaleDateString()}</div>
      <div className="word_text">{word.t}</div>
      <div className="word_speaker">
        {phonetics.map((phonetic, i) => {
          return (
            <div
              key={phonetic.text + i}
              onMouseUp={e => {
                if (!phonetic.filename) return
                e.stopPropagation()
                speak(word.t, phonetic.type)
              }}
              className="word_pronunciation __tooltip __top"
              tooltip={phonetic.filename ? '点击发音' : '暂无发音'}
            >
              <div className={`word_flag word_flag--${phonetic.type}`} />
              <div className="word_phonetic">[{phonetic.text}]</div>
              <audio
                id={word.t + '_' + phonetic.type}
                src={'http:' + phonetic.filename}
                className="word_audio"
              />
            </div>
          )
        })}
      </div>
      <div className="word_eg" onMouseUp={e => e.stopPropagation()}>
        eg: {`${word.e} : ${word.d || '缺'}`}
      </div>
      <a
        className="word_ref __tooltip __left"
        tooltip="单词出处"
        target="_blank"
        href={word.r}
        onMouseUp={e => e.stopPropagation()}
      >
        <i className="__icon __icon-ref" />
      </a>

      <div className={`word_status word_status--${word.s}`}>
        <svg className="word_status-indicator" width="50" viewBox="0 0 50 46">
          <defs>
            <radialGradient id="status-b" r="50.898%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#FFF" stopOpacity="0" />
              <stop offset="73.296%" stopColor="#444" stopOpacity="0" />
              <stop offset="100%" stopOpacity=".999" />
            </radialGradient>
            <circle id="status-a" cx="49.5" cy="49.5" r="49.5" />
            <circle id="status-c" cx="41" cy="38" r="31" />
          </defs>
          <g fill="none" fillRule="evenodd">
            <g opacity=".067" className="circle-outer">
              <use className="circle-1" fill="#FF2C2C" xlinkHref="#status-a" />
              <use
                fill="url(#status-b)"
                style={{ mixBlendMode: 'lighten' }}
                xlinkHref="#status-a"
              />
            </g>
            <g opacity=".139">
              <use className="circle-2" fill="#FF2C2C" xlinkHref="#status-c" />
              <use
                fill="url(#status-b)"
                style={{ mixBlendMode: 'lighten' }}
                xlinkHref="#status-c"
              />
            </g>
            <circle
              className="circle-3"
              cx="42.5"
              cy="44.5"
              r="29.5"
              fill="#FF2C2C"
              opacity=".367"
            />
            <circle
              className="circle-4"
              cx="43.5"
              cy="38.5"
              r="21.5"
              fill="#FF2C2C"
              opacity=".745"
            />
          </g>
        </svg>

        <div className="word_actions">
          {/* 上一回合 */}
          <div
            onMouseUp={e => {
              e.stopPropagation()
              setStage(word, true)
            }}
            className={`word_action-button __tooltip __left ${word.s === 1 && 'hidden'}`}
            tooltip="上一阶段"
          >
            <i className="__icon __icon-play reverse" />
            <i className="__icon __icon-play reverse" />
          </div>
          {/* 下一回合 */}
          <div
            onMouseUp={e => {
              e.stopPropagation()
              setStage(word, false)
            }}
            className={`word_action-button __tooltip __left ${word.s === 5 && 'hidden'}`}
            tooltip="下一阶段"
          >
            <i className="__icon __icon-play" />
            <i className="__icon __icon-play" />
          </div>
          {/* 删除 */}
          <div
            onMouseUp={e => {
              e.stopPropagation()
              delWord(word)
            }}
            className="word_action-button __tooltip __left"
            tooltip="删除"
          >
            <i className="__icon __icon-shanchu" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default WordCard
