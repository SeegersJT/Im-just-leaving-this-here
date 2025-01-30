package za.co.ca.api.course.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import za.co.ca.api.course.models.CourseTestLog;

import java.util.List;
import java.util.Optional;

/**
 * @author Hanno Seegers
 */
@Repository
public interface CourseTestLogRepository extends JpaRepository<CourseTestLog, String> {
    List<CourseTestLog> findByCourseTestResultNo(String courseTestResultNo);
    Optional<CourseTestLog> findByCourseTestLogNo(String courseTestLogNo);

    @Query("SELECT c FROM CourseTestLog c WHERE c.courseTestResultNo = :resultNo AND c.courseTestQuestionNo = :questionNo")
    List<CourseTestLog> findLogs(@Param("resultNo") String courseTestResultNo, @Param("questionNo") String courseTestQuestionNo);
}
