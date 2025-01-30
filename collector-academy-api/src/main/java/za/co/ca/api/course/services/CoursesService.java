package za.co.ca.api.course.services;

import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import za.co.ca.api.authentication.models.AuthenticatedEmployee;
import za.co.ca.api.authentication.payloads.responses.GeneralAPIResponse;
import za.co.ca.api.authentication.services.AuthenticatedService;
import za.co.ca.api.common.exceptions.DataNotFoundException;
import za.co.ca.api.common.models.Employee;
import za.co.ca.api.common.services.EmployeeService;
import za.co.ca.api.course.enums.*;
import za.co.ca.api.course.models.*;
import za.co.ca.api.course.payloads.requests.*;
import za.co.ca.api.course.payloads.responses.*;
import za.co.ca.api.course.repositories.CourseDifficultyRepository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

/**
 * @author Hanno Seegers
 */
@Service
@RequiredArgsConstructor
public class CoursesService {

    private final CourseService courseService;
    private final CourseModuleService courseModuleService;
    private final CoursePageService coursePageService;
    private final CourseTestService courseTestService;
    private final CourseTestQuestionService courseTestQuestionService;
    private final CourseTestAnswerService courseTestAnswerService;
    private final CourseResultService courseResultService;
    private final CourseTestResultService courseTestResultService;
    private final CourseStatusService courseStatusService;
    private final CourseResultStatusService courseResultStatusService;
    private final CourseTestLogStatusService courseTestLogStatusService;
    private final CourseTestLogService courseTestLogService;
    private final CourseTestResultStatusService courseTestResultStatusService;
    private final CourseDifficultyService courseDifficultyService;
    private final EmployeeService employeeService;

    private final AuthenticatedService authenticatedService;

    // COURSES
    public CourseResponse getCourse(String courseNo) {
        Course course = courseService.findByCourseNo(courseNo);

        return buildCourseResponse(course);

    }

    public List<CourseResponse> getAllCourses() {
        List<Course> courses = courseService.findAll();

        return buildCoursesResponse(courses);

    }

    public List<CourseAssignResponse> getAllAssignedCourses(Integer employeeNo) {
        List<Course> courses = courseService.findByAssignedCourses(employeeNo);

        return buildCourseAssignsResponse(courses, employeeNo);
    }

    public List<CourseAssignResponse> getAllUnassignedCourses(Integer employeeNo) {
        List<Course> courses = courseService.findByUnassignedCourses(employeeNo);

        return buildCourseAssignsResponse(courses, employeeNo );
    }

    public CourseResponse insertCourse(CourseRequest courseRequest) {
        AuthenticatedEmployee authenticatedEmployee = authenticatedService.getAuthenticatedEmployeeDetails();

        Course course = Course.builder()
                .courseTitle(courseRequest.getCourseTitle())
                .courseDescription(courseRequest.getCourseDescription())
                .courseDuration(courseRequest.getCourseDuration())
                .courseDifficultyNo(courseRequest.getCourseDifficultyNo())
                .systemEmployeeNo(authenticatedEmployee.getEmployeeNo())
                .systemBranchNo(authenticatedEmployee.getBranchNo())
                .build();

        courseService.saveCourse(course);

        return buildCourseResponse(course);
    }

    public CourseResponse updateCourse(String courseNo, CourseRequest courseRequest) {
        AuthenticatedEmployee authenticatedEmployee = authenticatedService.getAuthenticatedEmployeeDetails();

        Course course = courseService.findByCourseNo(courseNo);

        course.setCourseTitle(courseRequest.getCourseTitle());
        course.setCourseDescription(courseRequest.getCourseDescription());
        course.setCourseDuration(courseRequest.getCourseDuration());
        course.setCourseDifficultyNo(courseRequest.getCourseDifficultyNo());
        course.setTouchEmployeeNo(authenticatedEmployee.getEmployeeNo());
        course.setTouchBranchNo(authenticatedEmployee.getBranchNo());

        courseService.saveCourse(course);

        return buildCourseResponse(course);
    }

    public GeneralAPIResponse deleteCourse(String courseNo) {
        AuthenticatedEmployee authenticatedEmployee = authenticatedService.getAuthenticatedEmployeeDetails();

        Course course = courseService.findByCourseNo(courseNo);

        deleteCourseModules(course.getCourseNo(), authenticatedEmployee);
        deleteCourseTests(course.getCourseNo(), authenticatedEmployee);
        deleteCourseResults(course.getCourseNo(), authenticatedEmployee);

        course.setActive(false);
        course.setTouchEmployeeNo(authenticatedEmployee.getEmployeeNo());
        course.setTouchBranchNo(authenticatedEmployee.getBranchNo());

        courseService.saveCourse(course);

        return buildGeneralAPIResponse("Successfully Deleted Course :: '" + course.getCourseTitle() + "'");
    }

    // MODULES
    public CourseModuleResponse getCourseModule(String courseModuleNo) {
        CourseModule courseModule = courseModuleService.findByCourseModuleNo(courseModuleNo);

        return buildCourseModuleResponse(courseModule);
    }

    public List<CourseModuleResponse> getAllCourseModules(String courseNo) {
        List<CourseModule> courseModules = courseModuleService.findByCourseNo(courseNo);

        return buildCourseModulesResponse(courseModules);
    }

    public CourseModuleResponse insertCourseModule(String courseNo, CourseModuleRequest courseModuleRequest) {
        AuthenticatedEmployee authenticatedEmployee = authenticatedService.getAuthenticatedEmployeeDetails();

        Course course = courseService.findByCourseNo(courseNo);

        CourseModule courseModule = CourseModule.builder()
                .courseNo(course.getCourseNo())
                .moduleTitle(courseModuleRequest.getModuleTitle())
                .moduleDescription(courseModuleRequest.getModuleDescription())
                .moduleIndex(courseModuleRequest.getModuleIndex())
                .systemEmployeeNo(authenticatedEmployee.getEmployeeNo())
                .systemBranchNo(authenticatedEmployee.getBranchNo())
                .build();

        courseModuleService.saveCourseModule(courseModule);

        return buildCourseModuleResponse(courseModule);
    }

    public CourseModuleResponse updateCourseModule(String courseModuleNo, CourseModuleRequest courseModuleRequest) {
        AuthenticatedEmployee authenticatedEmployee = authenticatedService.getAuthenticatedEmployeeDetails();

        CourseModule courseModule = courseModuleService.findByCourseModuleNo(courseModuleNo);

        courseModule.setModuleTitle(courseModuleRequest.getModuleTitle());
        courseModule.setModuleDescription(courseModuleRequest.getModuleDescription());
        courseModule.setModuleIndex(courseModuleRequest.getModuleIndex());
        courseModule.setTouchEmployeeNo(authenticatedEmployee.getEmployeeNo());
        courseModule.setTouchBranchNo(authenticatedEmployee.getBranchNo());

        courseModuleService.saveCourseModule(courseModule);

        return buildCourseModuleResponse(courseModule);
    }

    public GeneralAPIResponse deleteCourseModule(String courseModuleNo) {
        AuthenticatedEmployee authenticatedEmployee = authenticatedService.getAuthenticatedEmployeeDetails();

        CourseModule courseModule = courseModuleService.findByCourseModuleNo(courseModuleNo);

        deleteCoursePages(courseModule.getCourseModuleNo(), authenticatedEmployee);

        courseModule.setActive(false);
        courseModule.setTouchEmployeeNo(authenticatedEmployee.getEmployeeNo());
        courseModule.setTouchBranchNo(authenticatedEmployee.getBranchNo());

        courseModuleService.saveCourseModule(courseModule);

        return buildGeneralAPIResponse("Successfully Deleted Course Module :: '" + courseModule.getModuleTitle() + "'");
    }

