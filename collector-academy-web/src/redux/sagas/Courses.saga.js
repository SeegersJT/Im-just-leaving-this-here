import axios from 'axios';
import { takeEvery, call, put } from 'redux-saga/effects';
import * as coursesActions from 'redux/actions/Courses.action';
import * as myCoursesActions from 'redux/actions/MyCourses.action';
import * as systemActions from 'redux/actions/System.action';
import * as api from 'utils/api/Courses.api';
import { Utils } from 'utils/Utils';
import { SNACK_ERROR, SNACK_SUCCESS } from 'redux/reducers/System.reducer';
import { navigateTo } from 'utils/NavigateService';

function* coursesRequestSaga({ accessToken }) {
  yield put(coursesActions.requestAllCoursesLoading(true));
  try {
    const [endpoint, requestOptions] = api.getAllCoursesRequest(accessToken);

    const { data } = yield call(axios, endpoint, requestOptions);

    yield put(coursesActions.setAllCourses(data));
  } catch (error) {
    if (!Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    }
  }

  yield put(coursesActions.requestAllCoursesLoading(false));
}

function* getAllCourseDifficultiesRequestSaga({ accessToken }) {
  yield put(coursesActions.requestAllCourseDifficultiesLoading(true));

  try {
    const [endpoint, requestOptions] = api.getAllCourseDifficultiesRequest(accessToken);

    const { data } = yield call(axios, endpoint, requestOptions);

    yield put(coursesActions.setAllCourseDifficulties(data));
  } catch (error) {
    if (!Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    }
  }

  yield put(coursesActions.requestAllCourseDifficultiesLoading(false));
}

function* courseUpdateRequestSaga({ accessToken, payload, courseNo }) {
  yield put(coursesActions.requestCourseUpdateLoading(true));

  try {
    const [endpoint, requestOptions] = api.getCourseUpdateRequest(accessToken, payload, courseNo);

    const { data } = yield call(axios, endpoint, requestOptions);

    yield put(coursesActions.setCourseChange(data));
    yield put(systemActions.addSystemNotification('Successfully Updated Course', SNACK_SUCCESS));
  } catch (error) {
    if (!Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    }
  }

  yield put(coursesActions.requestCourseUpdateLoading(false));
}

function* courseInsertRequestSaga({ accessToken, payload }) {
  yield put(coursesActions.requestCourseInsertLoading(true));

  try {
    const [endpoint, requestOptions] = api.getCourseInsertRequest(accessToken, payload);

    const { data } = yield call(axios, endpoint, requestOptions);

    yield put(coursesActions.setCourseChange(data));
    yield put(systemActions.addSystemNotification('Successfully Inserted Course', SNACK_SUCCESS));
  } catch (error) {
    if (!Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    }
  }

  yield put(coursesActions.requestCourseInsertLoading(false));
}

function* courseDeleteRequestSaga({ accessToken, courseNo }) {
  yield put(coursesActions.requestCourseDeleteLoading(true));

  try {
    const [endpoint, requestOptions] = api.getCourseDeleteRequest(accessToken, courseNo);

    yield call(axios, endpoint, requestOptions);

    navigateTo('/dashboard/admin/courses');
    yield put(systemActions.addSystemNotification('Successfully Deleted Course', SNACK_SUCCESS));
  } catch (error) {
    if (!Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    }
  }

  yield put(coursesActions.requestCourseDeleteLoading(false));
}

function* courseModulesRequestSaga({ accessToken, courseNo }) {
  yield put(coursesActions.requestAllCourseModulesLoading(true));

  try {
    const [endpoint, requestOptions] = api.getCourseModulesRequest(accessToken, courseNo);

    const { data } = yield call(axios, endpoint, requestOptions);

    yield put(coursesActions.setAllCourseModules(data));
  } catch (error) {
    if (!Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    }
  }

  yield put(coursesActions.requestAllCourseModulesLoading(false));
}

