package za.co.ca.api.MyCourses.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import za.co.ca.api.MyCourses.payloads.responses.*;
import za.co.ca.api.common.models.Employee;
import za.co.ca.api.common.services.EmployeeService;
import za.co.ca.api.course.models.*;
import za.co.ca.api.course.services.*;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Hanno Seegers
 */
@Service
@RequiredArgsConstructor
public class MyCoursesService {

    private final CourseResultService courseResultService;
    private final CourseService courseService;
    private final CourseModuleService courseModuleService;
    private final CoursePageService coursePageService;
    private final CourseTestService courseTestService;
    private final CourseTestQuestionService courseTestQuestionService;
    private final CourseTestAnswerService courseTestAnswerService;
    private final CourseTestResultService courseTestResultService;
    private final CourseTestResultStatusService courseTestResultStatusService;
    private final CourseTestLogService courseTestLogService;
    private final EmployeeService employeeService;
    private final CourseStatusService courseStatusService;
    private final CourseResultStatusService courseResultStatusService;
    private final CourseDifficultyService courseDifficultyService;

    // MY COURSES
    public List<MyCoursesResponse> getMyCourses(Integer employeeNo) {
        List<CourseResult> courseResults = courseResultService.findByEmployeeNoOrderByCourseStatus(employeeNo);

        return buildMyCoursesResponse(courseResults);
    }

    public MyLearnCourseResponse getMyLearnCourse(String courseResultNo) {
        return buildMyLearnCourseResponse(courseResultNo);
    }

    // RESPONSE BUILDERS
    private List<MyCoursesResponse> buildMyCoursesResponse(List<CourseResult> courseResults) {
        List<MyCoursesResponse> myCoursesResponses = new ArrayList<MyCoursesResponse>();

        for (CourseResult courseResult : courseResults) {
            MyCoursesResponse myCoursesResponse = buildMyCourseResponse(courseResult);
            myCoursesResponses.add(myCoursesResponse);
        }

        return myCoursesResponses;
    }

    private MyCoursesResponse buildMyCourseResponse(CourseResult courseResult) {
        Course course = courseService.findByCourseNo(courseResult.getCourseNo());
        CourseDifficulty courseDifficulty = courseDifficultyService.findByCourseDifficultyNo(course.getCourseDifficultyNo());
        Employee employee = employeeService.findByEmployeeNo(courseResult.getEmployeeNo());
        CourseStatus courseStatus = courseStatusService.findByCourseStatusNo(courseResult.getCourseStatusNo());
        Employee assignedByEmployee = employeeService.findByEmployeeNo(courseResult.getCourseAssignedBy());

        Integer courseResultStatusNo = null;
        String CourseResultStatus = null;

        if (courseResult.getCourseResultStatusNo() != null) {
            CourseResultStatus courseResultStatus = courseResultStatusService.findByCourseResultStatusNo(courseResult.getCourseResultStatusNo());

            courseResultStatusNo = courseResultStatus.getCourseResultStatusNo();
            CourseResultStatus = courseResultStatus.getCourseResultStatus().name();
        }

        return MyCoursesResponse.builder()
                .courseResultNo(courseResult.getCourseResultNo())
                .courseNo(course.getCourseNo())
                .courseTitle(course.getCourseTitle())
                .courseDescription(course.getCourseDescription())
                .courseDuration(course.getCourseDuration())
                .courseDifficultyNo(courseDifficulty.getCourseDifficultyNo())
                .courseDifficulty(courseDifficulty.getCourseDifficulty().name())
                .employeeNo(employee.getEmployeeNo())
                .username(employee.getUsername())
                .courseStatusNo(courseStatus.getCourseStatusNo())
                .courseStatus(courseStatus.getCourseStatus().name())
                .courseStatusDescription(courseStatus.getCourseStatusDescription())
                .courseResultStatusNo(courseResultStatusNo)
                .courseResultStatus(CourseResultStatus)
                .courseAssignedBy(assignedByEmployee.getEmployeeNo())
                .courseAssignedUsername(assignedByEmployee.getUsername())
                .courseAssignedDate(courseResult.getCourseAssignedDate())
                .courseStartedDate(courseResult.getCourseStartedDate())
                .courseCompletedDate(courseResult.getCourseCompletedDate())
                .courseExpiryDate(courseResult.getCourseExpiryDate())
                .courseBreakoutStep(courseResult.getCourseBreakoutStep())
                .courseBreakoutStepDate(courseResult.getTouchDate())
                .active(courseResult.getActive())
                .build();
    }

