import {
  API_PREFIX,
  getAuthHeaders,
  getHttpDeleteOptions,
  getHttpGetOptions,
  getHttpPostData,
  getHttpPutData
} from './GenericWebRequest.api';

export const getCourseEndpoint = () => `${API_PREFIX}/course`;
export const getAllCoursesEndpoint = () => `${getCourseEndpoint()}/all`;
export const getCourseModuleEndpoint = () => `${getCourseEndpoint()}/module`;
export const getAllCourseModulesEndpoint = () => `${getCourseModuleEndpoint()}/all`;
export const getCoursePageEndpoint = () => `${getCourseEndpoint()}/page`;
export const getAllCoursePagesEndpoint = () => `${getCoursePageEndpoint()}/all`;
export const getCourseTestEndpoint = () => `${getCourseEndpoint()}/test`;
export const getCourseTestResultEndpoint = () => `${getCourseTestEndpoint()}/result`;
export const getCourseTestLogEndpoint = () => `${getCourseTestEndpoint()}/log`;
export const getAllCourseTestsEndpoint = () => `${getCourseTestEndpoint()}/all`;
export const getCourseTestQuestionEndpoint = () => `${getCourseTestEndpoint()}/question`;
export const getAllCourseTestQuestionsEndpoint = () => `${getCourseTestQuestionEndpoint()}/all`;
export const getCourseTestAnswerEndpoint = () => `${getCourseTestEndpoint()}/answer`;
export const getAllCourseTestAnswersEndpoint = () => `${getCourseTestAnswerEndpoint()}/all`;
export const getAllCourseDifficultiesEndpoint = () => `${getCourseEndpoint()}/difficulty/all`;
export const getCourseResultEndpoint = () => `${getCourseEndpoint()}/result`;
export const getAllCourseResultsEndpoint = () => `${getCourseResultEndpoint()}/all`;

export const getAllCoursesRequest = (accessToken) => [getAllCoursesEndpoint(), getHttpGetOptions(getAuthHeaders(accessToken))];

export const getAllCourseDifficultiesRequest = (accessToken) => [
  getAllCourseDifficultiesEndpoint(),
  getHttpGetOptions(getAuthHeaders(accessToken))
];

export const getCourseUpdateRequest = (accessToken, payload, courseNo) => [
  getCourseEndpoint(),
  getHttpPutData(payload, getAuthHeaders(accessToken), { courseNo })
];

export const getCourseInsertRequest = (accessToken, payload) => [
  getCourseEndpoint(),
  getHttpPostData(payload, getAuthHeaders(accessToken))
];

export const getCourseDeleteRequest = (accessToken, courseNo) => [
  getCourseEndpoint(),
  getHttpDeleteOptions(getAuthHeaders(accessToken), { courseNo })
];

export const getCourseModulesRequest = (accessToken, courseNo) => [
  getAllCourseModulesEndpoint(),
  getHttpGetOptions(getAuthHeaders(accessToken), { courseNo })
];

export const getCourseModuleUpdateRequest = (accessToken, payload, courseModuleNo) => [
  getCourseModuleEndpoint(),
  getHttpPutData(payload, getAuthHeaders(accessToken), { courseModuleNo })
];

export const getCourseModuleInsertRequest = (accessToken, payload, courseNo) => [
  getCourseModuleEndpoint(),
  getHttpPostData(payload, getAuthHeaders(accessToken), { courseNo })
];

export const getCourseModuleDeleteRequest = (accessToken, courseModuleNo) => [
  getCourseModuleEndpoint(),
  getHttpDeleteOptions(getAuthHeaders(accessToken), { courseModuleNo })
];

export const getCoursePagesRequest = (accessToken, courseModuleNo) => [
  getAllCoursePagesEndpoint(),
  getHttpGetOptions(getAuthHeaders(accessToken), { courseModuleNo })
];

export const getCoursePageUpdateRequest = (accessToken, payload, coursePageNo) => [
  getCoursePageEndpoint(),
  getHttpPutData(payload, getAuthHeaders(accessToken), { coursePageNo })
];

export const getCoursePageInsertRequest = (accessToken, payload, courseModuleNo) => [
  getCoursePageEndpoint(),
  getHttpPostData(payload, getAuthHeaders(accessToken), { courseModuleNo })
];

