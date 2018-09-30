import { TR_ID_PREFIX } from '@configs/storage-keys'
import * as browser from 'webextension-polyfill'

export default function Toast(wordTxt: string, message: string): void {
  const options = {
    iconUrl: 'http://p5grwrmf4.bkt.clouddn.com/dadda-ico.png',
    type: 'basic',
    title: wordTxt,
    message,
    priority: 2,
    hideTimeout: 0,
    requireInteraction: true,
    slient: true,
    eventTime: Date.now() + 1000000,
    buttons: [
      {
        title: '😏 我已经会这个单词了!'
      }
    ]
  }
  const notificationID = TR_ID_PREFIX + wordTxt

  browser.notifications.clear(notificationID)
  browser.notifications.create(notificationID, options)
}
