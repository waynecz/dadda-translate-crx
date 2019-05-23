import { TR_ID_PREFIX, TR_SETTING_LASTING_TOAST } from '@/utils/constant'
import Storage from '@/utils/storage'

export default async (word, message) => {
  const requireInteraction = await Storage.get(TR_SETTING_LASTING_TOAST, false)
  const options = {
    iconUrl: 'https://raw.githubusercontent.com/waynecz/dadda-translate-crx/master/src/assets/logo.png',
    type: 'basic',
    title: word,
    message,
    priority: 2,
    requireInteraction,
    eventTime: Date.now() + 1000000,
    buttons: [
      {
        title: '😏 我已经会这个单词了!'
      }
    ]
  }
  chrome.notifications.clear(TR_ID_PREFIX + word)

  chrome.notifications.create(TR_ID_PREFIX + word, options)
}
