import { TR_ID_PREFIX } from '@/utils/constant'

export default (word, message) => {
  const options = {
    iconUrl: 'http://www.google.com/favicon.ico',
    type: 'basic',
    title: word,
    message,
    priority: 2,
    eventTime: Date.now() + 1000000,
    buttons: [
      {
        title: '斩这个单词'
      }
    ]
  }
  chrome.notifications.clear(TR_ID_PREFIX + word)

  chrome.notifications.create(TR_ID_PREFIX + word, options)
}
