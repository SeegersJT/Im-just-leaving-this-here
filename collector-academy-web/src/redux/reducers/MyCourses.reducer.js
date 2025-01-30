import * as myCoursesActions from 'redux/actions/MyCourses.action';
import * as myCoursesConstants from './constants/MyCourses.constant';

const initialState = {
  myCourses: [],
  myLearnCourse: [],
  selectedCourseResultNo: null,
  myCoursesLoading: false,
  myLearnCourseLoading: false
};

const myCoursesReducer = (state = initialState, action) => {
  switch (action.type) {
    case myCoursesActions.REQUEST_MY_COURSES_LOADING:
      return {
        ...state,
        myCoursesLoading: action.loading
      };

    case myCoursesActions.SET_MY_COURSES:
      return {
        ...state,
        myCourses: action.payload.map((myCourse) => myCoursesConstants.formatConstantMyCourses(myCourse))
      };

    case myCoursesActions.SET_MY_SELECTED_COURSE_RESULT_NO:
      return {
        ...state,
        selectedCourseResultNo: action.payload
      };

    case myCoursesActions.REQUEST_MY_LEARN_COURSE_LOADING:
      return {
        ...state,
        myLearnCourseLoading: action.loading
      };

    case myCoursesActions.SET_MY_LEARN_COURSE:
      console.log('action', action);
      return {
        ...state,
        myLearnCourse: myCoursesConstants.formatConstantMyLearnCourse(action.payload)
      };

    case myCoursesActions.CHANGE_MY_COURSE_TEST_RESULT:
      return {
        ...state,
        myLearnCourse: {
          ...state.myLearnCourse, // Ensure we reference `state`
          myCourse: {
            ...state.myLearnCourse.myCourse,
            myTests: state.myLearnCourse.myCourse.myTests.map((myTest) =>
              myTest.courseTestNo === action.payload.courseTestNo
                ? { ...myTest, myCourseTestResult: { ...myTest.myCourseTestResult, ...action.payload } }
                : myTest
            )
          }
        }
      };

    case myCoursesActions.CHANGE_MY_COURSE_TEST_LOG:
      return {
        ...state,
        myLearnCourse: {
          ...state.myLearnCourse,
          myCourse: {
            ...state.myLearnCourse.myCourse,
            myTests: state.myLearnCourse.myCourse.myTests.map((myTest) =>
              myTest.myCourseTestResult.courseTestResultNo === action.payload.courseTestResultNo
                ? {
                    ...myTest,
                    myCourseTestResult: {
                      ...myTest.myCourseTestResult,
                      myTestLogs: myTest.myCourseTestResult.myTestLogs.some(
                        (myLog) => myLog.courseTestLogNo === action.payload.courseTestLogNo
                      )
                        ? myTest.myCourseTestResult.myTestLogs.map((myLog) =>
                            myLog.courseTestLogNo === action.payload.courseTestLogNo
                              ? {
                                  ...myLog,
                                  courseTestQuestionNo: action.payload.courseTestQuestionNo,
                                  courseTestAnswerNo: action.payload.courseTestAnswerNo
                                }
                              : myLog
                          )
                        : [
                            ...myTest.myCourseTestResult.myTestLogs,
                            {
                              courseTestLogNo: action.payload.courseTestLogNo,
                              courseTestQuestionNo: action.payload.courseTestQuestionNo,
                              courseTestAnswerNo: action.payload.courseTestAnswerNo
                            }
                          ]
                    }
                  }
                : myTest
            )
          }
        }
      };

    default:
      return state;
  }
};

export default myCoursesReducer;
