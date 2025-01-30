export const formatConstantCourse = (course) => ({
  courseNo: course.courseNo || null,
  courseTitle: course.courseTitle || null,
  courseDescription: course.courseDescription || null,
  courseDuration: course.courseDuration || null,
  courseDifficultyNo: course.courseDifficultyNo || null,
  courseDifficulty: course.courseDifficulty || null,
  courseDate: course.courseDate || null,
  active: course.active || null
});

export const formatConstantCourseDifficulties = (courseDifficulty) => ({
  courseDifficultyNo: courseDifficulty.courseDifficultyNo || null,
  courseDifficulty: courseDifficulty.courseDifficulty || null
});

export const formatConstantCourseModule = (courseModule) => ({
  courseModuleNo: courseModule.courseModuleNo || null,
  courseNo: courseModule.courseNo || null,
  moduleTitle: courseModule.moduleTitle || null,
  moduleDescription: courseModule.moduleDescription || null,
  moduleIndex: courseModule.moduleIndex,
  active: courseModule.active || null
});

export const formatConstantCoursePage = (coursePage) => ({
  coursePageNo: coursePage.coursePageNo || null,
  courseModuleNo: coursePage.courseModuleNo || null,
  pageTitle: coursePage.pageTitle || null,
  pageDescription: coursePage.pageDescription || null,
  pageContent: coursePage.pageContent || null,
  pageIndex: coursePage.pageIndex,
  active: coursePage.active || null
});

export const formatConstantCourseTest = (courseTest) => ({
  courseTestNo: courseTest.courseTestNo || null,
  courseNo: courseTest.courseNo || null,
  testTitle: courseTest.testTitle || null,
  courseDifficultyNo: courseTest.courseDifficultyNo || null,
  testDuration: courseTest.testDuration || null,
  testPassPercentage: courseTest.testPassPercentage,
  retries: courseTest.retries || null,
  active: courseTest.active || null
});

export const formatConstantCourseTestQuestion = (courseTestQuestion) => ({
  courseTestQuestionNo: courseTestQuestion.courseTestQuestionNo || null,
  courseTestNo: courseTestQuestion.courseTestNo || null,
  questionTitle: courseTestQuestion.questionTitle || null,
  questionIndex: courseTestQuestion.questionIndex || null,
  active: courseTestQuestion.active || null
});

export const formatConstantCourseTestAnswer = (courseTestAnswer) => ({
  courseTestAnswerNo: courseTestAnswer.courseTestAnswerNo || null,
  courseTestQuestionNo: courseTestAnswer.courseTestQuestionNo || null,
  testAnswer: courseTestAnswer.testAnswer || null,
  correctAnswer: courseTestAnswer.correctAnswer || null,
  courseAnswerIndex: courseTestAnswer.courseAnswerIndex || null,
  active: courseTestAnswer.active || null
});

export const formatConstantCourseResult = (courseResult) => ({
  courseResultNo: courseResult.courseResultNo || null,
  courseNo: courseResult.courseNo || null,
  courseTitle: courseResult.courseTitle || null,
  employeeNo: courseResult.employeeNo || null,
  username: courseResult.username || null,
  courseStatusNo: courseResult.courseStatusNo || null,
  courseStatus: courseResult.courseStatus || null,
  courseStatusDescription: courseResult.courseStatusDescription || null,
  courseResultStatusNo: courseResult.courseResultStatusNo || null,
  courseResultStatus: courseResult.courseResultStatus || null,
  courseAssignedBy: courseResult.courseAssignedBy || null,
  courseAssignedByUsername: courseResult.courseAssignedByUsername || null,
  courseAssignedDate: courseResult.courseAssignedDate || null,
  courseStartedDate: courseResult.courseStartedDate || null,
  courseCompletedDate: courseResult.courseCompletedDate || null,
  courseExpiryDate: courseResult.courseExpiryDate || null,
  courseBreakoutStep: courseResult.courseBreakoutStep || null,
  active: courseResult.active || null
});
