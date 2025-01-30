export const REQUEST_ALL_BRANCHES = '[COMMON] ALL BRANCHES - REQUEST';
export const REQUEST_ALL_BRANCHES_LOADING = '[COMMON] ALL BRANCHES - REQUEST - LOADING';
export const SET_BRANCHES = '[COMMON] BRANCHES - SET';

export const REQUEST_ALL_GENDERS = '[COMMON] ALL GENDERS - REQUEST';
export const REQUEST_ALL_GENDERS_LOADING = '[COMMON] ALL GENDERS - REQUEST - LOADING';
export const SET_ALL_GENDERS = '[COMMON] GENDERS - SET';

export const REQUEST_ALL_EMPLOYEE_TYPES = '[COMMON] ALL EMPLOYEE TYPES - REQUEST';
export const REQUEST_ALL_EMPLOYEE_TYPES_LOADING = '[COMMON] ALL EMPLOYEE TYPES - REQUEST - LOADING';
export const SET_ALL_EMPLOYEE_TYPES = '[COMMON] EMPLOYEE TYPES - SET';

export const REQUEST_ALL_PERFORMANCE_MANAGERS = '[COMMON] ALL PERFORMANCE MANAGERS - REQUEST';
export const REQUEST_ALL_PERFORMANCE_MANAGERS_LOADING = '[COMMON] ALL PERFORMANCE MANAGERS - REQUEST - LOADING';
export const SET_ALL_PERFORMANCE_MANAGERS = '[COMMON] PERFORMANCE MANAGERS - SET';

// [ BRANCHES ]
export const requestAllBranches = (accessToken) => ({
  type: REQUEST_ALL_BRANCHES,
  accessToken
});

export const requestAllBranchesLoading = (loading) => ({
  type: REQUEST_ALL_BRANCHES_LOADING,
  loading
});

export const setAllBranches = (payload) => ({
  type: SET_BRANCHES,
  payload
});

// [ GENDERS ]
export const requestAllGenders = (accessToken) => ({
  type: REQUEST_ALL_GENDERS,
  accessToken
});

export const requestAllGendersLoading = (loading) => ({
  type: REQUEST_ALL_GENDERS_LOADING,
  loading
});

export const setAllGenders = (payload) => ({
  type: SET_ALL_GENDERS,
  payload
});

// [ EMPLOYEE TYPES ]
export const requestAllEmployeeTypes = (accessToken) => ({
  type: REQUEST_ALL_EMPLOYEE_TYPES,
  accessToken
});

export const requestAllEmployeeTypesLoading = (loading) => ({
  type: REQUEST_ALL_EMPLOYEE_TYPES_LOADING,
  loading
});

export const setAllEmployeeTypes = (payload) => ({
  type: SET_ALL_EMPLOYEE_TYPES,
  payload
});

// [ PERFORMANCE MANAGERS ]
export const requestAllPerformanceManagers = (accessToken) => ({
  type: REQUEST_ALL_PERFORMANCE_MANAGERS,
  accessToken
});

export const requestAllPerformanceManagersLoading = (loading) => ({
  type: REQUEST_ALL_PERFORMANCE_MANAGERS_LOADING,
  loading
});

export const setAllPerformanceManagers = (payload) => ({
  type: SET_ALL_PERFORMANCE_MANAGERS,
  payload
});