function* courseModuleUpdateRequestSaga({ accessToken, payload, courseModuleNo }) {
  yield put(coursesActions.requestCourseModuleUpdateLoading(true));

  try {
    const [endpoint, requestOptions] = api.getCourseModuleUpdateRequest(accessToken, payload, courseModuleNo);

    const { data } = yield call(axios, endpoint, requestOptions);

    yield put(coursesActions.setCourseModuleChange(data));
    yield put(systemActions.addSystemNotification('Successfully Updated Course Module', SNACK_SUCCESS));
  } catch (error) {
    if (!Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    }
  }

  yield put(coursesActions.requestCourseModuleUpdateLoading(false));
}

function* courseModuleInsertRequestSaga({ accessToken, payload, courseNo }) {
  yield put(coursesActions.requestCourseModuleInsertLoading(true));

  try {
    const [endpoint, requestOptions] = api.getCourseModuleInsertRequest(accessToken, payload, courseNo);

    const { data } = yield call(axios, endpoint, requestOptions);

    yield put(coursesActions.setCourseModuleChange(data));
    yield put(systemActions.addSystemNotification('Successfully Inserted Course Module', SNACK_SUCCESS));
  } catch (error) {
    if (!Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    }
  }

  yield put(coursesActions.requestCourseModuleInsertLoading(false));
}

function* courseModuleDeleteRequestSaga({ accessToken, courseModuleNo }) {
  yield put(coursesActions.requestCourseModuleDeleteLoading(true));

  try {
    const [endpoint, requestOptions] = api.getCourseModuleDeleteRequest(accessToken, courseModuleNo);

    yield call(axios, endpoint, requestOptions);

    navigateTo('/dashboard/admin/courses/course');
    yield put(systemActions.addSystemNotification('Successfully Deleted Course Module', SNACK_SUCCESS));
  } catch (error) {
    if (!Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    }
  }

  yield put(coursesActions.requestCourseModuleDeleteLoading(false));
}

function* coursePagesRequestSaga({ accessToken, courseModuleNo }) {
  yield put(coursesActions.requestAllCoursePagesLoading(true));

  try {
    const [endpoint, requestOptions] = api.getCoursePagesRequest(accessToken, courseModuleNo);

    const { data } = yield call(axios, endpoint, requestOptions);

    yield put(coursesActions.setAllCoursePages(data));
  } catch (error) {
    if (!Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    }
  }

  yield put(coursesActions.requestAllCoursePagesLoading(false));
}

function* coursePageUpdateRequestSaga({ accessToken, payload, coursePageNo }) {
  yield put(coursesActions.requestCoursePageUpdateLoading(true));

  try {
    const [endpoint, requestOptions] = api.getCoursePageUpdateRequest(accessToken, payload, coursePageNo);

    const { data } = yield call(axios, endpoint, requestOptions);

    yield put(coursesActions.setCoursePageChange(data));
    yield put(systemActions.addSystemNotification('Successfully Updated Course Page', SNACK_SUCCESS));
  } catch (error) {
    if (!Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    }
  }

  yield put(coursesActions.requestCoursePageUpdateLoading(false));
}

function* coursePageInsertRequestSaga({ accessToken, payload, courseModuleNo }) {
  yield put(coursesActions.requestCoursePageInsertLoading(true));

  try {
    const [endpoint, requestOptions] = api.getCoursePageInsertRequest(accessToken, payload, courseModuleNo);

    const { data } = yield call(axios, endpoint, requestOptions);

    yield put(coursesActions.setCoursePageChange(data));
    yield put(systemActions.addSystemNotification('Successfully Inserted Course Page', SNACK_SUCCESS));
  } catch (error) {
    if (!Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    }
  }

  yield put(coursesActions.requestCoursePageInsertLoading(false));
}

