const initialState = {
  participants: [],
  groups: [],
  loading: false,
  error: false
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'GET_PARTICIPANT':
      return { ...state, loading: true }

    case 'GET_PARTICIPANTS_SUCCESS': 
      return { ...state, participants: payload, loading: false }

    case 'GET_GROUPS':
      return { ...state, loading: true }

    case 'GET_GROUPS_SUCCESS':
      return { ...state, groups: payload }
      
    default:
      return state
  }
}