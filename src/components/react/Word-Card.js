import React, { Component } from 'react'

let WordCard = ({ word }) => {
  const phonetics = JSON.parse(word.p)

  const speak = e => {
    e.stopPropagation()
    const audio = document.getElementById(word.t + '_uk')
    audio && audio.play()
  }

  return (
    <div className="word">
      <div className="word_time">{new Date(word.c).toLocaleDateString()}</div>
      <div className="word_text">{word.t}</div>
      <div className="word_speaker">
        {phonetics.map((phonetic, i) => {
          return (
            <div key={phonetic.text + i} onClick={speak} className="word_pronunciation __tooltip __bottom" tooltip="点击发音">
              <div className={`word_flag word_flag--${phonetic.type}`} />
              <div className="word_phonetic">[{phonetic.text}]</div>
              <audio id={word.t + '_uk'} src={'http:' + phonetic.filename} className="word_audio" />
            </div>
          )
        })}
      </div>
      <div className="word_eg">eg: {`${word.e} : ${word.d || '缺'}`}</div>
      <a className="word_ref __tooltip __left" tooltip="单词出处" target="_blank" href={word.r} onClick={e => e.stopPropagation()}>
        <i className="__icon __icon-ref" />
      </a>
    </div>
  )
}

export default WordCard
