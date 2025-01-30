import { Typography } from '@mui/material';
import Drawer from 'components/dashboard/drawer/Drawer.component';
import NavigationGroup from 'components/dashboard/drawer/drawerContent/navigation/NavigationGroup.component';
import { drawerMenuItems } from './Drawer.helper';
import NavigationItem from 'components/dashboard/drawer/drawerContent/navigation/NavigationItem.componentn';
import PropTypes from 'prop-types';

function DrawerContainer({ activeUserRoleNo }) {
  const navigationGroups = drawerMenuItems.map((item) => {
    const navigationChildren = item.children?.map((childMenuItem, index) => {
      switch (childMenuItem.type) {
        case 'item':
          return activeUserRoleNo <= childMenuItem.role && <NavigationItem key={index} item={childMenuItem} level={1} />;
        default:
          return (
            <Typography key={index} variant="h6" color="error" align="center">
              {`Fix - Group Children or Items - ${childMenuItem.title}`}
            </Typography>
          );
      }
    });

    switch (item.type) {
      case 'group':
        return <NavigationGroup title={item.title} navigationChildren={navigationChildren} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            {`Fix - Navigation Group - '${item.title}'`}
          </Typography>
        );
    }
  });

  return <Drawer navigationGroups={navigationGroups} />;
}

Drawer.propTypes = {
  navigationGroups: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default DrawerContainer;
