export const REQUEST_USERS = '[USERS] USERS - REQUEST';
export const SET_USERS = '[USERS] USERS - SET';
export const REQUEST_USERS_LOADING = '[USERS] USERS - REQUEST - LOADING';
export const RESET_USERS = '[USERS] USERS - RESET';

export const SET_SELECTED_USERS = '[USERS] SELECTED USERS - SET';

export const REQUEST_UPDATE_USERS = '[USERS] UPDATE USERS - REQUEST';
export const REQUEST_UPDATE_USERS_LOADING = '[USERS] UPDATE USERS - REQUEST - LOADING';

export const REQUEST_USERS_RESET_PASSWORD = '[USERS] USERS RESET PASSWORD - REQUEST';
export const REQUEST_USERS_RESET_PASSWORD_LOADING = '[USERS] USERS RESET PASSWORD - REQUEST - LOADING';

export const REQUEST_USERS_DELETE = '[USERS] USERS DELETE - REQUEST';
export const REQUEST_USERS_DELETE_LOADING = '[USERS] USERS DELETE - REQUEST - LOADING';

export const REQUEST_ADD_USERS_FILE_UPLOAD_VALIDATE = '[USERS] ADD USERS - FILE UPLOAD - VALIDATE - REQUEST';
export const REQUEST_ADD_USERS_FILE_UPLOAD_VALIDATE_LOADING = '[USERS] ADD USERS - FILE UPLOAD - VALIDATE - REQUEST - LOADING';
export const SET_ADD_USERS_FILE_UPLOAD_VALIDATE = '[USERS] ADD USERS - FILE UPLOAD - VALIDATE - SET';

export const REQUEST_ADD_USERS_TEMPLATE_DOWNLOAD = '[USERS] ASS USERS - TEMPLATE - DOWNLOAD - REQUEST';
export const REQUEST_ADD_USERS_TEMPLATE_DOWNLOAD_LOADING = '[USERS] ASS USERS - TEMPLATE - DOWNLOAD - REQUEST - LOADING';

export const REQUEST_ADD_VALIDATE_USERS = '[USERS] ADD VALIDATE USERS - REQUEST';
export const REQUEST_ADD_VALIDATE_USERS_LOADING = '[USERS] ADD VALIDATE USERS - REQUEST - LOADING';
export const SET_USERS_UPLOAD_STATUS = '[USERS] USERS UPLOAD STATUS - SET';

export const requestUsers = (accessToken) => ({
  type: REQUEST_USERS,
  accessToken
});

export const setUsers = (payload) => ({
  type: SET_USERS,
  payload
});

export const requestUsersLoading = (loading) => ({
  type: REQUEST_USERS_LOADING,
  loading
});

export const resetUser = () => ({
  type: RESET_USERS
});

export const setSelectedUsers = (selectedUsers) => ({
  type: SET_SELECTED_USERS,
  selectedUsers
});

export const requestUpdateUsers = (accessToken, users, onSuccess) => ({
  type: REQUEST_UPDATE_USERS,
  accessToken,
  users,
  onSuccess
});

export const requestUpdateUsersLoading = (loading) => ({
  type: REQUEST_UPDATE_USERS_LOADING,
  loading
});

export const requestUsersResetPassword = (accessToken, users, onResponse) => ({
  type: REQUEST_USERS_RESET_PASSWORD,
  accessToken,
  users,
  onResponse
});

export const requestUsersResetPasswordLoading = (loading) => ({
  type: REQUEST_USERS_RESET_PASSWORD_LOADING,
  loading
});

export const requestUsersDelete = (accessToken, users, onResponse) => ({
  type: REQUEST_USERS_DELETE,
  accessToken,
  users,
  onResponse
});

export const requestUsersDeleteLoading = (loading) => ({
  type: REQUEST_USERS_DELETE_LOADING,
  loading
});

export const requestAddUsersFileUploadValidate = (accessToken, file) => ({
  type: REQUEST_ADD_USERS_FILE_UPLOAD_VALIDATE,
  accessToken,
  file
});

export const requestAddUsersFileUploadValidateLoading = (loading) => ({
  type: REQUEST_ADD_USERS_FILE_UPLOAD_VALIDATE_LOADING,
  loading
});

export const setAddUsersFileUploadValidate = (payload) => ({
  type: SET_ADD_USERS_FILE_UPLOAD_VALIDATE,
  payload
});

export const requestAddUserTemplateDownload = (accessToken) => ({
  type: REQUEST_ADD_USERS_TEMPLATE_DOWNLOAD,
  accessToken
});

export const requestAddUserTemplateDownloadLoading = (loading) => ({
  type: REQUEST_ADD_USERS_TEMPLATE_DOWNLOAD_LOADING,
  loading
});

export const requestAddValidateUsers = (accessToken, payload) => ({
  type: REQUEST_ADD_VALIDATE_USERS,
  accessToken,
  payload
});

export const requestAddValidateUsersLoading = (loading) => ({
  type: REQUEST_ADD_VALIDATE_USERS_LOADING,
  loading
});

export const setUsersUploadStatus = (payload) => ({
  type: SET_USERS_UPLOAD_STATUS,
  payload
});
