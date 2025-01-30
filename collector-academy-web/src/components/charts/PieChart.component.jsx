import { Box, Grid, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MainCardComponent from 'components/card/MainCard.component';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ChartType } from 'utils/constants/Chart.enum';

const areaChartOptions = {
  chart: {
    type: ChartType.DONUT
  },
  labels: ['60% - Courses Passed', '30% - Courses Failed', '10% - Courses Not Started'],
  plotOptions: {
    pie: {
      donut: {
        size: '40%',
        labels: {
          show: false
        }
      }
    }
  },
  stroke: {
    show: true,
    width: 8,
    colors: '#ffffff'
  },
  dataLabels: {
    enabled: false,
    style: {
      fontSize: '14px'
    },
    dropShadow: {
      enabled: false
    }
  },
  states: {
    hover: {
      filter: {
        type: 'lighten'
      }
    },
    active: {
      allowMultipleDataPointsSelection: false,
      filter: {
        type: 'none'
      }
    }
  }
};

function PieChart({ title }) {
  const [options, setOptions] = useState(areaChartOptions);
  const theme = useTheme();

  const { success, warning, error } = theme.palette;

  useEffect(() => {
    setOptions({
      ...options,
      colors: [success.main, error.main, warning.main]
    });
  }, []);
  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">{title}</Typography>
        </Grid>
        <Grid item>
          <Stack direction="row" alignItems="center" spacing={0}></Stack>
        </Grid>
      </Grid>
      <MainCardComponent content={false} sx={{ mt: 2 }}>
        <Box sx={{ pt: 1, pr: 2 }}>
          <ReactApexChart options={options} series={[6000, 3000, 1000]} type="donut" height={300} />
        </Box>
      </MainCardComponent>
    </>
  );
}

PieChart.propTypes = {};

export default PieChart;
