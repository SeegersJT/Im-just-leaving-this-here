import axios from 'axios';
import { takeEvery, call, put, all } from 'redux-saga/effects';
import { SNACK_ERROR, SNACK_SUCCESS } from 'redux/reducers/System.reducer';
import { Utils } from 'utils/Utils';
import * as allocationActions from 'redux/actions/Allocation.action';
import * as systemActions from 'redux/actions/System.action';
import * as api from 'utils/api/Allocation.api';
import { navigateTo } from 'utils/NavigateService';
import { CalculationsOperators } from 'utils/constants/Calculations.enum';

function* getAssignCoursesRequestSaga({ accessToken, employeeNo }) {
  yield put(allocationActions.resetAllocation());
  yield put(allocationActions.requestAssignCoursesLoading(true));

  try {
    const [endpoint, requestOptions] = api.getAssignCoursesRequest(accessToken, employeeNo);

    const { data } = yield call(axios, endpoint, requestOptions);

    yield put(allocationActions.setAssignCourses(data));
    yield put(allocationActions.setSelectedUsersToAssignCourses([employeeNo]));

    navigateTo('/dashboard/admin/allocation');
  } catch (error) {
    if (!Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    }
  }

  yield put(allocationActions.requestAssignCoursesLoading(false));
}

function* getUnassignCoursesRequestSaga({ accessToken, employeeNo }) {
  yield put(allocationActions.resetAllocation());
  yield put(allocationActions.requestUnassignCoursesLoading(true));

  try {
    const [endpoint, requestOptions] = api.getUnassignCoursesRequest(accessToken, employeeNo);

    const { data } = yield call(axios, endpoint, requestOptions);

    yield put(allocationActions.setUnassignCourses(data));
    yield put(allocationActions.setSelectedUsersToUnassignCourses([employeeNo]));

    navigateTo('/dashboard/admin/allocation');
  } catch (error) {
    if (!Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    }
  }

  yield put(allocationActions.requestUnassignCoursesLoading(false));
}

function* getAssignUsersRequestSaga({ accessToken, courseNo }) {
  yield put(allocationActions.resetAllocation());
  yield put(allocationActions.requestAssignUsersLoading(true));

  try {
    const [endpoint, requestOptions] = api.getAssignUsersRequest(accessToken, courseNo);

    const { data } = yield call(axios, endpoint, requestOptions);

    yield put(allocationActions.setAssignUsers(data));
    yield put(allocationActions.setSelectedCoursesToAssignUsers([courseNo]));

    navigateTo('/dashboard/admin/allocation');
  } catch (error) {
    if (!Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    }
  }

  yield put(allocationActions.requestAssignUsersLoading(false));
}

function* getUnassignUsersRequestSaga({ accessToken, courseNo }) {
  yield put(allocationActions.resetAllocation());
  yield put(allocationActions.requestUnassignUsersLoading(true));

  try {
    const [endpoint, requestOptions] = api.getUnassignUsersRequest(accessToken, courseNo);

    const { data } = yield call(axios, endpoint, requestOptions);

    yield put(allocationActions.setUnassignUsers(data));
    yield put(allocationActions.setSelectedCoursesToAssignUsers([courseNo]));

    navigateTo('/dashboard/admin/allocation');
  } catch (error) {
    if (!Utils.isUndefined(error.response.data.message)) {
      yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
    } else {
      yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
    }
  }

  yield put(allocationActions.requestUnassignUsersLoading(false));
}

function* getAssigningCoursesRequestSaga({ accessToken, employees, courses }) {
  console.log('employees', employees);
  console.log('courses', courses);
  yield put(allocationActions.requestAssigningCoursesLoading(true));

  try {
    // Create an array of tasks to execute in parallel
    const updateTasks = employees.map((employee) =>
      courses.map((course) =>
        call(function* () {
          console.log('course', course);
          console.log('employee', employee);
          const courseNo = course?.courseNo;

          const payload = {
            courseStatusNo: null,
            courseResultStatusNo: null,
            courseResultPercentage: null,
            courseAssignedBy: null,
            courseAssignedDate: null,
            courseStartedDate: null,
            courseComletedDate: null,
            courseExpiryDate: Utils.formatDateTime(Utils.modifyDate({ months: 3 }, CalculationsOperators.ADD))
          };

          try {
            const [endpoint, requestOptions] = api.getAssigningCoursesRequest(accessToken, employee, courseNo, payload);
            yield call(axios, endpoint, requestOptions);
          } catch (error) {
            if (!Utils.isUndefined(error.response?.data?.message)) {
              yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
            } else {
              yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
            }
          }
        })
      )
    );

    // Flatten the array of tasks and execute them in parallel
    const flattenedTasks = updateTasks.flat();
    yield all(flattenedTasks);

    yield put(allocationActions.resetAllocation());
    navigateTo('/dashboard/admin/users');

    yield put(systemActions.addSystemNotification('Successfully Assigned Courses', SNACK_SUCCESS));
  } catch (error) {
    yield put(systemActions.addSystemNotification('Unexpected Error During Courses Assign', SNACK_ERROR));
  }

  yield put(allocationActions.requestAssigningCoursesLoading(false));
}