    // PAGES
    public CoursePageResponse getCoursePage(String coursePageNo) {
        CoursePage coursePage = coursePageService.findByCoursePageNo(coursePageNo);

        return buildCoursePageResponse(coursePage);
    }

    public List<CoursePageResponse> getAllCoursePages(String courseModuleNo) {
        List<CoursePage> coursePages = coursePageService.findByCourseModuleNo(courseModuleNo);

        return buildCoursePagesResponse(coursePages);
    }

    public CoursePageResponse insertCoursePage(String courseModuleNo, CoursePageRequest coursePageRequest) {
        AuthenticatedEmployee authenticatedEmployee = authenticatedService.getAuthenticatedEmployeeDetails();

        CourseModule courseModule = courseModuleService.findByCourseModuleNo(courseModuleNo);

        CoursePage coursePage = CoursePage.builder()
                .courseModuleNo(courseModule.getCourseModuleNo())
                .pageTitle(coursePageRequest.getPageTitle())
                .pageDescription(coursePageRequest.getPageDescription())
                .pageContent(coursePageRequest.getPageContent())
                .pageIndex(coursePageRequest.getPageIndex())
                .systemEmployeeNo(authenticatedEmployee.getEmployeeNo())
                .systemBranchNo(authenticatedEmployee.getBranchNo())
                .build();

        coursePageService.saveCoursePage(coursePage);

        return buildCoursePageResponse(coursePage);
    }

    public CoursePageResponse updateCoursePage(String coursePageNo, CoursePageRequest coursePageRequest) {
        AuthenticatedEmployee authenticatedEmployee = authenticatedService.getAuthenticatedEmployeeDetails();

        CoursePage coursePage = coursePageService.findByCoursePageNo(coursePageNo);

        coursePage.setPageTitle(coursePageRequest.getPageTitle());
        coursePage.setPageDescription(coursePageRequest.getPageDescription());
        coursePage.setPageContent(coursePageRequest.getPageContent());
        coursePage.setPageIndex(coursePageRequest.getPageIndex());
        coursePage.setTouchEmployeeNo(authenticatedEmployee.getEmployeeNo());
        coursePage.setTouchBranchNo(authenticatedEmployee.getBranchNo());

        coursePageService.saveCoursePage(coursePage);

        return buildCoursePageResponse(coursePage);
    }

    public GeneralAPIResponse deleteCoursePage(String coursePageNo) {
        AuthenticatedEmployee authenticatedEmployee = authenticatedService.getAuthenticatedEmployeeDetails();

        CoursePage coursePage = coursePageService.findByCoursePageNo(coursePageNo);

        coursePage.setActive(false);
        coursePage.setTouchEmployeeNo(authenticatedEmployee.getEmployeeNo());
        coursePage.setTouchBranchNo(authenticatedEmployee.getBranchNo());

        coursePageService.saveCoursePage(coursePage);

        return buildGeneralAPIResponse("Successfully Deleted Course Page :: '" + coursePage.getPageTitle() + "'");
    }

    // TESTS
    public CourseTestResponse getCourseTest(String courseTestNo) {
        CourseTest courseTest = courseTestService.findByCourseTestNo(courseTestNo);

        return buildCourseTestResponse(courseTest);
    }

    public List<CourseTestResponse> getAllCourseTests(String courseNo) {
        List<CourseTest> courseTests = courseTestService.findByCourseNo(courseNo);

        return buildCourseTestsResponse(courseTests);

    }

    public CourseTestResponse insertCourseTest(String courseNo, CourseTestRequest courseTestRequest) {
        AuthenticatedEmployee authenticatedEmployee = authenticatedService.getAuthenticatedEmployeeDetails();

        Course course = courseService.findByCourseNo(courseNo);

        CourseTest courseTest = CourseTest.builder()
                .courseNo(course.getCourseNo())
                .testTitle(courseTestRequest.getTestTitle())
                .courseDifficultyNo(courseTestRequest.getCourseDifficultyNo())
                .testDuration(courseTestRequest.getTestDuration())
                .testPassPercentage(courseTestRequest.getTestPassPercentage())
                .retries(courseTestRequest.getRetries())
                .systemEmployeeNo(authenticatedEmployee.getEmployeeNo())
                .systemBranchNo(authenticatedEmployee.getBranchNo())
                .build();

        courseTestService.saveCourseTest(courseTest);

        return buildCourseTestResponse(courseTest);
    }

    public CourseTestResponse updateCourseTest(String courseTestNo, CourseTestRequest courseTestRequest) {
        AuthenticatedEmployee authenticatedEmployee = authenticatedService.getAuthenticatedEmployeeDetails();

        CourseTest courseTest = courseTestService.findByCourseTestNo(courseTestNo);

        courseTest.setTestTitle(courseTestRequest.getTestTitle());
        courseTest.setCourseDifficultyNo(courseTestRequest.getCourseDifficultyNo());
        courseTest.setTestDuration(courseTestRequest.getTestDuration());
        courseTest.setTestPassPercentage(courseTestRequest.getTestPassPercentage());
        courseTest.setRetries(courseTestRequest.getRetries());
        courseTest.setTouchEmployeeNo(authenticatedEmployee.getEmployeeNo());
        courseTest.setTouchBranchNo(authenticatedEmployee.getBranchNo());

        courseTestService.saveCourseTest(courseTest);

        return buildCourseTestResponse(courseTest);
    }

    public GeneralAPIResponse deleteCourseTest(String courseTestNo) {
        AuthenticatedEmployee authenticatedEmployee = authenticatedService.getAuthenticatedEmployeeDetails();

        CourseTest courseTest = courseTestService.findByCourseTestNo(courseTestNo);

        deleteCourseQuestions(courseTest.getCourseTestNo(), authenticatedEmployee);
        deleteCourseTestResultsByTestNo(courseTest.getCourseTestNo(), authenticatedEmployee);

        courseTest.setActive(false);
        courseTest.setTouchEmployeeNo(authenticatedEmployee.getEmployeeNo());
        courseTest.setTouchBranchNo(authenticatedEmployee.getBranchNo());

        courseTestService.saveCourseTest(courseTest);

        return buildGeneralAPIResponse("Successfully Deleted Course Test :: '" + courseTest.getTestTitle() + "'");
    }

    // TEST QUESTIONS
    public CourseTestQuestionResponse getCourseTestQuestion(String courseTestQuestionNo) {
        CourseTestQuestion courseTestQuestion = courseTestQuestionService.findByCourseTestQuestionNo(courseTestQuestionNo);

        return buildCourseTestQuestionResponse(courseTestQuestion);
    }

    public List<CourseTestQuestionResponse> getAllCourseTestQuestions(String courseTestNo) {
        List<CourseTestQuestion> courseTestQuestions = courseTestQuestionService.findByCourseTestNo(courseTestNo);

        return buildCourseTestQuestionsResponse(courseTestQuestions);

    }

