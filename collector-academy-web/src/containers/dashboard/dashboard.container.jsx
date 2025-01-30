import Dashboard from 'components/dashboard/Dashboard.component';
import { useSelector } from 'react-redux';

function DashboardContainer() {
  const { roleNo } = useSelector((state) => state.user);

  return <Dashboard activeUserRoleNo={roleNo} />;
}

DashboardContainer.propTypes = {};

export default DashboardContainer;
