import { Grid, Stack, TextField, Typography } from '@mui/material';
import DefaultBox from 'components/box/DefaultBox.component';
import CardList from 'components/card/list/CardList.component';
import MainCardComponent from 'components/card/MainCard.component';
import PopUp from 'components/popup/PopUp.component';
import TextEditor from 'components/textEditor/TextEditor.component';
import PropTypes from 'prop-types';
import { Utils } from 'utils/Utils';

function PageEditor({
  theme,
  currentCourseModule,
  currentCoursePage,
  isValidCoursePage,
  pageActionListData,
  deleteCoursePageModalRef,
  coursePageDeleteLoading,
  onCurrentCoursePageChange,
  onTextEditorChange,
  onDeleteCoursePagePopUpClick
}) {
  return (
    <>
      <DefaultBox>
        {/* Row 1 */}
        <Grid item xs={12} lg={4}>
          <CardList title="Page Actions" data={pageActionListData} scrollable height="400px" />
        </Grid>
        <Grid item xs={12} lg={8}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 2 } }}>
            <Typography variant="h5">Page</Typography>
          </Stack>
          <MainCardComponent sx={{ mt: 2 }} content={true}>
            <Grid container item lg={6}>
              <Stack direction="row" spacing={2} sx={{ width: '100%', mb: 2, mr: 1 }}>
                <TextField
                  sx={Utils.textFieldStyle(theme, 1)}
                  id="page-edit-pageTitle"
                  label="Page Title"
                  variant="outlined"
                  disabled
                  value={currentCourseModule?.moduleTitle}
                />
              </Stack>
            </Grid>
            <Grid container item lg={6}>
              <Stack direction="row" spacing={2} sx={{ width: '100%', mb: 2, mr: 1 }}>
                <TextField
                  sx={Utils.textFieldStyle(theme, isValidCoursePage?.pageTitle)}
                  id="page-edit-pageTitle"
                  label="Title"
                  variant="outlined"
                  value={currentCoursePage?.pageTitle}
                  onChange={(event) => onCurrentCoursePageChange(event.target.value, 'pageTitle')}
                />
              </Stack>
            </Grid>
            <Grid item lg={12}>
              <Stack direction="row" spacing={2} sx={{ width: '100%', mb: 2 }}>
                <TextField
                  sx={Utils.textFieldStyle(theme, isValidCoursePage?.pageDescription)}
                  id="page-edit-pageDescription"
                  label="Description"
                  variant="outlined"
                  value={currentCoursePage?.pageDescription}
                  onChange={(event) => onCurrentCoursePageChange(event.target.value, 'pageDescription')}
                />
              </Stack>
            </Grid>
          </MainCardComponent>
        </Grid>

        {/* Row 2 */}
        <Grid item xs={12} lg={12}>
          <TextEditor content={currentCoursePage?.pageContent} onContentChange={onTextEditorChange} />
        </Grid>
      </DefaultBox>
      <PopUp
        ref={deleteCoursePageModalRef}
        title="Delete Course Page"
        description="Are you sure you want to Delete this Course Page?"
        backButton
        loading={coursePageDeleteLoading}
        onClick={onDeleteCoursePagePopUpClick}
      />
    </>
  );
}

PageEditor.propTypes = {
  theme: PropTypes.object.isRequired,
  currentCourseModule: PropTypes.shape({
    moduleTitle: PropTypes.string.isRequired
  }).isRequired,
  currentCoursePage: PropTypes.shape({
    pageTitle: PropTypes.string.isRequired,
    pageDescription: PropTypes.string.isRequired,
    pageContent: PropTypes.string.isRequired
  }).isRequired,
  isValidCoursePage: PropTypes.shape({
    pageTitle: PropTypes.bool,
    pageDescription: PropTypes.bool
  }).isRequired,
  pageActionListData: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteCoursePageModalRef: PropTypes.object.isRequired,
  coursePageDeleteLoading: PropTypes.bool.isRequired,
  onCurrentCoursePageChange: PropTypes.func.isRequired,
  onTextEditorChange: PropTypes.func.isRequired,
  onDeleteCoursePagePopUpClick: PropTypes.func.isRequired
};
export default PageEditor;