function* getUnassigningCoursesRequestSaga({ accessToken, courseResults }) {
  yield put(allocationActions.requestUnassigningCoursesLoading(true));

  try {
    const updateTasks = courseResults.map((courseResult) =>
      call(function* () {
        const courseResultNo = courseResult?.courseResultNo;

        try {
          const [endpoint, requestOptions] = api.getUnassigningCoursesRequest(accessToken, courseResultNo);
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

    yield put(allocationActions.resetAllocation());
    navigateTo('/dashboard/admin/users');

    yield put(systemActions.addSystemNotification('Successfully Unassigned Courses', SNACK_SUCCESS));
  } catch (error) {
    yield put(systemActions.addSystemNotification('Unexpected Error During Courses Unassign', SNACK_ERROR));
  }

  yield put(allocationActions.requestUnassigningCoursesLoading(false));
}

function* getAssigningUsersRequestSaga({ accessToken, courses, employees }) {
  yield put(allocationActions.requestAssigningUsersLoading(true));

  try {
    const updateTasks = courses.map((course) =>
      employees.map((employee) =>
        call(function* () {
          const courseNo = course?.courseNo;
          const employeeNo = employee?.employeeNo;

          const payload = {
            courseStatusNo: null,
            courseResultStatusNo: null,
            courseResultPercentage: null,
            courseAssignedBy: null,
            courseAssignedDate: null,
            courseStartedDate: null,
            courseComletedDate: null,
            courseExpiryDate: Utils.modifyDate({ months: 3 }, CalculationsOperators.ADD)
          };

          try {
            const [endpoint, requestOptions] = api.getAssigningUsersRequest(accessToken, courseNo, employeeNo, payload);
            yield call(axios, endpoint, requestOptions);
          } catch (error) {
            if (!Utils.isUndefined(error.response?.data?.message)) {
              yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
            } else {
              yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
            }
          }
        })
      )
    );

    yield all(updateTasks);

    yield put(allocationActions.resetAllocation());
    navigateTo('/dashboard/admin/courses');

    yield put(systemActions.addSystemNotification('Successfully Assigned Userss', SNACK_SUCCESS));
  } catch (error) {
    yield put(systemActions.addSystemNotification('Unexpected Error During Users Assign', SNACK_ERROR));
  }

  yield put(allocationActions.requestAssigningUsersLoading(false));
}

function* getUnassigningUsersRequestSaga({ accessToken, courses, employees }) {
  yield put(allocationActions.requestUnassigningUsersLoading(true));

  try {
    const updateTasks = courses.map((course) =>
      employees.map((employee) =>
        call(function* () {
          const courseNo = course?.courseNo;
          const employeeNo = employee?.employeeNo;

          const payload = {
            courseStatusNo: null,
            courseResultStatusNo: null,
            courseResultPercentage: null,
            courseAssignedBy: null,
            courseAssignedDate: null,
            courseStartedDate: null,
            courseComletedDate: null,
            courseExpiryDate: Utils.modifyDate({ months: 3 }, CalculationsOperators.ADD)
          };

          try {
            const [endpoint, requestOptions] = api.getUnassigningUsersRequest(accessToken, courseNo, employeeNo, payload);
            yield call(axios, endpoint, requestOptions);
          } catch (error) {
            if (!Utils.isUndefined(error.response?.data?.message)) {
              yield put(systemActions.addSystemNotification(error.response.data.message, SNACK_ERROR));
            } else {
              yield put(systemActions.addSystemNotification('Server is Unavailable', SNACK_ERROR));
            }
          }
        })
      )
    );

    yield all(updateTasks);

    yield put(allocationActions.resetAllocation());
    navigateTo('/dashboard/admin/courses');

    yield put(systemActions.addSystemNotification('Successfully Unassigned Userss', SNACK_SUCCESS));
  } catch (error) {
    yield put(systemActions.addSystemNotification('Unexpected Error During Users Unassign', SNACK_ERROR));
  }

  yield put(allocationActions.requestUnassigningUsersLoading(false));
}
export function* watchAllocationSagas() {
  yield takeEvery(allocationActions.REQUEST_ASSIGN_COURSES, getAssignCoursesRequestSaga);
  yield takeEvery(allocationActions.REQUEST_UNASSIGN_COURSES, getUnassignCoursesRequestSaga);
  yield takeEvery(allocationActions.REQUEST_ASSIGN_USERS, getAssignUsersRequestSaga);
  yield takeEvery(allocationActions.REQUEST_UNASSIGN_USERS, getUnassignUsersRequestSaga);

  yield takeEvery(allocationActions.REQUEST_ASSIGNING_COURSES, getAssigningCoursesRequestSaga);
  yield takeEvery(allocationActions.REQUEST_UNASSIGNING_COURSES, getUnassigningCoursesRequestSaga);
  yield takeEvery(allocationActions.REQUEST_ASSIGN_USERS, getAssigningUsersRequestSaga);
  yield takeEvery(allocationActions.REQUEST_UNASSIGN_USERS, getUnassigningUsersRequestSaga);
}