    public CourseTestQuestionResponse insertCourseTestQuestion(String courseTestNo, CourseTestQuestionRequest courseTestQuestionRequest) {
        AuthenticatedEmployee authenticatedEmployee = authenticatedService.getAuthenticatedEmployeeDetails();

        CourseTest courseTest = courseTestService.findByCourseTestNo(courseTestNo);

        CourseTestQuestion courseTestQuestion = CourseTestQuestion.builder()
                .courseTestNo(courseTest.getCourseTestNo())
                .questionTitle(courseTestQuestionRequest.getQuestionTitle())
                .questionIndex(courseTestQuestionRequest.getQuestionIndex())
                .systemEmployeeNo(authenticatedEmployee.getEmployeeNo())
                .systemBranchNo(authenticatedEmployee.getBranchNo())
                .build();


        courseTestQuestionService.saveCourseTestQuestion(courseTestQuestion);

        return buildCourseTestQuestionResponse(courseTestQuestion);
    }

    public CourseTestQuestionResponse updateCourseTestQuestion(String courseTestQuestionNo, CourseTestQuestionRequest courseTestQuestionRequest) {
        AuthenticatedEmployee authenticatedEmployee = authenticatedService.getAuthenticatedEmployeeDetails();

        CourseTestQuestion courseTestQuestion = courseTestQuestionService.findByCourseTestQuestionNo(courseTestQuestionNo);

        courseTestQuestion.setQuestionTitle(courseTestQuestionRequest.getQuestionTitle());
        courseTestQuestion.setQuestionIndex(courseTestQuestionRequest.getQuestionIndex());
        courseTestQuestion.setTouchEmployeeNo(authenticatedEmployee.getEmployeeNo());
        courseTestQuestion.setTouchBranchNo(authenticatedEmployee.getBranchNo());

        courseTestQuestionService.saveCourseTestQuestion(courseTestQuestion);

        return buildCourseTestQuestionResponse(courseTestQuestion);
    }

    public GeneralAPIResponse deleteCourseTestQuestion(String courseTestQuestionNo) {
        AuthenticatedEmployee authenticatedEmployee = authenticatedService.getAuthenticatedEmployeeDetails();

        CourseTestQuestion courseTestQuestion = courseTestQuestionService.findByCourseTestQuestionNo(courseTestQuestionNo);

        deleteCourseTestAnswers(courseTestQuestion.getCourseTestQuestionNo(), authenticatedEmployee);

        courseTestQuestion.setActive(false);
        courseTestQuestion.setTouchEmployeeNo(authenticatedEmployee.getEmployeeNo());
        courseTestQuestion.setTouchBranchNo(authenticatedEmployee.getBranchNo());

        courseTestQuestionService.saveCourseTestQuestion(courseTestQuestion);

        return buildGeneralAPIResponse("Successfully Deleted Course Test Question :: '" + courseTestQuestion.getQuestionTitle() + "'");
    }

    // TEST ANSWERS
    public CourseTestAnswerResponse getCourseTestAnswer(String courseTestAnswerNo) {
        CourseTestAnswer courseTestAnswer = courseTestAnswerService.findByCourseTestAnswerNo(courseTestAnswerNo);

        return buildCourseTestAnswerResponse(courseTestAnswer);
    }

    public List<CourseTestAnswerResponse> getAllCourseTestAnswers(String courseTestQuestionNo) {
        List<CourseTestAnswer> courseTestAnswers = courseTestAnswerService.findByCourseTestQuestionNo(courseTestQuestionNo);

        return buildCourseTestAnswersResponse(courseTestAnswers);

    }

    public CourseTestAnswerResponse insertCourseTestAnswer(String courseTestQuestionNo, CourseTestAnswerRequest courseTestAnswerRequest) {
        AuthenticatedEmployee authenticatedEmployee = authenticatedService.getAuthenticatedEmployeeDetails();

        CourseTestQuestion courseTestQuestion = courseTestQuestionService.findByCourseTestQuestionNo(courseTestQuestionNo);

        CourseTestAnswer courseTestAnswer = CourseTestAnswer.builder()
                .courseTestQuestionNo(courseTestQuestion.getCourseTestQuestionNo())
                .testAnswer(courseTestAnswerRequest.getTestAnswer())
                .correctAnswer(courseTestAnswerRequest.getCorrectAnswer())
                .courseAnswerIndex(courseTestAnswerRequest.getCourseAnswerIndex())
                .systemEmployeeNo(authenticatedEmployee.getEmployeeNo())
                .systemBranchNo(authenticatedEmployee.getBranchNo())
                .build();

        courseTestAnswerService.saveCourseTestAnswer(courseTestAnswer);

        return buildCourseTestAnswerResponse(courseTestAnswer);
    }

    public CourseTestAnswerResponse updateCourseTestAnswer(String courseTestAnswerNo, CourseTestAnswerRequest courseTestAnswerRequest) {
        AuthenticatedEmployee authenticatedEmployee = authenticatedService.getAuthenticatedEmployeeDetails();

        CourseTestAnswer courseTestAnswer = courseTestAnswerService.findByCourseTestAnswerNo(courseTestAnswerNo);

        courseTestAnswer.setTestAnswer(courseTestAnswerRequest.getTestAnswer());
        courseTestAnswer.setCorrectAnswer(courseTestAnswerRequest.getCorrectAnswer());
        courseTestAnswer.setCourseAnswerIndex(courseTestAnswerRequest.getCourseAnswerIndex());
        courseTestAnswer.setTouchEmployeeNo(authenticatedEmployee.getEmployeeNo());
        courseTestAnswer.setTouchBranchNo(authenticatedEmployee.getBranchNo());

        courseTestAnswerService.saveCourseTestAnswer(courseTestAnswer);

        return buildCourseTestAnswerResponse(courseTestAnswer);
    }

    public GeneralAPIResponse deleteCourseTestAnswer(String courseTestAnswerNo) {
        AuthenticatedEmployee authenticatedEmployee = authenticatedService.getAuthenticatedEmployeeDetails();

        CourseTestAnswer courseTestAnswer = courseTestAnswerService.findByCourseTestAnswerNo(courseTestAnswerNo);

        courseTestAnswer.setActive(false);
        courseTestAnswer.setTouchEmployeeNo(authenticatedEmployee.getEmployeeNo());
        courseTestAnswer.setTouchBranchNo(authenticatedEmployee.getBranchNo());

        courseTestAnswerService.saveCourseTestAnswer(courseTestAnswer);

        return buildGeneralAPIResponse("Successfully Deleted Course Test Answer :: '" + courseTestAnswer.getTestAnswer() + "'");
    }

    // TEST RESULTS
    // TODO - GETTERS
    public CourseTestResultResponse insertCourseTestResult(String courseResultNo, String courseTestNo) {
        AuthenticatedEmployee authenticatedEmployee = authenticatedService.getAuthenticatedEmployeeDetails();

        CourseResult courseResult = courseResultService.findByCourseResultNo(courseResultNo);
        CourseTest courseTest = courseTestService.findByCourseTestNo(courseTestNo);
        CourseTestResultStatus courseTestResultStatus = courseTestResultStatusService.findByCourseTestResultStatus(CourseTestResultStatusEnum.PENDING);


        CourseTestResult courseTestResult = CourseTestResult.builder()
                .courseResultNo(courseResult.getCourseResultNo())
                .courseTestNo(courseTest.getCourseTestNo())
                .courseTestResultStatusNo(courseTestResultStatus.getCourseTestResultStatusNo())
                .systemEmployeeNo(authenticatedEmployee.getEmployeeNo())
                .systemBranchNo(authenticatedEmployee.getBranchNo())
                .build();

        courseTestResultService.saveCourseTestResult(courseTestResult);

        return buildCourseTestResultResponse(courseTestResult);
    }

