import { ADD_SNACKBAR, REMOVE_SNACKBAR } from '../actions/System.action';

export const SNACK_INFO = 'info';
export const SNACK_SUCCESS = 'success';
export const SNACK_WARNING = 'warning';
export const SNACK_ERROR = 'error';

const initialState = {
  notifications: []
};

const systemReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SNACKBAR:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            id: action.payload.id,
            message: action.payload.message,
            type: action.payload.type
          }
        ]
      };

    case REMOVE_SNACKBAR:
      return {
        ...state,
        notifications: [...state.notifications.filter((notification) => notification.id !== action.payload.id)]
      };

    default:
      return state;
  }
};

export default systemReducer;
