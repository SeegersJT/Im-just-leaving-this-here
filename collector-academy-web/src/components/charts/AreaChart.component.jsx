/* eslint-disable react-hooks/exhaustive-deps */

import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MainCardComponent from 'components/card/MainCard.component';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ChartStrokeCurve, ChartType } from 'utils/constants/Chart.enum';

const areaChartOptions = {
  chart: {
    height: 450,
    type: ChartType.AREA,
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: ChartStrokeCurve.SMOOTH,
    width: 2
  },
  grid: {
    strokeDashArray: 0
  }
};

function AreaChart({ title, filters, height = 450, customOptions = {} }) {
  const theme = useTheme();
  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [activeFilter, setActiveFilter] = useState(0);
  const [options, setOptions] = useState(areaChartOptions);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main, theme.palette.primary[700]],
      xaxis: {
        categories: filters[activeFilter].categories,
        labels: {
          style: {
            colors: [
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary
            ]
          }
        },
        axisBorder: {
          show: true,
          color: line
        },
        tickAmount: filters[activeFilter].tickAmount
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      ...customOptions
    }));
  }, [primary, secondary, line, theme, activeFilter]);

  useEffect(() => {
    setSeries(filters[activeFilter].collection);
  }, [activeFilter]);

  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">{title}</Typography>
        </Grid>
      </Grid>
      <MainCardComponent content={false} sx={{ mt: 2 }}>
        <Box sx={{ pt: 1, pr: 2 }}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5" sx={{ pl: 2 }}>
                Filters
              </Typography>
            </Grid>
            <Grid item sx={{ pt: 1 }}>
              <Stack direction="row" alignItems="center" spacing={0}>
                {filters.map((filter, index) => (
                  <Button
                    key={index}
                    size={'small'}
                    onClick={() => setActiveFilter(index)}
                    color={activeFilter === index ? 'primary' : 'secondary'}
                    variant={activeFilter === index ? 'outlined' : 'text'}
                  >
                    {filter.name}
                  </Button>
                ))}
              </Stack>
            </Grid>
          </Grid>
          <ReactApexChart options={options} series={series} type="area" height={height} />
        </Box>
      </MainCardComponent>
    </>
  );
}

AreaChart.propTypes = {
  title: PropTypes.string.isRequired,
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      categories: PropTypes.arrayOf(PropTypes.string).isRequired,
      collection: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          data: PropTypes.arrayOf(PropTypes.number).isRequired,
          color: PropTypes.string.isRequired
        })
      ).isRequired,
      tickAmount: PropTypes.number.isRequired
    })
  ).isRequired,
  height: PropTypes.number,
  customOptions: PropTypes.object
};

export default AreaChart;
