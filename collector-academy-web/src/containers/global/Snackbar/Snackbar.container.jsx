import Snack from 'components/global/Snackbar/Snackbar.component';
import { useSelector } from 'react-redux';

function SnackContainer() {
  const notifications = useSelector((state) => state.system.notifications);
  return <Snack notifications={notifications} />;
}

export default SnackContainer;
