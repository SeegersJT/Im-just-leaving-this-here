import { useTheme } from '@mui/material/styles';
import UsersAddStatus from 'components/dashboard/admin/users/add/status/UsersAddStatus.component';
import { useSelector } from 'react-redux';

function UsersAddStatusContainer() {
  const theme = useTheme();

  const { successfulUserUploads, failedUserUploads } = useSelector((state) => state.users.usersUploadStatus);

  return <UsersAddStatus theme={theme} successfulUserUploadsData={successfulUserUploads} failedUserUploadsData={failedUserUploads} />;
}

UsersAddStatusContainer.propTypes = {};

export default UsersAddStatusContainer;
