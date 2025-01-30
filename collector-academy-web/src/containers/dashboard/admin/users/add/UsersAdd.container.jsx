import { useTheme } from '@mui/material/styles';

import UsersAdd from 'components/dashboard/admin/users/add/UsersAdd.component';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestAddUsersFileUploadValidate, requestAddValidateUsers } from 'redux/actions/Users.action';
import { Utils } from 'utils/Utils';

function UsersAddContainer() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { accessToken } = useSelector((state) => state.auth);
  const { validateUsers, addUsersFileUploadValidateLoading, addValidateUsersLoading } = useSelector((state) => state.users);

  const [usersData, setUserData] = useState([]);
  const [validityUsersData, setValidityUsersData] = useState([]);
  const [validityReasonUsersData, setValidityReasonUsersData] = useState([]);
  const [canAddUsers, setCanAddUsers] = useState(false);

  useEffect(() => {
    if (!Utils.isEmpty(validateUsers)) {
      if (!Utils.isEmpty(validateUsers?.rows) && validateUsers.allRowsValid) {
        setCanAddUsers(true);
      } else if (Utils.isEmpty(validateUsers?.rows) || !validateUsers.allRowsValid) {
        setCanAddUsers(false);
      }

      const formatUsersData = validateUsers?.rows.map((row) => {
        const randomId = Utils.generateRandomID();

        const rowObject = {
          randomId: randomId
        };

        row.cells.forEach((cell) => {
          rowObject[cell.header] = cell.value;
        });

        return rowObject;
      });

      const formatValidityUsersData = validateUsers?.rows.map((row, index) => {
        const randomId = formatUsersData[index].randomId;

        const rowObject = {
          randomId: randomId
        };

        row.cells.forEach((cell) => {
          rowObject[cell.header] = cell.validity;
        });

        return rowObject;
      });

      const formatValidityReasonUsersData = validateUsers?.rows.map((row, index) => {
        const randomId = formatUsersData[index].randomId;

        const rowObject = {
          randomId: randomId
        };

        row.cells.forEach((cell) => {
          rowObject[cell.header] = cell.validityReason;
        });

        return rowObject;
      });

      setUserData(formatUsersData);
      setValidityUsersData(formatValidityUsersData);
      setValidityReasonUsersData(formatValidityReasonUsersData);
    }
  }, [validateUsers]);

  const handleOnFileUpload = (file) => {
    dispatch(requestAddUsersFileUploadValidate(accessToken, file));
  };

  const handleOnAddUsersClick = () => {
    dispatch(requestAddValidateUsers(accessToken, validateUsers));
  };

  return (
    <UsersAdd
      theme={theme}
      usersData={usersData}
      validityUsersData={validityUsersData}
      validityReasonUsersData={validityReasonUsersData}
      canAddUsers={canAddUsers}
      addUsersFileUploadValidateLoading={addUsersFileUploadValidateLoading}
      addValidateUsersLoading={addValidateUsersLoading}
      onFileUpload={handleOnFileUpload}
      onAddUsersClick={handleOnAddUsersClick}
    />
  );
}

UsersAddContainer.propTypes = {};

export default UsersAddContainer;