    public CourseTestResultResponse updateCourseTestResult(String courseTestResultNo) {
        AuthenticatedEmployee authenticatedEmployee = authenticatedService.getAuthenticatedEmployeeDetails();

        CourseTestResult courseTestResult = courseTestResultService.findByCourseTestResultNo(courseTestResultNo);
        CourseResult courseResult = courseResultService.findByCourseResultNo(courseTestResult.getCourseResultNo());
        CourseTest courseTest = courseTestService.findByCourseTestNo(courseTestResult.getCourseTestNo());

        List<CourseTestQuestion> courseTestQuestions = courseTestQuestionService.findByCourseTestNo(courseTest.getCourseTestNo());
        List<CourseTestLog> courseTestLogs = courseTestLogService.findByCourseTestResultNo(courseTestResult.getCourseTestResultNo());
        List<CourseTestResult> courseTestResults = courseTestResultService.findByCourseResultNoAndCourseTestNo(courseResult.getCourseResultNo(), courseTest.getCourseTestNo());

        updateCourseTestResultStatus(courseTestResult, courseTestQuestions, courseTestLogs, courseTest, courseTestResults);

        courseTestResult.setTouchEmployeeNo(authenticatedEmployee.getEmployeeNo());
        courseTestResult.setTouchBranchNo(authenticatedEmployee.getBranchNo());

        courseTestResultService.saveCourseTestResult(courseTestResult);

        List<CourseTestResult> allCourseTestResults = courseTestResultService.findByCourseResultNo(courseResult.getCourseResultNo());
        List<CourseTest> courseTests = courseTestService.findByCourseNo(courseTest.getCourseNo());

        completeCourseIfEligible(courseResult, allCourseTestResults, courseTests, authenticatedEmployee);

        return buildCourseTestResultResponse(courseTestResult);
    }

    public GeneralAPIResponse deleteCourseTestResult(String courseTestResultNo) {
        AuthenticatedEmployee authenticatedEmployee = authenticatedService.getAuthenticatedEmployeeDetails();

        CourseTestResult courseTestResult = courseTestResultService.findByCourseTestResultNo(courseTestResultNo);

        courseTestResult.setActive(false);
        courseTestResult.setTouchEmployeeNo(authenticatedEmployee.getEmployeeNo());
        courseTestResult.setTouchBranchNo(authenticatedEmployee.getBranchNo());

        courseTestResultService.saveCourseTestResult(courseTestResult);

        return buildGeneralAPIResponse("Successfully Deleted Course Test Result :: Course Test Result No: '" + courseTestResult.getCourseTestResultNo() + "'");
    }

    // TEST LOG
    // TODO - GETTERS
    public CourseTestLogResponse insertCourseTestLog(CourseTestLogRequest courseTestLogRequest) {
        AuthenticatedEmployee authenticatedEmployee = authenticatedService.getAuthenticatedEmployeeDetails();

        CourseTestResult courseTestResult = courseTestResultService.findByCourseTestResultNo(courseTestLogRequest.getCourseTestResultNo());
        CourseTestQuestion courseTestQuestion = courseTestQuestionService.findByCourseTestQuestionNo(courseTestLogRequest.getCourseTestQuestionNo());
        CourseTestAnswer courseTestAnswer = courseTestAnswerService.findByCourseTestAnswerNo(courseTestLogRequest.getCourseTestAnswerNo());
        CourseTestLogStatusEnum courseTestLogStatusEnum = courseTestAnswer.getCorrectAnswer() != null && courseTestAnswer.getCorrectAnswer() ? CourseTestLogStatusEnum.CORRECT : CourseTestLogStatusEnum.INCORRECT;
        CourseTestLogStatus courseTestLogStatus = courseTestLogStatusService.findByCourseTestLogStatus(courseTestLogStatusEnum);

        List<CourseTestLog> courseTestLogs = courseTestLogService.findLogs(courseTestResult.getCourseTestResultNo(), courseTestQuestion.getCourseTestQuestionNo());

        CourseTestLog courseTestLog = new CourseTestLog();

        if (courseTestLogs.isEmpty()) {
            courseTestLog.setCourseTestResultNo(courseTestResult.getCourseTestResultNo());
            courseTestLog.setCourseTestQuestionNo(courseTestQuestion.getCourseTestQuestionNo());
            courseTestLog.setCourseTestAnswerNo(courseTestAnswer.getCourseTestAnswerNo());
            courseTestLog.setCourseTestLogStatusNo(courseTestLogStatus.getCourseTestLogStatusNo());
            courseTestLog.setSystemEmployeeNo(authenticatedEmployee.getEmployeeNo());
            courseTestLog.setSystemBranchNo(authenticatedEmployee.getBranchNo());
        } else {
            courseTestLog.setCourseTestLogNo(courseTestLogs.get(0).getCourseTestLogNo());
            courseTestLog.setCourseTestResultNo(courseTestLogs.get(0).getCourseTestResultNo());
            courseTestLog.setCourseTestQuestionNo(courseTestLogs.get(0).getCourseTestQuestionNo());
            courseTestLog.setCourseTestAnswerNo(courseTestAnswer.getCourseTestAnswerNo());
            courseTestLog.setCourseTestLogStatusNo(courseTestLogStatus.getCourseTestLogStatusNo());
            courseTestLog.setActive(courseTestLogs.get(0).getActive());
            courseTestLog.setTouchEmployeeNo(authenticatedEmployee.getEmployeeNo());
            courseTestLog.setTouchBranchNo(authenticatedEmployee.getBranchNo());
        }

        courseTestLogService.saveCourseTestLog(courseTestLog);

        return buildCourseTestLogResponse(courseTestLog);
    }

    public CourseTestLogResponse updateCourseTestLog(String courseTestLogNo, CourseTestLogRequest courseTestLogRequest) {
        AuthenticatedEmployee authenticatedEmployee = authenticatedService.getAuthenticatedEmployeeDetails();

        CourseTestLog courseTestLog = courseTestLogService.findByCourseTestLogNo(courseTestLogNo);

        CourseTestResult courseTestResult = courseTestResultService.findByCourseTestResultNo(courseTestLogRequest.getCourseTestResultNo());
        CourseTestQuestion courseTestQuestion = courseTestQuestionService.findByCourseTestQuestionNo(courseTestLogRequest.getCourseTestQuestionNo());
        CourseTestAnswer courseTestAnswer = courseTestAnswerService.findByCourseTestAnswerNo(courseTestLogRequest.getCourseTestAnswerNo());
        CourseTestLogStatusEnum courseTestLogStatusEnum = courseTestAnswer.getCorrectAnswer() != null && courseTestAnswer.getCorrectAnswer() ? CourseTestLogStatusEnum.CORRECT : CourseTestLogStatusEnum.INCORRECT;
        CourseTestLogStatus courseTestLogStatus = courseTestLogStatusService.findByCourseTestLogStatus(courseTestLogStatusEnum);

        courseTestLog.setCourseTestResultNo(courseTestResult.getCourseTestResultNo());
        courseTestLog.setCourseTestQuestionNo(courseTestQuestion.getCourseTestQuestionNo());
        courseTestLog.setCourseTestAnswerNo(courseTestAnswer.getCourseTestAnswerNo());
        courseTestLog.setCourseTestLogStatusNo(courseTestLogStatus.getCourseTestLogStatusNo());
        courseTestLog.setTouchEmployeeNo(authenticatedEmployee.getEmployeeNo());
        courseTestLog.setTouchBranchNo(authenticatedEmployee.getBranchNo());

        courseTestLogService.saveCourseTestLog(courseTestLog);

        return buildCourseTestLogResponse(courseTestLog);
    }

