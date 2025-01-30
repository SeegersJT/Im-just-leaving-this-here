import { API_PREFIX, getAuthHeaders, getHttpDeleteOptions, getHttpGetOptions, getHttpPostData } from './GenericWebRequest.api';

export const getAssignCoursesEndpoint = () => `${API_PREFIX}/course/assigned`;
export const getUnassignCoursesEndpoint = () => `${API_PREFIX}/course/unassigned`;
export const getAssignUsersEndpoint = () => `${API_PREFIX}/user/assigned`;
export const getUnassignUsersEndpoint = () => `${API_PREFIX}/user/unassigned`;

export const getCourseResultEndpoint = () => `${API_PREFIX}/course/result`;

export const getAssignCoursesRequest = (accessToken, employeeNo) => [
  getAssignCoursesEndpoint(),
  getHttpGetOptions(getAuthHeaders(accessToken), { employeeNo })
];

export const getUnassignCoursesRequest = (accessToken, employeeNo) => [
  getUnassignCoursesEndpoint(),
  getHttpGetOptions(getAuthHeaders(accessToken), { employeeNo })
];

export const getAssignUsersRequest = (accessToken, courseNo) => [
  getAssignUsersEndpoint(),
  getHttpGetOptions(getAuthHeaders(accessToken), { courseNo })
];

export const getUnassignUsersRequest = (accessToken, courseNo) => [
  getUnassignUsersEndpoint(),
  getHttpGetOptions(getAuthHeaders(accessToken), { courseNo })
];

export const getAssigningCoursesRequest = (accessToken, employeeNo, courseNo, payload) => [
  getCourseResultEndpoint(),
  getHttpPostData(payload, getAuthHeaders(accessToken), { employeeNo, courseNo })
];

export const getUnassigningCoursesRequest = (accessToken, courseResultNo) => [
  getCourseResultEndpoint(),
  getHttpDeleteOptions(getAuthHeaders(accessToken), { courseResultNo })
];