    private MyLearnCourseResponse buildMyLearnCourseResponse(String courseResultNo) {
        CourseResult courseResult = courseResultService.findByCourseResultNo(courseResultNo);

        MyCourseResult myCourseResult = buildMyCourseResult(courseResult);
        MyCourse myCourse = buildMyCourse(courseResult);

        return MyLearnCourseResponse.builder()
                .myCourseResult(myCourseResult)
                .myCourse(myCourse)
                .build();
    }

    private MyCourseResult buildMyCourseResult(CourseResult courseResult) {
        CourseStatus courseStatus = courseStatusService.findByCourseStatusNo(courseResult.getCourseStatusNo());
        Employee assignedByEmployee = employeeService.findByEmployeeNo(courseResult.getCourseAssignedBy());

        Integer courseResultStatusNo = null;
        String CourseResultStatus = null;

        if (courseResult.getCourseResultStatusNo() != null) {
            CourseResultStatus courseResultStatus = courseResultStatusService.findByCourseResultStatusNo(courseResult.getCourseResultStatusNo());

            courseResultStatusNo = courseResultStatus.getCourseResultStatusNo();
            CourseResultStatus = courseResultStatus.getCourseResultStatus().name();
        }

        return MyCourseResult.builder()
                .courseResultNo(courseResult.getCourseResultNo())
                .courseStatusNo(courseStatus.getCourseStatusNo())
                .courseStatus(courseStatus.getCourseStatus().name())
                .courseStatusDescription(courseStatus.getCourseStatusDescription())
                .courseResultStatusNo(courseResultStatusNo)
                .courseResultStatus(CourseResultStatus)
                .courseAssignedBy(assignedByEmployee.getEmployeeNo())
                .courseAssignedByUsername(assignedByEmployee.getUsername())
                .courseAssignedDate(courseResult.getCourseAssignedDate())
                .courseStartedDate(courseResult.getCourseStartedDate())
                .courseCompletedDate(courseResult.getCourseCompletedDate())
                .courseExpiryDate(courseResult.getCourseExpiryDate())
                .courseBreakoutStep(courseResult.getCourseBreakoutStep())
                .courseBreakoutDate(courseResult.getTouchDate())
                .build();
    }

    private MyCourse buildMyCourse(CourseResult courseResult) {
        Course course = courseService.findByCourseNo(courseResult.getCourseNo());
        CourseDifficulty courseDifficulty = courseDifficultyService.findByCourseDifficultyNo(course.getCourseDifficultyNo());

        List<MyModule> myModules = buildMyModules(course.getCourseNo());
        List<MyTest> myTests = buildMyTests(courseResult.getCourseResultNo(), course.getCourseNo());

        return MyCourse.builder()
                .courseNo(course.getCourseNo())
                .courseTitle(course.getCourseTitle())
                .courseDescription(course.getCourseDescription())
                .courseDuration(course.getCourseDuration())
                .courseDifficultyNo(courseDifficulty.getCourseDifficultyNo())
                .courseDifficulty(courseDifficulty.getCourseDifficulty().name())
                .myModules(myModules)
                .myTests(myTests)
                .build();
    }

