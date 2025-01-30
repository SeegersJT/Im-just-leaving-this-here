import { Box } from '@mui/material';
import DrawerContainer from 'containers/dashboard/drawer/Drawer.container';
import HeaderContainer from 'containers/dashboard/header/Header.container';
import { Outlet } from 'react-router';
import BreadcrumbsContainer from 'containers/breadcrumbs/Breadcrumbs.container';

function Dashboard({ activeUserRoleNo }) {
  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <DrawerContainer activeUserRoleNo={activeUserRoleNo} />
      <Box component="main" sx={{ width: 'calc(100% - 260px)', ml: '275px', flexGrow: 1 }}>
        <HeaderContainer />
        <BreadcrumbsContainer />
        <Outlet />
      </Box>
    </Box>
  );
}

Dashboard.propTypes = {};

export default Dashboard;
