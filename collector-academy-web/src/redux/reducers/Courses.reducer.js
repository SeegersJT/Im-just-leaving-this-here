import * as coursesActions from 'redux/actions/Courses.action';
import * as courseConstants from './constants/Courses.constant';

const initialState = {
  courses: [],
  courseModules: [],
  coursePages: [],
  courseTests: [],
  courseTestQuestions: [],
  courseTestAnswers: [],
  courseResults: [],
  courseDifficulties: [],
  selectedCourse: null,
  selectedCourseModule: null,
  selectedCoursePage: null,
  selectedCourseTest: null,
  selectedCourseTestQuestion: null,
  selectedCourseTestAnswer: null,
  coursesLoading: false,
  courseModulesLoading: false,
  coursePagesLoading: false,
  courseTestsLoading: false,
  courseTestQuestionsLoading: false,
  courseTestAnswersLoading: false,
  courseResultsLoading: false,
  courseDifficultiesLoading: false,
  courseUpdateLoading: false,
  courseInsertLoading: false,
  courseDeleteLoading: false,
  courseModuleUpdateLoading: false,
  courseModuleInsertLoading: false,
  courseModuleDeleteLoading: false,
  coursePageUpdateLoading: false,
  coursePageInsertLoading: false,
  coursePageDeleteLoading: false,
  courseTestUpdateLoading: false,
  courseTestInsertLoading: false,
  courseTestDeleteLoading: false,
  courseTestQuestionUpdateLoading: false,
  courseTestQuestionInsertLoading: false,
  courseTestQuestionDeleteLoading: false,
  courseTestAnswerUpdateLoading: false,
  courseTestAnswerInsertLoading: false,
  courseTestAnswerDeleteLoading: false,
  courseTestResultInsertLoading: false,
  courseTestResultUpdateLoading: false,
  courseTestLogInsertLoading: false
};

