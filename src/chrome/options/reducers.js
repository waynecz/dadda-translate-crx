const initState = {
  currentLink: 'words',
  words: []
}

const vocabularyReducers = (state = initState, action) => {
  switch (action.type) {
    case 'changeLink':
      return {
        ...state,
        currentLink: action.payload
      }
    case 'getVocabulary':
      return {
        ...state,
        words: [...action.words]
      }
    default:
      return state
  }
}

export default vocabularyReducers
