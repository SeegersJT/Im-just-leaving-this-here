import { Grid, Typography } from '@mui/material';
import DefaultBox from 'components/box/DefaultBox.component';
import CardList from 'components/card/list/CardList.component';
import ComparisonStatistics from 'components/card/statistic/ComparisonStatistic.component';
import AreaChart from 'components/charts/AreaChart.component';
import MiniBarChart from 'components/charts/MiniBarChart.component';
import DataTable from 'components/tables/DataTable.component';
import {
  formatCourseActivityData,
  getColumnModifiers,
  getCourseActivityData,
  getHeaderModifiers,
  getUserActivityData
} from 'containers/dashboard/home/HomeDashboard.helper';
import PropTypes from 'prop-types';

function HomeDashboard({ theme, courseResultsData, eventsListData }) {
  return (
    <DefaultBox>
      {/* Row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Home</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={3}>
        <ComparisonStatistics color="success" title="Total Courses Passed" count="442236" percentage={59.3} extra="35000" />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={3}>
        <ComparisonStatistics color="error" title="Total Courses Failed" count="442236" percentage={59.3} isLoss extra="35000" />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={3}>
        <ComparisonStatistics color="success" title="Total Website Activity" count="442236" percentage={59.3} extra="35000" />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={3}>
        <ComparisonStatistics color="error" title="Total User Experience" count="442236" percentage={59.3} isLoss extra="35000" />
      </Grid>

      {/* Row 2 */}
      <Grid item xs={12} md={12} lg={8}>
        <AreaChart title="Course Activity" filters={getCourseActivityData(theme)} />
      </Grid>
      <Grid item xs={12} md={12} lg={4}>
        <MiniBarChart title="User Activity" description="Currently Active Users" extra="30" filters={getUserActivityData(theme)} />
      </Grid>

      {/* Row 3 */}
      <Grid item xs={12} md={12} lg={8}>
        <DataTable
          title="Course Results"
          headerModifiers={getHeaderModifiers(theme)}
          columnModifiers={getColumnModifiers(theme)}
          data={courseResultsData}
          onFormatCellData={formatCourseActivityData}
          selectable
          searchable
        />
      </Grid>
      <Grid item xs={12} md={7} lg={4}>
        <CardList title="Events" data={eventsListData} scrollable height="400px" />
      </Grid>
    </DefaultBox>
  );
}

HomeDashboard.propTypes = {
  theme: PropTypes.object.isRequired,
  courseResultsData: PropTypes.arrayOf(PropTypes.object).isRequired,
  eventsListData: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default HomeDashboard;
