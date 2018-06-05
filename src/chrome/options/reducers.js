const initState = {
  currentLink: '',
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
        currentLink: action.link
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
