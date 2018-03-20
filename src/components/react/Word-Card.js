import React, { Component } from 'react'

let WordCard = ({ word }) => {
  return (
    <div className="word">
      <div className="word_time">{new Date(word.c).toLocaleDateString()}</div>
      <div className="word_text">{word.t}</div>
      <div className="word_speaker">{word.t}</div>
      <div className="word_eg">{word.e}</div>
      <a className="word_ref" target="_blank" href={word.r}>
        <i className="__icon __icon-ref" />
      </a>
    </div>
  )
}

export default WordCard
