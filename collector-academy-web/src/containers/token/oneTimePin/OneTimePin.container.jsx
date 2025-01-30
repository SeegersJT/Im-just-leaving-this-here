import OneTimePin from 'components/token/oneTimePin/OneTimePin.component';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestConfirmationTokenValidation, requestOneTimePinConfirmationToken } from 'redux/actions/Token.action';
import { Utils } from 'utils/Utils';

function OneTimePinContainer() {
  const dispatch = useDispatch();

  const { token, oneTimePinLoading } = useSelector((state) => state.token);

  const [otp, setOTP] = useState('');

  const handleChange = (newValue) => {
    setOTP(newValue);
  };

  const handleComplete = (newData) => {
    const onValidateSuccess = () => {
      const oneTimePinPayload = {
        confirmation_token: token,
        one_time_pin: newData
      };

      dispatch(requestOneTimePinConfirmationToken(oneTimePinPayload));
    };

    const validationPayload = {
      confirmationToken: token
    };

    dispatch(requestConfirmationTokenValidation(validationPayload, onValidateSuccess));
  };

  const handleValidateChar = (value) => {
    return Utils.isNumeric(value);
  };

  return (
    <OneTimePin
      otp={otp}
      validateChar={handleValidateChar}
      oneTimePinLoading={oneTimePinLoading}
      onChange={handleChange}
      onComplete={handleComplete}
    />
  );
}

export default OneTimePinContainer;
