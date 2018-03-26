const initState = {
  currentLink: 'vocabulary',
  vocabulary: [],
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

    case 'updateVocabulary':
      return {
        ...state,
        vocabulary: [...(action.vocabulary || [])]
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
