import { Button, CircularProgress, Grid, Stack, TextField, Typography } from '@mui/material';
import AuthWrapper from '../AuthWrapper.component';
import AnimateButton from 'components/@extends/AnimateButton.component';

function PasswordForgot({ passwordForgotRequestLoading, onUsernameEmailChange, onSubmit }) {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Forgot Password</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <form noValidate onSubmit={onSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <TextField
                    id="outlined-basic"
                    label="Username or Email"
                    variant="outlined"
                    onChange={(event) => onUsernameEmailChange(event.target.value)}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    disableElevation
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={passwordForgotRequestLoading}
                  >
                    {passwordForgotRequestLoading ? <CircularProgress size={26} color="inherit" /> : 'Reset Password'}
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

PasswordForgot.propTypes = {};

export default PasswordForgot;
