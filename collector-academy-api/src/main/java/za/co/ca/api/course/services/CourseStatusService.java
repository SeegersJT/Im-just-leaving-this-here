package za.co.ca.api.course.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import za.co.ca.api.course.repositories.CourseStatusRepository;
import za.co.ca.api.common.exceptions.DataNotFoundException;
import za.co.ca.api.course.enums.CourseStatusEnum;
import za.co.ca.api.course.models.CourseStatus;

/**
 * @author Hanno Seegers
 */
@Service
@RequiredArgsConstructor
public class CourseStatusService {

    private final CourseStatusRepository courseStatusRepository;

    public CourseStatus findByCourseStatus(CourseStatusEnum courseStatusEnum) {
        return courseStatusRepository.findByCourseStatus(courseStatusEnum)
                .orElseThrow(() -> new DataNotFoundException("Course Status not found :: Course Status: '" + courseStatusEnum.name() + "'"));
    }

    public CourseStatus findByCourseStatusNo(Integer courseStatusNo) {
        return courseStatusRepository.findByCourseStatusNo(courseStatusNo)
                .orElseThrow(() -> new DataNotFoundException("Course Status not found :: Course Status No: '" + courseStatusNo + "'"));
    }
}