const coursesReducer = (state = initialState, action) => {
  switch (action.type) {
    case coursesActions.RESET_COURSE_EDITOR:
      return {
        ...state,
        // RESET COURSES
        courses: initialState.courses,
        selectedCourse: initialState.selectedCourse,
        coursesLoading: initialState.coursesLoading,
        courseUpdateLoading: initialState.courseUpdateLoading,
        courseInsertLoading: initialState.courseInsertLoading,
        courseDeleteLoading: initialState.courseDeleteLoading,
        // RESET MODULES
        courseModules: initialState.courseModules,
        selectedCourseModule: initialState.selectedCourseModule,
        courseModulesLoading: initialState.courseModulesLoading,
        courseModuleUpdateLoading: initialState.courseModuleUpdateLoading,
        courseModuleInsertLoading: initialState.courseModuleInsertLoading,
        courseModuleDeleteLoading: initialState.courseModuleDeleteLoading,
        // RESET PAGES
        coursePages: initialState.coursePages,
        selectedCoursePage: initialState.selectedCoursePage,
        coursePagesLoading: initialState.coursePagesLoading,
        coursePageUpdateLoading: initialState.coursePageUpdateLoading,
        coursePageInsertLoading: initialState.coursePageInsertLoading,
        coursePageDeleteLoading: initialState.coursePageDeleteLoading,
        // RESET TESTS
        courseTests: initialState.courseTests,
        selectedCourseTest: initialState.selectedCourseTest,
        courseTestsLoading: initialState.courseTestsLoading,
        courseTestUpdateLoading: initialState.courseTestUpdateLoading,
        courseTestInsertLoading: initialState.courseTestInsertLoading,
        courseTestDeleteLoading: initialState.courseTestDeleteLoading,
        // RESET QUESTIONS
        courseTestQuestions: initialState.courseTestQuestions,
        selectedCourseTestQuestion: initialState.selectedCourseTestQuestion,
        courseTestQuestionsLoading: initialState.courseTestQuestionsLoading,
        courseTestQuestionUpdateLoading: initialState.courseTestQuestionUpdateLoading,
        courseTestQuestionInsertLoading: initialState.courseTestQuestionInsertLoading,
        courseTestQuestionDeleteLoading: initialState.courseTestQuestionDeleteLoading,
        // RESET ANSWERS
        courseTestAnswers: initialState.courseTestAnswers,
        selectedCourseTestAnswer: initialState.selectedCourseTestAnswer,
        courseTestAnswersLoading: initialState.courseTestAnswersLoading,
        courseTestAnswerUpdateLoading: initialState.courseTestAnswerUpdateLoading,
        courseTestAnswerInsertLoading: initialState.courseTestAnswerInsertLoading,
        courseTestAnswerDeleteLoading: initialState.courseTestAnswerDeleteLoading,
        // RESET DIFFICULTIES
        courseDifficulties: initialState.courseDifficulties,
        courseDifficultiesLoading: initialState.courseDifficultiesLoading
      };

    case coursesActions.RESET_MODULE_EDITOR:
      return {
        ...state,
        // RESET MODULES
        courseModules: initialState.courseModules,
        selectedCourseModule: initialState.selectedCourseModule,
        courseModulesLoading: initialState.courseModulesLoading,
        courseModuleUpdateLoading: initialState.courseModuleUpdateLoading,
        courseModuleInsertLoading: initialState.courseModuleInsertLoading,
        courseModuleDeleteLoading: initialState.courseModuleDeleteLoading,
        // RESET PAGES
        coursePages: initialState.coursePages,
        selectedCoursePage: initialState.selectedCoursePage,
        coursePagesLoading: initialState.coursePagesLoading,
        coursePageUpdateLoading: initialState.coursePageUpdateLoading,
        coursePageInsertLoading: initialState.coursePageInsertLoading,
        coursePageDeleteLoading: initialState.coursePageDeleteLoading
      };

    case coursesActions.RESET_PAGE_EDITOR:
      return {
        ...state,
        // RESET PAGES
        coursePages: initialState.coursePages,
        selectedCoursePage: initialState.selectedCoursePage,
        coursePagesLoading: initialState.coursePagesLoading,
        coursePageUpdateLoading: initialState.coursePageUpdateLoading,
        coursePageInsertLoading: initialState.coursePageInsertLoading,
        coursePageDeleteLoading: initialState.coursePageDeleteLoading
      };

    case coursesActions.RESET_TEST_EDITOR:
      return {
        ...state,
        // RESET TESTS
        courseTests: initialState.courseTests,
        selectedCourseTest: initialState.selectedCourseTest,
        courseTestsLoading: initialState.courseTestsLoading,
        courseTestUpdateLoading: initialState.courseTestUpdateLoading,
        courseTestInsertLoading: initialState.courseTestInsertLoading,
        courseTestDeleteLoading: initialState.courseTestDeleteLoading,
        // RESET QUESTIONS
        courseTestQuestions: initialState.courseTestQuestions,
        selectedCourseTestQuestion: initialState.selectedCourseTestQuestion,
        courseTestQuestionsLoading: initialState.courseTestQuestionsLoading,
        courseTestQuestionUpdateLoading: initialState.courseTestQuestionUpdateLoading,
        courseTestQuestionInsertLoading: initialState.courseTestQuestionInsertLoading,
        courseTestQuestionDeleteLoading: initialState.courseTestQuestionDeleteLoading,
        // RESET ANSWERS
        courseTestAnswers: initialState.courseTestAnswers,
        selectedCourseTestAnswer: initialState.selectedCourseTestAnswer,
        courseTestAnswersLoading: initialState.courseTestAnswersLoading,
        courseTestAnswerUpdateLoading: initialState.courseTestAnswerUpdateLoading,
        courseTestAnswerInsertLoading: initialState.courseTestAnswerInsertLoading,
        courseTestAnswerDeleteLoading: initialState.courseTestAnswerDeleteLoading
      };

    case coursesActions.RESET_QUESTION_EDITOR:
      return {
        ...state,
        // RESET QUESTIONS
        courseTestQuestions: initialState.courseTestQuestions,
        selectedCourseTestQuestion: initialState.selectedCourseTestQuestion,
        courseTestQuestionsLoading: initialState.courseTestQuestionsLoading,
        courseTestQuestionUpdateLoading: initialState.courseTestQuestionUpdateLoading,
        courseTestQuestionInsertLoading: initialState.courseTestQuestionInsertLoading,
        courseTestQuestionDeleteLoading: initialState.courseTestQuestionDeleteLoading,
        // RESET ANSWERS
        courseTestAnswers: initialState.courseTestAnswers,
        selectedCourseTestAnswer: initialState.selectedCourseTestAnswer,
        courseTestAnswersLoading: initialState.courseTestAnswersLoading,
        courseTestAnswerUpdateLoading: initialState.courseTestAnswerUpdateLoading,
        courseTestAnswerInsertLoading: initialState.courseTestAnswerInsertLoading,
        courseTestAnswerDeleteLoading: initialState.courseTestAnswerDeleteLoading
      };

    case coursesActions.RESET_ANSWER_EDITOR:
      return {
        ...state,
        // RESET ANSWERS
        courseTestAnswers: initialState.courseTestAnswers,
        selectedCourseTestAnswer: initialState.selectedCourseTestAnswer,
        courseTestAnswersLoading: initialState.courseTestAnswersLoading,
        courseTestAnswerUpdateLoading: initialState.courseTestAnswerUpdateLoading,
        courseTestAnswerInsertLoading: initialState.courseTestAnswerInsertLoading,
        courseTestAnswerDeleteLoading: initialState.courseTestAnswerDeleteLoading
      };

    case coursesActions.RESET_COURSE_RESULT:
      return {
        ...state,
        // RESET COURSE RESULT
        courseResults: initialState.courseResults,
        courseResultsLoading: initialState.courseResultsLoading
      };

    case coursesActions.SET_ALL_COURSES:
      return {
        ...state,
        courses: action.payload.map((course) => courseConstants.formatConstantCourse(course))
      };

    case coursesActions.REQUEST_ALL_COURSES_LOADING:
      return {
        ...state,
        coursesLoading: action.loading
      };

    case coursesActions.SET_SELECTED_COURSE:
      return {
        ...state,
        selectedCourse: action.payload
      };

    case coursesActions.SET_ALL_COURSE_DIFFICULTIES:
      return {
        ...state,
        courseDifficulties: action.payload.map((courseDifficulty) => courseConstants.formatConstantCourseDifficulties(courseDifficulty))
      };

    case coursesActions.REQUEST_ALL_COURSE_DIFFICULTIES_LOADING:
      return {
        ...state,
        courseDifficultiesLoading: action.loading
      };

    case coursesActions.REQUEST_COURSE_UPDATE_LOADING:
      return {
        ...state,
        courseUpdateLoading: action.loading
      };

    case coursesActions.REQUEST_COURSE_INSERT_LOADING:
      return {
        ...state,
        courseInsertLoading: action.loading
      };

    case coursesActions.REQUEST_COURSE_DELETE_LOADING:
      return {
        ...state,
        courseDeleteLoading: action.loading
      };

    case coursesActions.SET_COURSE_CHANGE: {
      const courseExists = state.courses.some((course) => course.courseNo === action.payload.courseNo);

      const updatedCourses = courseExists
        ? state.courses.map((course) => (course.courseNo === action.payload.courseNo ? { ...action.payload } : { ...course }))
        : [...state.courses, { ...action.payload }];

      return {
        ...state,
        courses: updatedCourses,
        selectedCourse: action.payload?.courseNo
      };
    }

    case coursesActions.SET_ALL_COURSE_MODULES:
      return {
        ...state,
        courseModules: action.payload.map((courseModule) => courseConstants.formatConstantCourseModule(courseModule))
      };

    case coursesActions.REQUEST_ALL_COURSE_MODULES_LOADING:
      return {
        ...state,
        courseModulesLoading: action.loading
      };

    case coursesActions.SET_SELECTED_COURSE_MODULE:
      return {
        ...state,
        selectedCourseModule: action.payload
      };

    case coursesActions.REQUEST_COURSE_MODULE_UPDATE_LOADING:
      return {
        ...state,
        courseModuleUpdateLoading: action.loading
      };

    case coursesActions.REQUEST_COURSE_MODULE_INSERT_LOADING:
      return {
        ...state,
        courseModuleInsertLoading: action.loading
      };

    case coursesActions.REQUEST_COURSE_MODULE_DELETE_LOADING:
      return {
        ...state,
        courseModuleDeleteLoading: action.loading
      };

    case coursesActions.SET_COURSE_MODULE_CHANGE: {
      const courseModuleExists = state.courseModules.some((courseModule) => courseModule.courseModuleNo === action.payload.courseModuleNo);

      const updatedCourseModules = courseModuleExists
        ? state.courseModules.map((courseModule) =>
            courseModule.courseModuleNo === action.payload.courseModuleNo ? { ...action.payload } : { ...courseModule }
          )
        : [...state.courseModules, { ...action.payload }];

      return {
        ...state,
        courseModules: updatedCourseModules,
        selectedCourseModule: action.payload?.courseModuleNo
      };
    }

    case coursesActions.SET_SELECTED_COURSE_PAGE:
      return {
        ...state,
        selectedCoursePage: action.payload
      };

    case coursesActions.REQUEST_ALL_COURSE_PAGES_LOADING:
      return {
        ...state,
        coursePagesLoading: action.payload
      };

    case coursesActions.SET_ALL_COURSE_PAGES:
      return {
        ...state,
        coursePages: action.payload.map((coursePage) => courseConstants.formatConstantCoursePage(coursePage))
      };

    case coursesActions.REQUEST_COURSE_PAGE_UPDATE_LOADING:
      return {
        ...state,
        coursePageUpdateLoading: action.loading
      };

    case coursesActions.REQUEST_COURSE_PAGE_INSERT_LOADING:
      return {
        ...state,
        coursePageInsertLoading: action.loading
      };

    case coursesActions.REQUEST_COURSE_PAGE_DELETE_LOADING:
      return {
        ...state,
        coursePageDeleteLoading: action.loading
      };

    case coursesActions.SET_COURSE_PAGE_CHANGE: {
      const coursePageExists = state.coursePages.some((coursePage) => coursePage.coursePageNo === action.payload.coursePageNo);

      const updatedCoursePages = coursePageExists
        ? state.coursePages.map((coursePage) =>
            coursePage.coursePageNo === action.payload.coursePageNo ? { ...action.payload } : { ...coursePage }
          )
        : [...state.coursePages, { ...action.payload }];

      return {
        ...state,
        coursePages: updatedCoursePages,
        selectedCoursePage: action.payload?.coursePageNo
      };
    }

    case coursesActions.REQUEST_ALL_COURSE_TESTS_LOADING:
      return {
        ...state,
        courseTestsLoading: action.payload
      };

    case coursesActions.SET_ALL_COURSE_TESTS:
      return {
        ...state,
        courseTests: action.payload.map((courseTest) => courseConstants.formatConstantCourseTest(courseTest))
      };

    case coursesActions.SET_SELECTED_COURSE_TEST:
      return {
        ...state,
        selectedCourseTest: action.payload
      };

    case coursesActions.REQUEST_COURSE_TEST_UPDATE_LOADING:
      return {
        ...state,
        courseTestUpdateLoading: action.loading
      };

    case coursesActions.REQUEST_COURSE_TEST_INSERT_LOADING:
      return {
        ...state,
        courseTestInsertLoading: action.loading
      };

    case coursesActions.REQUEST_COURSE_TEST_DELETE_LOADING:
      return {
        ...state,
        courseTestDeleteLoading: action.loading
      };

    case coursesActions.SET_COURSE_TEST_CHANGE: {
      const courseTestExists = state.courseTests.some((courseTest) => courseTest.courseTestNo === action.payload.courseTestNo);

      const updatedCourseTests = courseTestExists
        ? state.courseTests.map((courseTest) =>
            courseTest.courseTestNo === action.payload.courseTestNo ? { ...action.payload } : { ...courseTest }
          )
        : [...state.courseTests, { ...action.payload }];

      return {
        ...state,
        courseTests: updatedCourseTests,
        selectedCourseTest: action.payload?.courseTestNo
      };
    }

    case coursesActions.REQUEST_ALL_COURSE_TEST_QUESTIONS_LOADING:
      return {
        ...state,
        courseTestQuestionsLoading: action.payload
      };

    case coursesActions.SET_ALL_COURSE_TEST_QUESTIONS:
      return {
        ...state,
        courseTestQuestions: action.payload.map((courseTestQuestion) =>
          courseConstants.formatConstantCourseTestQuestion(courseTestQuestion)
        )
      };

    case coursesActions.SET_SELECTED_COURSE_TEST_QUESTION:
      return {
        ...state,
        selectedCourseTestQuestion: action.payload
      };

    case coursesActions.REQUEST_COURSE_TEST_QUESTION_UPDATE_LOADING:
      return {
        ...state,
        courseTestQuestionUpdateLoading: action.loading
      };

    case coursesActions.REQUEST_COURSE_TEST_QUESTION_INSERT_LOADING:
      return {
        ...state,
        courseTestQuestionInsertLoading: action.loading
      };

    case coursesActions.REQUEST_COURSE_TEST_QUESTION_DELETE_LOADING:
      return {
        ...state,
        courseTestQuestionDeleteLoading: action.loading
      };

    case coursesActions.SET_COURSE_TEST_QUESTION_CHANGE: {
      const courseTestQuestionExists = state.courseTestQuestions.some(
        (courseTestQuestion) => courseTestQuestion.courseTestQuestionNo === action.payload.courseTestQuestionNo
      );

      const updatedCourseTestQuestions = courseTestQuestionExists
        ? state.courseTestQuestions.map((courseTestQuestion) =>
            courseTestQuestion.courseTestQuestionNo === action.payload.courseTestQuestionNo
              ? { ...action.payload }
              : { ...courseTestQuestion }
          )
        : [...state.courseTestQuestions, { ...action.payload }];

      return {
        ...state,
        courseTestQuestions: updatedCourseTestQuestions,
        selectedCourseTestQuestion: action.payload?.courseTestQuestionNo
      };
    }

    case coursesActions.REQUEST_ALL_COURSE_TEST_ANSWERS_LOADING:
      return {
        ...state,
        courseTestAnswersLoading: action.payload
      };

    case coursesActions.SET_ALL_COURSE_TEST_ANSWERS:
      return {
        ...state,
        courseTestAnswers: action.payload.map((courseTestAnswer) => courseConstants.formatConstantCourseTestAnswer(courseTestAnswer))
      };

    case coursesActions.SET_SELECTED_COURSE_TEST_ANSWER:
      return {
        ...state,
        selectedCourseTestAnswer: action.payload
      };

    case coursesActions.REQUEST_COURSE_TEST_ANSWER_UPDATE_LOADING:
      return {
        ...state,
        courseTestAnswerUpdateLoading: action.loading
      };

    case coursesActions.REQUEST_COURSE_TEST_ANSWER_INSERT_LOADING:
      return {
        ...state,
        courseTestAnswerInsertLoading: action.loading
      };

    case coursesActions.REQUEST_COURSE_TEST_ANSWER_DELETE_LOADING:
      return {
        ...state,
        courseTestAnswerDeleteLoading: action.loading
      };

    case coursesActions.SET_COURSE_TEST_ANSWER_CHANGE: {
      const courseTestAnswerExists = state.courseTestAnswers.some(
        (courseTestAnswer) => courseTestAnswer.courseTestAnswerNo === action.payload.courseTestAnswerNo
      );

      const updatedCourseTestAnswers = courseTestAnswerExists
        ? state.courseTestAnswers.map((courseTestAnswer) =>
            courseTestAnswer.courseTestAnswerNo === action.payload.courseTestAnswerNo ? { ...action.payload } : { ...courseTestAnswer }
          )
        : [...state.courseTestAnswers, { ...action.payload }];

      return {
        ...state,
        courseTestAnswers: updatedCourseTestAnswers,
        selectedCourseTestAnswer: action.payload?.courseTestAnswerNo
      };
    }

    case coursesActions.REQUEST_ALL_COURSE_RESULTS_LOADING:
      return {
        ...state,
        courseResultsLoading: action.loading
      };

    case coursesActions.SET_ALL_COURSE_RESULTS:
      return {
        ...state,
        courseResults: action.payload.map((courseResult) => courseConstants.formatConstantCourseResult(courseResult))
      };

    case coursesActions.REQUEST_COURSE_TEST_RESULT_INSERT_LOADING:
      return {
        ...state,
        courseTestResultInsertLoading: action.loading
      };

    case coursesActions.REQUEST_COURSE_TEST_RESULT_UPDATE_LOADING:
      return {
        ...state,
        courseTestResultUpdateLoading: action.loading
      };

    case coursesActions.REQUEST_COURSE_TEST_LOG_INSERT_LOADING:
      return {
        ...state,
        courseTestLogInsertLoading: action.loading
      };

    default:
      return state;
  }
};

export default coursesReducer;
