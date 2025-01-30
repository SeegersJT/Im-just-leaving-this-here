import { FormControlLabel, Grid, Stack, Switch, TextField, Typography } from '@mui/material';
import DefaultBox from 'components/box/DefaultBox.component';
import CardList from 'components/card/list/CardList.component';
import MainCardComponent from 'components/card/MainCard.component';
import PopUp from 'components/popup/PopUp.component';
import { Utils } from 'utils/Utils';

function AnswerEditor({
  theme,
  courseTestAnswerActionListData,
  currentCourseTestQuestion,
  currentCourseTestAnswer,
  isValidCourseTestAnswer,
  deleteCourseTestAnswerModalRef,
  courseTestAnswerDeleteLoading,
  onCurrentCourseTestAnswerChange,
  onDeleteCourseTestAnswerPopUpClick
}) {
  console.log('currentCourseTestAnswer?.correctAnswer', currentCourseTestAnswer?.correctAnswer);
  return (
    <>
      <DefaultBox>
        {/* Row 1 */}
        <Grid item xs={12} lg={4}>
          <CardList title="Answer Actions" data={courseTestAnswerActionListData} scrollable height="400px" />
        </Grid>
        <Grid item xs={12} lg={8}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 2 } }}>
            <Typography variant="h5">Answer</Typography>
          </Stack>
          <MainCardComponent sx={{ mt: 2 }} content={true}>
            <Grid container item lg={6}>
              <Stack direction="row" spacing={2} sx={{ width: '100%', mb: 2, mr: 1 }}>
                <TextField
                  sx={Utils.textFieldStyle(theme, 1)}
                  id="courseTestQuestion-edit-questionTitle"
                  label="Test Title"
                  variant="outlined"
                  disabled
                  value={currentCourseTestQuestion?.questionTitle}
                />
                <FormControlLabel
                  onChange={(event) => onCurrentCourseTestAnswerChange(event.target.checked, 'correctAnswer')}
                  control={<Switch checked={currentCourseTestAnswer?.correctAnswer} />}
                  label="Correct Answer"
                />
              </Stack>
            </Grid>
            <Grid container item lg={12}>
              <Stack direction="row" spacing={2} sx={{ width: '100%', mb: 2, mr: 1 }}>
                <TextField
                  sx={Utils.textFieldStyle(theme, isValidCourseTestAnswer?.testAnswer)}
                  id="answer-edit-testAnswer"
                  label="Answer"
                  variant="outlined"
                  value={currentCourseTestAnswer?.testAnswer}
                  onChange={(event) => onCurrentCourseTestAnswerChange(event.target.value, 'testAnswer')}
                />
              </Stack>
            </Grid>
          </MainCardComponent>
        </Grid>
      </DefaultBox>
      <PopUp
        ref={deleteCourseTestAnswerModalRef}
        title="Delete Course Test Answer"
        description="Are you sure you want to Delete this Course Test Answer?"
        backButton
        loading={courseTestAnswerDeleteLoading}
        onClick={onDeleteCourseTestAnswerPopUpClick}
      />
    </>
  );
}

AnswerEditor.propTypes = {};

export default AnswerEditor;
