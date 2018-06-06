import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { createStore } from 'redux'
import Vocabulary from '@/utils/vocabulary'
import { _parseQuery } from '@/utils'
import vocabularyReducers from './reducers'
import App from '@/components/react/App'

import translator from '../content/content'

import '@/styles/index_vocabulary.scss'

const query = _parseQuery()

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
