import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { ContainerOutlined, FundOutlined, TeamOutlined } from '@ant-design/icons';
import AdminHome from 'components/dashboard/admin/home/AdminHome.component';
import { navigateTo } from 'utils/NavigateService';

function AdminHomeContainer() {
  const theme = useTheme();

  const [adminActionsListData, setAdminActionsListData] = useState([]);

  useEffect(() => {
    const handleOnGoToAdminPage = (page) => {
      navigateTo(`/dashboard/admin/${page}`);
    };

    const formatAdminActionsListData = [];

    formatAdminActionsListData.push({
      title: 'Users',
      description: 'Go to the Users Admin page',
      icon: <TeamOutlined style={{ fontSize: '20px' }} />,
      iconSize: 1,
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.lighter,
      onClick: () => handleOnGoToAdminPage('users')
    });

    formatAdminActionsListData.push({
      title: 'Courses',
      description: 'Go to the Courses Admin page',
      icon: <ContainerOutlined style={{ fontSize: '20px' }} />,
      iconSize: 1,
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.lighter,
      onClick: () => handleOnGoToAdminPage('courses')
    });

    formatAdminActionsListData.push({
      title: 'COMING SOON - Reporting',
      description: 'Go to the Reporting Admin page',
      icon: <FundOutlined style={{ fontSize: '20px' }} />,
      iconSize: 1,
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.lighter,
      disabled: true,
      onClick: () => handleOnGoToAdminPage('reporting')
    });

    setAdminActionsListData(formatAdminActionsListData);
  }, [theme]);

  return <AdminHome adminActionsListData={adminActionsListData} />;
}

AdminHomeContainer.propTypes = {};

export default AdminHomeContainer;
