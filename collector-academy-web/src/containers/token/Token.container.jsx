import Token from 'components/token/Token.component';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestConfirmationTokenValidation } from 'redux/actions/Token.action';
import { navigateTo } from 'utils/NavigateService';
import { Utils } from 'utils/Utils';

function TokenContainer() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.token);

  const [timeLeft, setTimeLeft] = useState('');

  const validateToken = useCallback(() => {
    if (token?.token) {
      const payload = {
        confirmationToken: token?.token
      };

      dispatch(requestConfirmationTokenValidation(payload));
    } else {
      navigateTo('/');
    }
  }, [dispatch, token?.token]);

  const navigateToTokenType = useCallback((tokenType) => {
    switch (tokenType) {
      case 'ONE_TIME_PIN':
      case 'PASSWORD_FORGOT':
        navigateTo('/token/one-time-pin');
        break;
      case 'PASSWORD_RESET':
        navigateTo('/token/password-reset');
        break;
      default:
        console.warn('Unhandled token type:', tokenType);
    }
  }, []);

  useEffect(() => {
    validateToken();
  }, [validateToken]);

  useEffect(() => {
    if (token?.tokenType && token?.isTokenValidated && token?.isTokenValid) {
      navigateToTokenType(token.tokenType);
    }
  }, [token, navigateToTokenType]);

  useEffect(() => {
    if (token?.tokenExpiryDate) {
      Utils.startCountdown(token?.tokenExpiryDate, setTimeLeft);
    }
  }, [token?.tokenExpiryDate]);

  const handleOnGoToLoginClick = (event) => {
    event.preventDefault();
    navigateTo('/');
  };

  const handleOnValidateToken = () => {
    validateToken();
  };

  return (
    <>
      <Token
        tokenValidationLoading={token.tokenValidationLoading}
        timeLeft={timeLeft}
        isTokenValidated={token.isTokenValidated}
        isTokenValid={token.isTokenValid}
        onGoToLoginClick={handleOnGoToLoginClick}
        onValidateToken={handleOnValidateToken}
      />
    </>
  );
}

export default TokenContainer;
