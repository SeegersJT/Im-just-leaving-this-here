import {
  CONFIRMATION_TOKEN_IS_TOKEN_VALID_SET,
  CONFIRMATION_TOKEN_IS_TOKEN_VALIDATED_SET,
  CONFIRMATION_TOKEN_ONE_TIME_PIN_REQUEST_LOADING,
  CONFIRMATION_TOKEN_PASSWORD_RESET_REQUEST_LOADING,
  CONFIRMATION_TOKEN_RESET,
  CONFIRMATION_TOKEN_SET,
  CONFIRMATION_TOKEN_VALIDATION_FAILURE,
  CONFIRMATION_TOKEN_VALIDATION_REQUEST_LOADING,
  CONFIRMATION_TOKEN_VALIDATION_SUCCESS
} from '../actions/Token.action';

const initialState = {
  token: null,
  tokenType: null,
  tokenExpiryDate: null,
  isTokenValidated: false,
  isTokenValid: false,
  tokenValidationLoading: false,
  oneTimePinLoading: false,
  passwordResetLoading: false
};

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONFIRMATION_TOKEN_SET:
      return {
        ...state,
        token: action.payload.token,
        tokenType: action.payload.tokenType,
        tokenExpiryDate: action.payload.tokenExpiryDate,
        isTokenValidated: false,
        isTokenValid: false,
        tokenValidationLoading: false
      };

    case CONFIRMATION_TOKEN_RESET:
      return { ...initialState };

    case CONFIRMATION_TOKEN_VALIDATION_SUCCESS:
      return {
        ...state,
        isTokenValidated: true,
        isTokenValid: true
      };

    case CONFIRMATION_TOKEN_VALIDATION_FAILURE:
      return {
        ...state,
        isTokenValidated: true,
        isTokenValid: false
      };

    case CONFIRMATION_TOKEN_IS_TOKEN_VALIDATED_SET:
      return {
        ...state,
        isTokenValidated: action.isTokenValidated
      };

    case CONFIRMATION_TOKEN_IS_TOKEN_VALID_SET:
      return {
        ...state,
        isTokenValid: action.isTokenValid
      };

    case CONFIRMATION_TOKEN_VALIDATION_REQUEST_LOADING:
      return {
        ...state,
        tokenValidationLoading: action.loading
      };

    case CONFIRMATION_TOKEN_ONE_TIME_PIN_REQUEST_LOADING:
      return {
        ...state,
        oneTimePinLoading: action.loading
      };

    case CONFIRMATION_TOKEN_PASSWORD_RESET_REQUEST_LOADING:
      return {
        ...state,
        passwordResetLoading: action.loading
      };

    default:
      return state;
  }
};

export default tokenReducer;
