import * as React from 'react'
import { render } from "react-dom";
import Translator from '@components/Translator'

import '@styles/translator'

document.addEventListener('DOMContentLoaded', installDadda)

export default function installDadda () {
  const container = document.createElement('div')
  container.id = '__tr-container__'

  document.body.appendChild(container)

  render(
      <Translator/>
    , container
  )
}