    private List<MyModule> buildMyModules(String courseNo) {
        List<CourseModule> courseModules = courseModuleService.findByCourseNo(courseNo);

        List<MyModule> myModules = new ArrayList<MyModule>();

        for (CourseModule courseModule : courseModules) {
            MyModule myModule = buildMyModule(courseModule);
            myModules.add(myModule);
        }

        return myModules;
    }

    private MyModule buildMyModule(CourseModule courseModule) {
        List<MyPage> myPages = buildMyPages(courseModule.getCourseModuleNo());

        return MyModule.builder()
                .courseModuleNo(courseModule.getCourseModuleNo())
                .moduleTitle(courseModule.getModuleTitle())
                .moduleDescription(courseModule.getModuleDescription())
                .moduleIndex(courseModule.getModuleIndex())
                .myPages(myPages)
                .build();
    }

    private List<MyPage> buildMyPages(String courseModuleNo) {
        List<CoursePage> coursePages = coursePageService.findByCourseModuleNo(courseModuleNo);

        List<MyPage> myPages = new ArrayList<MyPage>();

        for (CoursePage coursePage : coursePages) {
            MyPage myPage = buildMyPage(coursePage);
            myPages.add(myPage);
        }

        return myPages;
    }

    private MyPage buildMyPage(CoursePage coursePage) {
        return MyPage.builder()
                .coursePageNo(coursePage.getCoursePageNo())
                .pageTitle(coursePage.getPageTitle())
                .pageDescription(coursePage.getPageDescription())
                .pageIndex(coursePage.getPageIndex())
                .pageContent(coursePage.getPageContent())
                .build();
    }

    private List<MyTest> buildMyTests(String courseResultNo, String courseNo) {
        List<CourseTest> courseTests = courseTestService.findByCourseNo(courseNo);

        List<MyTest> myTests = new ArrayList<MyTest>();

        for (CourseTest courseTest : courseTests) {
            MyTest myTest = buildMyTest(courseResultNo, courseTest);
            myTests.add(myTest);
        }

        return myTests;
    }

    private MyTest buildMyTest(String courseResultNo, CourseTest courseTest) {
        CourseDifficulty courseDifficulty = courseDifficultyService.findByCourseDifficultyNo(courseTest.getCourseDifficultyNo());

        List<CourseTestResult> courseTestResults = courseTestResultService.findByCourseResultNoAndCourseTestNo(courseResultNo, courseTest.getCourseTestNo());

        List<MyQuestion> myQuestions = buildMyQuestions(courseTest.getCourseTestNo());
        MyCourseTestResult myCourseTestResult = buildMyCourseTestResult(courseResultNo, courseTest.getCourseTestNo());

        Integer remainingAttempts = courseTest.getRetries() - courseTestResults.size();

        return MyTest.builder()
                .courseTestNo(courseTest.getCourseTestNo())
                .testTitle(courseTest.getTestTitle())
                .courseDifficultyNo(courseDifficulty.getCourseDifficultyNo())
                .courseDifficulty(courseDifficulty.getCourseDifficulty().name())
                .testDuration(courseTest.getTestDuration())
                .testPassPercentage(courseTest.getTestPassPercentage())
                .retries(courseTest.getRetries())
                .remainingRetries(remainingAttempts)
                .myQuestions(myQuestions)
                .myCourseTestResult(myCourseTestResult)
                .build();
    }

    private List<MyQuestion> buildMyQuestions(String courseTestNo) {
        List<CourseTestQuestion> courseTestQuestions = courseTestQuestionService.findByCourseTestNo(courseTestNo);

        List<MyQuestion> myQuestions = new ArrayList<MyQuestion>();

        for (CourseTestQuestion courseTestQuestion : courseTestQuestions) {
            MyQuestion myQuestion = buildMyQuestion(courseTestQuestion);
            myQuestions.add(myQuestion);
        }

        return myQuestions;
    }

