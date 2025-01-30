export const AUTH_RESET = '[AUTH] RESET';

export const LOGIN_USER_REQUEST = '[AUTH] LOGIN USER - REQUEST';
export const LOGIN_USER_SUCCESS = '[AUTH] LOGIN USER - SUCCESS';
export const LOGIN_USER_FAILURE = '[AUTH] LOGIN USER - FAILURE';
export const LOGIN_USER_REQUEST_LOADING = '[AUTH] LOGIN USER - REQUEST - LOADING';

export const LOGOUT_USER = '[AUTH] LOGOUT USER';

export const FORGOT_PASSWORD_REQUEST = '[AUTH] FORGOT PASSWORD - REQUEST';
export const FORGOT_PASSWORD_REQUEST_LOADING = '[AUTH] FORGOT PASSWORD - REQUEST - LOADING';

export const resetAuth = () => ({
  type: AUTH_RESET
});

export const loginUserRequest = (credentials) => ({
  type: LOGIN_USER_REQUEST,
  payload: credentials
});

export const loginUserSuccess = (auth) => ({
  type: LOGIN_USER_SUCCESS,
  payload: auth
});

export const loginUserFailure = (error) => ({
  type: LOGIN_USER_FAILURE,
  payload: error
});

export const logoutUser = () => ({
  type: LOGOUT_USER
});

export const loginUserRequestLoading = (loading) => ({
  type: LOGIN_USER_REQUEST_LOADING,
  loading
});

export const requestForgotPassword = (payload) => ({
  type: FORGOT_PASSWORD_REQUEST,
  payload
});

export const requestForgotPasswordLoading = (loading) => ({
  type: FORGOT_PASSWORD_REQUEST_LOADING,
  loading
});
