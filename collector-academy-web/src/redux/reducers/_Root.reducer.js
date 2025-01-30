import { combineReducers } from 'redux';

import systemReducer from './System.reducer';
import authReducer from './Auth.reducer';
import tokenReducer from './Token.reducer';
import userReducer from './User.reducer';
import usersReducer from './Users.reducer';
import commonReducer from './Common.reducer';
import coursesReducer from './Courses.reducer';
import allocationReducer from './Allocation.reducer';
import myCoursesReducer from './MyCourses.reducer';

const RootReducer = combineReducers({
  system: systemReducer,
  token: tokenReducer,
  auth: authReducer,
  user: userReducer,
  common: commonReducer,
  users: usersReducer,
  courses: coursesReducer,
  allocation: allocationReducer,
  myCourses: myCoursesReducer
});

export default RootReducer;
