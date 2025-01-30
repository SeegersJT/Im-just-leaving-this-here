import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

function Snack({ notifications }) {
  const { enqueueSnackbar } = useSnackbar();
  const [shownNotifications, setShownNotifications] = useState([]);

  useEffect(() => {
    notifications.forEach((notification) => {
      if (!shownNotifications.includes(notification.id)) {
        enqueueSnackbar(notification.message, {
          variant: notification.type || 'info',
          anchorOrigin: { vertical: 'top', horizontal: 'right' }
        });

        setShownNotifications((prev) => [...prev, notification.id]);
      }
    });

    const timeoutId = setTimeout(() => {
      setShownNotifications([]);
    }, 10000);

    return () => clearTimeout(timeoutId);
  }, [notifications, enqueueSnackbar, shownNotifications]);

  return null;
}

Snack.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired
    })
  ).isRequired
};

export default Snack;