    private MyQuestion buildMyQuestion(CourseTestQuestion courseTestQuestion) {
        List<MyAnswer> myAnswers = buildMyAnswers(courseTestQuestion.getCourseTestQuestionNo());

        return MyQuestion.builder()
                .courseTestQuestionNo(courseTestQuestion.getCourseTestQuestionNo())
                .questionTitle(courseTestQuestion.getQuestionTitle())
                .questionIndex(courseTestQuestion.getQuestionIndex())
                .myAnswers(myAnswers)
                .build();
    }

    private List<MyAnswer> buildMyAnswers(String courseTestQuestionNo) {
        List<CourseTestAnswer> courseTestAnswers = courseTestAnswerService.findByCourseTestQuestionNo(courseTestQuestionNo);

        List<MyAnswer> myAnswers = new ArrayList<MyAnswer>();

        for (CourseTestAnswer courseTestAnswer : courseTestAnswers) {
            MyAnswer myAnswer = buildMyAnswer(courseTestAnswer);
            myAnswers.add(myAnswer);
        }

        return myAnswers;
    }

    private MyAnswer buildMyAnswer(CourseTestAnswer courseTestAnswer) {
        return MyAnswer.builder()
                .courseTestAnswerNo(courseTestAnswer.getCourseTestAnswerNo())
                .courseTestAnswer(courseTestAnswer.getTestAnswer())
                .courseTestIndex(courseTestAnswer.getCourseAnswerIndex())
                .build();
    }

    private MyCourseTestResult buildMyCourseTestResult(String courseResultNo, String courseTestNo) {
        List<CourseTestResult> courseTestResults = courseTestResultService.findByCourseResultNoAndCourseTestNo(courseResultNo, courseTestNo);

        MyCourseTestResult courseTestResult = new MyCourseTestResult();

        if (!courseTestResults.isEmpty()) {
            CourseTestResultStatus courseTestResultStatus = courseTestResultStatusService.findByCourseTestResultStatusNo(courseTestResults.get(0).getCourseTestResultStatusNo());

            List<MyTestLog> myTestLogs = buildMyTestLogs(courseTestResults.get(0).getCourseTestResultNo());

            courseTestResult.setCourseTestResultNo(courseTestResults.get(0).getCourseTestResultNo());
            courseTestResult.setCourseTestResultStatusNo(courseTestResultStatus.getCourseTestResultStatusNo());
            courseTestResult.setCourseTestResultStatus(courseTestResultStatus.getCourseTestResultStatus().name());
            courseTestResult.setCourseTestResultPercentage(courseTestResults.get(0).getCourseTestResultPercentage());
            courseTestResult.setMyTestLogs(myTestLogs);
        }

        return MyCourseTestResult.builder()
                .courseTestResultNo(courseTestResult.getCourseTestResultNo())
                .courseTestResultStatusNo(courseTestResult.getCourseTestResultStatusNo())
                .courseTestResultStatus(courseTestResult.getCourseTestResultStatus())
                .courseTestResultPercentage(courseTestResult.getCourseTestResultPercentage())
                .myTestLogs(courseTestResult.getMyTestLogs())
                .build();
    }

    private List<MyTestLog> buildMyTestLogs(String courseTestResultNo) {
        List<CourseTestLog> courseTestLogs = courseTestLogService.findByCourseTestResultNo(courseTestResultNo);

        List<MyTestLog> myTestLogs = new ArrayList<MyTestLog>();

        for(CourseTestLog courseTestLog : courseTestLogs) {
            MyTestLog myTestLog = buildMyTestLog(courseTestLog);
            myTestLogs.add(myTestLog);
        }

        return myTestLogs;
    }

    private MyTestLog buildMyTestLog(CourseTestLog courseTestLog) {
        return MyTestLog.builder()
                .courseTestLogNo(courseTestLog.getCourseTestLogNo())
                .courseTestQuestionNo(courseTestLog.getCourseTestQuestionNo())
                .courseTestAnswerNo(courseTestLog.getCourseTestAnswerNo())
                .build();
    }

}
