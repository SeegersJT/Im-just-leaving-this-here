import { Grid, Stack, TextField, Typography } from '@mui/material';
import DefaultBox from 'components/box/DefaultBox.component';
import CardGroup from 'components/card/group/CardGroup.component';
import CardList from 'components/card/list/CardList.component';
import MainCardComponent from 'components/card/MainCard.component';
import PopUp from 'components/popup/PopUp.component';
import SelectLabel from 'components/selectLabel/SelectLabel.component';
import PropTypes from 'prop-types';
import { Utils } from 'utils/Utils';

function CourseEditor({
  theme,
  coursesActionListData,
  courseModulesGroupData,
  courseTestsGroupData,
  currentCourse,
  isValidCourse,
  courseDifficultiesMenuItems,
  deleteCourseModalRef,
  courseDeleteLoading,
  onCurrentCourseChange,
  onDeleteCoursePopUpClick
}) {
  return (
    <>
      <DefaultBox>
        {/* Row 1 */}
        <Grid item xs={12} lg={4}>
          <CardList title="Course Actions" data={coursesActionListData} scrollable height="400px" />
        </Grid>
        <Grid item xs={12} lg={8}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 2 } }}>
            <Typography component="div" variant="h5">
              Course
            </Typography>
          </Stack>
          <MainCardComponent sx={{ mt: 2 }} content={true}>
            <Grid container item lg={6}>
              <Stack direction="row" spacing={2} sx={{ width: '100%', mb: 2, mr: 1 }}>
                <TextField
                  sx={Utils.textFieldStyle(theme, isValidCourse?.courseTitle)}
                  id="course-edit-courseTitle"
                  label="Title"
                  variant="outlined"
                  value={currentCourse?.courseTitle}
                  onChange={(event) => onCurrentCourseChange(event.target.value, 'courseTitle')}
                />
              </Stack>
            </Grid>
            <Grid item lg={12}>
              <Stack direction="row" spacing={2} sx={{ width: '100%', mb: 2 }}>
                <TextField
                  sx={Utils.textFieldStyle(theme, isValidCourse?.courseDescription)}
                  id="course-edit-courseDescription"
                  label="Description"
                  variant="outlined"
                  value={currentCourse?.courseDescription}
                  onChange={(event) => onCurrentCourseChange(event.target.value, 'courseDescription')}
                />
              </Stack>
            </Grid>
            <Grid item lg={12}>
              <Stack direction="row" spacing={2} sx={{ width: '100%', mb: 2 }}>
                <TextField
                  sx={Utils.textFieldStyle(theme, isValidCourse?.courseDuration)}
                  id="course-edit-courseDuration"
                  label="Duration (min)"
                  variant="outlined"
                  type="number"
                  value={currentCourse?.courseDuration}
                  onChange={(event) => onCurrentCourseChange(event.target.value, 'courseDuration')}
                />
                <SelectLabel
                  title="Difficulty"
                  type={isValidCourse?.courseDifficultyNo}
                  menuItems={courseDifficultiesMenuItems}
                  selectedItems={[currentCourse?.courseDifficultyNo]}
                  onSelectedMenuItemsChange={(courseDifficultyNo) => onCurrentCourseChange(courseDifficultyNo, 'courseDifficultyNo')}
                />
              </Stack>
            </Grid>
          </MainCardComponent>
        </Grid>

        {/* Row 2 */}
        <Grid item xs={12} lg={12}>
          <CardGroup title="Modules" data={courseModulesGroupData} />
        </Grid>

        {/* Row 3 */}
        <Grid item xs={12} lg={12}>
          <CardGroup title="Tests" data={courseTestsGroupData} />
        </Grid>
      </DefaultBox>
      <PopUp
        ref={deleteCourseModalRef}
        title="Delete Course"
        description="Are you sure you want to Delete this Course?"
        backButton
        loading={courseDeleteLoading}
        onClick={onDeleteCoursePopUpClick}
      />
    </>
  );
}

CourseEditor.propTypes = {
  theme: PropTypes.object.isRequired,
  coursesActionListData: PropTypes.arrayOf(PropTypes.object).isRequired,
  courseModulesGroupData: PropTypes.arrayOf(PropTypes.object).isRequired,
  courseTestsGroupData: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentCourse: PropTypes.shape({
    courseTitle: PropTypes.string.isRequired,
    courseDescription: PropTypes.string.isRequired,
    courseDuration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    courseDifficultyNo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
  }),
  isValidCourse: PropTypes.shape({
    courseTitle: PropTypes.number,
    courseDescription: PropTypes.number,
    courseDuration: PropTypes.number,
    courseDifficultyNo: PropTypes.number
  }),
  courseDifficultiesMenuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteCourseModalRef: PropTypes.object.isRequired,
  courseDeleteLoading: PropTypes.bool.isRequired,
  onCurrentCourseChange: PropTypes.func.isRequired,
  onDeleteCoursePopUpClick: PropTypes.func.isRequired
};

export default CourseEditor;