function* coursePageDeleteRequestSaga({ accessToken, coursePageNo }) {
  yield put(coursesActions.requestCoursePageDeleteLoading(true));

  try {
    const [endpoint, requestOptions] = api.getCoursePageDeleteRequest(accessToken, coursePageNo);

    yield call(axios, endpoint, requestOptions);

    navigateTo('/dashboard/admin/courses/course/module');
    yield put(systemActions.addSystemNotification('Successfully Deleted Course Page', SNACK_SUCCESS));
  } catch (error) {
    if (!Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    }
  }

  yield put(coursesActions.requestCoursePageDeleteLoading(false));
}

function* courseTestsRequestSaga({ accessToken, courseNo }) {
  yield put(coursesActions.requestAllCourseTestsLoading(true));

  try {
    const [endpoint, requestOptions] = api.getCourseTestsRequest(accessToken, courseNo);

    const { data } = yield call(axios, endpoint, requestOptions);

    yield put(coursesActions.setAllCourseTests(data));
  } catch (error) {
    if (!Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    }
  }

  yield put(coursesActions.requestAllCourseTestsLoading(false));
}

function* courseTestUpdateRequestSaga({ accessToken, payload, courseTestNo }) {
  yield put(coursesActions.requestCourseTestUpdateLoading(true));

  try {
    const [endpoint, requestOptions] = api.getCourseTestUpdateRequest(accessToken, payload, courseTestNo);

    const { data } = yield call(axios, endpoint, requestOptions);

    yield put(coursesActions.setCourseTestChange(data));
    yield put(systemActions.addSystemNotification('Successfully Updated Course Test', SNACK_SUCCESS));
  } catch (error) {
    if (!Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    }
  }

  yield put(coursesActions.requestCourseTestUpdateLoading(false));
}

function* courseTestInsertRequestSaga({ accessToken, payload, courseNo }) {
  yield put(coursesActions.requestCourseTestInsertLoading(true));

  try {
    const [endpoint, requestOptions] = api.getCourseTestInsertRequest(accessToken, payload, courseNo);

    const { data } = yield call(axios, endpoint, requestOptions);

    yield put(coursesActions.setCourseTestChange(data));
    yield put(systemActions.addSystemNotification('Successfully Inserted Course Test', SNACK_SUCCESS));
  } catch (error) {
    if (!Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    }
  }

  yield put(coursesActions.requestCourseTestInsertLoading(false));
}

function* courseTestDeleteRequestSaga({ accessToken, courseTestNo }) {
  yield put(coursesActions.requestCourseTestDeleteLoading(true));

  try {
    const [endpoint, requestOptions] = api.getCourseTestDeleteRequest(accessToken, courseTestNo);

    yield call(axios, endpoint, requestOptions);

    navigateTo('/dashboard/admin/courses/course');
    yield put(systemActions.addSystemNotification('Successfully Deleted Course Test', SNACK_SUCCESS));
  } catch (error) {
    if (!Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    }
  }

  yield put(coursesActions.requestCourseTestDeleteLoading(false));
}

function* courseTestQuestionsRequestSaga({ accessToken, courseTestNo }) {
  yield put(coursesActions.requestAllCourseTestQuestionsLoading(true));

  try {
    const [endpoint, requestOptions] = api.getCourseTestQuestionsRequest(accessToken, courseTestNo);

    const { data } = yield call(axios, endpoint, requestOptions);

    yield put(coursesActions.setAllCourseTestQuestions(data));
  } catch (error) {
    if (!Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    }
  }

  yield put(coursesActions.requestAllCourseTestQuestionsLoading(false));
}

function* courseTestQuestionUpdateRequestSaga({ accessToken, payload, courseTestQuestionNo }) {
  yield put(coursesActions.requestCourseTestQuestionUpdateLoading(true));

  try {
    const [endpoint, requestOptions] = api.getCourseTestQuestionUpdateRequest(accessToken, payload, courseTestQuestionNo);

    const { data } = yield call(axios, endpoint, requestOptions);

    yield put(coursesActions.setCourseTestQuestionChange(data));
    yield put(systemActions.addSystemNotification('Successfully Updated Course Test Question', SNACK_SUCCESS));
  } catch (error) {
    if (!Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    }
  }

  yield put(coursesActions.requestCourseTestQuestionUpdateLoading(false));
}