    public GeneralAPIResponse deleteCourseTestLog(String courseTestLogNo) {
        AuthenticatedEmployee authenticatedEmployee = authenticatedService.getAuthenticatedEmployeeDetails();

        CourseTestLog courseTestLog = courseTestLogService.findByCourseTestLogNo(courseTestLogNo);

        courseTestLog.setActive(false);
        courseTestLog.setTouchEmployeeNo(authenticatedEmployee.getEmployeeNo());
        courseTestLog.setTouchBranchNo(authenticatedEmployee.getBranchNo());

        courseTestLogService.saveCourseTestLog(courseTestLog);

        return buildGeneralAPIResponse("Successfully Deleted Course Test Log :: Course Test Log No: '" + courseTestLog.getCourseTestLogNo() + "'");
    }

    // COURSE RESULTS
    public CourseResultResponse getCourseResult(String courseResultNo) {
        CourseResult courseResult = courseResultService.findByCourseResultNo(courseResultNo);

        return buildCourseResultResponse(courseResult);
    }

    public List<CourseResultResponse> getAllCourseResults(Integer employeeNo) {
        List<CourseResult> courseResults = courseResultService.findByEmployeeNo(employeeNo);

        return buildCourseResultsResponse(courseResults);

    }

    public CourseResultResponse insertCourseResult(String courseNo, Integer employeeNo, CourseResultRequest courseResultRequest) {
        AuthenticatedEmployee authenticatedEmployee = authenticatedService.getAuthenticatedEmployeeDetails();

        Boolean hasDuplicateCourseResult = courseResultService.hasDuplicateCourseResult(courseNo, employeeNo);

        if (hasDuplicateCourseResult) {
            throw new DataIntegrityViolationException("Course has already been assigned to employee");
        }

        Course course = courseService.findByCourseNo(courseNo);
        CourseStatus courseStatus = courseStatusService.findByCourseStatus(CourseStatusEnum.NOT_STARTED);

        CourseResult courseResult = CourseResult.builder()
                .courseNo(course.getCourseNo())
                .employeeNo(employeeNo)
                .courseStatusNo(courseStatus.getCourseStatusNo())
                .courseAssignedBy(authenticatedEmployee.getEmployeeNo())
                .courseAssignedDate(new Date())
                .courseExpiryDate(courseResultRequest.getCourseExpiryDate())
                .courseBreakoutStep(CourseBreakoutStepEnum.NOT_STARTED.getBreakoutStep())
                .systemEmployeeNo(authenticatedEmployee.getEmployeeNo())
                .systemBranchNo(authenticatedEmployee.getBranchNo())
                .build();

        courseResultService.saveCourseResult(courseResult);

        return buildCourseResultResponse(courseResult);
    }

    public CourseResultResponse updateCourseResult(String courseResultNo, CourseResultRequest courseResultRequest) {
        AuthenticatedEmployee authenticatedEmployee = authenticatedService.getAuthenticatedEmployeeDetails();

        CourseResult courseResult = courseResultService.findByCourseResultNo(courseResultNo);

        String breakoutStep = getBreakoutStep(courseResultRequest);

        courseResult.setCourseStatusNo(courseResultRequest.getCourseStatusNo());
        courseResult.setCourseResultStatusNo(courseResultRequest.getCourseResultStatusNo());
        courseResult.setCourseAssignedBy(courseResultRequest.getCourseAssignedBy());
        courseResult.setCourseAssignedDate(courseResultRequest.getCourseAssignedDate());
        courseResult.setCourseStartedDate(courseResultRequest.getCourseStartedDate());
        courseResult.setCourseCompletedDate(courseResultRequest.getCourseCompletedDate());
        courseResult.setCourseExpiryDate(courseResultRequest.getCourseExpiryDate());
        courseResult.setCourseBreakoutStep(breakoutStep);
        courseResult.setTouchEmployeeNo(authenticatedEmployee.getEmployeeNo());
        courseResult.setTouchBranchNo(authenticatedEmployee.getBranchNo());

        courseResultService.saveCourseResult(courseResult);

        return buildCourseResultResponse(courseResult);
    }

    public GeneralAPIResponse deleteCourseResult(String courseResultNo) {
        AuthenticatedEmployee authenticatedEmployee = authenticatedService.getAuthenticatedEmployeeDetails();

        CourseResult courseResult = courseResultService.findByCourseResultNo(courseResultNo);

        deleteCourseTestResultsByResultNo(courseResult.getCourseResultNo(), authenticatedEmployee);

        courseResult.setActive(false);
        courseResult.setTouchEmployeeNo(authenticatedEmployee.getEmployeeNo());
        courseResult.setTouchBranchNo(authenticatedEmployee.getBranchNo());

        courseResultService.saveCourseResult(courseResult);

        return buildGeneralAPIResponse("Successfully Deleted Course Result :: '" + courseResult.getCourseResultNo() + "'");
    }

    // COURSE DIFFICULTY
    public CourseDifficultyResponse getCourseDifficulty(Integer courseDifficultyNO) {
        CourseDifficulty courseDifficulty = courseDifficultyService.findByCourseDifficultyNo(courseDifficultyNO);

        return buildCourseDifficultyResponse(courseDifficulty);
    }

    public List<CourseDifficultyResponse> getAllCourseDifficulties() {
        List<CourseDifficulty> courseDifficulties = courseDifficultyService.findAll();

        return buildCourseDifficultiesResponse(courseDifficulties);
    }
    // TODO - INSERT
    // TODO - UPDATE
    // TODO - DELETE

    // RESPONSE BUILDERS
    private CourseResponse buildCourseResponse(Course course) {
        CourseDifficulty courseDifficulty = courseDifficultyService.findByCourseDifficultyNo(course.getCourseDifficultyNo());


        return CourseResponse.builder()
                .courseNo(course.getCourseNo())
                .courseTitle(course.getCourseTitle())
                .courseDescription(course.getCourseDescription())
                .courseDuration(course.getCourseDuration())
                .courseDifficultyNo(courseDifficulty.getCourseDifficultyNo())
                .courseDifficulty(courseDifficulty.getCourseDifficulty().name())
                .courseDate(course.getSystemDate())
                .active(course.getActive())
                .build();
    }

    private List<CourseResponse> buildCoursesResponse(List<Course> courses) {
        List<CourseResponse> courseResponses = new ArrayList<CourseResponse>();

        for (Course course : courses) {
            CourseResponse courseResponse = buildCourseResponse(course);
            courseResponses.add(courseResponse);
        }

        return courseResponses;
    }

