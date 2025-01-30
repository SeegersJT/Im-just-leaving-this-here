package za.co.ca.api.course.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import za.co.ca.api.course.models.CourseModule;

import java.util.List;
import java.util.Optional;

/**
 * @author Hanno Seegers
 */
@Repository
public interface CourseModuleRepository extends JpaRepository<CourseModule, String> {
    @Query("SELECT cm FROM CourseModule cm WHERE cm.courseNo = :courseNo ORDER BY cm.systemDate ASC")
    List<CourseModule> findByCourseNoOrderBySystemDateAsc(@Param("courseNo") String courseNo);

    List<CourseModule> findByCourseNo(String courseNo);
    Optional<CourseModule> findByCourseModuleNo(String courseModuleNo);
}
