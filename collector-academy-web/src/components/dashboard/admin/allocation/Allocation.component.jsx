import { Grid } from '@mui/material';
import DefaultBox from 'components/box/DefaultBox.component';
import DataTable from 'components/tables/DataTable.component';
import { formatCoursesData, getColumnModifiers, getHeaderModifiers } from 'containers/dashboard/admin/allocation/Allocation.helper';

function Allocation({ theme, title, description, allocationData, allocationLoading, allocationToolbarData, onToolbarClick }) {
  return (
    <DefaultBox>
      {/* Row 1 */}
      <Grid item xs={12} md={7} lg={12}>
        <DataTable
          title={title}
          description={description}
          headerModifiers={getHeaderModifiers(theme)}
          columnModifiers={getColumnModifiers(theme)}
          data={allocationData}
          dataLoading={allocationLoading}
          toolbarData={allocationToolbarData}
          rows={10}
          selectable
          searchable
          onFormatCellData={formatCoursesData}
          onToolbarClick={onToolbarClick}
        />
      </Grid>
    </DefaultBox>
  );
}

Allocation.propTypes = {};

export default Allocation;
