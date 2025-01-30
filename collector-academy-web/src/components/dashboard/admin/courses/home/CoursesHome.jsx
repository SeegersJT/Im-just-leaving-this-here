import { Grid } from '@mui/material';
import DefaultBox from 'components/box/DefaultBox.component';
import CardList from 'components/card/list/CardList.component';
import DataTable from 'components/tables/DataTable.component';
import { formatCoursesData, getColumnModifiers, getHeaderModifiers } from 'containers/dashboard/admin/courses/home/CoursesHome.helper';
import PropTypes from 'prop-types';

function CoursesHome({ theme, coursesData, coursesDataLoading, coursesActionsListData, coursesToolbarData, onToolbarClick }) {
  return (
    <DefaultBox>
      {/* Row 1 */}
      <Grid item xs={12} md={5} lg={4}>
        <CardList title="Actions" data={coursesActionsListData} scrollable height="200px" />
      </Grid>

      {/* Row 2 */}
      <Grid item xs={12} md={7} lg={12}>
        <DataTable
          title="Courses"
          headerModifiers={getHeaderModifiers(theme)}
          columnModifiers={getColumnModifiers(theme)}
          data={coursesData}
          dataLoading={coursesDataLoading}
          toolbarData={coursesToolbarData}
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

CoursesHome.propTypes = {
  theme: PropTypes.object.isRequired,
  coursesData: PropTypes.arrayOf(PropTypes.object).isRequired,
  coursesDataLoading: PropTypes.bool.isRequired,
  coursesActionsListData: PropTypes.arrayOf(PropTypes.object).isRequired,
  coursesToolbarData: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToolbarClick: PropTypes.func.isRequired
};

export default CoursesHome;
