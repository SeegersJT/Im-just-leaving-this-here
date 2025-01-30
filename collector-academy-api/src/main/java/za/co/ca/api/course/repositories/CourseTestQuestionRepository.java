package za.co.ca.api.course.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import za.co.ca.api.course.models.CourseTest;
import za.co.ca.api.course.models.CourseTestQuestion;

import java.util.List;
import java.util.Optional;

/**
 * @author Hanno Seegers
 */
@Repository
public interface CourseTestQuestionRepository extends JpaRepository<CourseTestQuestion, String> {
    @Query("SELECT ctc FROM CourseTestQuestion ctc WHERE ctc.courseTestNo = :courseTestNo ORDER BY ctc.systemDate ASC")
    List<CourseTestQuestion> findByCourseTestNoOrderBySystemDateAsc(@Param("courseTestNo") String courseTestNo);

    List<CourseTestQuestion> findByCourseTestNo(String courseTestNo);
    Optional<CourseTestQuestion> findByCourseTestQuestionNo(String courseTestQuestionNo);
}