    private List<CourseAssignResponse> buildCourseAssignsResponse(List<Course> courses, Integer employeeNo) {
        List<CourseAssignResponse> courseAssignResponses = new ArrayList<CourseAssignResponse>();

        for (Course course : courses) {
            CourseDifficulty courseDifficulty = courseDifficultyService.findByCourseDifficultyNo(course.getCourseDifficultyNo());
            List<CourseResult> courseResults = courseResultService.findByCourseNoAndEmployeeNo(course.getCourseNo(), employeeNo);

            String courseResultNo = null;

            if (!courseResults.isEmpty()) {
                courseResultNo = courseResults.get(0).getCourseResultNo();
            }

            CourseAssignResponse courseAssignResponse = CourseAssignResponse.builder()
                    .courseResultNo(courseResultNo)
                    .courseNo(course.getCourseNo())
                    .courseTitle(course.getCourseTitle())
                    .courseDescription(course.getCourseDescription())
                    .courseDuration(course.getCourseDuration())
                    .courseDifficultyNo(courseDifficulty.getCourseDifficultyNo())
                    .courseDifficulty(courseDifficulty.getCourseDifficulty().name())
                    .courseDate(course.getSystemDate())
                    .active(course.getActive())
                    .build();

            courseAssignResponses.add(courseAssignResponse);
        }

        return courseAssignResponses;
    }

    private CourseModuleResponse buildCourseModuleResponse(CourseModule courseModule) {
        return CourseModuleResponse.builder()
                .courseModuleNo(courseModule.getCourseModuleNo())
                .courseNo(courseModule.getCourseNo())
                .moduleTitle(courseModule.getModuleTitle())
                .moduleDescription(courseModule.getModuleDescription())
                .moduleIndex(courseModule.getModuleIndex())
                .active(courseModule.getActive())
                .build();
    }

    private List<CourseModuleResponse> buildCourseModulesResponse(List<CourseModule> courseModules) {

        List<CourseModuleResponse> courseModuleResponses = new ArrayList<CourseModuleResponse>();

        for (CourseModule courseModule : courseModules) {
            CourseModuleResponse courseModuleResponse = buildCourseModuleResponse(courseModule);
            courseModuleResponses.add(courseModuleResponse);
        }

        return courseModuleResponses;
    }

    private CoursePageResponse buildCoursePageResponse(CoursePage coursePage) {
        return CoursePageResponse.builder()
                .coursePageNo(coursePage.getCoursePageNo())
                .courseModuleNo(coursePage.getCourseModuleNo())
                .pageTitle(coursePage.getPageTitle())
                .pageDescription(coursePage.getPageDescription())
                .pageContent(coursePage.getPageContent())
                .pageIndex(coursePage.getPageIndex())
                .active(coursePage.getActive())
                .build();
    }

    private List<CoursePageResponse> buildCoursePagesResponse(List<CoursePage> coursePages) {

        List<CoursePageResponse> coursePageResponses = new ArrayList<CoursePageResponse>();

        for (CoursePage coursePage : coursePages) {
            CoursePageResponse coursePageResponse = buildCoursePageResponse(coursePage);
            coursePageResponses.add(coursePageResponse);
        }

        return coursePageResponses;
    }

    private CourseTestResponse buildCourseTestResponse(CourseTest courseTest) {
        return CourseTestResponse.builder()
                .courseTestNo(courseTest.getCourseTestNo())
                .courseNo(courseTest.getCourseNo())
                .testTitle(courseTest.getTestTitle())
                .courseDifficultyNo(courseTest.getCourseDifficultyNo())
                .testDuration(courseTest.getTestDuration())
                .testPassPercentage(courseTest.getTestPassPercentage())
                .retries(courseTest.getRetries())
                .active(courseTest.getActive())
                .build();
    }

    private List<CourseTestResponse> buildCourseTestsResponse(List<CourseTest> courseTests) {

        List<CourseTestResponse> courseTestResponses = new ArrayList<CourseTestResponse>();

        for (CourseTest courseTest : courseTests) {
            CourseTestResponse courseTestResponse = buildCourseTestResponse(courseTest);
            courseTestResponses.add(courseTestResponse);
        }

        return courseTestResponses;
    }

    private CourseTestQuestionResponse buildCourseTestQuestionResponse(CourseTestQuestion courseTestQuestion) {
        return CourseTestQuestionResponse.builder()
                .courseTestQuestionNo(courseTestQuestion.getCourseTestQuestionNo())
                .courseTestNo(courseTestQuestion.getCourseTestNo())
                .questionTitle(courseTestQuestion.getQuestionTitle())
                .questionIndex(courseTestQuestion.getQuestionIndex())
                .active(courseTestQuestion.getActive())
                .build();
    }

    private List<CourseTestQuestionResponse> buildCourseTestQuestionsResponse(List<CourseTestQuestion> courseTestQuestions) {

        List<CourseTestQuestionResponse> courseTestQuestionResponses = new ArrayList<CourseTestQuestionResponse>();

        for (CourseTestQuestion courseTestQuestion : courseTestQuestions) {
            CourseTestQuestionResponse courseTestQuestionResponse = buildCourseTestQuestionResponse(courseTestQuestion);
            courseTestQuestionResponses.add(courseTestQuestionResponse);
        }

        return courseTestQuestionResponses;
    }

    private CourseTestAnswerResponse buildCourseTestAnswerResponse(CourseTestAnswer courseTestAnswer) {
        return CourseTestAnswerResponse.builder()
                .courseTestAnswerNo(courseTestAnswer.getCourseTestAnswerNo())
                .courseTestQuestionNo(courseTestAnswer.getCourseTestQuestionNo())
                .testAnswer(courseTestAnswer.getTestAnswer())
                .correctAnswer(courseTestAnswer.getCorrectAnswer())
                .courseAnswerIndex(courseTestAnswer.getCourseAnswerIndex())
                .active(courseTestAnswer.getActive())
                .build();
    }

    private List<CourseTestAnswerResponse> buildCourseTestAnswersResponse(List<CourseTestAnswer> courseTestAnswers) {

        List<CourseTestAnswerResponse> courseTestAnswerResponses = new ArrayList<CourseTestAnswerResponse>();

        for (CourseTestAnswer courseTestAnswer : courseTestAnswers) {
            CourseTestAnswerResponse courseTestAnswerResponse = buildCourseTestAnswerResponse(courseTestAnswer);
            courseTestAnswerResponses.add(courseTestAnswerResponse);
        }

        return courseTestAnswerResponses;
    }

    private CourseResultResponse buildCourseResultResponse(CourseResult courseResult) {

        Course course = courseService.findByCourseNo(courseResult.getCourseNo());
        Employee employee = employeeService.findByEmployeeNo(courseResult.getEmployeeNo());
        CourseStatus courseStatus = courseStatusService.findByCourseStatusNo(courseResult.getCourseStatusNo());

        Integer courseResultStatusNo = null;
        String CourseResultStatus = null;

        if (courseResult.getCourseResultStatusNo() != null) {
            CourseResultStatus courseResultStatus = courseResultStatusService.findByCourseResultStatusNo(courseResult.getCourseResultStatusNo());

            courseResultStatusNo = courseResultStatus.getCourseResultStatusNo();
            CourseResultStatus = courseResultStatus.getCourseResultStatus().name();
        }

        Employee assignedByEmployee = employeeService.findByEmployeeNo(courseResult.getCourseAssignedBy());

        return CourseResultResponse.builder()
                .courseResultNo(courseResult.getCourseResultNo())
                .courseNo(course.getCourseNo())
                .courseTitle(course.getCourseTitle())
                .employeeNo(employee.getEmployeeNo())
                .username(employee.getUsername())
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
                .touchDate(courseResult.getTouchDate())
                .active(courseResult.getActive())
                .build();
    }

