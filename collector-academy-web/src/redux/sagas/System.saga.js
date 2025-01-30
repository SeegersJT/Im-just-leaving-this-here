import { delay, put, takeEvery } from 'redux-saga/effects';
import * as systemActions from '../actions/System.action';

function* handleSystemNotificationRemoval({ payload }) {
  yield delay(5000);
  yield put(systemActions.removeSystemNotification(payload.id));
}

export function* watchSystemSagas() {
  yield takeEvery(systemActions.ADD_SNACKBAR, handleSystemNotificationRemoval);
}
