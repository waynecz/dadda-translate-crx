const initState = {
  currentLink: 'words',
  words: [],
  filter: {
    stage: 0,
    keyword: ''
  }
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
        words: [...(action.words || [])]
      }

    case 'filterChange':
      return {
        ...state,
        filter: action.filter
      }
    default:
      return state
  }
}

export default vocabularyReducers
