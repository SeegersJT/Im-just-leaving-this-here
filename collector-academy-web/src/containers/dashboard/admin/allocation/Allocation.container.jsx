import { EditOutlined } from '@ant-design/icons';
import { useTheme } from '@mui/material/styles';

import Allocation from 'components/dashboard/admin/allocation/Allocation.component';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as allocationActions from 'redux/actions/Allocation.action';
import { Utils } from 'utils/Utils';

function AllocationContainer() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { accessToken } = useSelector((state) => state.auth);
  const { users, selectedUsers } = useSelector((state) => state.users);
  const { courses, selectedCourse } = useSelector((state) => state.users);
  const {
    assignCourses,
    unassignCourses,
    assignUsers,
    unassignUsers,
    selectedUsersToAssignCourses,
    selectedUsersToUnassignCourses,
    selectedCoursesToAssignUsers,
    selectedCoursesToUnassignUsers,
    assigningCoursesLoading,
    unassigningCoursesLoading,
    assigningUsersLoading,
    unassigningUsersLoading
  } = useSelector((state) => state.allocation);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [allocationData, setAllocationData] = useState([]);
  const [allocationDataLoading, setAllocationDataLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const [allocationToolbarData, setAllocationToolbarData] = useState([]);

  useEffect(() => {
    if (!Utils.isEmpty(assignCourses)) {
      setTitle('Assigned Courses');

      if (selectedUsersToAssignCourses.length === 1) {
        const employee = users.find((user) => user?.employeeNo === selectedUsersToAssignCourses[0]);
        setDescription(`Unassign Selected Courses from ${employee?.username}`);
      }

      setAllocationData(assignCourses);
      setAllocationDataLoading(unassigningCoursesLoading);
      setStatus(1);

      setAllocationToolbarData([
        {
          title: 'Unassign Courses',
          icon: <EditOutlined />,
          iconColor: 'warning'
        }
      ]);
    }
  }, [assignCourses, unassigningCoursesLoading, selectedUsersToAssignCourses, users]);

  useEffect(() => {
    if (!Utils.isEmpty(unassignCourses)) {
      setTitle('Unassigned Courses');

      if (selectedUsersToUnassignCourses.length === 1) {
        const employee = users.find((user) => user?.employeeNo === selectedUsersToUnassignCourses[0]);
        setDescription(`Assign Selected Courses to ${employee?.username}`);
      }

      setAllocationData(unassignCourses);
      setAllocationDataLoading(assigningCoursesLoading);
      setStatus(2);

      setAllocationToolbarData([
        {
          title: 'Aassign Courses',
          icon: <EditOutlined />,
          iconColor: 'success'
        }
      ]);
    }
  }, [unassignCourses, assigningCoursesLoading, selectedUsersToUnassignCourses, users]);

  useEffect(() => {
    if (!Utils.isEmpty(assignUsers)) {
      setTitle('Assigned Users');

      if (selectedCoursesToAssignUsers.length === 1) {
        const course = courses.find((course) => course?.courseNo === selectedCoursesToAssignUsers[0]);
        setDescription(`Unassign Selected Users from ${course?.courseTitle}`);
      }

      setAllocationData(assignUsers);
      setAllocationDataLoading(unassigningUsersLoading);
      setStatus(3);

      setAllocationToolbarData([
        {
          title: 'Unassign Users',
          icon: <EditOutlined />,
          iconColor: 'warning'
        }
      ]);
    }
  }, [assignUsers, unassigningUsersLoading, selectedCoursesToAssignUsers, courses]);

  useEffect(() => {
    if (!Utils.isEmpty(unassignUsers)) {
      setTitle('Unassigned Users');

      if (selectedCoursesToUnassignUsers.length === 1) {
        const course = courses.find((course) => course?.courseNo === selectedCoursesToUnassignUsers[0]);
        setDescription(`Assign Selected Courses to ${course?.courseTitle}`);
      }

      setAllocationData(unassignUsers);
      setAllocationDataLoading(assigningUsersLoading);
      setStatus(4);

      setAllocationToolbarData([
        {
          title: 'Assign Users',
          icon: <EditOutlined />,
          iconColor: 'success'
        }
      ]);
    }
  }, [unassignUsers, assigningUsersLoading, selectedCoursesToUnassignUsers, courses]);

  const handleOnToolbarClick = (index, selectedItems) => {
    console.log('selectedItems', selectedItems);
    console.log('index', index);
    console.log('status', status);
    console.log('selectedUsersToAssignCourses', selectedUsersToAssignCourses);

    switch (index) {
      case 0:
        if (status === 1) {
          dispatch(allocationActions.requestUnassigningCourses(accessToken, selectedItems));
        }

        if (status === 2) {
          dispatch(allocationActions.requestAssigningCourses(accessToken, selectedUsersToUnassignCourses, selectedItems));
        }

        if (status === 3) {
          //extra logic needed for courseResulNo
          // dispatch(allocationActions.requestAssigningUsers(accessToken, courseResults));
        }

        if (status === 4) {
          dispatch(allocationActions.requestAssigningUsers(accessToken, selectedCoursesToUnassignUsers, selectedItems));
        }
        break;
      default:
        break;
    }
  };

  return (
    <Allocation
      theme={theme}
      title={title}
      description={description}
      allocationData={allocationData}
      allocationLoading={allocationDataLoading}
      allocationToolbarData={allocationToolbarData}
      onToolbarClick={handleOnToolbarClick}
    />
  );
}

AllocationContainer.propTypes = {};

export default AllocationContainer;
