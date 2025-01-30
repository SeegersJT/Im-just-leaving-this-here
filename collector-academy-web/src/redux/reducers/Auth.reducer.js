import {
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_REQUEST_LOADING,
  AUTH_RESET,
  FORGOT_PASSWORD_REQUEST_LOADING
} from '../actions/Auth.action';

const initialState = {
  isAuthenticated: false,
  accessToken: null,
  expireDate: null,
  issuesAt: null,
  jwtID: null,
  loginRequestLoading: false,
  forgotPasswordRequestLoading: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_RESET:
      return { ...initialState };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        accessToken: action.payload.accessToken,
        expireDate: action.payload.expireDate,
        issuesAt: action.payload.issuesAt,
        jwtID: action.payload.jwtID,
        loginRequestLoading: false
      };

    case LOGIN_USER_FAILURE:
      return { ...initialState };

    case LOGIN_USER_REQUEST_LOADING:
      return {
        ...state,
        loginRequestLoading: action.loading
      };

    case FORGOT_PASSWORD_REQUEST_LOADING:
      return {
        ...state,
        forgotPasswordRequestLoading: action.loading
      };

    default:
      return state;
  }
};

export default authReducer;
