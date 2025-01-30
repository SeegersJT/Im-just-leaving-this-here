import { Grid, Stack, TextField, Typography } from '@mui/material';
import DefaultBox from 'components/box/DefaultBox.component';
import CardGroup from 'components/card/group/CardGroup.component';
import CardList from 'components/card/list/CardList.component';
import MainCardComponent from 'components/card/MainCard.component';
import PopUp from 'components/popup/PopUp.component';
import PropTypes from 'prop-types';
import { Utils } from 'utils/Utils';

function ModuleEditor({
  theme,
  currentCourse,
  currentCourseModule,
  isValidCourseModule,
  moduleActionListData,
  coursePagesGroupData,
  deleteCourseModuleModalRef,
  courseModuleDeleteLoading,
  onCurrentCourseModuleChange,
  onDeleteCourseModulePopUpClick
}) {
  return (
    <>
      <DefaultBox>
        {/* Row 1 */}
        <Grid item xs={12} lg={4}>
          <CardList title="Module Actions" data={moduleActionListData} scrollable height="400px" />
        </Grid>
        <Grid item xs={12} lg={8}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 2 } }}>
            <Typography variant="h5">Module</Typography>
          </Stack>
          <MainCardComponent sx={{ mt: 2 }} content={true}>
            <Grid container item lg={6}>
              <Stack direction="row" spacing={2} sx={{ width: '100%', mb: 2, mr: 1 }}>
                <TextField
                  sx={Utils.textFieldStyle(theme, 1)}
                  id="module-edit-courseTitle"
                  label="Course Title"
                  variant="outlined"
                  disabled
                  value={currentCourse?.courseTitle}
                />
              </Stack>
            </Grid>
            <Grid container item lg={6}>
              <Stack direction="row" spacing={2} sx={{ width: '100%', mb: 2, mr: 1 }}>
                <TextField
                  sx={Utils.textFieldStyle(theme, isValidCourseModule?.moduleTitle)}
                  id="module-edit-moduleTitle"
                  label="Title"
                  variant="outlined"
                  value={currentCourseModule?.moduleTitle}
                  onChange={(event) => onCurrentCourseModuleChange(event.target.value, 'moduleTitle')}
                />
              </Stack>
            </Grid>
            <Grid item lg={12}>
              <Stack direction="row" spacing={2} sx={{ width: '100%', mb: 2 }}>
                <TextField
                  sx={Utils.textFieldStyle(theme, isValidCourseModule?.moduleDescription)}
                  id="module-edit-moduleDescription"
                  label="Description"
                  variant="outlined"
                  value={currentCourseModule?.moduleDescription}
                  onChange={(event) => onCurrentCourseModuleChange(event.target.value, 'moduleDescription')}
                />
              </Stack>
            </Grid>
          </MainCardComponent>
        </Grid>

        {/* Row 2 */}
        <Grid item xs={12} lg={12}>
          <CardGroup title="Pages" data={coursePagesGroupData} />
        </Grid>
      </DefaultBox>
      <PopUp
        ref={deleteCourseModuleModalRef}
        title="Delete Course Module"
        description="Are you sure you want to Delete this Course Module?"
        backButton
        loading={courseModuleDeleteLoading}
        onClick={onDeleteCourseModulePopUpClick}
      />
    </>
  );
}

ModuleEditor.propTypes = {
  theme: PropTypes.object.isRequired,
  currentCourse: PropTypes.shape({
    courseTitle: PropTypes.string.isRequired
  }).isRequired,
  currentCourseModule: PropTypes.shape({
    moduleTitle: PropTypes.string.isRequired,
    moduleDescription: PropTypes.string.isRequired
  }).isRequired,
  isValidCourseModule: PropTypes.shape({
    moduleTitle: PropTypes.bool,
    moduleDescription: PropTypes.bool
  }).isRequired,
  moduleActionListData: PropTypes.arrayOf(PropTypes.object).isRequired,
  coursePagesGroupData: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteCourseModuleModalRef: PropTypes.object.isRequired,
  courseModuleDeleteLoading: PropTypes.bool.isRequired,
  onCurrentCourseModuleChange: PropTypes.func.isRequired,
  onDeleteCourseModulePopUpClick: PropTypes.func.isRequired
};

export default ModuleEditor;
