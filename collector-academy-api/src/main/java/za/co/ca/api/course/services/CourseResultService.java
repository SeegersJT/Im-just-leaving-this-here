package za.co.ca.api.course.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import za.co.ca.api.course.repositories.CourseResultRepository;
import za.co.ca.api.common.exceptions.DataNotFoundException;
import za.co.ca.api.course.models.CourseResult;

import java.util.List;

/**
 * @author Hanno Seegers
 */
@Service
@RequiredArgsConstructor
public class CourseResultService {

    private final CourseResultRepository courseResultRepository;

    public List<CourseResult> findByCourseNo(String courseNo) {
        return courseResultRepository.findByCourseNo(courseNo);
    }

    public CourseResult findByCourseResultNo(String courseResultNo) {
        return courseResultRepository.findByCourseResultNo(courseResultNo)
                .orElseThrow(() -> new DataNotFoundException("Course Result not found :: Course Result No: '" + courseResultNo + "'"));
    }

    public List<CourseResult> findByEmployeeNo(Integer employeeNo) {
        return courseResultRepository.findByEmployeeNoOrderBySystemDateAsc(employeeNo);
    }

    public List<CourseResult> findByEmployeeNoOrderByCourseStatus(Integer employeeNo) {
        return courseResultRepository.findByEmployeeNoOrderByCourseStatus(employeeNo);
    }

    public List<CourseResult> findByCourseNoAndEmployeeNo(String courseNo, Integer employeeNo) {
        return courseResultRepository.findByCourseNoAndEmployeeNo(courseNo, employeeNo);
    }

    public void saveCourseResult(CourseResult courseResult) {
        courseResultRepository.save(courseResult);
    }

    public void saveCourseResults(List<CourseResult> courseResults) {
        courseResultRepository.saveAll(courseResults);
    }

    public Boolean hasDuplicateCourseResult(String courseNo, Integer employeeNo) {
        List<CourseResult> courseResults = courseResultRepository.findByCourseNoAndEmployeeNo(courseNo, employeeNo);

        return !courseResults.isEmpty();
    }
}
