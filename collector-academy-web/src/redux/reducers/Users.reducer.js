import * as usersActions from 'redux/actions/Users.action';
import * as usersContants from './constants/Users.constant';

const initialState = {
  users: [],
  selectedUsers: [],
  validateUsers: [],
  usersUploadStatus: [
    {
      successfulUserUploads: [],
      failedUserUploads: []
    }
  ],
  usersLoading: false,
  updateUsersLoading: false,
  usersResetPasswordLoading: false,
  usersDeleteLoading: false,
  addUsersFileUploadValidateLoading: false,
  addUsersTemplateDownloadLoading: false,
  addVlidateUsersLoading: false
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case usersActions.SET_USERS:
      return {
        ...state,
        users: action.payload.map((user) => usersContants.formatConstantUsers(user))
      };

    case usersActions.RESET_USERS:
      return {
        ...state,
        users: initialState.users
      };

    case usersActions.SET_SELECTED_USERS:
      return {
        ...state,
        selectedUsers: action.selectedUsers
      };

    case usersActions.REQUEST_USERS_LOADING:
      return {
        ...state,
        usersLoading: action.loading
      };

    case usersActions.REQUEST_UPDATE_USERS_LOADING:
      return {
        ...state,
        updateUsersLoading: action.loading
      };

    case usersActions.REQUEST_USERS_RESET_PASSWORD_LOADING:
      return {
        ...state,
        usersResetPasswordLoading: action.loading
      };

    case usersActions.REQUEST_USERS_DELETE_LOADING:
      return {
        ...state,
        usersDeleteLoading: action.loading
      };

    case usersActions.SET_ADD_USERS_FILE_UPLOAD_VALIDATE:
      return {
        ...state,
        validateUsers: action.payload
      };

    case usersActions.REQUEST_ADD_USERS_FILE_UPLOAD_VALIDATE_LOADING:
      return {
        ...state,
        addUsersFileUploadValidateLoading: action.loading
      };

    case usersActions.REQUEST_ADD_USERS_TEMPLATE_DOWNLOAD_LOADING:
      return {
        ...state,
        addUsersTemplateDownloadLoading: action.loading
      };

    case usersActions.REQUEST_ADD_VALIDATE_USERS_LOADING:
      return {
        ...state,
        addValidateUsersLoading: action.loading
      };

    case usersActions.SET_USERS_UPLOAD_STATUS:
      return {
        ...state,
        usersUploadStatus: action.payload
      };

    default:
      return state;
  }
};

export default usersReducer;
