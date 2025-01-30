/* eslint-disable react-hooks/exhaustive-deps */

import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MainCardComponent from 'components/card/MainCard.component';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const miniBarChartOptions = {
  chart: {
    type: 'bar',
    height: 365,
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '45%',
      borderRadius: 4
    }
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    show: false
  },
  grid: {
    show: false
  }
};

function MiniBarChart({ title, description, extra, filters, customOptions = {} }) {
  const theme = useTheme();
  const { primary, secondary } = theme.palette.text;
  const info = theme.palette.info.light;

  const [activeFilter, setActiveFilter] = useState(0);
  const [series, setSeries] = useState([]);

  const [options, setOptions] = useState(miniBarChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [info],
      xaxis: {
        categories: filters[activeFilter].categories,
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary, secondary, secondary]
          }
        },
        tickAmount: filters[activeFilter].tickAmount
      },
      ...customOptions
    }));
  }, [primary, info, secondary, activeFilter]);

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
      <MainCardComponent sx={{ mt: 2 }} content={false}>
        <Box sx={{ p: 3, pb: 0 }}>
          <Grid container alignItems="center" justifyContent="space-between" item sx={{ mb: 1 }}>
            <Grid item>
              <Typography variant="h5">Filters</Typography>
            </Grid>
            <Grid>
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
          <Stack spacing={2}>
            <Typography variant="h6" color="text.secondary">
              {description}
            </Typography>
            {extra && <Typography variant="h3">{extra}</Typography>}
          </Stack>
        </Box>
        <Box id="chart" sx={{ bgcolor: 'transparent' }}>
          <ReactApexChart options={options} series={series} type="bar" height={365} />
        </Box>
      </MainCardComponent>
    </>
  );
}

MiniBarChart.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  extra: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      categories: PropTypes.arrayOf(PropTypes.string).isRequired,
      collection: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          data: PropTypes.arrayOf(PropTypes.number).isRequired,
          color: PropTypes.string
        })
      ).isRequired,
      tickAmount: PropTypes.number
    })
  ).isRequired,
  customOptions: PropTypes.object
};

export default MiniBarChart;
