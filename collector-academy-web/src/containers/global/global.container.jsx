import PropTypes from 'prop-types';
import SnackContainer from './Snackbar/Snackbar.container';
import { SnackbarProvider } from 'notistack';
import { useNavigate } from 'react-router';
import { setNavigate } from 'utils/NavigateService';

function GlobalContainer({ children }) {
  const NavigateHandler = () => {
    const navigate = useNavigate();
    setNavigate(navigate);
    return null;
  };

  return (
    <>
      {children}
      <NavigateHandler />
      <SnackbarProvider maxSnack={5}>
        <SnackContainer />
      </SnackbarProvider>
    </>
  );
}

GlobalContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export default GlobalContainer;
