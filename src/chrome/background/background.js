import api from '@/api'
import HotReload from './hot-reload'

chrome.storage.onChanged.addListener(function(changes, namespace) {
  console.log('changes', changes)
})

HotReload()

/* eslint-disable no-undef */
chrome.runtime.onMessage.addListener((request, sender, sendRes) => {
  if (request.name === 'translate') {
    api.sougouTranslate(request.text).then(res => {
      sendRes(res)
    })
    return true
  }
})
