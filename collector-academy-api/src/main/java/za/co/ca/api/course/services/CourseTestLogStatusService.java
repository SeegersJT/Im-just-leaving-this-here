package za.co.ca.api.course.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import za.co.ca.api.common.exceptions.DataNotFoundException;
import za.co.ca.api.course.enums.CourseTestLogStatusEnum;
import za.co.ca.api.course.models.CourseTestLogStatus;
import za.co.ca.api.course.repositories.CourseTestLogStatusRepository;

/**
 * @author Hanno Seegers
 */
@Service
@RequiredArgsConstructor
public class CourseTestLogStatusService {

    private final CourseTestLogStatusRepository courseTestLogStatusRepository;

    public CourseTestLogStatus findByCourseTestLogStatus(CourseTestLogStatusEnum courseTestLogStatusEnum) {
        return courseTestLogStatusRepository.findByCourseTestLogStatus(courseTestLogStatusEnum)
                .orElseThrow(() -> new DataNotFoundException("Course Test Log Status not found :: Course Test Log Status: '" + courseTestLogStatusEnum.name() + "'"));
    }

    public CourseTestLogStatus findByCourseTestLogStatusNo(Integer courseTestLogStatusNo) {
        return courseTestLogStatusRepository.findByCourseTestLogStatusNo(courseTestLogStatusNo)
                .orElseThrow(() -> new DataNotFoundException("Course Test Log Status not found :: Course Test Log Status No: '" + courseTestLogStatusNo + "'"));
    }
}
