package za.co.ca.api.course.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import za.co.ca.api.common.exceptions.DataNotFoundException;
import za.co.ca.api.course.models.CourseTestResult;
import za.co.ca.api.course.repositories.CourseTestResultRepository;

import java.util.List;

/**
 * @author Hanno Seegers
 */
@Service
@RequiredArgsConstructor
public class CourseTestResultService {

    private final CourseTestResultRepository courseTestResultRepository;

    public List<CourseTestResult> findByCourseResultNo(String courseResultNo) {
        return courseTestResultRepository.findByCourseResultNo(courseResultNo);
    }

    public List<CourseTestResult> findByCourseTestNo(String courseTestNo) {
        return courseTestResultRepository.findByCourseTestNo(courseTestNo);
    }

    public List<CourseTestResult> findByCourseResultNoAndCourseTestNo(String courseResultNo, String courseTestNo) {
        return courseTestResultRepository.findByCourseResultNoAndCourseTestNo(courseResultNo, courseTestNo);
    }

    public CourseTestResult findByCourseTestResultNo(String courseTestResultNo) {
        return courseTestResultRepository.findByCourseTestResultNo(courseTestResultNo)
                .orElseThrow(() -> new DataNotFoundException("Course Test Result not found :: Course Test Result No: " + courseTestResultNo + "'"));
    }

    public void saveCourseTestResult(CourseTestResult courseTestResult) {
        courseTestResultRepository.save(courseTestResult);
    }

    public void saveCourseTestResults(List<CourseTestResult> courseTestResults) {
        courseTestResultRepository.saveAll(courseTestResults);
    }
}
