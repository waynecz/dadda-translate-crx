export default (word, message) => {
  var opt = {
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
  chrome.notifications.clear('__TR__' + word)

  chrome.notifications.create('__TR__' + word, opt)
}
