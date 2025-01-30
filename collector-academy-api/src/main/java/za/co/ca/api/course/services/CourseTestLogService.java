package za.co.ca.api.course.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import za.co.ca.api.course.repositories.CourseTestLogRepository;
import za.co.ca.api.common.exceptions.DataNotFoundException;
import za.co.ca.api.course.models.CourseTestLog;

import java.util.List;

/**
 * @author Hanno Seegers
 */
@Service
@RequiredArgsConstructor
public class CourseTestLogService {

    private final CourseTestLogRepository courseTestLogRepository;

    public List<CourseTestLog> findByCourseTestResultNo(String courseTestResultNo) {
        return courseTestLogRepository.findByCourseTestResultNo(courseTestResultNo);
    }

    public CourseTestLog findByCourseTestLogNo(String courseTestLogNo) {
        return courseTestLogRepository.findByCourseTestLogNo(courseTestLogNo)
                .orElseThrow(() -> new DataNotFoundException("Course Test Log not found :: Course Test Log No: '" + courseTestLogNo + "'"));
    }

    public List<CourseTestLog> findLogs(String courseTestResultNo, String courseTestQuestionNo) {
        return courseTestLogRepository.findLogs(courseTestResultNo, courseTestQuestionNo);
    }

    public void saveCourseTestLog(CourseTestLog courseTestLog) {
        courseTestLogRepository.save(courseTestLog);
    }
}
