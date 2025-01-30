import { Utils } from 'utils/Utils';

export const ADD_SNACKBAR = '[SNACK] ADD - SNACKBAR';
export const REMOVE_SNACKBAR = '[SNACK] REMOVE - SNACKBAR';

export const addSystemNotification = (message, type) => ({
  type: ADD_SNACKBAR,
  payload: { id: Utils.generateRandomID(), message, type }
});

export const removeSystemNotification = (id) => ({
  type: REMOVE_SNACKBAR,
  payload: { id }
});
