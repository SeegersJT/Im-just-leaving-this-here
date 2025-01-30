import { Box, CircularProgress } from '@mui/material';

function Loading() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  );
}

Loading.propType = {};

export default Loading;
