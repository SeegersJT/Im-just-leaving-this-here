import { Grid } from '@mui/material';
import DefaultBox from 'components/box/DefaultBox.component';
import CardList from 'components/card/list/CardList.component';
import FileUpload from 'components/fileUpload/FileUpload.component';
import DataTable from 'components/tables/DataTable.component';
import { formatUsersData, getColumnModifiers, getHeaderModifiers, getToolbarData } from 'containers/dashboard/admin/users/home/UsersHome.helper';
import PropTypes from 'prop-types';

function UsersHome({
  theme,
  usersData,
  usersDataLoading,
  addUsersFileUploadValidateLoading,
  addActionsListData,
  downloadActionsListData,
  onToolbarClick,
  onFileUpload
}) {
  return (
    <DefaultBox>
      {/* Row 1 */}
      <Grid item xs={12} md={5} lg={4}>
        <CardList title="Actions" data={addActionsListData} scrollable height="200px" />
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <CardList data={downloadActionsListData} scrollable height="200px" />
      </Grid>

      {/* Row 2 */}
      <Grid item xs={12} md={5} lg={12}>
        <FileUpload onFileUpload={onFileUpload} loading={addUsersFileUploadValidateLoading} />
      </Grid>

      {/* Row 4 */}
      <Grid item xs={12} md={7} lg={12}>
        <DataTable
          title="Users"
          headerModifiers={getHeaderModifiers(theme)}
          columnModifiers={getColumnModifiers(theme)}
          data={usersData}
          dataLoading={usersDataLoading}
          toolbarData={getToolbarData()}
          rows={10}
          selectable
          searchable
          onFormatCellData={formatUsersData}
          onToolbarClick={onToolbarClick}
        />
      </Grid>
    </DefaultBox>
  );
}

UsersHome.propTypes = {
  theme: PropTypes.object.isRequired,
  usersData: PropTypes.arrayOf(PropTypes.object).isRequired,
  usersDataLoading: PropTypes.bool,
  addUsersFileUploadValidateLoading: PropTypes.bool,
  addActionsListData: PropTypes.arrayOf(PropTypes.object).isRequired,
  downloadActionsListData: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToolbarClick: PropTypes.func,
  onFileUpload: PropTypes.func.isRequired
};

export default UsersHome;
