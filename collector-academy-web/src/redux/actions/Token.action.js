import { Utils } from 'utils/Utils';

export const CONFIRMATION_TOKEN_SET = '[TOKEN] CONFIRMATION TOKEN - SET';
export const CONFIRMATION_TOKEN_RESET = '[TOKEN] CONFIRMATION TOKEN - RESET';

export const CONFIRMATION_TOKEN_VALIDATION_REQUEST = '[TOKEN] CONFIRMATION TOKEN VALIDATION - REQUEST';
export const CONFIRMATION_TOKEN_VALIDATION_SUCCESS = '[TOKEN] CONFIRMATION TOKEN VALIDATION - SUCCESS';
export const CONFIRMATION_TOKEN_VALIDATION_FAILURE = '[TOKEN] CONFIRMATION TOKEN VALIDATION - FAILURE';
export const CONFIRMATION_TOKEN_VALIDATION_REQUEST_LOADING = '[TOKEN] CONFIRMATION TOKEN VALIDATION - REQUEST - LOADING';

export const CONFIRMATION_TOKEN_IS_TOKEN_VALIDATED_SET = '[TOKEN] CONFIRMATION TOKEN - IS TOKEN VALIDATED - SET';
export const CONFIRMATION_TOKEN_IS_TOKEN_VALID_SET = '[TOKEN] CONFIRMATION TOKEN - IS TOKEN VALID - SET';

export const CONFIRMATION_TOKEN_ONE_TIME_PIN_REQUEST = '[TOKEN] CONFIRMATION TOKEN - ONE TIME PIN - REQUEST';
export const CONFIRMATION_TOKEN_ONE_TIME_PIN_REQUEST_LOADING = '[TOKEN] CONFIRMATION TOKEN - ONE TIME PIN - REQUEST - LOADING';

export const CONFIRMATION_TOKEN_PASSWORD_RESET_REQUEST = '[TOKEN] CONFIRMATION TOKEN - PASSWORD RESET - REQUEST';
export const CONFIRMATION_TOKEN_PASSWORD_RESET_REQUEST_LOADING = '[TOKEN] CONFIRMATION TOKEN - PASSWORD RESET - REQUEST - LOADING';

export const setConfirmationToken = (payload) => ({
  type: CONFIRMATION_TOKEN_SET,
  payload
});

export const resetConfirmationToken = () => ({
  type: CONFIRMATION_TOKEN_RESET
});

export const requestConfirmationTokenValidation = (payload, onValidateSuccess = Utils.noOp) => ({
  type: CONFIRMATION_TOKEN_VALIDATION_REQUEST,
  payload,
  onValidateSuccess
});

export const validateConfirmationTokenSuccess = () => ({
  type: CONFIRMATION_TOKEN_VALIDATION_SUCCESS
});

export const validateConfirmationTokenFailure = () => ({
  type: CONFIRMATION_TOKEN_VALIDATION_FAILURE
});

export const requestConfirmationTokenValidationLoading = (loading) => ({
  type: CONFIRMATION_TOKEN_VALIDATION_REQUEST_LOADING,
  loading
});

export const setIsValidatedConfirmationToken = (isTokenValidated) => ({
  type: CONFIRMATION_TOKEN_IS_TOKEN_VALIDATED_SET,
  isTokenValidated
});

export const setIsValidConfirmationToken = (isTokenValid) => ({
  type: CONFIRMATION_TOKEN_IS_TOKEN_VALIDATED_SET,
  isTokenValid
});

export const requestOneTimePinConfirmationToken = (payload) => ({
  type: CONFIRMATION_TOKEN_ONE_TIME_PIN_REQUEST,
  payload
});

export const requestOneTimePinConfirmationTokenLoading = (loading) => ({
  type: CONFIRMATION_TOKEN_ONE_TIME_PIN_REQUEST_LOADING,
  loading
});

export const requestPasswordResetConfirmationToken = (payload) => ({
  type: CONFIRMATION_TOKEN_PASSWORD_RESET_REQUEST,
  payload
});

export const requestPasswordResetConfirmationTokenLoading = (loading) => ({
  type: CONFIRMATION_TOKEN_PASSWORD_RESET_REQUEST_LOADING,
  loading
});
