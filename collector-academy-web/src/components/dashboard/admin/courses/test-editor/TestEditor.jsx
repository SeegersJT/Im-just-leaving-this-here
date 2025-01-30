import { Grid, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import DefaultBox from 'components/box/DefaultBox.component';
import CardGroup from 'components/card/group/CardGroup.component';
import CardList from 'components/card/list/CardList.component';
import MainCardComponent from 'components/card/MainCard.component';
import PopUp from 'components/popup/PopUp.component';
import SelectLabel from 'components/selectLabel/SelectLabel.component';
import { Utils } from 'utils/Utils';

function TestEditor({
  theme,
  courseTestActionListData,
  currentCourse,
  currentCourseTest,
  isValidCourseTest,
  courseDifficultiesMenuItems,
  courseTestQuestionsGroupData,
  deleteCourseTestModalRef,
  courseTestDeleteLoading,
  onCurrentCourseTestChange,
  onDeleteCourseTestPopUpClick
}) {
  return (
    <>
      <DefaultBox>
        {/* Row 1 */}
        <Grid item xs={12} lg={4}>
          <CardList title="Test Actions" data={courseTestActionListData} scrollable height="400px" />
        </Grid>
        <Grid item xs={12} lg={8}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 2 } }}>
            <Typography variant="h5">Test</Typography>
          </Stack>
          <MainCardComponent sx={{ mt: 2 }} content={true}>
            <Grid container item lg={6}>
              <Stack direction="row" spacing={2} sx={{ width: '100%', mb: 2, mr: 1 }}>
                <TextField
                  sx={Utils.textFieldStyle(theme, 1)}
                  id="course-edit-courseTitle"
                  label="Course Title"
                  variant="outlined"
                  disabled
                  value={currentCourse?.courseTitle}
                />
              </Stack>
            </Grid>
            <Grid container item lg={12}>
              <Stack direction="row" spacing={2} sx={{ width: '100%', mb: 2, mr: 1 }}>
                <TextField
                  sx={Utils.textFieldStyle(theme, isValidCourseTest?.testTitle)}
                  id="test-edit-testTitle"
                  label="Title"
                  variant="outlined"
                  value={currentCourseTest?.testTitle}
                  onChange={(event) => onCurrentCourseTestChange(event.target.value, 'testTitle')}
                />
                <SelectLabel
                  title="Difficulty"
                  type={isValidCourseTest?.courseDifficultyNo}
                  menuItems={courseDifficultiesMenuItems}
                  selectedItems={[currentCourseTest?.courseDifficultyNo]}
                  onSelectedMenuItemsChange={(courseDifficultyNo) => onCurrentCourseTestChange(courseDifficultyNo, 'courseDifficultyNo')}
                />
              </Stack>
            </Grid>
            <Grid container item lg={12}>
              <Stack direction="row" spacing={2} sx={{ width: '100%', mb: 2, mr: 1 }}>
                <TextField
                  sx={Utils.textFieldStyle(theme, isValidCourseTest?.testDuration)}
                  id="test-edit-testDuration"
                  label="Duration (min)"
                  variant="outlined"
                  type="number"
                  value={currentCourseTest?.testDuration}
                  onChange={(event) => onCurrentCourseTestChange(event.target.value, 'testDuration')}
                />
                <TextField
                  sx={Utils.textFieldStyle(theme, isValidCourseTest?.testPassPercentage)}
                  id="test-edit-testPassPercentage"
                  label="Pass Percentage (%)"
                  variant="outlined"
                  type="number"
                  value={currentCourseTest?.testPassPercentage}
                  onChange={(event) => onCurrentCourseTestChange(event.target.value, 'testPassPercentage')}
                />
              </Stack>
            </Grid>
            <Grid container item lg={6}>
              <Stack direction="row" spacing={2} sx={{ width: '100%', mb: 2, mr: 1 }}>
                <TextField
                  sx={Utils.textFieldStyle(theme, isValidCourseTest?.retries)}
                  id="test-edit-retries"
                  label="Retries"
                  variant="outlined"
                  type="number"
                  value={currentCourseTest?.retries}
                  onChange={(event) => onCurrentCourseTestChange(event.target.value, 'retries')}
                />
              </Stack>
            </Grid>
          </MainCardComponent>
        </Grid>

        {/* Row 2 */}
        <Grid item xs={12} lg={12}>
          <CardGroup title="Modules" data={courseTestQuestionsGroupData} />
        </Grid>
      </DefaultBox>
      <PopUp
        ref={deleteCourseTestModalRef}
        title="Delete Course Test"
        description="Are you sure you want to Delete this Course Test?"
        backButton
        loading={courseTestDeleteLoading}
        onClick={onDeleteCourseTestPopUpClick}
      />
    </>
  );
}

TestEditor.propTypes = {};

export default TestEditor;
