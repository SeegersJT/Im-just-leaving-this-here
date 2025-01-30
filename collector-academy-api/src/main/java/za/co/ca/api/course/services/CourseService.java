package za.co.ca.api.course.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import za.co.ca.api.course.repositories.CourseRepository;
import za.co.ca.api.common.exceptions.DataNotFoundException;
import za.co.ca.api.course.models.Course;

import java.util.List;

/**
 * @author Hanno Seegers
 */
@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseRepository courseRepository;

    public List<Course> findAll() {
        return courseRepository.findAllOrderBySystemDateAsc();
    }

    public Course findByCourseNo(String courseNo) {
        return courseRepository.findByCourseNo(courseNo)
                .orElseThrow(() -> new DataNotFoundException("Course not found :: - Course No: '" + courseNo + "'"));
    }

    public Course findByCourseTitle(String courseTitle) {
        return courseRepository.findByCourseTitle(courseTitle)
                .orElseThrow(() -> new DataNotFoundException("Course not found :: - Course title: '" + courseTitle + "'"));
    }

    public List<Course> findByAssignedCourses(Integer employeeNo) {
        return courseRepository.findByAssignedCourses(employeeNo);
    }

    public List<Course> findByUnassignedCourses(Integer employeeNo) {
        return courseRepository.findByUnassignedCourses(employeeNo);
    }

    public void saveCourse(Course course) {
        courseRepository.save(course);
    }
}
