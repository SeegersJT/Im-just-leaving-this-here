package za.co.ca.api.course.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import za.co.ca.api.course.models.Course;
import za.co.ca.api.course.models.CourseResult;

import java.util.List;
import java.util.Optional;

/**
 * @author Hanno Seegers
 */
@Repository
public interface CourseRepository extends JpaRepository<Course, String> {

    @Query("SELECT c FROM Course c ORDER BY c.systemDate ASC")
    List<Course> findAllOrderBySystemDateAsc();

    Optional<Course> findByCourseNo(String courseNo);
    Optional<Course> findByCourseTitle(String courseTitle);

    @Query("SELECT c FROM Course c WHERE c.courseNo NOT IN (SELECT cr.courseNo FROM CourseResult cr WHERE cr.employeeNo = :employeeNo) ORDER BY c.systemDate ASC")
    List<Course> findByUnassignedCourses(@Param("employeeNo") Integer employeeNo);

    @Query("SELECT c FROM Course c WHERE c.courseNo IN (SELECT cr.courseNo FROM CourseResult cr WHERE cr.employeeNo = :employeeNo) ORDER BY c.systemDate ASC")
    List<Course> findByAssignedCourses(@Param("employeeNo") Integer employeeNo);
}
