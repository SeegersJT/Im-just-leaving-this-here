import { Grid, Typography } from '@mui/material';
import DefaultBox from 'components/box/DefaultBox.component';
import CardList from 'components/card/list/CardList.component';
import ComparisonStatistics from 'components/card/statistic/ComparisonStatistic.component';

function AdminHome({ adminActionsListData }) {
  return (
    <DefaultBox>
      {/* Row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Admin</Typography>
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
        <CardList title="Actions" data={adminActionsListData} scrollable height="300px" />
      </Grid>
    </DefaultBox>
  );
}

AdminHome.propTypes = {};

export default AdminHome;
