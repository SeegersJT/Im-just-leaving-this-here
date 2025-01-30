import axios from 'axios';
import { takeEvery, call, put } from 'redux-saga/effects';
import { jwtDecode } from 'jwt-decode';
import * as authActions from '../actions/Auth.action';
import * as userActions from '../actions/User.action';
import * as tokenActions from '../actions/Token.action';
import * as systemActions from '../actions/System.action';
import * as api from '../../utils/api/Auth.api';
import { SNACK_ERROR, SNACK_INFO, SNACK_SUCCESS } from '../reducers/System.reducer';
import { Utils } from 'utils/Utils';
import { navigateTo } from 'utils/NavigateService';

function* loginSaga({ payload }) {
  yield put(authActions.loginUserRequestLoading(true));

  try {
    const [endpoint, requestOptions] = api.getAuthLoginRequest(payload);
    const { data } = yield call(axios, endpoint, requestOptions);

    yield put(authActions.loginUserRequestLoading(false));

    if (Object.hasOwn(data, 'access_token')) {
      const accessToken = data.access_token;
      const decodedData = jwtDecode(accessToken);

      const auth = {
        accessToken,
        expireDate: new Date(decodedData.exp * 1000),
        issuesAt: new Date(decodedData.iat * 1000),
        jwtID: decodedData.jti
      };

      const user = {
        username: decodedData.sub,
        employeeNo: decodedData.employee_no,
        branchNo: decodedData.branch_no,
        roleNo: decodedData.role_no,
        role: decodedData.role,
        emailAddress: decodedData.email_address,
        mobileNumber: decodedData.mobile_number,
        gender: decodedData.gender,
        name: decodedData.name,
        surname: decodedData.surname,
        idNumber: decodedData.id_number
      };

      yield put(authActions.loginUserSuccess(auth));
      yield put(userActions.setUser(user));

      navigateTo('/dashboard');

      yield put(systemActions.addSystemNotification('Welcome to The Collector Academy', SNACK_SUCCESS));
      return;
    }

    if (Object.hasOwn(data, 'confirmation_token')) {
      const token = {
        token: data.confirmation_token,
        tokenType: data.confirmation_token_type,
        tokenExpiryDate: data.confirmation_token_expiry_date
      };

      yield put(tokenActions.setConfirmationToken(token));

      navigateTo('/token');

      yield put(systemActions.addSystemNotification('An OTP has been sent to your phone', SNACK_INFO));
      return;
    }

    if (data.includes('message')) {
      yield put(systemActions.addSystemNotification(data.message, SNACK_INFO));
    }

    yield put(authActions.loginUserFailure('Login Failed'));
    yield put(tokenActions.resetConfirmationToken());
  } catch (error) {
    if (Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    }
    yield put(authActions.loginUserFailure(error.message));
  }

  yield put(authActions.loginUserRequestLoading(false));
}

function* logoutSaga() {
  yield put(authActions.logoutUser);
}

function* forgotPasswordSaga({ payload }) {
  yield put(authActions.requestForgotPasswordLoading(true));

  try {
    const [endpoint, requestOptions] = api.getForgotPasswordRequest(payload);
    const { data } = yield call(axios, endpoint, requestOptions);

    if (Object.hasOwn(data, 'confirmation_token')) {
      const token = {
        token: data.confirmation_token,
        tokenType: data.confirmation_token_type,
        tokenExpiryDate: data.confirmation_token_expiry_date
      };

      yield put(tokenActions.setConfirmationToken(token));

      navigateTo('/token');

      yield put(systemActions.addSystemNotification('An OTP has been sent to your phone', SNACK_INFO));
      return;
    }

    if (data.includes('message')) {
      yield put(systemActions.addSystemNotification(data.message, SNACK_INFO));
    }

    yield put(authActions.loginUserFailure('Forgot Password Failed'));
    yield put(tokenActions.resetConfirmationToken());
  } catch (error) {
    if (Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    }
  }

  yield put(authActions.requestForgotPasswordLoading(false));
}

export function* watchAuthSagas() {
  yield takeEvery(authActions.LOGIN_USER_REQUEST, loginSaga);
  yield takeEvery(authActions.LOGOUT_USER, logoutSaga);
  yield takeEvery(authActions.FORGOT_PASSWORD_REQUEST, forgotPasswordSaga);
}
