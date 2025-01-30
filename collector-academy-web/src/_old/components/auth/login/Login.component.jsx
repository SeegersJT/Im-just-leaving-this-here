import { EyeOutlined } from '@ant-design/icons';
import { Button, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';
import AuthWrapper from '../AuthWrapper.component';
import AnimateButton from 'components/@extends/AnimateButton.component';

const Login = () => {
  return (
    <>
      <AuthWrapper>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
              <Typography variant="h3">Login</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <form noValidate onSubmit={() => {}}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="email-login">Username</InputLabel>
                    <OutlinedInput
                      id="email-login"
                      type="email"
                      value={''}
                      name="email"
                      onBlur={() => {}}
                      onChange={() => {}}
                      placeholder="Enter your Username"
                      fullWidth
                      error={false}
                    />
                  </Stack>
                  {false && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="password-login">Password</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={false}
                      id="-password-login"
                      type={'password'}
                      //   type={true ? 'text' : 'password'}
                      value={''}
                      name="password"
                      onBlur={() => {}}
                      onChange={() => {}}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => {}}
                            onMouseDown={() => {}}
                            edge="end"
                            color="secondary"
                          >
                            {<EyeOutlined />}
                            {/* {true ? <EyeOutlined /> : <EyeInvisibleOutlined />} */}
                          </IconButton>
                        </InputAdornment>
                      }
                      placeholder="Enter password"
                    />
                  </Stack>
                  {/* {false && (
            <FormHelperText error id="standard-weight-helper-text-password-login">
              {errors.password}
            </FormHelperText>
          )} */}
                </Grid>

                {/* <Grid item xs={12} sx={{ mt: -1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Link variant="h6" component={RouterLink} color="text.primary">
              Forgot Password?
            </Link>
          </Stack>
        </Grid> */}
                {/* {errors.submit && (
          <Grid item xs={12}>
            <FormHelperText error>{errors.submit}</FormHelperText>
          </Grid>
        )} */}

                <Grid item xs={12}>
                  <AnimateButton>
                    <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="primary">
                      Login
                    </Button>
                    {/* <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                Login
              </Button> */}
                  </AnimateButton>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </AuthWrapper>
    </>
  );
};

export default Login;
