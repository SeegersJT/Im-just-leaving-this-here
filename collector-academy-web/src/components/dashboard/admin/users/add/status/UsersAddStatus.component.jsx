import { Grid } from '@mui/material';
import DefaultBox from 'components/box/DefaultBox.component';
import DataTable from 'components/tables/DataTable.component';
import { formatUserUploadsData, getColumnModifiers, getHeaderModifiers } from 'containers/dashboard/admin/users/add/status/UsersAddStatus.helper';

function UsersAddStatus({ theme, successfulUserUploadsData, failedUserUploadsData }) {
  return (
    <DefaultBox>
      {/* Row 1 */}
      <Grid item xs={12} md={7} lg={12}>
        <DataTable
          title="Successful User Uploads"
          headerModifiers={getHeaderModifiers(theme)}
          columnModifiers={getColumnModifiers(theme)}
          data={successfulUserUploadsData}
          rows={10}
          searchable
          onFormatCellData={(data) => formatUserUploadsData(theme, data)}
        />
      </Grid>

      {/* Row 2 */}
      <Grid item xs={12} md={7} lg={12}>
        <DataTable
          title="Failed User Uploads"
          headerModifiers={getHeaderModifiers(theme)}
          columnModifiers={getColumnModifiers(theme)}
          data={failedUserUploadsData}
          rows={10}
          searchable
          onFormatCellData={(data) => formatUserUploadsData(theme, data)}
        />
      </Grid>
    </DefaultBox>
  );
}

UsersAddStatus.propTypes = {};

export default UsersAddStatus;
