export const API_HOST = 'http://localhost:8080';
export const API_PREFIX = `${API_HOST}/api`;

export const GET = 'GET';
export const POST = 'POST';
export const PUT = 'PUT';
export const DELETE = 'DELETE';

export const getHttpGetOptions = (headers = null, params = null, responseType = null) => ({
  method: GET,
  headers,
  params,
  responseType,
  withCredentials: true
});

export const getHttpPostData = (data, headers = null, params = null) => ({
  method: POST,
  data,
  headers,
  params,
  withCredentials: true
});

export const getHttpPutData = (data, headers = null, params = null) => ({
  method: PUT,
  data,
  headers,
  params,
  withCredentials: true
});

export const getHttpDeleteOptions = (headers = null, params = null) => ({
  method: DELETE,
  headers,
  params,
  withCredentials: true
});

export const getAuthHeaders = (accessToken = null) => ({
  Authorization: `Bearer ${accessToken}`
});

export const getContentTypeFormDataHeaders = () => ({
  'Content-Type': 'multipart/form-data'
});

export const getCachControlHeaders = () => ({
  'Cache-Control': 'no-cache'
});
