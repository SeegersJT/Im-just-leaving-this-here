import * as allocationActions from 'redux/actions/Allocation.action';
import * as allocationConstants from './constants/Allocation.constant';

const initialState = {
  assignCourses: [],
  unassignCourses: [],
  assignUsers: [],
  unassignUsers: [],
  selectedUsersToAssignCourses: [],
  selectedUsersToUnassignCourses: [],
  selectedCoursesToAssignUsers: [],
  selectedCoursesToUnassignUsers: [],
  assignCoursesLoading: false,
  unassignCoursesLoading: false,
  assignUsersLoading: false,
  unassignUsersLoading: false,
  assigningCoursesLoading: false,
  unassigningCoursesLoading: false,
  assigningUsersLoading: false,
  unassigningUsersLoading: false
};

const allocationReducer = (state = initialState, action) => {
  switch (action.type) {
    // RESET ALLOCATION
    case allocationActions.RESET_ALLOCATION:
      return {
        ...initialState
      };

    // ASSIGN COURSES
    case allocationActions.REQUEST_ASSIGN_COURSES_LOADING:
      return {
        ...state,
        assignCoursesLoading: action.loading
      };

    case allocationActions.SET_ASSIGN_COURSES:
      return {
        ...state,
        assignCourses: action.payload.map((allocation) => allocationConstants.formatConstantAllocation(allocation))
      };

    case allocationActions.SET_SELECTED_USERS_TO_ASSIGN_COURSES:
      return {
        ...state,
        selectedUsersToAssignCourses: action.payload
      };

    case allocationActions.REQUEST_ASSIGNING_COURSES_LOADING:
      return {
        ...state,
        assigningCoursesLoading: action.loading
      };

    // UNASSIGN COURSES
    case allocationActions.REQUEST_UNASSIGN_COURSES_LOADING:
      return {
        ...state,
        unassignCoursesLoading: action.loading
      };

    case allocationActions.SET_UNASSIGN_COURSES:
      return {
        ...state,
        unassignCourses: action.payload.map((allocation) => allocationConstants.formatConstantAllocation(allocation))
      };

    case allocationActions.SET_SELECTED_USERS_TO_UNASSIGN_COURSES:
      return {
        ...state,
        selectedUsersToUnassignCourses: action.payload
      };

    case allocationActions.REQUEST_UNASSIGNING_COURSES_LOADING:
      return {
        ...state,
        unassigningCoursesLoading: action.loading
      };

    // ASSIGN USERS
    case allocationActions.REQUEST_ASSIGN_USERS_LOADING:
      return {
        ...state,
        assignUsersLoading: action.loading
      };

    case allocationActions.SET_ASSIGN_USERS:
      return {
        ...state,
        assignUsers: action.payload.map((allocation) => allocationConstants.formatConstantAllocation(allocation))
      };

    case allocationActions.SET_SELECTED_COURSES_TO_ASSIGN_USERS:
      return {
        ...state,
        selectedCoursesToAssignUsers: action.payload
      };

    case allocationActions.REQUEST_ASSIGNING_USERS_LOADING:
      return {
        ...state,
        assigningUsersLoading: action.loading
      };

    // UNASSIGN USERS
    case allocationActions.REQUEST_UNASSIGN_USERS_LOADING:
      return {
        ...state,
        unassignUsersLoading: action.loading
      };

    case allocationActions.SET_UNASSIGN_USERS:
      return {
        ...state,
        unassignUsers: action.payload.map((allocation) => allocationConstants.formatConstantAllocation(allocation))
      };

    case allocationActions.SET_SELECTED_COURSES_TO_UNASSIGN_USERS:
      return {
        ...state,
        selectedCoursesToUnassignUsers: action.payload
      };

    case allocationActions.REQUEST_UNASSIGNING_USERS_LOADING:
      return {
        ...state,
        unassigningUsersLoading: action.loading
      };

    default:
      return state;
  }
};

export default allocationReducer;
