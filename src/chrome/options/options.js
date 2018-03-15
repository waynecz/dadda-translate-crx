import { render } from 'react-dom'
import { createStore } from 'redux'
import StorageConstructor from '@/utils/storage'
import vocabularyReducers from './reducers'

import '@/styles/vocabulary.scss'

StorageConstructor().then(storage => {
  window.Storage = storage

  let Store = createStore(vocabularyReducers)

  render(
    <Provider store={Store}>
      <App />
    </Provider>,
    document.getElementById('app')
  )
})