    private List<CourseResultResponse> buildCourseResultsResponse(List<CourseResult> courseResults) {

        List<CourseResultResponse> courseResultResponses = new ArrayList<CourseResultResponse>();

        for (CourseResult courseResult : courseResults) {
            CourseResultResponse courseResultResponse = buildCourseResultResponse(courseResult);
            courseResultResponses.add(courseResultResponse);
        }

        return courseResultResponses;
    }

    private CourseTestResultResponse buildCourseTestResultResponse(CourseTestResult courseTestResult) {
        CourseTestResultStatus courseTestResultStatus = courseTestResultStatusService.findByCourseTestResultStatusNo(courseTestResult.getCourseTestResultStatusNo());

        return CourseTestResultResponse.builder()
                .courseTestResultNo(courseTestResult.getCourseTestResultNo())
                .courseResultNo(courseTestResult.getCourseResultNo())
                .courseTestNo(courseTestResult.getCourseTestNo())
                .courseTestResultStatusNo(courseTestResultStatus.getCourseTestResultStatusNo())
                .courseTestResultStatus(courseTestResultStatus.getCourseTestResultStatus().name())
                .courseTestResultPercentage(courseTestResult.getCourseTestResultPercentage())
                .active(courseTestResult.getActive())
                .build();
    }

    private CourseTestLogResponse buildCourseTestLogResponse(CourseTestLog courseTestLog) {
        return CourseTestLogResponse.builder()
                .courseTestLogNo(courseTestLog.getCourseTestLogNo())
                .courseTestResultNo(courseTestLog.getCourseTestResultNo())
                .courseTestQuestionNo(courseTestLog.getCourseTestQuestionNo())
                .courseTestAnswerNo(courseTestLog.getCourseTestAnswerNo())
                .active(courseTestLog.getActive())
                .build();
    }

    private CourseDifficultyResponse buildCourseDifficultyResponse(CourseDifficulty courseDifficulty) {
        return CourseDifficultyResponse.builder()
                .courseDifficultyNo(courseDifficulty.getCourseDifficultyNo())
                .courseDifficulty(courseDifficulty.getCourseDifficulty().name())
                .build();
    }

    private List<CourseDifficultyResponse> buildCourseDifficultiesResponse(List<CourseDifficulty> courseDifficulties) {
        List<CourseDifficultyResponse> courseDifficultyResponses = new ArrayList<CourseDifficultyResponse>();

        for (CourseDifficulty courseDifficulty : courseDifficulties) {
            CourseDifficultyResponse courseDifficultyResponse = buildCourseDifficultyResponse(courseDifficulty);
            courseDifficultyResponses.add(courseDifficultyResponse);
        }

        return courseDifficultyResponses;
    }

    private GeneralAPIResponse buildGeneralAPIResponse(String message) {
        return GeneralAPIResponse.builder()
                .message(message)
                .build();
    }

    // INTEGRATED DELETE FUNCTIONS
    private void deleteCourseModules(String courseNo, AuthenticatedEmployee authenticatedEmployee) {
        List<CourseModule> courseModules = courseModuleService.findByCourseNo(courseNo);

        for (CourseModule courseModule : courseModules) {
            deleteCoursePages(courseModule.getCourseModuleNo(), authenticatedEmployee);

            courseModule.setActive(false);
            courseModule.setTouchEmployeeNo(authenticatedEmployee.getEmployeeNo());
            courseModule.setTouchBranchNo(authenticatedEmployee.getBranchNo());
        }

        courseModuleService.saveCourseModules(courseModules);
    }

    private void deleteCoursePages(String courseModuleNo, AuthenticatedEmployee authenticatedEmployee) {
        List<CoursePage> coursePages = coursePageService.findByCourseModuleNo(courseModuleNo);

        for (CoursePage coursePage : coursePages) {
            coursePage.setActive(false);
            coursePage.setTouchEmployeeNo(authenticatedEmployee.getEmployeeNo());
            coursePage.setTouchBranchNo(authenticatedEmployee.getBranchNo());
        }

        coursePageService.saveCoursePages(coursePages);
    }

    private void deleteCourseTests(String courseNo, AuthenticatedEmployee authenticatedEmployee) {
        List<CourseTest> courseTests = courseTestService.findByCourseNo(courseNo);

        for (CourseTest courseTest : courseTests) {
            deleteCourseQuestions(courseTest.getCourseTestNo(), authenticatedEmployee);
            deleteCourseTestResultsByTestNo(courseTest.getCourseTestNo(), authenticatedEmployee);

            courseTest.setActive(false);
            courseTest.setTouchEmployeeNo(authenticatedEmployee.getEmployeeNo());
            courseTest.setTouchBranchNo(authenticatedEmployee.getBranchNo());
        }

        courseTestService.saveCourseTests(courseTests);
    }

    private void deleteCourseQuestions(String courseTestNo, AuthenticatedEmployee authenticatedEmployee) {
        List<CourseTestQuestion> courseTestQuestions = courseTestQuestionService.findByCourseTestNo(courseTestNo);

        for (CourseTestQuestion courseTestQuestion : courseTestQuestions) {
            deleteCourseTestAnswers(courseTestQuestion.getCourseTestQuestionNo(), authenticatedEmployee);

            courseTestQuestion.setActive(false);
            courseTestQuestion.setTouchEmployeeNo(authenticatedEmployee.getEmployeeNo());
            courseTestQuestion.setTouchBranchNo(authenticatedEmployee.getBranchNo());
        }

        courseTestQuestionService.saveCourseTestQuestions(courseTestQuestions);
    }

    private void deleteCourseTestAnswers(String courseTestQuestionNo, AuthenticatedEmployee authenticatedEmployee) {
        List<CourseTestAnswer> courseTestAnswers = courseTestAnswerService.findByCourseTestQuestionNo(courseTestQuestionNo);

        for (CourseTestAnswer courseTestAnswer : courseTestAnswers) {
            courseTestAnswer.setActive(false);
            courseTestAnswer.setTouchEmployeeNo(authenticatedEmployee.getEmployeeNo());
            courseTestAnswer.setTouchBranchNo(authenticatedEmployee.getBranchNo());
        }

        courseTestAnswerService.saveCourseTestAnswers(courseTestAnswers);
    }

    private void deleteCourseResults(String courseNo, AuthenticatedEmployee authenticatedEmployee) {
        List<CourseResult> courseResults = courseResultService.findByCourseNo(courseNo);

        for (CourseResult courseResult : courseResults) {
            courseResult.setActive(false);
            courseResult.setTouchEmployeeNo(authenticatedEmployee.getEmployeeNo());
            courseResult.setTouchBranchNo(authenticatedEmployee.getBranchNo());
        }

        courseResultService.saveCourseResults(courseResults);
    }

    private void deleteCourseTestResultsByTestNo(String courseTestNo, AuthenticatedEmployee authenticatedEmployee) {
        List<CourseTestResult> courseTestResults = courseTestResultService.findByCourseTestNo(courseTestNo);
        deleteCourseTestResults(courseTestResults, authenticatedEmployee);
    }

    private void deleteCourseTestResultsByResultNo(String courseResultNo, AuthenticatedEmployee authenticatedEmployee) {
        List<CourseTestResult> courseTestResults = courseTestResultService.findByCourseResultNo(courseResultNo);
        deleteCourseTestResults(courseTestResults, authenticatedEmployee);
    }

