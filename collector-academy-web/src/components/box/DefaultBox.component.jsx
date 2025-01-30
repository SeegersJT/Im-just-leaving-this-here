import { Box, Grid } from '@mui/material';
import PropTypes from 'prop-types';

function DefaultBox({ children }) {
  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, display: 'flex', flexDirection: 'column' }}>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        {children}
      </Grid>
    </Box>
  );
}

DefaultBox.propTypes = {
  children: PropTypes.node
};

export default DefaultBox;
