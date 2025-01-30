import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ButtonBase } from '@mui/material';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import LogoAsset from 'assets/images/logo/Logo.asset';
import config from 'config';

const Logo = ({ sx, to, chip }) => {
  return (
    <ButtonBase disableRipple component={Link} to={!to ? config.defaultPath : to} sx={sx}>
      <Stack direction="row" spacing={1} alignItems="center">
        <LogoAsset />
        {chip && (
          <Chip
            label={import.meta.env.VITE_APP_VERSION}
            variant="outlined"
            size="small"
            color="secondary"
            sx={{ mt: 0.5, ml: 1, fontSize: '0.725rem', height: 20, '& .MuiChip-label': { px: 0.5 } }}
          />
        )}
      </Stack>
    </ButtonBase>
  );
};

Logo.propTypes = {
  sx: PropTypes.object,
  to: PropTypes.string,
  chip: PropTypes.bool
};

export default Logo;
