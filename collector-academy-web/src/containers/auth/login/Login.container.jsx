import React, { useEffect, useState } from 'react';
import Login from 'components/auth/login/Login.component';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserRequest, resetAuth } from 'redux/actions/Auth.action';
import { resetConfirmationToken } from 'redux/actions/Token.action';

function LoginContainer() {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    dispatch(resetAuth());
    dispatch(resetConfirmationToken());
  }, [dispatch]);

  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleOnUsernameChange = (value) => {
    setCredentials((prevState) => ({ ...prevState, username: value }));
  };

  const handleOnPasswordChange = (value) => {
    setCredentials((prevState) => ({ ...prevState, password: value }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUserRequest(credentials));
  };

  const handleOnShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Login
      credentials={credentials}
      showPassword={showPassword}
      isLoginRequestLoading={auth.loginRequestLoading}
      onUsernameChange={handleOnUsernameChange}
      onPasswordChange={handleOnPasswordChange}
      onSubmit={handleOnSubmit}
      onShowPasswordChange={handleOnShowPasswordChange}
    />
  );
}

export default LoginContainer;
