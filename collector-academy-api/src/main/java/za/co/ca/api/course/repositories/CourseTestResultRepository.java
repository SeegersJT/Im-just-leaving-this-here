package za.co.ca.api.course.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.co.ca.api.course.models.CourseTestResult;

import java.util.List;
import java.util.Optional;

/**
 * @author Hanno Seegers
 */
@Repository
public interface CourseTestResultRepository extends JpaRepository<CourseTestResult, String> {
    List<CourseTestResult> findByCourseResultNo(String courseResultNo);
    List<CourseTestResult> findByCourseTestNo(String courseTestNo);
    List<CourseTestResult> findByCourseResultNoAndCourseTestNoOrderBySystemDateAsc(String courseResultNo, String courseTestNo);
    Optional<CourseTestResult> findByCourseTestResultNo(String courseTestResultNo);
}
