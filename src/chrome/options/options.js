import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { createStore } from 'redux'
import StorageConstructor from '@/utils/storage'
import vocabularyReducers from './reducers'

import App from '@/components/react/App'

import '@/styles/index_vocabulary.scss'

window.Storage = new StorageConstructor()

let Store = createStore(vocabularyReducers, {
  currentLink: 'words',
  words: [],
  filter: {
    keyword: '',
    stage: 0
  }
})

window.Store = Store

render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById('app')
)

// 动态刷新词汇表
/* eslint-disable no-undef */
chrome.runtime.onMessage.addListener(async (request, sender, sendRes) => {
  const { name: type } = request
  if (type === 'vocabularyChange') {
    const newWords = await Storage.get('__T_R_VOCABULARY__')
    console.log('newWords', newWords)
    window.Store.dispatch({ type: 'getVocabulary', words: newWords })
    return true
  }
})