function* courseTestQuestionInsertRequestSaga({ accessToken, payload, courseTestNo }) {
  yield put(coursesActions.requestCourseTestQuestionInsertLoading(true));

  try {
    const [endpoint, requestOptions] = api.getCourseTestQuestionInsertRequest(accessToken, payload, courseTestNo);

    const { data } = yield call(axios, endpoint, requestOptions);

    yield put(coursesActions.setCourseTestQuestionChange(data));
    yield put(systemActions.addSystemNotification('Successfully Inserted Course Test Question', SNACK_SUCCESS));
  } catch (error) {
    if (!Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    }
  }

  yield put(coursesActions.requestCourseTestQuestionInsertLoading(false));
}

function* courseTestQuestionDeleteRequestSaga({ accessToken, courseTestQuestionNo }) {
  yield put(coursesActions.requestCourseTestQuestionDeleteLoading(true));

  try {
    const [endpoint, requestOptions] = api.getCourseTestQuestionDeleteRequest(accessToken, courseTestQuestionNo);

    yield call(axios, endpoint, requestOptions);

    navigateTo('/dashboard/admin/courses/course/test');
    yield put(systemActions.addSystemNotification('Successfully Deleted Course Test Question', SNACK_SUCCESS));
  } catch (error) {
    if (!Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    }
  }

  yield put(coursesActions.requestCourseTestQuestionDeleteLoading(false));
}

function* courseTestAnswersRequestSaga({ accessToken, courseTestQuestionNo }) {
  yield put(coursesActions.requestAllCourseTestAnswersLoading(true));

  try {
    const [endpoint, requestOptions] = api.getCourseTestAnswersRequest(accessToken, courseTestQuestionNo);

    const { data } = yield call(axios, endpoint, requestOptions);

    yield put(coursesActions.setAllCourseTestAnswers(data));
  } catch (error) {
    if (!Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    }
  }

  yield put(coursesActions.requestAllCourseTestAnswersLoading(false));
}

function* courseTestAnswerUpdateRequestSaga({ accessToken, payload, courseTestAnswerNo }) {
  yield put(coursesActions.requestCourseTestAnswerUpdateLoading(true));

  try {
    const [endpoint, requestOptions] = api.getCourseTestAnswerUpdateRequest(accessToken, payload, courseTestAnswerNo);

    const { data } = yield call(axios, endpoint, requestOptions);

    yield put(coursesActions.setCourseTestAnswerChange(data));
    yield put(systemActions.addSystemNotification('Successfully Updated Course Test Answer', SNACK_SUCCESS));
  } catch (error) {
    if (!Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    }
  }

  yield put(coursesActions.requestCourseTestAnswerUpdateLoading(false));
}

function* courseTestAnswerInsertRequestSaga({ accessToken, payload, courseTestQuestionNo }) {
  yield put(coursesActions.requestCourseTestAnswerInsertLoading(true));

  try {
    const [endpoint, requestOptions] = api.getCourseTestAnswerInsertRequest(accessToken, payload, courseTestQuestionNo);

    const { data } = yield call(axios, endpoint, requestOptions);

    yield put(coursesActions.setCourseTestAnswerChange(data));
    yield put(systemActions.addSystemNotification('Successfully Inserted Course Test Answer', SNACK_SUCCESS));
  } catch (error) {
    if (!Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    }
  }

  yield put(coursesActions.requestCourseTestAnswerInsertLoading(false));
}

