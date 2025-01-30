import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontSizeOutlined, LineChartOutlined, RightCircleOutlined } from '@ant-design/icons';
import { useTheme } from '@mui/material/styles';
import MyCoursesHome from 'components/dashboard/mycourses/home/MyCoursesHome.component';
import * as myCoursesActions from 'redux/actions/MyCourses.action';
import { navigateTo } from 'utils/NavigateService';
import { Utils } from 'utils/Utils';
import { requestCourseResultUpdate } from 'redux/actions/Courses.action';

function MyCoursesHomeContainer() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { accessToken } = useSelector((state) => state.auth);
  const { employeeNo } = useSelector((state) => state.user);
  const { myCourses, myCoursesLoading } = useSelector((state) => state.myCourses);

  const [myCoursesActionsListData, setMyCoursesActionsListData] = useState([]);
  const [myCoursesToolbarData, setMyCoursesToolbarData] = useState([]);

  useEffect(() => {
    dispatch(myCoursesActions.requestMyCourses(accessToken, employeeNo));
  }, [dispatch, accessToken, employeeNo]);

  useEffect(() => {
    setMyCoursesToolbarData([
      {
        title: 'Go to Learn Course',
        icon: <RightCircleOutlined />,
        iconColor: 'primary'
      }
    ]);
  }, []);

  useEffect(() => {
    const formatMyCoursesActionsListData = [];

    formatMyCoursesActionsListData.push({
      title: 'COMING SOON - Typing Test',
      description: 'Start a Typing Test',
      icon: <FontSizeOutlined style={{ fontSize: '20px' }} />,
      iconSize: 1,
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.lighter
      // onClick: () => handleOnGoToAdminPage('users')
    });

    formatMyCoursesActionsListData.push({
      title: 'COMING SOON - Report',
      description: 'Go to the My Courses Report page',
      icon: <LineChartOutlined style={{ fontSize: '20px' }} />,
      iconSize: 1,
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.lighter
      // onClick: () => handleOnGoToAdminPage('users')
    });

    setMyCoursesActionsListData(formatMyCoursesActionsListData);
  }, [theme]);

  const handleOnToolbarClick = (index, selectedItems) => {
    console.log('selectedItems', selectedItems);
    switch (index) {
      case 0:
        if (selectedItems[0]?.courseStatusNo === 1) {
          const payload = {
            courseStatusNo: 2,
            courseResultStatusNo: selectedItems[0]?.courseResultStatusNo,
            courseAssignedBy: selectedItems[0]?.courseAssignedBy,
            courseAssignedDate: Utils.formatDateTime(selectedItems[0]?.courseAssignedDate),
            courseStartedDate: Utils.formatDateTime(new Date()),
            courseCompletedDate: Utils.formatDateTime(selectedItems[0]?.courseComletedDate),
            courseExpiryDate: Utils.formatDateTime(selectedItems[0]?.courseExpiryDate)
          };

          console.log('accessToken', accessToken);
          dispatch(requestCourseResultUpdate(accessToken, selectedItems[0]?.courseResultNo, payload));
        }

        dispatch(myCoursesActions.setMySelectedCourseResultNo(selectedItems[0]?.courseResultNo));
        navigateTo('/dashboard/my-courses/learn');
        break;
      default:
        break;
    }
  };

  return (
    <MyCoursesHome
      theme={theme}
      myCoursesData={myCourses}
      myCoursesDataLoading={myCoursesLoading}
      actionsListData={myCoursesActionsListData}
      toolbarData={myCoursesToolbarData}
      onToolbarClick={handleOnToolbarClick}
    />
  );
}

MyCoursesHomeContainer.propTypes = {};

export default MyCoursesHomeContainer;
