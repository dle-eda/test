import { connect } from 'react-redux'

import ParticipantManagement from 'components/pages/ParticipantManagement'

// we use container pattern to separate between view and controller
// instead of put logic and view into one place
const mapStateToProps = (state) => {
  return {
    ...state.participantReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGroups: () => {
      dispatch({ type: 'GET_GROUP' })
    },
    getParticipants: () => dispatch({ type: 'GET_PARTICIPANT' }),
    deleteParticipant: () => dispatch({ type: 'DELETE_PARTICIPANT' }),
    updateParticipants: () => dispatch({ type: 'UPDATE_PARTICIPANTS' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantManagement)