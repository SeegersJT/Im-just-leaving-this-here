import { Button, CircularProgress, Grid, Stack, TextField, Typography } from '@mui/material';

function PasswordReset({ passwordResetLoading, onNewPasswordChange, onConfirmNewPasswordChange, onPasswordReset }) {
  return (
    <Grid item xs={12} sx={{ width: '100%' }}>
      <Stack direction="column" justifyContent="space-between" alignItems="center" sx={{ height: '200px', mb: { xs: -0.5, sm: 0.5 } }}>
        <Typography variant="h5">Reset your Password</Typography>

        <TextField
          fullWidth
          id="outlined-basic"
          label="New Password"
          variant="outlined"
          onChange={(event) => onNewPasswordChange(event.target.value)}
        />
        <TextField
          fullWidth
          id="outlined-basic"
          label="Confirm New Password"
          variant="outlined"
          onChange={(event) => onConfirmNewPasswordChange(event.target.value)}
        />

        <Button
          disableElevation
          fullWidth
          size="large"
          type="button"
          variant="contained"
          color={'primary'}
          disabled={passwordResetLoading}
          onClick={onPasswordReset}
        >
          {passwordResetLoading ? <CircularProgress size={26} color="inherit" /> : 'Reset Password'}
        </Button>
      </Stack>
    </Grid>
  );
}

PasswordReset.propTypes = {};

export default PasswordReset;
