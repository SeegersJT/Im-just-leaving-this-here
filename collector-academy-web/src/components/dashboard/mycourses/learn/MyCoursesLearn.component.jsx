import { Box, Card, Grid, Step, StepButton, StepLabel, Stepper, Typography } from '@mui/material';
import CardContent from '_old/themes/overrides/CardContent';
import DefaultBox from 'components/box/DefaultBox.component';
import CardGroup from 'components/card/group/CardGroup.component';
import CardList from 'components/card/list/CardList.component';
import MainCardComponent from 'components/card/MainCard.component';

function MyCoursesLearn({
  actionsListData,
  finishTestActionsListData,
  learnGroupData,
  steps,
  selectedStep,
  selectedView,
  onSelectedStepClick
}) {
  return (
    <DefaultBox>
      {/* Row 1 */}
      <Grid item xs={12} md={5} lg={4}>
        <CardList title="Learn Actions" data={actionsListData} scrollable height="300px" />
      </Grid>
      <Grid item xs={12} md={12} lg={8}>
        <Grid item xs={12} lg={12}>
          <CardGroup title="Tests" data={learnGroupData} spacing={4} />
        </Grid>
        <MainCardComponent sx={{ mt: 2, mr: 2 }} content={false} scrollable={true}>
          <Box sx={{ width: '100%', m: 2 }}>
            <Grid item xs={12} lg={12}>
              <Stepper activeStep={selectedStep} alternativeLabel nonLinear>
                {steps.map((step, index) => (
                  <Step key={index} completed={step.completed}>
                    <StepButton color="inherit" onClick={() => onSelectedStepClick(index)}>
                      <StepLabel>{step?.header3}</StepLabel>
                    </StepButton>
                  </Step>
                ))}
              </Stepper>
            </Grid>
            {steps[selectedStep]?.isTestContent ? (
              <>
                <div
                  style={{
                    height: '100%',
                    width: '100%',
                    maxWidth: '700px',
                    overflowY: 'auto',
                    padding: '10px',
                    boxSizing: 'border-box',
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    whiteSpace: 'normal',
                    margin: '20px auto'
                  }}
                >
                  <CardGroup title={steps[selectedStep]?.header2} data={steps[selectedStep]?.content} spacing={6} wrap />
                </div>
              </>
            ) : (
              <div
                style={{
                  height: '100%',
                  width: '100%',
                  maxWidth: '700px',
                  overflowY: 'auto',
                  padding: '10px',
                  boxSizing: 'border-box',
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word',
                  whiteSpace: 'normal',
                  margin: '0 auto'
                }}
                dangerouslySetInnerHTML={{ __html: steps[selectedStep]?.content }}
              />
            )}
          </Box>
        </MainCardComponent>
        {selectedView === 'test' && (
          <Grid item xs={12} lg={4} sx={{ mt: 2 }}>
            <CardList title="Finish Test" data={finishTestActionsListData} scrollable height="300px" />
          </Grid>
        )}
      </Grid>
    </DefaultBox>
  );
}

MyCoursesLearn.propTypes = {};

export default MyCoursesLearn;
