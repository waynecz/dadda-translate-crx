import React from 'react'

const formatNumber = number => (number > 99 ? number : '0' + number)

let NumberCount = ({ text, count }) => {
  return (
    <div className="number">
      <small className="number_text">{text}</small>
      <h3 className="number_count">{formatNumber(count)}</h3>
    </div>
  )
}

export default NumberCount
