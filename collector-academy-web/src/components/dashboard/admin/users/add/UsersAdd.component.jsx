import { Button, CircularProgress, Grid } from '@mui/material';
import DefaultBox from 'components/box/DefaultBox.component';
import FileUpload from 'components/fileUpload/FileUpload.component';
import DataTable from 'components/tables/DataTable.component';
import { formatUsersData, getColumnModifiers, getHeaderModifiers } from 'containers/dashboard/admin/users/add/UsersAdd.helper';

function UsersAdd({
  theme,
  usersData,
  validityUsersData,
  validityReasonUsersData,
  canAddUsers,
  addUsersFileUploadValidateLoading,
  addValidateUsersLoading,
  onFileUpload,
  onAddUsersClick
}) {
  return (
    <DefaultBox>
      {/* Row 1 */}
      <Grid item xs={12} md={5} lg={12}>
        <FileUpload onFileUpload={onFileUpload} loading={addUsersFileUploadValidateLoading || addValidateUsersLoading} />
      </Grid>

      {/* Row 2 */}
      {/* ADD GRID */}
      <Grid item xs={12} md={5} lg={12}>
        <Button
          sx={{ mt: 2, width: '250px' }}
          disableElevation
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="primary"
          disabled={!canAddUsers}
          onClick={onAddUsersClick}
        >
          {addUsersFileUploadValidateLoading || addValidateUsersLoading ? (
            <CircularProgress size={26} color="inherit" />
          ) : canAddUsers ? (
            'Add Users'
          ) : (
            'Invalid Users'
          )}
        </Button>
      </Grid>

      {/* Row 2 */}
      <Grid item xs={12} md={7} lg={12}>
        <DataTable
          title="Add Users"
          headerModifiers={getHeaderModifiers(theme)}
          columnModifiers={getColumnModifiers(theme)}
          data={usersData}
          dataLoading={addUsersFileUploadValidateLoading}
          //   toolbarData={getToolbarData()}
          rows={10}
          //   selectable
          searchable
          onFormatCellData={(data) => formatUsersData(theme, data, validityUsersData, validityReasonUsersData)}
          //   onToolbarClick={() => {}}
        />
      </Grid>
    </DefaultBox>
  );
}

UsersAdd.propTypes = {};

export default UsersAdd;
