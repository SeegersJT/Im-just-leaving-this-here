// RESET ALLOCATION
export const RESET_ALLOCATION = '[ALLOCATION] ALLOCATION - RESET';

// ASSIGN COURSES
export const REQUEST_ASSIGN_COURSES = '[ALLOCATION] ASSIGN COURSES - REQUEST';
export const REQUEST_ASSIGN_COURSES_LOADING = '[ALLOCATION] ASSIGN COURSES - REQUEST - LOADING';
export const SET_ASSIGN_COURSES = '[ALLOCATION] ASSIGN COURSES - SET';
export const SET_SELECTED_USERS_TO_ASSIGN_COURSES = '[ALLOCATION] SELECTED COURSES TO ASSIGN COURSES - REQUEST';
export const REQUEST_ASSIGNING_COURSES = '[ALLOCATION] ASSIGNING COURSES - REQUEST';
export const REQUEST_ASSIGNING_COURSES_LOADING = '[ALLOCATION] ASSIGNING COURSES - REQUEST - LOADING';

// UNASSIGN COURSES
export const REQUEST_UNASSIGN_COURSES = '[ALLOCATION] UNASSIGN COURSES - REQUEST';
export const REQUEST_UNASSIGN_COURSES_LOADING = '[ALLOCATION] UNASSIGN COURSES - REQUEST - LOADING';
export const SET_UNASSIGN_COURSES = '[ALLOCATION] UNASSIGN COURSES - SET';
export const SET_SELECTED_USERS_TO_UNASSIGN_COURSES = '[ALLOCATION] SELECTED COURSES TO UNASSIGN COURSES - REQUEST';
export const REQUEST_UNASSIGNING_COURSES = '[ALLOCATION] UNASSIGNING COURSES - REQUEST';
export const REQUEST_UNASSIGNING_COURSES_LOADING = '[ALLOCATION] UNASSIGNING COURSES - REQUEST - LOADING';

// ASSIGN USERS
export const REQUEST_ASSIGN_USERS = '[ALLOCATION] ASSIGN USERS - REQUEST';
export const REQUEST_ASSIGN_USERS_LOADING = '[ALLOCATION] ASSIGN USERS - REQUEST - LOADING';
export const SET_ASSIGN_USERS = '[ALLOCATION] ASSIGN USERS - SET';
export const SET_SELECTED_COURSES_TO_ASSIGN_USERS = '[ALLOCATION] SELECTED COURSES TO ASSIGN USERS - REQUEST';
export const REQUEST_ASSIGNING_USERS = '[ALLOCATION] ASSIGNING USERS - REQUEST';
export const REQUEST_ASSIGNING_USERS_LOADING = '[ALLOCATION] ASSIGNING USERS - REQUEST - LOADING';

// UNASSIGN USERS
export const REQUEST_UNASSIGN_USERS = '[ALLOCATION] UNASSIGN USERS - REQUEST';
export const REQUEST_UNASSIGN_USERS_LOADING = '[ALLOCATION] UNASSIGN USERS - REQUEST - LOADING';
export const SET_UNASSIGN_USERS = '[ALLOCATION] UNASSIGN USERS - SET';
export const SET_SELECTED_COURSES_TO_UNASSIGN_USERS = '[ALLOCATION] SELECTED COURSES TO UNASSIGN USERS - REQUEST';
export const REQUEST_UNASSIGNING_USERS = '[ALLOCATION] UNASSIGNING USERS - REQUEST';
export const REQUEST_UNASSIGNING_USERS_LOADING = '[ALLOCATION] UNASSIGNING USERS - REQUEST - LOADING';

// RESET ALLOCATION
export const resetAllocation = () => ({
  type: RESET_ALLOCATION
});

// ASSIGN COURSES
export const requestAssignCourses = (accessToken, employeeNo) => ({
  type: REQUEST_ASSIGN_COURSES,
  accessToken,
  employeeNo
});

export const requestAssignCoursesLoading = (loading) => ({
  type: REQUEST_ASSIGN_COURSES_LOADING,
  loading
});

export const setAssignCourses = (payload) => ({
  type: SET_ASSIGN_COURSES,
  payload
});

export const setSelectedUsersToAssignCourses = (payload) => ({
  type: SET_SELECTED_USERS_TO_ASSIGN_COURSES,
  payload
});

export const requestAssigningCourses = (accessToken, employees, courses) => ({
  type: REQUEST_ASSIGNING_COURSES,
  accessToken,
  employees,
  courses
});

export const requestAssigningCoursesLoading = (loading) => ({
  type: REQUEST_ASSIGNING_COURSES_LOADING,
  loading
});

// UNASSIGN COURSES
export const requestUnassignCourses = (accessToken, employeeNo) => ({
  type: REQUEST_UNASSIGN_COURSES,
  accessToken,
  employeeNo
});

export const requestUnassignCoursesLoading = (loading) => ({
  type: REQUEST_UNASSIGN_COURSES_LOADING,
  loading
});

export const setUnassignCourses = (payload) => ({
  type: SET_UNASSIGN_COURSES,
  payload
});

export const setSelectedUsersToUnassignCourses = (payload) => ({
  type: SET_SELECTED_USERS_TO_UNASSIGN_COURSES,
  payload
});

export const requestUnassigningCourses = (accessToken, courseResults) => ({
  type: REQUEST_UNASSIGNING_COURSES,
  accessToken,
  courseResults
});

export const requestUnassigningCoursesLoading = (loading) => ({
  type: REQUEST_UNASSIGNING_COURSES_LOADING,
  loading
});

// ASSIGN USERS
export const requestAssignUsers = (accessToken, courseNo) => ({
  type: REQUEST_ASSIGN_USERS,
  accessToken,
  courseNo
});

export const requestAssignUsersLoading = (loading) => ({
  type: REQUEST_ASSIGN_USERS_LOADING,
  loading
});

export const setAssignUsers = (payload) => ({
  type: SET_ASSIGN_USERS,
  payload
});

export const setSelectedCoursesToAssignUsers = (payload) => ({
  type: SET_SELECTED_COURSES_TO_ASSIGN_USERS,
  payload
});

export const requestAssigningUsers = (accessToken, courses, employees) => ({
  type: REQUEST_ASSIGNING_USERS,
  accessToken,
  courses,
  employees
});

export const requestAssigningUsersLoading = (loading) => ({
  type: REQUEST_ASSIGNING_USERS_LOADING,
  loading
});

// UNASSIGN USERS
export const requestUnassignUsers = (accessToken, courseNo) => ({
  type: REQUEST_UNASSIGN_USERS,
  accessToken,
  courseNo
});

export const requestUnassignUsersLoading = (loading) => ({
  type: REQUEST_UNASSIGN_USERS_LOADING,
  loading
});

export const setUnassignUsers = (payload) => ({
  type: SET_UNASSIGN_USERS,
  payload
});

export const setSelectedCoursesToUnassignUsers = (payload) => ({
  type: SET_SELECTED_COURSES_TO_UNASSIGN_USERS,
  payload
});

export const requestUnassigningUsers = (accessToken, courses, employees) => ({
  type: REQUEST_UNASSIGNING_USERS,
  accessToken,
  courses,
  employees
});

export const requestUnassigningUsersLoading = (loading) => ({
  type: REQUEST_UNASSIGNING_USERS_LOADING,
  loading
});
