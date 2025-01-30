import axios from 'axios';
import { takeEvery, call, put } from 'redux-saga/effects';
import { SNACK_ERROR } from 'redux/reducers/System.reducer';
import { Utils } from 'utils/Utils';
import * as myCoursesActions from 'redux/actions/MyCourses.action';
import * as systemActions from 'redux/actions/System.action';
import * as api from 'utils/api/MyCourses.api';

function* getMyCoursesRequestSaga({ accessToken, employeeNo }) {
  yield put(myCoursesActions.requestMyCoursesLoading(true));

  try {
    const [endpoint, requestOptions] = api.getMyCoursesRequest(accessToken, employeeNo);

    const { data } = yield call(axios, endpoint, requestOptions);

    yield put(myCoursesActions.setMyCourses(data));
  } catch (error) {
    if (!Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    }
  }

  yield put(myCoursesActions.requestMyCoursesLoading(false));
}

function* getMyLearnCourseRequestSaga({ accessToken, courseResultNo }) {
  yield put(myCoursesActions.requestMyLearnCourseLoading(true));

  try {
    const [endpoint, requestOptions] = api.getMyLearnCourseRequest(accessToken, courseResultNo);

    const { data } = yield call(axios, endpoint, requestOptions);

    yield put(myCoursesActions.setMyLearnCourse(data));
  } catch (error) {
    if (!Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    }
  }

  yield put(myCoursesActions.requestMyLearnCourseLoading(false));
}

export function* watchMyCoursesSagas() {
  yield takeEvery(myCoursesActions.REQUEST_MY_COURSES, getMyCoursesRequestSaga);
  yield takeEvery(myCoursesActions.REQUEST_MY_LEARN_COURSE, getMyLearnCourseRequestSaga);
}
