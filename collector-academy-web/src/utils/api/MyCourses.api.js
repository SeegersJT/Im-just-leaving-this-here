import { API_PREFIX, getAuthHeaders, getHttpGetOptions } from './GenericWebRequest.api';

export const getMyCoursesEndpoint = () => `${API_PREFIX}/my-courses`;
export const getMyLearnCourseEndpoint = () => `${getMyCoursesEndpoint()}/learn`;

export const getMyCoursesRequest = (accessToken, employeeNo) => [
  getMyCoursesEndpoint(),
  getHttpGetOptions(getAuthHeaders(accessToken), { employeeNo })
];

export const getMyLearnCourseRequest = (accessToken, courseResultNo) => [
  getMyLearnCourseEndpoint(),
  getHttpGetOptions(getAuthHeaders(accessToken), { courseResultNo })
];
