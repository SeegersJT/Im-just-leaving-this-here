import { Box } from '@mui/material';
import PropTypes from 'prop-types';

function Navigation({ navigationGroups }) {
  return (
    <Box sx={{ pt: 2 }}>
      {Array.isArray(navigationGroups)
        ? navigationGroups.map((group, index) => <div key={group.key || index}>{group}</div>)
        : navigationGroups}
    </Box>
  );
}

Navigation.propTypes = {
  navigationGroups: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.func, PropTypes.node])
};

export default Navigation;
