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

      <div className={`word_status word_status--${word.s}`}>
        <svg width="50" viewBox="0 0 50 46">
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
              <use fill="url(#status-b)" style={{ mixBlendMode: 'lighten' }} xlinkHref="#status-a" />
            </g>
            <g opacity=".139">
              <use className="circle-2" fill="#FF2C2C" xlinkHref="#status-c" />
              <use fill="url(#status-b)" style={{ mixBlendMode: 'lighten' }} xlinkHref="#status-c" />
            </g>
            <circle className="circle-3" cx="42.5" cy="44.5" r="29.5" fill="#FF2C2C" opacity=".367" />
            <circle className="circle-4" cx="43.5" cy="38.5" r="21.5" fill="#FF2C2C" opacity=".745" />
          </g>
        </svg>
      </div>
    </div>
  )
}

export default WordCard
