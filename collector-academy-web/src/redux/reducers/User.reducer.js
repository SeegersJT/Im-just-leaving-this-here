import { RESET_USER, SET_USER } from '../actions/User.action';

const initialState = {
  username: null,
  employeeNo: null,
  branchNo: null,
  roleNo: null,
  role: null,
  emailAddress: null,
  mobileNumber: null,
  gender: null,
  name: null,
  surname: null,
  idNumber: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        username: action.payload.username,
        employeeNo: action.payload.employeeNo,
        branchNo: action.payload.branchNo,
        roleNo: action.payload.roleNo,
        role: action.payload.role,
        emailAddress: action.payload.emailAddress,
        mobileNumber: action.payload.mobileNumber,
        gender: action.payload.gender,
        name: action.payload.name,
        surname: action.payload.surname,
        idNumber: action.payload.idNumber
      };
    case RESET_USER:
      return { ...initialState };
    default:
      return state;
  }
};

export default userReducer;
