import React from 'react';
import { Alert, Divider, Button } from '@mui/material';
import PropTypes from 'prop-types';

function TokenAction({ hideAlert, severity, message, dividerMessage, buttonText, buttonColor, onButtonClick }) {
  return (
    <>
      {!hideAlert && (
        <Alert severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      )}
      <Divider variant="middle" sx={{ width: '100%', margin: '10px 0' }}>
        {dividerMessage}
      </Divider>
      <Button disableElevation fullWidth size="large" type="button" variant="contained" color={buttonColor} onClick={onButtonClick}>
        {buttonText}
      </Button>
    </>
  );
}

TokenAction.propTypes = {
  hideAlert: PropTypes.bool,
  severity: PropTypes.oneOf(['info', 'error', 'success', 'warning']).isRequired,
  message: PropTypes.string.isRequired,
  dividerMessage: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonColor: PropTypes.oneOf(['primary', 'secondary', 'error', 'success', 'info', 'warning']).isRequired,
  onButtonClick: PropTypes.func.isRequired
};

export default TokenAction;
