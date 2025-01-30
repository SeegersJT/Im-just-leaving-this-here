export const formatConstantMyCourses = (myCourse) => ({
  courseResultNo: myCourse.courseResultNo || null,
  courseNo: myCourse.courseNo || null,
  courseTitle: myCourse.courseTitle || null,
  courseDescription: myCourse.courseDescription || null,
  courseDuration: myCourse.courseDuration || null,
  courseDifficultyNo: myCourse.courseDifficultyNo || null,
  courseDifficulty: myCourse.courseDifficulty || null,
  employeeNo: myCourse.employeeNo || null,
  username: myCourse.username || null,
  courseStatusNo: myCourse.courseStatusNo || null,
  courseStatus: myCourse.courseStatus || null,
  courseStatusDescription: myCourse.courseStatusDescription || null,
  courseResultStatusNo: myCourse.courseResultStatusNo || null,
  courseResultStatus: myCourse.courseResultStatus || null,
  courseAssignedBy: myCourse.courseAssignedBy || null,
  courseAssignedUsername: myCourse.courseAssignedUsername || null,
  courseAssignedDate: myCourse.courseAssignedDate || null,
  courseStartedDate: myCourse.courseStartedDate || null,
  courseCompletedDate: myCourse.courseCompletedDate || null,
  courseExpiryDate: myCourse.courseExpiryDate || null,
  courseBreakoutStep: myCourse.courseBreakoutStep || null,
  courseBreakoutStepDate: myCourse.courseBreakoutStepDate || null,
  active: myCourse.active || null
});

export const formatConstantMyLearnCourse = (myLearnCourse) => ({
  myCourseResult: formatConstantMyCourseResult(myLearnCourse.myCourseResult),
  myCourse: formatConstantMyCourse(myLearnCourse.myCourse)
});

export const formatConstantMyCourseResult = (myCourseResult) => ({
  courseResultNo: myCourseResult.courseResultNo || null,
  courseStatusNo: myCourseResult.courseStatusNo || null,
  courseStatus: myCourseResult.courseStatus || null,
  courseStatusDescription: myCourseResult.courseStatusDescription || null,
  courseResultStatusNo: myCourseResult.courseResultStatusNo || null,
  courseResultStatus: myCourseResult.courseResultStatus || null,
  courseAssignedBy: myCourseResult.courseAssignedBy || null,
  courseAssignedByUsername: myCourseResult.courseAssignedByUsername || null,
  courseAssignedDate: myCourseResult.courseAssignedDate || null,
  courseStartedDate: myCourseResult.courseStartedDate || null,
  courseCompletedDate: myCourseResult.courseCompletedDate || null,
  courseExpiryDate: myCourseResult.courseExpiryDate || null,
  courseBreakoutStep: myCourseResult.courseBreakoutStep || null,
  courseBreakoutDate: myCourseResult.courseBreakoutDate || null
});

export const formatConstantMyCourse = (myCourse) => ({
  courseNo: myCourse.courseNo || null,
  courseTitle: myCourse.courseTitle || null,
  courseDescription: myCourse.courseDescription || null,
  courseDuration: myCourse.courseDuration || null,
  courseDifficultyNo: myCourse.courseDifficultyNo || null,
  courseDifficulty: myCourse.courseDifficulty || null,
  myModules: formatConstantMyModules(myCourse.myModules || []),
  myTests: formatConstantMyTests(myCourse.myTests || [])
});

export const formatConstantMyModules = (myModules) =>
  myModules.map((myModule) => ({
    courseModuleNo: myModule.courseModuleNo || null,
    moduleTitle: myModule.moduleTitle || null,
    moduleDescription: myModule.moduleDescription || null,
    moduleIndex: myModule.moduleIndex || null,
    myPages: formatConstantMyPages(myModule.myPages || [])
  }));

export const formatConstantMyPages = (myPages) =>
  myPages.map((myPage) => ({
    coursePageNo: myPage.coursePageNo || null,
    pageTitle: myPage.pageTitle || null,
    pageDescription: myPage.pageDescription || null,
    pageIndex: myPage.pageIndex || null,
    pageContent: myPage.pageContent || null
  }));

export const formatConstantMyTests = (myTests) =>
  myTests.map((myTest) => ({
    courseTestNo: myTest.courseTestNo || null,
    testTitle: myTest.testTitle || null,
    courseDifficultyNo: myTest.courseDifficultyNo || null,
    courseDifficulty: myTest.courseDifficulty || null,
    testDuration: myTest.testDuration || null,
    testPassPercentage: myTest.testPassPercentage || null,
    retries: myTest.retries || 0,
    remainingRetries: myTest.remainingRetries || 0,
    myQuestions: formatConstantMyQuestions(myTest.myQuestions || []),
    myCourseTestResult: formatConstantMyCourseTestResult(myTest.myCourseTestResult || null)
  }));

export const formatConstantMyQuestions = (myQuestions) =>
  myQuestions.map((myQuestion) => ({
    courseTestQuestionNo: myQuestion.courseTestQuestionNo || null,
    questionTitle: myQuestion.questionTitle || null,
    questionIndex: myQuestion.questionIndex || null,
    myAnswers: formatConstantMyAnswers(myQuestion.myAnswers || [])
  }));

export const formatConstantMyAnswers = (myAnswers) =>
  myAnswers.map((myAnswer) => ({
    courseTestAnswerNo: myAnswer.courseTestAnswerNo || null,
    courseTestAnswer: myAnswer.courseTestAnswer || null,
    courseTestIndex: myAnswer.courseTestIndex || null
  }));

export const formatConstantMyCourseTestResult = (myCourseTestResult) => ({
  courseTestResultNo: myCourseTestResult.courseTestResultNo || null,
  courseTestResultStatusNo: myCourseTestResult.courseTestResultStatusNo || null,
  courseTestResultStatus: myCourseTestResult.courseTestResultStatus || null,
  courseTestResultPercentage: myCourseTestResult.courseTestResultPercentage || 0,
  myTestLogs: formatConstantMyTestLogs(myCourseTestResult.myTestLogs || [])
});

export const formatConstantMyTestLogs = (myTestLogs) =>
  myTestLogs.map((myTestLog) => ({
    courseTestLogNo: myTestLog.courseTestLogNo || null,
    courseTestQuestionNo: myTestLog.courseTestQuestionNo || null,
    courseTestAnswerNo: myTestLog.courseTestAnswerNo || null
  }));
