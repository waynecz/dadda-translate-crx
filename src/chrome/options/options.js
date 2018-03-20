import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { createStore } from 'redux'
import StorageConstructor from '@/utils/storage'
import vocabularyReducers from './reducers'

import App from '@/components/react/App'

import '@/styles/index_vocabulary.scss'

StorageConstructor().then(storage => {
  window.Storage = storage

  let Store = createStore(vocabularyReducers, {
    currentLink: 'words',
    words: []
  })

  window.Store = Store

  render(
    <Provider store={Store}>
      <App />
    </Provider>,
    document.getElementById('app')
  )
})
