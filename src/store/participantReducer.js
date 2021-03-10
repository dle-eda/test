const initialState = {
  participants: [],
  groups: []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'GET_PARTICIPANTS_SUCCESS': 
      return { ...state, participants: payload }
    case 'GET_GROUPS_SUCCESS':
      return { ...state, groups: payload }
    default:
      return state
  }
}