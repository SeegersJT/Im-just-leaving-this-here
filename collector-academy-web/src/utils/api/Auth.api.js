import { API_PREFIX, getHttpGetOptions, getHttpPostData } from './GenericWebRequest.api';

export const getAuthLoginEndpoint = () => `${API_PREFIX}/auth/login`;
export const getTokenValidationEndpoint = () => `${API_PREFIX}/auth/token/verify`;
export const getOneTimePinEndPoint = () => `${API_PREFIX}/auth/token/one-time-pin`;
export const getPasswordResetEndPoint = () => `${API_PREFIX}/auth/token/password-reset`;
export const getForgotPasswordEndPoint = () => `${API_PREFIX}/auth/token/password-forgot`;

export const getAuthLoginRequest = (payload) => [getAuthLoginEndpoint(), getHttpPostData(payload)];
export const getTokenValidationRequest = (payload) => [getTokenValidationEndpoint(), getHttpGetOptions(null, payload)];
export const getOneTimePinRequest = (payload) => [getOneTimePinEndPoint(), getHttpPostData(payload)];
export const getPasswordResetRequest = (payload) => [getPasswordResetEndPoint(), getHttpPostData(payload)];
export const getForgotPasswordRequest = (payload) => [getForgotPasswordEndPoint(), getHttpPostData(payload)];
