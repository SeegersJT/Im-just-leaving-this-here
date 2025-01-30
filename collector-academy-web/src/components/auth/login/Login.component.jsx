import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';
import AnimateButton from 'components/@extends/AnimateButton.component';
import AuthWrapper from '../AuthWrapper.component';

function Login({ credentials, showPassword, isLoginRequestLoading, onUsernameChange, onPasswordChange, onSubmit, onShowPasswordChange }) {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Login</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <form noValidate onSubmit={onSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="username-login">Username</InputLabel>
                  <OutlinedInput
                    id="username-login"
                    type="username"
                    value={credentials.username}
                    name="username"
                    onChange={(e) => onUsernameChange(e.target.value)}
                    placeholder="Enter your Username"
                    fullWidth
                  />
                </Stack>
                {/* {touched.email && errors.email && (
                  <FormHelperText error id="standard-weight-helper-text-email-login">
                    {errors.email}
                  </FormHelperText>
                )} */}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    id="-password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={credentials.password}
                    name="password"
                    onChange={(e) => onPasswordChange(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={onShowPasswordChange} edge="end" color="secondary">
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Enter password"
                  />
                </Stack>
                {/* {touched.password && errors.password && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {errors.password}
                  </FormHelperText>
                )} */}
              </Grid>

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack direction="row-reverse" justifyContent="space-between" alignItems="center" spacing={2}>
                  <Link variant="h6" component={RouterLink} to="/auth/password-forgot" color="text.primary">
                    Forgot Password?
                  </Link>
                </Stack>
              </Grid>
              {/* {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )} */}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    disableElevation
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isLoginRequestLoading}
                  >
                    {isLoginRequestLoading ? <CircularProgress size={26} color="inherit" /> : 'Login'}
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}

Login.propTypes = {
  credentials: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }).isRequired,
  showPassword: PropTypes.bool.isRequired,
  isLoginRequestLoading: PropTypes.bool.isRequired,
  onUsernameChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default Login;