export const getCoursePageDeleteRequest = (accessToken, coursePageNo) => [
  getCoursePageEndpoint(),
  getHttpDeleteOptions(getAuthHeaders(accessToken), { coursePageNo })
];

export const getCourseTestsRequest = (accessToken, courseNo) => [
  getAllCourseTestsEndpoint(),
  getHttpGetOptions(getAuthHeaders(accessToken), { courseNo })
];

export const getCourseTestUpdateRequest = (accessToken, payload, courseTestNo) => [
  getCourseTestEndpoint(),
  getHttpPutData(payload, getAuthHeaders(accessToken), { courseTestNo })
];

export const getCourseTestInsertRequest = (accessToken, payload, courseNo) => [
  getCourseTestEndpoint(),
  getHttpPostData(payload, getAuthHeaders(accessToken), { courseNo })
];

export const getCourseTestDeleteRequest = (accessToken, courseTestNo) => [
  getCourseTestEndpoint(),
  getHttpDeleteOptions(getAuthHeaders(accessToken), { courseTestNo })
];

export const getCourseTestQuestionsRequest = (accessToken, courseTestNo) => [
  getAllCourseTestQuestionsEndpoint(),
  getHttpGetOptions(getAuthHeaders(accessToken), { courseTestNo })
];

export const getCourseTestQuestionUpdateRequest = (accessToken, payload, courseTestQuestionNo) => [
  getCourseTestQuestionEndpoint(),
  getHttpPutData(payload, getAuthHeaders(accessToken), { courseTestQuestionNo })
];

export const getCourseTestQuestionInsertRequest = (accessToken, payload, courseTestNo) => [
  getCourseTestQuestionEndpoint(),
  getHttpPostData(payload, getAuthHeaders(accessToken), { courseTestNo })
];

export const getCourseTestQuestionDeleteRequest = (accessToken, courseTestQuestionNo) => [
  getCourseTestQuestionEndpoint(),
  getHttpDeleteOptions(getAuthHeaders(accessToken), { courseTestQuestionNo })
];

export const getCourseTestAnswersRequest = (accessToken, courseTestQuestionNo) => [
  getAllCourseTestAnswersEndpoint(),
  getHttpGetOptions(getAuthHeaders(accessToken), { courseTestQuestionNo })
];

export const getCourseTestAnswerUpdateRequest = (accessToken, payload, courseTestAnswerNo) => [
  getCourseTestAnswerEndpoint(),
  getHttpPutData(payload, getAuthHeaders(accessToken), { courseTestAnswerNo })
];

export const getCourseTestAnswerInsertRequest = (accessToken, payload, courseTestQuestionNo) => [
  getCourseTestAnswerEndpoint(),
  getHttpPostData(payload, getAuthHeaders(accessToken), { courseTestQuestionNo })
];

export const getCourseTestAnswerDeleteRequest = (accessToken, courseTestAnswerNo) => [
  getCourseTestAnswerEndpoint(),
  getHttpDeleteOptions(getAuthHeaders(accessToken), { courseTestAnswerNo })
];

export const getCourseResultsRequest = (accessToken, employeeNo) => [
  getAllCourseResultsEndpoint(),
  getHttpGetOptions(getAuthHeaders(accessToken), { employeeNo })
];

export const getCourseResultUpdateRequest = (accessToken, courseResultNo, payload) => [
  getCourseResultEndpoint(),
  getHttpPutData(payload, getAuthHeaders(accessToken), { courseResultNo })
];

export const getCourseTestResultInsertRequest = (accessToken, courseResultNo, courseTestNo) => [
  getCourseTestResultEndpoint(),
  getHttpPostData(null, getAuthHeaders(accessToken), { courseResultNo, courseTestNo })
];

export const getCourseTestResultUpdateRequest = (accessToken, courseTestResultNo) => [
  getCourseTestResultEndpoint(),
  getHttpPutData(null, getAuthHeaders(accessToken), { courseTestResultNo })
];

export const getCourseTestLogInsertRequest = (accessToken, courseTestResultNo, courseTestQuestionNo, courseTestAnswerNo) => [
  getCourseTestLogEndpoint(),
  getHttpPostData({ courseTestResultNo, courseTestQuestionNo, courseTestAnswerNo }, getAuthHeaders(accessToken))
];