function* courseTestAnswerDeleteRequestSaga({ accessToken, courseTestAnswerNo }) {
  yield put(coursesActions.requestCourseTestAnswerDeleteLoading(true));

  try {
    const [endpoint, requestOptions] = api.getCourseTestAnswerDeleteRequest(accessToken, courseTestAnswerNo);

    yield call(axios, endpoint, requestOptions);

    navigateTo('/dashboard/admin/courses/course/test/question');
    yield put(systemActions.addSystemNotification('Successfully Deleted Course Test Answer', SNACK_SUCCESS));
  } catch (error) {
    if (!Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    }
  }

  yield put(coursesActions.requestCourseTestAnswerDeleteLoading(false));
}

function* getCourseResultsRequestSaga({ accessToken, employeeNo }) {
  yield put(coursesActions.requestAllCourseResultsLoading(true));

  try {
    const [endpoint, requestOptions] = api.getCourseResultsRequest(accessToken, employeeNo);

    const { data } = yield call(axios, endpoint, requestOptions);

    yield put(coursesActions.setAllCourseResults(data));
  } catch (error) {
    if (!Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    }
  }

  yield put(coursesActions.requestAllCourseResultsLoading(false));
}

function* courseResultUpdateRequestSaga({ accessToken, courseResultNo, payload }) {
  yield put(coursesActions.requestCourseResultUpdateLoading(true));

  console.log('accessToken', accessToken);
  console.log('courseResultNo', courseResultNo);
  console.log('payload', payload);

  try {
    const [endpoint, requestOptions] = api.getCourseResultUpdateRequest(accessToken, courseResultNo, payload);

    yield call(axios, endpoint, requestOptions);
  } catch (error) {
    if (!Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    }
  }

  yield put(coursesActions.requestCourseResultUpdateLoading(false));
}

function* courseTestResultInsertRequestSaga({ accessToken, courseResultNo, courseTestNo }) {
  yield put(coursesActions.requestCourseTestResultInsertLoading(true));
  try {
    const [endpoint, requestOptions] = api.getCourseTestResultInsertRequest(accessToken, courseResultNo, courseTestNo);

    const { data } = yield call(axios, endpoint, requestOptions);

    console.log('data', data);

    const payload = {
      courseTestNo: data?.courseTestNo,
      courseTestResultNo: data?.courseTestResultNo,
      courseTestResultStatusNo: data?.courseTestResultStatusNo,
      courseTestResultStatus: data?.courseTestResultStatus,
      courseTestResultPercentage: data?.courseTestResultPercentage,
      myTestLogs: []
    };

    yield put(myCoursesActions.changeMyCourseTestResult(payload));
  } catch (error) {
    if (!Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    }
  }

  yield put(coursesActions.requestCourseTestResultInsertLoading(false));
}

function* courseTestLogInsertRequestSaga({ accessToken, courseTestResultNo, courseTestQuestionNo, courseTestAnswerNo }) {
  yield put(coursesActions.requestCourseTestLogInsertLoading(true));
  try {
    const [endpoint, requestOptions] = api.getCourseTestLogInsertRequest(
      accessToken,
      courseTestResultNo,
      courseTestQuestionNo,
      courseTestAnswerNo
    );

    const { data } = yield call(axios, endpoint, requestOptions);

    console.log('data', data);

    const payload = {
      courseTestResultNo: courseTestResultNo,
      courseTestLogNo: data?.courseTestLogNo,
      courseTestQuestionNo: data?.courseTestQuestionNo,
      courseTestAnswerNo: data?.courseTestAnswerNo
    };

    yield put(myCoursesActions.changeMyCourseTestLog(payload));
  } catch (error) {
    if (!Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    }
  }

  yield put(coursesActions.requestCourseTestLogInsertLoading(false));
}

