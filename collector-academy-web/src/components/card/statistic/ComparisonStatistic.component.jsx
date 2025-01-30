import { Box, Chip, Grid, Stack, Typography } from '@mui/material';
import MainCardComponent from '../MainCard.component';
import PropTypes from 'prop-types';
import { FallOutlined, RiseOutlined } from '@ant-design/icons';
import { Utils } from 'utils/Utils';

function ComparisonStatistics({ color = 'primary', title, count, percentage, isLoss, extra }) {
  const iconSX = { fontSize: '0.75rem', color: 'inherit', marginLeft: 0, marginRight: 0 };

  return (
    <MainCardComponent contentSX={{ p: 2.25 }}>
      <Stack spacing={0.5}>
        <Typography variant="h6" color="text.secondary">
          {title}
        </Typography>
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="h4" color="inherit">
              {Utils.formatNumber(count)}
            </Typography>
          </Grid>
          {percentage && (
            <Grid item>
              <Chip
                variant="combined"
                color={color}
                icon={isLoss ? <FallOutlined style={iconSX} /> : <RiseOutlined style={iconSX} />}
                label={`${percentage}%`}
                sx={{ ml: 1.25, pl: 1 }}
                size="small"
              />
            </Grid>
          )}
        </Grid>
      </Stack>
      <Box sx={{ pt: 2.25 }}>
        <Typography variant="caption" color="text.secondary">
          Average is {isLoss ? 'Lower' : 'Higher'} than last month by:{' '}
          <Typography variant="caption" sx={{ color: `${color || 'primary'}.main` }}>
            {Utils.formatNumber(extra)}
          </Typography>
        </Typography>
      </Box>
    </MainCardComponent>
  );
}

ComparisonStatistics.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  extra: PropTypes.string
};

export default ComparisonStatistics;
