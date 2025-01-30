import PasswordForgot from 'components/auth/passwordForgot/PasswordForgot.component';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestForgotPassword } from 'redux/actions/Auth.action';

function PasswordForgotContainer() {
  const dispatch = useDispatch();
  const { passwordForgotRequestLoading } = useSelector((state) => state.auth);

  const [usernameEmail, setUsernameEmail] = useState('');

  const handleOnUsernameEmailChange = (value) => {
    setUsernameEmail(value);
  };

  const hanleOnSubmit = (e) => {
    e.preventDefault();

    const payload = {
      username_or_email: usernameEmail
    };

    dispatch(requestForgotPassword(payload));
  };

  return (
    <PasswordForgot
      passwordForgotRequestLoading={passwordForgotRequestLoading}
      onUsernameEmailChange={handleOnUsernameEmailChange}
      onSubmit={hanleOnSubmit}
    />
  );
}

PasswordForgotContainer.propTypes = {};

export default PasswordForgotContainer;