    private void deleteCourseTestResults(List<CourseTestResult> courseTestResults, AuthenticatedEmployee authenticatedEmployee) {
        for (CourseTestResult courseTestResult : courseTestResults) {
            courseTestResult.setActive(false);
            courseTestResult.setTouchEmployeeNo(authenticatedEmployee.getEmployeeNo());
            courseTestResult.setTouchBranchNo(authenticatedEmployee.getBranchNo());
        }

        courseTestResultService.saveCourseTestResults(courseTestResults);
    }

    // GET BREAKOUT STEP
    private String getBreakoutStep(CourseResultRequest courseResultRequest) {
        try {
            Integer courseStatusNo = courseResultRequest.getCourseStatusNo();
            Integer courseResultStatusNo = courseResultRequest.getCourseResultStatusNo();

            if (courseStatusNo == null || courseStatusNo.equals(1)) {
                return CourseBreakoutStepEnum.NOT_STARTED.getBreakoutStep();
            } else {
                CourseStatus courseStatus = courseStatusService.findByCourseStatusNo(courseStatusNo);

                return switch (courseStatus.getCourseStatus()) {
                    case STARTED -> CourseBreakoutStepEnum.STARTED.getBreakoutStep();
                    case COMPLETED -> getCompletedBreakoutStep(courseResultStatusNo);
                    default -> "Unknown course status";
                };
            }
        } catch (Exception exception) {
            return "Something went wrong";
        }
    }

    private String getCompletedBreakoutStep(Integer courseResultStatusNo) {
        if (courseResultStatusNo == null) {
            return "Course completed without a result status";
        }

        CourseResultStatus courseResultStatus = courseResultStatusService.findByCourseResultStatusNo(courseResultStatusNo);
        return switch (courseResultStatus.getCourseResultStatus()) {
            case PASSED -> CourseBreakoutStepEnum.COMPLETED_PASSED.getBreakoutStep();
            case FAILED -> CourseBreakoutStepEnum.COMPLETED_FAILED.getBreakoutStep();
            default -> "Unknown result status";
        };
    }

    // CALCULATE TEST RESULT
    private int calculateScore(List<CourseTestQuestion> questions, List<CourseTestLog> logs) {
        int score = 0;
        for (CourseTestQuestion question : questions) {
            for (CourseTestLog log : logs) {
                if (log.getCourseTestQuestionNo().equals(question.getCourseTestQuestionNo()) && log.getCourseTestLogStatusNo().equals(1)) {
                    score++;
                }
            }
        }
        return score;
    }

    private double calculateResultPercentage(int score, int totalQuestions) {
        return ((double) score / totalQuestions) * 100;
    }

    private CourseTestResultStatusEnum determineResultStatus(double resultPercentage, CourseTest courseTest, List<CourseTestResult> results) {
        if (resultPercentage >= courseTest.getTestPassPercentage()) {
            return CourseTestResultStatusEnum.PASSED;
        } else if (results.size() >= courseTest.getRetries()) {
            return CourseTestResultStatusEnum.FAILED_LAST_ATTEMPT;
        } else {
            return switch (results.size()) {
                case 1 -> CourseTestResultStatusEnum.FAILED_1ST_ATTEMPT;
                case 2 -> CourseTestResultStatusEnum.FAILED_2ND_ATTEMPT;
                case 3 -> CourseTestResultStatusEnum.FAILED_3ND_ATTEMPT;
                case 4 -> CourseTestResultStatusEnum.FAILED_4TH_ATTEMPT;
                case 5 -> CourseTestResultStatusEnum.FAILED_5TH_ATTEMPT;
                case 6 -> CourseTestResultStatusEnum.FAILED_6TH_ATTEMPT;
                default -> throw new DataNotFoundException("Course Test Result size not found :: " + results.size());
            };
        }
    }

    private void completeCourseIfEligible(CourseResult courseResult, List<CourseTestResult> allCourseTestResults, List<CourseTest> courseTests, AuthenticatedEmployee authenticatedEmployee) {
        CourseTestResultStatus passedTestStatus = courseTestResultStatusService.findByCourseTestResultStatus(CourseTestResultStatusEnum.PASSED);
        CourseTestResultStatus failedTestStatus = courseTestResultStatusService.findByCourseTestResultStatus(CourseTestResultStatusEnum.FAILED_LAST_ATTEMPT);

        CourseResultStatus passedStatus = courseResultStatusService.findByCourseResultStatus(CourseResultStatusEnum.PASSED);
        CourseResultStatus failedStatus = courseResultStatusService.findByCourseResultStatus(CourseResultStatusEnum.FAILED);

        CourseTestResultStatusEnum[] courseStatuses = allCourseTestResults.stream()
                .filter(testResult -> testResult.getCourseTestResultStatusNo().equals(passedTestStatus.getCourseTestResultStatusNo())
                        || testResult.getCourseTestResultStatusNo().equals(failedTestStatus.getCourseTestResultStatusNo()))
                .map(testResult -> courseTestResultStatusService
                        .findByCourseTestResultStatusNo(testResult.getCourseTestResultStatusNo())
                        .getCourseTestResultStatus())
                .toArray(CourseTestResultStatusEnum[]::new);

        if (courseStatuses.length == courseTests.size()) {
            CourseStatus completeStatus = courseStatusService.findByCourseStatus(CourseStatusEnum.COMPLETED);

            if (Arrays.asList(courseStatuses).contains(CourseTestResultStatusEnum.FAILED_LAST_ATTEMPT)) {
                courseResult.setCourseResultStatusNo(failedStatus.getCourseResultStatusNo());
                courseResult.setCourseBreakoutStep(CourseBreakoutStepEnum.COMPLETED_FAILED.getBreakoutStep());
            } else {
                courseResult.setCourseResultStatusNo(passedStatus.getCourseResultStatusNo());
                courseResult.setCourseBreakoutStep(CourseBreakoutStepEnum.COMPLETED_PASSED.getBreakoutStep());
            }

            courseResult.setCourseStatusNo(completeStatus.getCourseStatusNo());
            courseResult.setCourseCompletedDate(new Date());
            courseResult.setTouchEmployeeNo(authenticatedEmployee.getEmployeeNo());
            courseResult.setTouchBranchNo(authenticatedEmployee.getBranchNo());

            courseResultService.saveCourseResult(courseResult);
        }
    }

    private void updateCourseTestResultStatus(CourseTestResult courseTestResult, List<CourseTestQuestion> courseTestQuestions, List<CourseTestLog> courseTestLogs, CourseTest courseTest, List<CourseTestResult> courseTestResults) {
        if (courseTestQuestions.size() == courseTestLogs.size()) {
            int score = calculateScore(courseTestQuestions, courseTestLogs);
            double resultPercentage = calculateResultPercentage(score, courseTestQuestions.size());

            CourseTestResultStatusEnum resultStatusEnum = determineResultStatus(resultPercentage, courseTest, courseTestResults);
            CourseTestResultStatus resultStatus = courseTestResultStatusService.findByCourseTestResultStatus(resultStatusEnum);

            courseTestResult.setCourseTestResultStatusNo(resultStatus.getCourseTestResultStatusNo());
            courseTestResult.setCourseTestResultPercentage(resultPercentage);
        } else {
            CourseTestResultStatus pendingStatus = courseTestResultStatusService.findByCourseTestResultStatus(CourseTestResultStatusEnum.PENDING);
            courseTestResult.setCourseTestResultStatusNo(pendingStatus.getCourseTestResultStatusNo());
        }
    }

}
