package za.co.ca.api.course.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import za.co.ca.api.common.exceptions.DataNotFoundException;
import za.co.ca.api.course.enums.CourseTestResultStatusEnum;
import za.co.ca.api.course.models.CourseTestResultStatus;
import za.co.ca.api.course.repositories.CourseTestResultStatusRepository;

/**
 * @author Hanno Seegers
 */
@Service
@RequiredArgsConstructor
public class CourseTestResultStatusService {

    private final CourseTestResultStatusRepository courseTestResultStatusRepository;

    public CourseTestResultStatus findByCourseTestResultStatus(CourseTestResultStatusEnum courseTestResultStatusEnum) {
        return courseTestResultStatusRepository.findByCourseTestResultStatus(courseTestResultStatusEnum)
                .orElseThrow(() -> new DataNotFoundException("Course Test Result Status not found :: '" + courseTestResultStatusEnum + "'"));
    }

    public CourseTestResultStatus findByCourseTestResultStatusNo(Integer courseTestResultStatusNo) {
        return courseTestResultStatusRepository.findByCourseTestResultStatusNo(courseTestResultStatusNo)
                .orElseThrow(() -> new DataNotFoundException("Course Test Result Status not found :: '" + courseTestResultStatusNo + "'"));
    }
}
