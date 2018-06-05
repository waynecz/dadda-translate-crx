import React from 'react'
import Icon from './Icon'

class Sidebar extends React.Component {
  render() {
    const { currentLink, links, handleLink, toSetting, changeRoute } = this.props
    return (
      <div className="side">
        <div className="side_logo" />
        <ul className="side_menu">
          {links.map(link => (
            <li
              onClick={e => changeRoute(link)}
              key={link}
              className={`side_link ${currentLink === link ? '__is-active' : ''}`}
            >
              {Icon({ name: link })}
            </li>
          ))}
        </ul>
        <div
          className={`side_setting __tooltip __top ${currentLink === 'setting' ? 'active' : ''}`}
          tooltip="设置"
          onClick={toSetting}
        >
          <i className="__icon __icon-setting" />
        </div>
      </div>
    )
  }
}

export default Sidebar
