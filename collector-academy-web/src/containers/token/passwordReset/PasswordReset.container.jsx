import PasswordReset from 'components/token/passwordReset/PasswordReset.component';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestPasswordResetConfirmationToken } from 'redux/actions/Token.action';

function PasswordResetContainer() {
  const dispatch = useDispatch();

  const { token, passwordResetLoading } = useSelector((state) => state.token);

  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleOnNewPasswordChange = (value) => {
    setNewPassword(value);
  };

  const handleOnConfirmNewPasswordChange = (value) => {
    setConfirmNewPassword(value);
  };

  const handleOnPasswordReset = () => {
    const payload = {
      confirmation_token: token,
      password: newPassword,
      confirmed_password: confirmNewPassword
    };

    dispatch(requestPasswordResetConfirmationToken(payload));
  };

  return (
    <PasswordReset
      passwordResetLoading={passwordResetLoading}
      onNewPasswordChange={handleOnNewPasswordChange}
      onConfirmNewPasswordChange={handleOnConfirmNewPasswordChange}
      onPasswordReset={handleOnPasswordReset}
    />
  );
}

PasswordResetContainer.propTypes = {};

export default PasswordResetContainer;
