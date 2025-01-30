import { useTheme } from '@mui/material/styles';

import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import CoursesHome from 'components/dashboard/admin/courses/home/CoursesHome';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as coursesActions from 'redux/actions/Courses.action';
import { navigateTo } from 'utils/NavigateService';

function CoursesHomeContainer() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { accessToken } = useSelector((state) => state.auth);
  const { courses, coursesLoading } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(coursesActions.resetCourseEditor());
    dispatch(coursesActions.requestAllCourses(accessToken));
  }, [dispatch, accessToken]);

  const coursesActionsListData = (theme) => [
    {
      title: 'Add a Course',
      description: 'Go to the Add Course page',
      icon: <PlusCircleOutlined style={{ fontSize: '20px' }} />,
      iconSize: 1,
      color: theme.palette.success.main,
      backgroundColor: theme.palette.success.lighter,
      onClick: () => navigateTo('/dashboard/admin/courses/course')
    }
  ];

  const coursesToolbarData = () => [
    {
      title: 'Edit',
      icon: <EditOutlined />,
      iconColor: 'warning'
    }
  ];

  const handleOnToolbarClick = (index, selectedItems) => {
    switch (index) {
      case 0:
        dispatch(coursesActions.setSelectedCourse(selectedItems[0].courseNo));
        navigateTo('/dashboard/admin/courses/course');
        break;

      default:
        break;
    }
  };

  return (
    <CoursesHome
      theme={theme}
      coursesData={courses}
      coursesDataLoading={coursesLoading}
      coursesActionsListData={coursesActionsListData(theme)}
      coursesToolbarData={coursesToolbarData()}
      onToolbarClick={handleOnToolbarClick}
    />
  );
}

CoursesHomeContainer.propTypes = {};

export default CoursesHomeContainer;
