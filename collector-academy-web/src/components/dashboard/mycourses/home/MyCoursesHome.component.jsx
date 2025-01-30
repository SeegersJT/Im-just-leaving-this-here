import { Grid, Typography } from '@mui/material';
import DefaultBox from 'components/box/DefaultBox.component';
import CardList from 'components/card/list/CardList.component';
import ComparisonStatistics from 'components/card/statistic/ComparisonStatistic.component';
import DataTable from 'components/tables/DataTable.component';
import { formatMyCoursesData, getColumnModifiers, getHeaderModifiers } from 'containers/dashboard/mycourses/home/MyCoursesHome.helper';

function MyCoursesHome({ theme, myCoursesData, myCoursesDataLoading, actionsListData, toolbarData, onToolbarClick }) {
  return (
    <DefaultBox>
      {/* Row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">My Courses Stats</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <ComparisonStatistics color="success" title="COMING SOON - Reporting" count="500" percentage={300} extra="200" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <ComparisonStatistics color="success" title="COMING SOON - Reporting" count="500" percentage={300} extra="200" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <ComparisonStatistics color="success" title="COMING SOON - Reporting" count="500" percentage={300} extra="200" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <ComparisonStatistics color="success" title="COMING SOON - Reporting" count="500" percentage={300} extra="200" />
      </Grid>

      {/* Row 2 */}
      <Grid item xs={12} md={5} lg={4}>
        <CardList title="Actions" data={actionsListData} scrollable height="300px" />
      </Grid>

      {/* Row 3 */}
      <Grid item xs={12} md={12} lg={12}>
        <DataTable
          title="Courses"
          headerModifiers={getHeaderModifiers(theme)}
          columnModifiers={getColumnModifiers(theme)}
          data={myCoursesData}
          dataLoading={myCoursesDataLoading}
          toolbarData={toolbarData}
          rows={10}
          selectable
          singleSelect
          searchable
          onFormatCellData={formatMyCoursesData}
          onToolbarClick={onToolbarClick}
        />
      </Grid>
    </DefaultBox>
  );
}

MyCoursesHome.propTypes = {};

export default MyCoursesHome;
