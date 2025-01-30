import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import { MuiOtpInput } from 'mui-one-time-password-input';
import PropTypes from 'prop-types';

function OneTimePin({ otp, validateChar, oneTimePinLoading, onChange, onComplete }) {
  return (
    <Stack direction="column" justifyContent="space-between" alignItems="center" sx={{ height: '200px', mb: { xs: -0.5, sm: 0.5 } }}>
      <Typography variant="h5">Enter your One Time Pin</Typography>

      <MuiOtpInput
        autoFocus
        length={6}
        value={otp}
        gap={2}
        TextFieldsProps={{ placeholder: '-' }}
        validateChar={validateChar}
        onChange={onChange}
        onComplete={onComplete}
      />

      <Button
        disableElevation
        fullWidth
        size="large"
        type="button"
        variant="contained"
        color={'primary'}
        disabled={oneTimePinLoading}
        onClick={() => onComplete(otp)}
      >
        {oneTimePinLoading ? <CircularProgress size={26} color="inherit" /> : 'One Time Pin'}
      </Button>
    </Stack>
  );
}

OneTimePin.propTypes = {
  otp: PropTypes.string.isRequired,
  validateChar: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired
};

export default OneTimePin;
