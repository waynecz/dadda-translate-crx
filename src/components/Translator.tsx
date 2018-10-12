import * as React from 'react'
import * as browser from 'webextension-polyfill'
import { EEngines } from '@models/dadda'
// import { I18nProps } from '@i18n'

// interface AppProps extends I18nProps {
// }

export default class ContentInjector extends React.Component {
  componentDidMount() {
    document.addEventListener('mouseup', this.onMouseUp)
  }

  async onMouseUp(event: MouseEvent) {
    const res = await  browser.runtime.sendMessage({
      name: 'translate',
      engine: 'youdao',
      text: window.getSelection().toString(),
      from: 'en',
      to: 'zh-CN'
    })
    console.log('TCL: ContentInjector -> asynconMouseUp -> res', res);
  }

  render() {
    return <div>3d132</div>
  }
}
