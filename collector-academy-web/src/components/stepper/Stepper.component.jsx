import { Grid, Step, StepLabel, Typography } from '@mui/material';
import { Box } from '@mui/system';
import MainCardComponent from 'components/card/MainCard.component';

function Stepper() {
  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography sx={{ height: '24px' }} variant="h5">
            {'asdasd'}
          </Typography>
        </Grid>
        <Grid item />
      </Grid>
      <MainCardComponent sx={{ mt: 2, mr: 2 }} content={false} scrollable={true} height={500}>
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={1} alternativeLabel>
            <Step key={'1'}>
              <StepLabel>{'1'}</StepLabel>
            </Step>
            <Step key={'2'}>
              <StepLabel>{'2'}</StepLabel>
            </Step>
            <Step key={'3'}>
              <StepLabel>{'3'}</StepLabel>
            </Step>
          </Stepper>
        </Box>
      </MainCardComponent>
    </>
  );
}

Stepper.propTypes = {};

export default Stepper;
