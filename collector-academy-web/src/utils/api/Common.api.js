import { API_PREFIX, getAuthHeaders, getHttpGetOptions } from './GenericWebRequest.api';

export const getAllBranchesEndpoint = () => `${API_PREFIX}/common/branch/all`;
export const getAllGendersEndpoint = () => `${API_PREFIX}/common/gender/all`;
export const getAllEmployeeTypesEndpoint = () => `${API_PREFIX}/common/employee-type/all`;
export const getAllPerformacneManagersEndpoint = () => `${API_PREFIX}/common/performance-manager/all`;

export const getAllBranchesRequest = (accessToken) => [getAllBranchesEndpoint(), getHttpGetOptions(getAuthHeaders(accessToken))];

export const getAllGendersRequest = (accessToken) => [getAllGendersEndpoint(), getHttpGetOptions(getAuthHeaders(accessToken))];

export const getAllEmployeeTypesRequest = (accessToken) => [getAllEmployeeTypesEndpoint(), getHttpGetOptions(getAuthHeaders(accessToken))];

export const getAllPerformanceManagersRequest = (accessToken) => [
  getAllPerformacneManagersEndpoint(),
  getHttpGetOptions(getAuthHeaders(accessToken))
];
