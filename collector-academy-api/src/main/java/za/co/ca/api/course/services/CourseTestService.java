package za.co.ca.api.course.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import za.co.ca.api.course.repositories.CourseTestRepository;
import za.co.ca.api.common.exceptions.DataNotFoundException;
import za.co.ca.api.course.models.CourseTest;

import java.util.List;

/**
 * @author Hanno Seegers
 */
@Service
@RequiredArgsConstructor
public class CourseTestService {

    private final CourseTestRepository courseTestRepository;

    public List<CourseTest> findByCourseNo(String courseNo) {
        return courseTestRepository.findByCourseNoOrderBySystemDateAsc(courseNo);
    }

    public CourseTest findByCourseTestNo(String courseTestNo) {
        return courseTestRepository.findByCourseTestNo(courseTestNo)
                .orElseThrow(() -> new DataNotFoundException("Course Test not found :: Course Test No: '" + courseTestNo + "'"));
    }

    public void saveCourseTest(CourseTest courseTest) {
        courseTestRepository.save(courseTest);
    }

    public void saveCourseTests(List<CourseTest> courseTests) {
        courseTestRepository.saveAll(courseTests);
    }
}
