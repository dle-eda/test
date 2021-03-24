import { takeEvery, all } from 'redux-saga/effects'

function* fetchParticipants(dispatch) {
  
}

function* watchFetchParticipants() {
  yield takeEvery('GET_PARTICIPANT', fetchParticipants)
}

export default function* rootSaga() {
  yield all([
    watchFetchParticipants()
  ])
}