import { useTheme } from '@mui/material/styles';
import { AndroidOutlined, HeatMapOutlined, PieChartOutlined } from '@ant-design/icons';
import Home from 'components/dashboard/home/HomeDashboard.component';

function HomeDashboardContainer() {
  const theme = useTheme();

  const onCardListClick = () => {};

  const courseResultsData = [
    { employeeNo: 175846, username: 'VHO HANNO S', courseName: 'How to JAVA for dummies', statusNo: 1, status: 'PASSED', percentage: 50 },
    {
      employeeNo: 148957,
      username: 'VHO HENKO L',
      courseName: 'How to JAVA for dummies HENKO L',
      statusNo: 0,
      status: 'NOT STARTED',
      percentage: 50
    },
    {
      employeeNo: 178547,
      username: 'VHO HANNO S',
      courseName: 'How to JAVA for dummies',
      statusNo: 2,
      status: 'FAILED 1ST ATTEMPT',
      percentage: 50
    },
    {
      employeeNo: 359874,
      username: 'VHO HENKO L',
      courseName: 'How to JAVA for dummies HENKO L',
      statusNo: 3,
      status: 'FAILED 2ND ATTEMPT',
      percentage: 50
    },
    {
      employeeNo: 983416,
      username: 'VHO HANNO S',
      courseName: 'How to JAVA for dummies',
      statusNo: 0,
      status: 'NOT STARTED',
      percentage: null
    },
    {
      employeeNo: 987451,
      username: 'VHO HENKO L',
      courseName: 'How to JAVA for dummies HENKO L',
      statusNo: 0,
      status: 'NOT STARTED',
      percentage: null
    },
    {
      employeeNo: 254863,
      username: 'VHO HANNO S',
      courseName: 'How to JAVA for dummies',
      statusNo: 0,
      status: 'NOT STARTED',
      percentage: null
    },
    {
      employeeNo: 987451,
      username: 'VHO HENKO L',
      courseName: 'How to JAVA for dummies HENKO L',
      statusNo: 0,
      status: 'NOT STARTED',
      percentage: null
    },
    {
      employeeNo: 987451,
      username: 'VHO HENKO L',
      courseName: 'How to JAVA for dummies HENKO L',
      statusNo: 0,
      status: 'NOT STARTED',
      percentage: null
    },
    {
      employeeNo: 987451,
      username: 'VHO HENKO L',
      courseName: 'How to JAVA for dummies HENKO L',
      statusNo: 0,
      status: 'NOT STARTED',
      percentage: null
    },
    {
      employeeNo: 987451,
      username: 'VHO HENKO L',
      courseName: 'How to JAVA for dummies HENKO L',
      statusNo: 0,
      status: 'NOT STARTED',
      percentage: null
    },
    {
      employeeNo: 987451,
      username: 'VHO HENKO L',
      courseName: 'How to JAVA for dummies HENKO L',
      statusNo: 0,
      status: 'NOT STARTED',
      percentage: null
    },
    {
      employeeNo: 987451,
      username: 'VHO HENKO L',
      courseName: 'How to JAVA for dummies HENKO L',
      statusNo: 0,
      status: 'NOT STARTED',
      percentage: null
    },
    {
      employeeNo: 987451,
      username: 'VHO HENKO L',
      courseName: 'How to JAVA for dummies HENKO L',
      statusNo: 0,
      status: 'NOT STARTED',
      percentage: null
    },
    {
      employeeNo: 987451,
      username: 'VHO HENKO L',
      courseName: 'How to JAVA for dummies HENKO L',
      statusNo: 0,
      status: 'NOT STARTED',
      percentage: null
    },
    {
      employeeNo: 987451,
      username: 'VHO HENKO L',
      courseName: 'How to JAVA for dummies HENKO L',
      statusNo: 0,
      status: 'NOT STARTED',
      percentage: null
    },
    {
      employeeNo: 987451,
      username: 'VHO HENKO L',
      courseName: 'How to JAVA for dummies HENKO L',
      statusNo: 0,
      status: 'NOT STARTED',
      percentage: null
    },
    {
      employeeNo: 987451,
      username: 'VHO HENKO L',
      courseName: 'How to JAVA for dummies HENKO L',
      statusNo: 0,
      status: 'NOT STARTED',
      percentage: null
    }
  ];

  const eventsListData = (theme) => [
    {
      title: 'Hanno is Awesome',
      description: 'You know its true',
      titleRight: '100%',
      descriptionRight: 'Help',
      icon: <PieChartOutlined style={{ fontSize: '20px' }} />,
      iconSize: 5,
      color: theme.palette.success.main,
      backgroundColor: theme.palette.success.lighter,
      disabled: false,
      onClick: () => onCardListClick('Hanno is Awesome')
    },
    {
      title: 'Henko is Great',
      description: 'Here are some more text',
      titleRight: '90%',
      descriptionRight: 'I dont know',
      icon: <AndroidOutlined style={{ fontSize: '20px' }} />,
      color: theme.palette.warning.main,
      backgroundColor: theme.palette.warning.lighter,
      disabled: false,
      onClick: () => onCardListClick('Henko is Great')
    },
    {
      title: 'SMS Sent',
      description: 'Sent on 2024-12-31 15:31',
      titleRight: 'Received',
      descriptionRight: 'Successfully logged in',
      icon: <HeatMapOutlined style={{ fontSize: '20px' }} />,
      color: theme.palette.error.main,
      backgroundColor: theme.palette.error.lighter,
      disabled: false,
      onClick: () => onCardListClick('SMS Sent')
    }
  ];

  return <Home theme={theme} courseResultsData={courseResultsData} eventsListData={eventsListData(theme)} />;
}

HomeDashboardContainer.propTypes = {};

export default HomeDashboardContainer;
