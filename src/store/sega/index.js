import * as actions from '../actions/actions';

import { put, takeLatest, all } from 'redux-saga/effects';
import { fetchAllSessionsAsync } from '../../services/ApiService';

// export generator function for testing
export function* fetchHistory() {
  const json = yield fetchAllSessionsAsync();
  yield put({ type: actions.HISTORY_RECEIVED, history: json.history, });
}

function* actionWatcher() {
  yield takeLatest(actions.FETCH_HISTORY, fetchHistory)
}


export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}