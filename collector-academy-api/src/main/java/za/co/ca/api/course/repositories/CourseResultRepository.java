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
public interface CourseResultRepository extends JpaRepository<CourseResult, String> {
    List<CourseResult> findByCourseNo(String courseNo);

    Optional<CourseResult> findByCourseResultNo(String courseResultNo);

    List<CourseResult> findByCourseNoAndEmployeeNo(String courseNo, Integer employeeNo);

    @Query("""
        SELECT cr
        FROM CourseResult cr
        WHERE cr.employeeNo = :employeeNo
        ORDER BY cr.systemDate ASC
    """)
    List<CourseResult> findByEmployeeNoOrderBySystemDateAsc(@Param("employeeNo") Integer employeeNo);

    @Query("""
        SELECT cr
        FROM CourseResult cr
        WHERE cr.employeeNo = :employeeNo
        ORDER BY
            CASE cr.courseStatusNo
                WHEN 2 THEN 1
                WHEN 1 THEN 2
                WHEN 3 THEN 3
                ELSE 4
            END ASC,
            cr.systemDate ASC
    """)
    List<CourseResult> findByEmployeeNoOrderByCourseStatus(@Param("employeeNo") Integer employeeNo);

    List<CourseResult> findByEmployeeNo(Integer employeeNo);
}
