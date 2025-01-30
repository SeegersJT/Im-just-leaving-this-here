package za.co.ca.api.course.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import za.co.ca.api.course.models.CoursePage;
import za.co.ca.api.course.models.CourseTest;

import java.util.List;
import java.util.Optional;

/**
 * @author Hanno Seegers
 */
@Repository
public interface CourseTestRepository extends JpaRepository<CourseTest, String> {
    @Query("SELECT ct FROM CourseTest ct WHERE ct.courseNo = :courseNo ORDER BY ct.systemDate ASC")
    List<CourseTest> findByCourseNoOrderBySystemDateAsc(@Param("courseNo") String courseNo);

    List<CourseTest> findByCourseNo(String courseNo);
    Optional<CourseTest> findByCourseTestNo(String courseTestNo);
}
