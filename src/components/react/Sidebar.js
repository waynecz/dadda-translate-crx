import React from 'react'
import Icon from './Icon'

let Sidebar = ({ currentLink, links, handleLink }) => {
  return (
    <div className="side">
      <div className="side_logo" />
      <ul className="side_menu">
        {links.map(link => (
          <li key={link} className={`side_link ${currentLink === link ? '__is-active' : ''}`}>
            {Icon({ name: link })}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
