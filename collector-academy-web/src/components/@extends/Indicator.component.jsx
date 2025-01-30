import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import getColors from '_old/utils/getColors';
import PropTypes from 'prop-types';

function Indicator({ color = 'primary', size = 8, variant = 'filled', sx }) {
  const theme = useTheme();
  const colors = getColors(theme, color);
  const { main } = colors;

  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        bgcolor: variant === 'outlined' ? '' : main,
        ...(variant === 'outlined' && { border: `1px solid ${main}` }),
        ...sx
      }}
    />
  );
}

Indicator.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  variant: PropTypes.oneOf(['outlined', 'filled']),
  sx: PropTypes.object
};

export default Indicator;
