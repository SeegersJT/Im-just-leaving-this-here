import axios from 'axios';
import { takeEvery, call, put, all } from 'redux-saga/effects';
import * as usersActions from 'redux/actions/Users.action';
import * as systemActions from 'redux/actions/System.action';
import * as api from 'utils/api/Users.api';
import { Utils } from 'utils/Utils';
import { SNACK_ERROR, SNACK_SUCCESS } from 'redux/reducers/System.reducer';
import { navigateTo } from 'utils/NavigateService';

function* usersRequestSaga({ accessToken }) {
  yield put(usersActions.requestUsersLoading(true));
  try {
    const [endpoint, requestOptions] = api.getUsersRequest(accessToken);

    const { data } = yield call(axios, endpoint, requestOptions);

    yield put(usersActions.setUsers(data));
  } catch (error) {
    if (!Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    }
  }

  yield put(usersActions.requestUsersLoading(false));
}

function* usersUpdateRequestSaga({ accessToken, users, onSuccess }) {
  yield put(usersActions.requestUpdateUsersLoading(true));

  try {
    const updateTasks = users.map((user) =>
      call(function* () {
        const payload = {
          username: user.username,
          branchNo: user.branchNo,
          name: user.name,
          surname: user.surname,
          idNumber: user.idNumber,
          emailAddress: user.emailAddress,
          mobileNumber: user.mobileNumber,
          genderNo: user.genderNo,
          employeeTypeNo: user.employeeTypeNo,
          performanceManagerEmployeeNo: user.performanceManagerEmployeeNo
        };

        try {
          const [endpoint, requestOptions] = api.getUpdateUsersRequest(accessToken, user.employeeNo, payload);
          yield call(axios, endpoint, requestOptions);
        } catch (error) {
          if (!Utils.isUndefined(error.response?.data?.message)) {
            yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
          } else {
            yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
          }
        }
      })
    );

    yield all(updateTasks);

    yield call(onSuccess);

    yield put(systemActions.addSystemNotification('Successfully Updated Users', SNACK_SUCCESS));
  } catch (error) {
    yield put(systemActions.addSystemNotification('Unexpected error during users update', SNACK_ERROR));
  }

  yield put(usersActions.requestUpdateUsersLoading(false));
}

function* usersResetPasswordRequestSaga({ accessToken, users, onResponse }) {
  yield put(usersActions.requestUsersResetPasswordLoading(true));

  try {
    const resetPasswordTasks = users.map((user) =>
      call(function* () {
        try {
          const [endpoint, requestOptions] = api.getUsersResetPasswordRequest(accessToken, user.employeeNo);
          yield call(axios, endpoint, requestOptions);
        } catch (error) {
          if (!Utils.isUndefined(error.response?.data?.message)) {
            yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
          } else {
            yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
          }
        }
      })
    );

    yield all(resetPasswordTasks);

    yield put(systemActions.addSystemNotification('Successfully Reset Users Password', SNACK_SUCCESS));
  } catch (error) {
    yield put(systemActions.addSystemNotification('Unexpected error during users reset password', SNACK_ERROR));
  }

  yield put(usersActions.requestUsersResetPasswordLoading(false));
  yield call(onResponse);
}

function* usersDeleteRequestSaga({ accessToken, users, onResponse }) {
  yield put(usersActions.requestUsersDeleteLoading(true));

  try {
    const resetPasswordTasks = users.map((user) =>
      call(function* () {
        try {
          const [endpoint, requestOptions] = api.getUsersDeleteRequest(accessToken, user.employeeNo);
          yield call(axios, endpoint, requestOptions);
        } catch (error) {
          if (!Utils.isUndefined(error.response?.data?.message)) {
            yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
          } else {
            yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
          }
        }
      })
    );

    yield all(resetPasswordTasks);

    yield put(systemActions.addSystemNotification('Successfully Deleted Users', SNACK_SUCCESS));
  } catch (error) {
    yield put(systemActions.addSystemNotification('Unexpected error during users delete', SNACK_ERROR));
  }

  yield put(usersActions.requestUsersDeleteLoading(false));
  yield call(onResponse);
}

function* addUsersFileUploadRequestSaga({ accessToken, file }) {
  yield put(usersActions.requestAddUsersFileUploadValidateLoading(true));

  try {
    const formData = new FormData();
    formData.append('file', file);

    const [endpoint, requestOptions] = api.getAddUsersFileUploadValidateRequest(accessToken, formData);

    const { data } = yield call(axios, endpoint, requestOptions);

    yield put(usersActions.setAddUsersFileUploadValidate(data));
    yield put(systemActions.addSystemNotification('Successfully Uploaded File', SNACK_SUCCESS));

    navigateTo('/dashboard/admin/users/add');
  } catch (error) {
    if (!Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    }
  }

  yield put(usersActions.requestAddUsersFileUploadValidateLoading(false));
}

function* addUsersTemplateDownloadRequestSaga({ accessToken }) {
  yield put(usersActions.requestAddUserTemplateDownloadLoading(true));

  try {
    const [endpoint, requestOptions] = api.getAddUsersTemplateDownloadRequest(accessToken);

    const { data } = yield call(axios, endpoint, requestOptions);

    const blob = new Blob([data]);

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'collector_academy_users_template.xlsx';
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  } catch (error) {
    if (!Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    }
  }

  yield put(usersActions.requestAddUserTemplateDownloadLoading(false));
}

function* addValidateUsersRequestSaga({ accessToken, payload }) {
  yield put(usersActions.requestAddValidateUsersLoading(true));

  try {
    const [endpoint, requestOptions] = api.getAddValidateUsersRequest(accessToken, payload);

    const { data } = yield call(axios, endpoint, requestOptions);

    yield put(usersActions.setUsersUploadStatus(data));

    navigateTo('/dashboard/admin/users/add/status');
  } catch (error) {
    if (!Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    }
  }

  yield put(usersActions.requestAddValidateUsersLoading(false));
}

export function* watchUsersSagas() {
  yield takeEvery(usersActions.REQUEST_USERS, usersRequestSaga);
  yield takeEvery(usersActions.REQUEST_UPDATE_USERS, usersUpdateRequestSaga);
  yield takeEvery(usersActions.REQUEST_USERS_RESET_PASSWORD, usersResetPasswordRequestSaga);
  yield takeEvery(usersActions.REQUEST_USERS_DELETE, usersDeleteRequestSaga);
  yield takeEvery(usersActions.REQUEST_ADD_USERS_FILE_UPLOAD_VALIDATE, addUsersFileUploadRequestSaga);
  yield takeEvery(usersActions.REQUEST_ADD_USERS_TEMPLATE_DOWNLOAD, addUsersTemplateDownloadRequestSaga);
  yield takeEvery(usersActions.REQUEST_ADD_VALIDATE_USERS, addValidateUsersRequestSaga);
}
