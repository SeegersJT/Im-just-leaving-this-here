package za.co.ca.api.course.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import za.co.ca.api.course.models.CourseTestAnswer;
import za.co.ca.api.course.models.CourseTestQuestion;

import java.util.List;
import java.util.Optional;

/**
 * @author Hanno Seegers
 */
@Repository
public interface CourseTestAnswerRepository extends JpaRepository<CourseTestAnswer, String> {
    @Query("SELECT cta FROM CourseTestAnswer cta WHERE cta.courseTestQuestionNo = :courseTestQuestionNo ORDER BY cta.systemDate ASC")
    List<CourseTestAnswer> findByCourseTestQuestionNoOrderBySystemDateAsc(@Param("courseTestQuestionNo") String courseTestQuestionNo);

    List<CourseTestAnswer> findByCourseTestQuestionNo(String courseTestQuestionNo);
    Optional<CourseTestAnswer> findByCourseTestAnswerNo(String courseTestAnswerNo);
}
