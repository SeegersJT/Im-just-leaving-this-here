package za.co.ca.api.course.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import za.co.ca.api.course.models.CourseModule;
import za.co.ca.api.course.models.CoursePage;

import java.util.List;
import java.util.Optional;

/**
 * @author Hanno Seegers
 */
@Repository
public interface CoursePageRepository extends JpaRepository<CoursePage, String> {
    @Query("SELECT cp FROM CoursePage cp WHERE cp.courseModuleNo = :courseModuleNo ORDER BY cp.systemDate ASC")
    List<CoursePage> findByCourseModuleNoOrderBySystemDateAsc(@Param("courseModuleNo") String courseModuleNo);

    List<CoursePage> findByCourseModuleNo(String courseModuleNo);
    Optional<CoursePage> findByCoursePageNo(String coursePageNo);
}
