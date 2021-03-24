const initialState = {
  participants: [],
  groups: [],
  loading: false,
  error: false
}

const participantReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'GET_PARTICIPANTS':
      return { ...state, loading: true, error: false }

    case 'GET_PARTICIPANTS_SUCCESS': 
      return { ...state, participants: payload, loading: false, error: false }

    case 'GET_PARTICIPANTS_ERROR': 
      return { ...state, participants: payload, loading: false, error: true }

    case 'GET_GROUPS':
      return { ...state, loading: true, error: false }

    case 'GET_GROUPS_SUCCESS':
      return { ...state, groups: payload, loading: false, error: false }

    case 'GET_GROUPS_ERROR':
      return { ...state, groups: payload, loading: false, error: true }
      
    default:
      return state
  }
}

export default participantReducer