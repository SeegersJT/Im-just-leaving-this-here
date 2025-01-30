import { Box } from '@mui/material';
import DrawerHeader from './drawerHeader/DrawerHeader.component';
import DrawerContent from './drawerContent/DrawerContent.component';
import PropTypes from 'prop-types';
import { drawerWidth } from 'config';

function MainDrawer({ navigationGroups }) {
  return (
    <Box
      component="nav"
      aria-label="mailbox folders"
      sx={{
        position: 'fixed',
        left: '0',
        top: '0',
        'z-index': '1200',
        height: '100%',
        display: 'block',
        boxSizing: 'border-box',
        width: drawerWidth,
        borderRight: '1px solid',
        borderRightColor: 'divider',
        backgroundImage: 'none',
        boxShadow: 'inherit'
      }}
    >
      <DrawerHeader />
      <DrawerContent navigationGroups={navigationGroups} />
    </Box>
  );
}

MainDrawer.propTypes = {
  navigationGroups: PropTypes.func
};

export default MainDrawer;
