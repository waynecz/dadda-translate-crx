import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { createStore } from 'redux'
import Vocabulary from '@/utils/vocabulary'
import vocabularyReducers from './reducers'
import App from '@/components/react/App'

import translator from '../content/content'

import '@/styles/index_vocabulary.scss'

const query = {}
window.location.search
  .slice(1)
  .split('&')
  .forEach(string => {
    const temp = string.split('=')
    query[temp[0]] = temp[1]
  })

const Store = createStore(vocabularyReducers, {
  currentLink: query.link || 'vocabulary',
  vocabulary: [],
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
    window.Store.dispatch({ type: 'updateVocabulary', vocabulary: await Vocabulary.get() })
    return true
  }
})
