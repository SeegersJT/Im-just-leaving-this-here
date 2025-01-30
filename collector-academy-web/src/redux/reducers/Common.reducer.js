import * as commonActions from 'redux/actions/Common.action';
import * as commonConstants from './constants/Common.constant';

const initialState = {
  branches: [],
  genders: [],
  employeeTypes: [],
  performanceManagers: [],

  branchesLoading: false,
  gendersLoading: false,
  employeeTypesLoading: false,
  performanceManagersLoading: false
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case commonActions.SET_BRANCHES:
      return {
        ...state,
        branches: action.payload.map((branch) => commonConstants.formatConstantBranch(branch))
      };

    case commonActions.REQUEST_ALL_BRANCHES_LOADING:
      return {
        ...state,
        branchesLoading: action.loading
      };

    case commonActions.SET_ALL_GENDERS:
      return {
        ...state,
        genders: action.payload.map((gender) => commonConstants.formatConstantGender(gender))
      };

    case commonActions.REQUEST_ALL_GENDERS_LOADING:
      return {
        ...state,
        gendersLoading: action.loading
      };

    case commonActions.SET_ALL_EMPLOYEE_TYPES:
      return {
        ...state,
        employeeTypes: action.payload.map((employeeType) => commonConstants.formatConstantEmployeeTypes(employeeType))
      };

    case commonActions.REQUEST_ALL_EMPLOYEE_TYPES_LOADING:
      return {
        ...state,
        employeeTypesLoading: action.loading
      };

    case commonActions.SET_ALL_PERFORMANCE_MANAGERS:
      return {
        ...state,
        performanceManagers: action.payload.map((performanceManager) =>
          commonConstants.formatConstantPerformanceManagers(performanceManager)
        )
      };

    case commonActions.REQUEST_ALL_PERFORMANCE_MANAGERS_LOADING:
      return {
        ...state,
        performanceManagersLoading: action.loading
      };

    default:
      return state;
  }
};

export default commonReducer;
