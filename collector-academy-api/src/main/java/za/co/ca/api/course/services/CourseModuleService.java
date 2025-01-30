package za.co.ca.api.course.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import za.co.ca.api.course.repositories.CourseModuleRepository;
import za.co.ca.api.common.exceptions.DataNotFoundException;
import za.co.ca.api.course.models.CourseModule;

import java.util.List;

/**
 * @author Hanno Seegers
 */
@Service
@RequiredArgsConstructor
public class CourseModuleService {

    private final CourseModuleRepository courseModuleRepository;

    public List<CourseModule> findByCourseNo(String courseNo) {
        return courseModuleRepository.findByCourseNoOrderBySystemDateAsc(courseNo);
    }

    public CourseModule findByCourseModuleNo(String courseModuleNo) {
        return courseModuleRepository.findByCourseModuleNo(courseModuleNo)
                .orElseThrow(() -> new DataNotFoundException("Course Module not found :: Course Module No: '" + courseModuleNo + "'"));
    }

    public void saveCourseModule(CourseModule courseModule) {
        courseModuleRepository.save(courseModule);
    }

    public void saveCourseModules(List<CourseModule> courseModules) {
        courseModuleRepository.saveAll(courseModules);
    }
}
