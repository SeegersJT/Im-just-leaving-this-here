export const REQUEST_MY_COURSES = '[MY COURSES] MY COURSES - REQUEST';
export const REQUEST_MY_COURSES_LOADING = '[MY COURSES] MY COURSES - REQUEST - LOADING';
export const SET_MY_COURSES = '[MY COURSES] MY COURSES - SET';

export const SET_MY_SELECTED_COURSE_RESULT_NO = '[MY COURSES] MY SELECTED COURSE RESULT NO - SET';

export const REQUEST_MY_LEARN_COURSE = '[MY COURSES] MY LEARN COURSE - REQUEST';
export const REQUEST_MY_LEARN_COURSE_LOADING = '[MY COURSES] MY LEARN COURSE - REQUEST - LOADING';
export const SET_MY_LEARN_COURSE = '[MY COURSES] MY LEARN COURSE - SET';

export const CHANGE_MY_COURSE_TEST_RESULT = '[MY COURSES] MY COURSE RESULT - CHANGE';
export const CHANGE_MY_COURSE_TEST_LOG = '[MY COURSES] MY COURSE LOG - CHANGE';

// [ MY COURSES ]
export const requestMyCourses = (accessToken, employeeNo) => ({
  type: REQUEST_MY_COURSES,
  accessToken,
  employeeNo
});

export const requestMyCoursesLoading = (loading) => ({
  type: REQUEST_MY_COURSES_LOADING,
  loading
});

export const setMyCourses = (payload) => ({
  type: SET_MY_COURSES,
  payload
});

export const setMySelectedCourseResultNo = (payload) => ({
  type: SET_MY_SELECTED_COURSE_RESULT_NO,
  payload
});

export const requestMyLearnCourse = (accessToken, courseResultNo) => ({
  type: REQUEST_MY_LEARN_COURSE,
  accessToken,
  courseResultNo
});

export const requestMyLearnCourseLoading = (loading) => ({
  type: REQUEST_MY_LEARN_COURSE_LOADING,
  loading
});

export const setMyLearnCourse = (payload) => ({
  type: SET_MY_LEARN_COURSE,
  payload
});

export const changeMyCourseTestResult = (payload) => ({
  type: CHANGE_MY_COURSE_TEST_RESULT,
  payload
});

export const changeMyCourseTestLog = (payload) => ({
  type: CHANGE_MY_COURSE_TEST_LOG,
  payload
});
