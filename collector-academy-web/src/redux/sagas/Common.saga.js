import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { SNACK_ERROR } from 'redux/reducers/System.reducer';
import * as commonActions from '../actions/Common.action';
import * as systemActions from '../actions/System.action';
import * as api from 'utils/api/Common.api';
import { Utils } from 'utils/Utils';

function* getAllBranchesRequestSaga({ accessToken }) {
  yield put(commonActions.requestAllBranchesLoading(true));

  try {
    const [endpoint, requestOptions] = api.getAllBranchesRequest(accessToken);

    const { data } = yield call(axios, endpoint, requestOptions);

    yield put(commonActions.setAllBranches(data));
  } catch (error) {
    if (!Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    }
  }

  yield put(commonActions.requestAllBranchesLoading(false));
}

function* getAllGendersRequestSaga({ accessToken }) {
  yield put(commonActions.requestAllGendersLoading(true));

  try {
    const [endpoint, requestOptions] = api.getAllGendersRequest(accessToken);

    const { data } = yield call(axios, endpoint, requestOptions);

    yield put(commonActions.setAllGenders(data));
  } catch (error) {
    if (!Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    }
  }

  yield put(commonActions.requestAllGendersLoading(false));
}

function* getAllEmployeeTypesRequestSaga({ accessToken }) {
  yield put(commonActions.requestAllEmployeeTypesLoading(true));

  try {
    const [endpoint, requestOptions] = api.getAllEmployeeTypesRequest(accessToken);

    const { data } = yield call(axios, endpoint, requestOptions);

    yield put(commonActions.setAllEmployeeTypes(data));
  } catch (error) {
    if (!Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    }
  }

  yield put(commonActions.requestAllEmployeeTypesLoading(false));
}

function* getAllPerformanceManagersRequestSaga({ accessToken }) {
  yield put(commonActions.requestAllPerformanceManagersLoading(true));

  try {
    const [endpoint, requestOptions] = api.getAllPerformanceManagersRequest(accessToken);

    const { data } = yield call(axios, endpoint, requestOptions);

    yield put(commonActions.setAllPerformanceManagers(data));
  } catch (error) {
    if (!Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    }
  }

  yield put(commonActions.requestAllPerformanceManagersLoading(false));
}

export function* watchCommonSaga() {
  yield takeEvery(commonActions.REQUEST_ALL_BRANCHES, getAllBranchesRequestSaga);
  yield takeEvery(commonActions.REQUEST_ALL_GENDERS, getAllGendersRequestSaga);
  yield takeEvery(commonActions.REQUEST_ALL_EMPLOYEE_TYPES, getAllEmployeeTypesRequestSaga);
  yield takeEvery(commonActions.REQUEST_ALL_PERFORMANCE_MANAGERS, getAllPerformanceManagersRequestSaga);
}
