import { Grid, Stack, TextField, Typography } from '@mui/material';
import DefaultBox from 'components/box/DefaultBox.component';
import CardGroup from 'components/card/group/CardGroup.component';
import CardList from 'components/card/list/CardList.component';
import MainCardComponent from 'components/card/MainCard.component';
import PopUp from 'components/popup/PopUp.component';
import { Utils } from 'utils/Utils';

function QuestionEditor({
  theme,
  courseTestQuestionActionListData,
  currentCourseTest,
  currentCourseTestQuestion,
  isValidCourseTestQuestion,
  courseTestAnswersGroupData,
  deleteCourseTestQuestionModalRef,
  courseTestQuestionDeleteLoading,
  onCurrentCourseTestQuestionChange,
  onDeleteCourseTestQuestionPopUpClick
}) {
  return (
    <>
      <DefaultBox>
        {/* Row 1 */}
        <Grid item xs={12} lg={4}>
          <CardList title="Question Actions" data={courseTestQuestionActionListData} scrollable height="400px" />
        </Grid>
        <Grid item xs={12} lg={8}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 2 } }}>
            <Typography variant="h5">Question</Typography>
          </Stack>
          <MainCardComponent sx={{ mt: 2 }} content={true}>
            <Grid container item lg={6}>
              <Stack direction="row" spacing={2} sx={{ width: '100%', mb: 2, mr: 1 }}>
                <TextField
                  sx={Utils.textFieldStyle(theme, 1)}
                  id="courseTest-edit-testTitle"
                  label="Test Title"
                  variant="outlined"
                  disabled
                  value={currentCourseTest?.testTitle}
                />
              </Stack>
            </Grid>
            <Grid container item lg={12}>
              <Stack direction="row" spacing={2} sx={{ width: '100%', mb: 2, mr: 1 }}>
                <TextField
                  sx={Utils.textFieldStyle(theme, isValidCourseTestQuestion?.questionTitle)}
                  id="question-edit-questionTitle"
                  label="Title"
                  variant="outlined"
                  value={currentCourseTestQuestion?.questionTitle}
                  onChange={(event) => onCurrentCourseTestQuestionChange(event.target.value, 'questionTitle')}
                />
              </Stack>
            </Grid>
          </MainCardComponent>
        </Grid>

        {/* Row 2 */}
        <Grid item xs={12} lg={12}>
          <CardGroup title="Answers" data={courseTestAnswersGroupData} />
        </Grid>
      </DefaultBox>
      <PopUp
        ref={deleteCourseTestQuestionModalRef}
        title="Delete Course Test Question"
        description="Are you sure you want to Delete this Course Test Question?"
        backButton
        loading={courseTestQuestionDeleteLoading}
        onClick={onDeleteCourseTestQuestionPopUpClick}
      />
    </>
  );
}

QuestionEditor.propTypes = {};

export default QuestionEditor;
