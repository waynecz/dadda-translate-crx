import { combineReducers } from 'redux'

const initState = {
  currentLink: 'words',
  words: []
}

const vocabulary = (state = initState, action) => {
  switch (action.type) {
    case 'changeLink':
      return {
        ...state,
        currentLink: action.payload
      }
    case 'getVocabulary':
      return window.sessionStorage.get('__T_R_VOCABULARY__')
    default:
      return state
  }
}

const vocabularyReducers = combineReducers({
  vocabulary
})

export default vocabularyReducers
