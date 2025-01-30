package za.co.ca.api.course.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import za.co.ca.api.course.repositories.CoursePageRepository;
import za.co.ca.api.common.exceptions.DataNotFoundException;
import za.co.ca.api.course.models.CoursePage;

import java.util.List;

/**
 * @author Hanno Seegers
 */
@Service
@RequiredArgsConstructor
public class CoursePageService {

    private final CoursePageRepository coursePageRepository;

    public List<CoursePage> findByCourseModuleNo(String courseModuleNo) {
        return coursePageRepository.findByCourseModuleNoOrderBySystemDateAsc(courseModuleNo);
    }

    public CoursePage findByCoursePageNo(String coursePageNo) {
        return coursePageRepository.findByCoursePageNo(coursePageNo)
                .orElseThrow(() -> new DataNotFoundException("Course Page not found :: Course Page No: '" + coursePageNo + "'"));
    }

    public void saveCoursePage(CoursePage coursePage) {
        coursePageRepository.save(coursePage);
    }

    public void saveCoursePages(List<CoursePage> coursePages) {
        coursePageRepository.saveAll(coursePages);
    }
}
