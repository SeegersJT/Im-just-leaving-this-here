import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import {
  CheckSquareOutlined,
  CloseSquareOutlined,
  DeleteOutlined,
  FileSearchOutlined,
  FormOutlined,
  LoadingOutlined,
  ReconciliationOutlined,
  RollbackOutlined
} from '@ant-design/icons';
import { Utils } from 'utils/Utils';
import { navigateTo } from 'utils/NavigateService';
import UsersEdit from 'components/dashboard/admin/users/edit/UsersEdit.component';
import { getCourseStatusColor, validateField } from './UsersEdit.helper';
import * as usersActions from 'redux/actions/Users.action';
import * as commonActions from 'redux/actions/Common.action';
import * as coursesActions from 'redux/actions/Courses.action';
import * as allocationActions from 'redux/actions/Allocation.action';

function UsersEditContainer() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const resetPasswordModalRef = useRef();
  const deleteUsersModalRef = useRef();

  const { accessToken } = useSelector((state) => state.auth);
  const { roleNo } = useSelector((state) => state.user);
  const { users, selectedUsers, updateUsersLoading, usersResetPasswordLoading, usersDeleteLoading } = useSelector((state) => state.users);
  const { courseResults, courseResultsLoading } = useSelector((state) => state.courses);

  const { branches, genders, employeeTypes, performanceManagers } = useSelector((state) => state.common);

  const [title, setTitle] = useState('No Users Selected');
  const [defaultUsers, setDefaultUsers] = useState([]);
  const [currentUsers, setCurrentUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isValidUser, setIsValidUser] = useState(null);
  const [isValidUserStatus, setIsValidUserStatus] = useState(false);
  const [isSingleUser, setIsSingleUser] = useState(true);

  const [multipleUsersValid, setMultipleUsersValid] = useState(false);

  const [branchMenuItems, setBranchMenuItems] = useState([]);
  const [employeeTypeMenuItems, setEmployeeTypeMenuItems] = useState([]);
  const [genderMenuItems, setGenderMenuItems] = useState([]);
  const [performanceManagerMenuItems, setPerformanceManagerMenuItems] = useState([]);

  const [actionListData, setActionListData] = useState([]);

  const [courseResultGroupData, setCourseResultGroupData] = useState([]);

  useEffect(() => {
    dispatch(commonActions.requestAllBranches(accessToken));
    dispatch(commonActions.requestAllGenders(accessToken));
    dispatch(commonActions.requestAllEmployeeTypes(accessToken));
    dispatch(commonActions.requestAllPerformanceManagers(accessToken));
  }, [dispatch, accessToken]);

  useEffect(() => {
    const filteredUsers = users.filter((user) => selectedUsers.includes(user?.employeeNo));

    if (filteredUsers.length === 1) {
      setTitle(`[ ${filteredUsers[0]?.username} ] - User Selected`);

      setSelectedUser({
        branchNo: filteredUsers[0]?.branchNo,
        idNumber: filteredUsers[0]?.idNumber,
        name: filteredUsers[0]?.name,
        surname: filteredUsers[0]?.surname,
        emailAddress: filteredUsers[0]?.emailAddress,
        mobileNumber: filteredUsers[0]?.mobileNumber,
        genderNo: filteredUsers[0]?.genderNo,
        employeeTypeNo: filteredUsers[0]?.employeeTypeNo,
        performanceManagerEmployeeNo: filteredUsers[0]?.performanceManagerEmployeeNo
      });

      setIsValidUser({
        branchNo: 1,
        idNumber: 1,
        name: 1,
        surname: 1,
        emailAddress: 1,
        mobileNumber: 1,
        genderNo: 1,
        employeeTypeNo: 1,
        performanceManagerEmployeeNo: 1
      });

      dispatch(coursesActions.requestAllCourseResults(accessToken, filteredUsers[0]?.employeeNo));
    } else {
      setTitle(`${filteredUsers.length} - Users Selected.`);
      setIsSingleUser(false);
    }

    setDefaultUsers(filteredUsers);
    setCurrentUsers(filteredUsers);
  }, [dispatch, accessToken, users, selectedUsers]);

  useEffect(() => {
    const handleOnUsersEditSumbit = () => {
      const onSuccess = () => {
        navigateTo('/dashboard/admin/users/home');
      };

      dispatch(usersActions.requestUpdateUsers(accessToken, currentUsers, onSuccess));
    };

    const handleOnAssignCoursesToUser = () => {
      dispatch(allocationActions.requestUnassignCourses(accessToken, selectedUsers[0]));
    };

    const handleOnAssignCoursesToUsers = () => {};

    const handleOnUnassignCoursesToUser = () => {
      dispatch(allocationActions.requestAssignCourses(accessToken, selectedUsers[0]));
    };

    const handleOnUnassignCoursesToUsers = () => {};

    const handleOnResetPasswords = () => {
      resetPasswordModalRef.current.callPopUpOpen();
    };

    const handleOnDeleteUsers = () => {
      deleteUsersModalRef.current.callPopUpOpen();
    };

    const formatActionListData = [];

    if (isSingleUser) {
      formatActionListData.push({
        title: 'Update User',
        description: 'Update Selected User.',
        icon: updateUsersLoading ? <LoadingOutlined style={{ fontSize: '20px' }} /> : <FormOutlined style={{ fontSize: '20px' }} />,
        color: theme.palette.success.main,
        backgroundColor: theme.palette.success.lighter,
        disabled: !isValidUserStatus || updateUsersLoading,
        onClick: handleOnUsersEditSumbit
      });
    } else {
      formatActionListData.push({
        title: 'Update Users',
        description: 'Update All Selected Users.',
        icon: updateUsersLoading ? <LoadingOutlined style={{ fontSize: '20px' }} /> : <FormOutlined style={{ fontSize: '20px' }} />,
        color: theme.palette.success.main,
        backgroundColor: theme.palette.success.lighter,
        disabled: !isValidUserStatus || !multipleUsersValid || updateUsersLoading,
        onClick: handleOnUsersEditSumbit
      });
    }

    if (isSingleUser) {
      formatActionListData.push({
        title: 'Assign Courses',
        description: 'Assign Courses to Selected User.',
        icon: <CheckSquareOutlined style={{ fontSize: '20px' }} />,
        color: theme.palette.success.main,
        backgroundColor: theme.palette.success.lighter,
        disabled: false,
        onClick: handleOnAssignCoursesToUser
      });
    } else {
      formatActionListData.push({
        title: 'COMING SOON - Assign Courses',
        description: 'COMING SOON - Assign Courses to Selected Users.',
        icon: <CheckSquareOutlined style={{ fontSize: '20px' }} />,
        color: theme.palette.success.main,
        backgroundColor: theme.palette.success.lighter,
        disabled: true,
        onClick: handleOnAssignCoursesToUsers
      });
    }

    if (isSingleUser) {
      formatActionListData.push({
        title: 'Unassign Courses',
        description: 'Unassign Courses from Selected User.',
        icon: <CloseSquareOutlined style={{ fontSize: '20px' }} />,
        color: theme.palette.warning.main,
        backgroundColor: theme.palette.warning.lighter,
        disabled: false,
        onClick: handleOnUnassignCoursesToUser
      });
    } else {
      formatActionListData.push({
        title: 'COMING SOON - Unassign Courses',
        description: 'COMING SOON - Unassign Courses from Selected Users.',
        icon: <CloseSquareOutlined style={{ fontSize: '20px' }} />,
        color: theme.palette.warning.main,
        backgroundColor: theme.palette.warning.lighter,
        disabled: true,
        onClick: handleOnUnassignCoursesToUsers
      });
    }

    formatActionListData.push({
      title: 'Reset Passwords',
      description: 'Reset Passwords for All Selected Users.',
      icon: <RollbackOutlined style={{ fontSize: '20px' }} />,
      iconSize: 5,
      color: theme.palette.error.main,
      backgroundColor: theme.palette.error.lighter,
      disabled: false,
      onClick: handleOnResetPasswords
    });

    formatActionListData.push({
      title: 'Delete Users',
      description: 'Delete All Selected Users',
      icon: <DeleteOutlined style={{ fontSize: '20px' }} />,
      color: theme.palette.error.main,
      backgroundColor: theme.palette.error.lighter,
      disabled: false,
      onClick: handleOnDeleteUsers
    });

    setActionListData(formatActionListData);
  }, [dispatch, accessToken, theme, currentUsers, isSingleUser, isValidUserStatus, multipleUsersValid, updateUsersLoading, selectedUsers]);

  useEffect(() => {
    const formatCourseResultGroupData = [];

    if (Utils.isEmpty(courseResults)) {
      formatCourseResultGroupData.push({
        title: 'No Courses Assigned',
        description: 'No Courses Assigned to selected User',
        icon: courseResultsLoading ? <LoadingOutlined style={{ fontSize: '20px' }} /> : <FileSearchOutlined style={{ fontSize: '20px' }} />,
        color: theme.palette.warning.main,
        backgroundColor: theme.palette.warning.lighter,
        disabled: true
      });
    } else {
      courseResults.map((courseResult) =>
        formatCourseResultGroupData.push({
          title: courseResult?.courseTitle,
          description: courseResult?.courseBreakoutStep,
          titleRight: courseResult?.courseStatusDescription,
          descriptionRight: !Utils.isNull(courseResult?.courseResultStatus) ? courseResult?.courseResultStatus : '',
          icon: <ReconciliationOutlined style={{ fontSize: '20px' }} />,
          color: getCourseStatusColor(theme, false, courseResult?.courseStatus, courseResult?.courseResultStatus),
          backgroundColor: getCourseStatusColor(theme, true, courseResult?.courseStatus, courseResult?.courseResultStatus)
        })
      );
    }

    setCourseResultGroupData(formatCourseResultGroupData);
  }, [theme, courseResults, courseResultsLoading]);

  useEffect(() => {
    setBranchMenuItems(
      branches.map((branch) => ({
        value: branch.branchNo,
        label: branch.branchName
      }))
    );
  }, [branches]);

  useEffect(() => {
    setGenderMenuItems(
      genders.map((gender) => ({
        value: gender.genderNo,
        label: gender.gender
      }))
    );
  }, [genders]);

  useEffect(() => {
    setEmployeeTypeMenuItems(
      employeeTypes.map(
        (employeeType) =>
          roleNo <= employeeType.employeeTypeNo && {
            value: employeeType.employeeTypeNo,
            label: employeeType.employeeType
          }
      )
    );
  }, [employeeTypes, roleNo]);

  useEffect(() => {
    setPerformanceManagerMenuItems(
      performanceManagers.map((performanceManager) => ({
        value: performanceManager.performanceManagerEmployeeNo,
        label: performanceManager.performanceManagerUsername
      }))
    );
  }, [performanceManagers]);

  useEffect(() => {
    setIsValidUserStatus(Utils.checkIsValidStatus(isValidUser));
  }, [isValidUser]);

  const handleOnSelectedUserChange = (value, type) => {
    setCurrentUsers(
      currentUsers.map((user) => {
        return {
          ...user,
          [type]: value
        };
      })
    );

    if (isSingleUser) {
      const hasChanged = defaultUsers[0]?.[type] !== value;

      let isValid = 1;

      if (validateField(type, value)) {
        if (hasChanged) {
          isValid = 2;
        } else {
          isValid = 1;
        }
      } else {
        isValid = 0;
      }

      setIsValidUser({
        ...isValidUser,
        [type]: isValid
      });
    } else if (!multipleUsersValid) {
      setMultipleUsersValid(true);
    }

    setSelectedUser({
      ...selectedUser,
      [type]: value
    });
  };

  const handleOnResetPasswordPopUpClick = () => {
    const onResponse = () => {
      resetPasswordModalRef.current.callPopUpClose();
    };

    dispatch(usersActions.requestUsersResetPassword(accessToken, currentUsers, onResponse));
  };

  const handleOnDeletUsersPopUpClick = () => {
    const onResponse = () => {
      deleteUsersModalRef.current.callPopUpClose();
      navigateTo('/dashboard/admin/users/home');
    };

    dispatch(usersActions.requestUsersDelete(accessToken, currentUsers, onResponse));
  };

  return (
    <UsersEdit
      theme={theme}
      title={title}
      isSingleUser={isSingleUser}
      selectedUser={selectedUser}
      isValidUser={isValidUser}
      actionListData={actionListData}
      branchMenuItems={branchMenuItems}
      employeeTypeMenuItems={employeeTypeMenuItems}
      genderMenuItems={genderMenuItems}
      performanceManagerMenuItems={performanceManagerMenuItems}
      courseResultGroupData={courseResultGroupData}
      resetPasswordModalRef={resetPasswordModalRef}
      deleteUsersModalRef={deleteUsersModalRef}
      usersResetPasswordLoading={usersResetPasswordLoading}
      usersDeleteLoading={usersDeleteLoading}
      onSelectedUserChange={handleOnSelectedUserChange}
      onResetPasswordPopUpClick={handleOnResetPasswordPopUpClick}
      onDeleteUsersPopUpClick={handleOnDeletUsersPopUpClick}
    />
  );
}

UsersEditContainer.propTypes = {};
export default UsersEditContainer;
