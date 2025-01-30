package za.co.ca.api.course.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import za.co.ca.api.common.exceptions.DataNotFoundException;
import za.co.ca.api.course.enums.CourseResultStatusEnum;
import za.co.ca.api.course.models.CourseResultStatus;
import za.co.ca.api.course.repositories.CourseResultStatusRepository;

/**
 * @author Hanno Seegers
 */
@Service
@RequiredArgsConstructor
public class CourseResultStatusService {

    private final CourseResultStatusRepository courseResultStatusRepository;

    public CourseResultStatus findByCourseResultStatusNo(Integer courseResultStatusNo) {
        return courseResultStatusRepository.findByCourseResultStatusNo(courseResultStatusNo)
                .orElseThrow(() -> new DataNotFoundException("Course Result Status not found"));
    }

    public CourseResultStatus findByCourseResultStatus(CourseResultStatusEnum courseResultStatusEnum) {
        return courseResultStatusRepository.findByCourseResultStatus(courseResultStatusEnum)
                .orElseThrow(() -> new DataNotFoundException("Course Result Status not found :: Course Result Status: '" +courseResultStatusEnum.name() + "'"));
    }
}
