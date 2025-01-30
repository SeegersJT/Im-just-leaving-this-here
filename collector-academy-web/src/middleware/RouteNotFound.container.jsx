import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router';
import * as systemAction from 'redux/actions/System.action';
import { SNACK_WARNING } from 'redux/reducers/System.reducer';

function RouteNotFound({ destination }) {
  const dispatch = useDispatch();

  dispatch(systemAction.addSystemNotification('Requested URL could not be found', SNACK_WARNING));

  return <Navigate to={destination} replace />;
}

RouteNotFound.propTypes = {};

export default RouteNotFound;