export function* watchCoursesSagas() {
  yield takeEvery(coursesActions.REQUEST_ALL_COURSES, coursesRequestSaga);
  yield takeEvery(coursesActions.REQUEST_ALL_COURSE_DIFFICULTIES, getAllCourseDifficultiesRequestSaga);
  yield takeEvery(coursesActions.REQUEST_COURSE_UPDATE, courseUpdateRequestSaga);
  yield takeEvery(coursesActions.REQUEST_COURSE_INSERT, courseInsertRequestSaga);
  yield takeEvery(coursesActions.REQUEST_COURSE_DELETE, courseDeleteRequestSaga);
  yield takeEvery(coursesActions.REQUEST_ALL_COURSE_MODULES, courseModulesRequestSaga);
  yield takeEvery(coursesActions.REQUEST_COURSE_MODULE_UPDATE, courseModuleUpdateRequestSaga);
  yield takeEvery(coursesActions.REQUEST_COURSE_MODULE_INSERT, courseModuleInsertRequestSaga);
  yield takeEvery(coursesActions.REQUEST_COURSE_MODULE_DELETE, courseModuleDeleteRequestSaga);
  yield takeEvery(coursesActions.REQUEST_ALL_COURSE_PAGES, coursePagesRequestSaga);
  yield takeEvery(coursesActions.REQUEST_COURSE_PAGE_UPDATE, coursePageUpdateRequestSaga);
  yield takeEvery(coursesActions.REQUEST_COURSE_PAGE_INSERT, coursePageInsertRequestSaga);
  yield takeEvery(coursesActions.REQUEST_COURSE_PAGE_DELETE, coursePageDeleteRequestSaga);
  yield takeEvery(coursesActions.REQUEST_ALL_COURSE_TESTS, courseTestsRequestSaga);
  yield takeEvery(coursesActions.REQUEST_COURSE_TEST_UPDATE, courseTestUpdateRequestSaga);
  yield takeEvery(coursesActions.REQUEST_COURSE_TEST_INSERT, courseTestInsertRequestSaga);
  yield takeEvery(coursesActions.REQUEST_COURSE_TEST_DELETE, courseTestDeleteRequestSaga);
  yield takeEvery(coursesActions.REQUEST_ALL_COURSE_TEST_QUESTIONS, courseTestQuestionsRequestSaga);
  yield takeEvery(coursesActions.REQUEST_COURSE_TEST_QUESTION_UPDATE, courseTestQuestionUpdateRequestSaga);
  yield takeEvery(coursesActions.REQUEST_COURSE_TEST_QUESTION_INSERT, courseTestQuestionInsertRequestSaga);
  yield takeEvery(coursesActions.REQUEST_COURSE_TEST_QUESTION_DELETE, courseTestQuestionDeleteRequestSaga);
  yield takeEvery(coursesActions.REQUEST_ALL_COURSE_TEST_ANSWERS, courseTestAnswersRequestSaga);
  yield takeEvery(coursesActions.REQUEST_COURSE_TEST_ANSWER_UPDATE, courseTestAnswerUpdateRequestSaga);
  yield takeEvery(coursesActions.REQUEST_COURSE_TEST_ANSWER_INSERT, courseTestAnswerInsertRequestSaga);
  yield takeEvery(coursesActions.REQUEST_COURSE_TEST_ANSWER_DELETE, courseTestAnswerDeleteRequestSaga);
  yield takeEvery(coursesActions.REQUEST_ALL_COURSE_RESULTS, getCourseResultsRequestSaga);
  yield takeEvery(coursesActions.REQUEST_COURSE_RESULT_UPDATE, courseResultUpdateRequestSaga);
  yield takeEvery(coursesActions.REQUEST_COURSE_TEST_RESULT_INSERT, courseTestResultInsertRequestSaga);
  yield takeEvery(coursesActions.REQUEST_COURSE_TEST_LOG_INSERT, courseTestLogInsertRequestSaga);
  yield takeEvery(coursesActions.REQUEST_COURSE_TEST_LOG_UPDATE, courseTestLogUpdateRequestSaga);
}
