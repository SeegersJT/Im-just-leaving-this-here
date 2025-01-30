import { CircularProgress, Divider, Grid, Stack, Typography } from '@mui/material';
import AuthWrapper from 'components/auth/AuthWrapper.component';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router';
import TokenAction from './TokenAction.container';

function Token({ tokenValidationLoading, timeLeft, isTokenValidated, isTokenValid, onGoToLoginClick, onValidateToken }) {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Confirmation Token</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sx={{ width: '100%' }}>
          <Stack direction="column" justifyContent="space-between" alignItems="center" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            {tokenValidationLoading ? (
              <>
                <CircularProgress />
                <Divider variant="middle" sx={{ width: '100%', margin: '10px 0' }}>
                  {'-'}
                </Divider>
                <Typography variant="h3" color="primary">
                  {'Validating Confirmation Token'}
                </Typography>
              </>
            ) : !isTokenValidated ? (
              <TokenAction
                severity="info"
                message="This token has not been validated. Please Validate Token."
                dividerMessage="-"
                buttonText="Validate"
                buttonColor="info"
                onButtonClick={onValidateToken}
              />
            ) : isTokenValid ? (
              <>
                <Typography variant="h1" color="primary">
                  {timeLeft}
                </Typography>
                <Outlet />
                <TokenAction
                  hideAlert
                  severity="success"
                  message="Valid Confirmation Token."
                  dividerMessage="OR"
                  buttonText="Return to Login"
                  buttonColor="secondary"
                  onButtonClick={onGoToLoginClick}
                />
              </>
            ) : (
              <TokenAction
                severity="error"
                message="Invalid Confirmation Token."
                dividerMessage="-"
                buttonText="Return to Login"
                buttonColor="error"
                onButtonClick={onGoToLoginClick}
              />
            )}
          </Stack>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}

Token.propTypes = {
  tokenValidationLoading: PropTypes.bool.isRequired,
  timeLeft: PropTypes.string.isRequired,
  isTokenValidated: PropTypes.bool.isRequired,
  isTokenValid: PropTypes.bool.isRequired,
  onGoToLoginClick: PropTypes.func.isRequired,
  onValidateToken: PropTypes.func.isRequired
};

export default Token;
