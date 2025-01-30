package za.co.ca.api.MyCourses.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import za.co.ca.api.MyCourses.payloads.responses.MyCoursesResponse;
import za.co.ca.api.MyCourses.payloads.responses.MyLearnCourseResponse;
import za.co.ca.api.MyCourses.services.MyCoursesService;
import za.co.ca.api.authentication.payloads.responses.GeneralAPIResponse;
import za.co.ca.api.course.payloads.requests.CourseRequest;
import za.co.ca.api.course.payloads.responses.CourseAssignResponse;
import za.co.ca.api.course.payloads.responses.CourseResponse;
import za.co.ca.api.course.services.CoursesService;

import java.util.List;

/**
 * @author Hanno Seegers
 */
@RestController
@RequestMapping("/api/my-courses")
@RequiredArgsConstructor
@Slf4j
public class MyCoursesController {

    private final MyCoursesService myCoursesService;

    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<MyCoursesResponse>> getMyCourses(
            @Valid @RequestParam(required = true, name = "employeeNo") Integer employeeNo
    ) {
        log.info("Get My Courses Request :: Employee No: '{}'", employeeNo);
        List<MyCoursesResponse> response = myCoursesService.getMyCourses(employeeNo);
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/learn", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<MyLearnCourseResponse> getMyLearnCourse(
            @Valid @RequestParam(required = true, name = "courseResultNo") String courseResultNo
    ) {
        log.info("Get My Learn Course Request :: Course Result No: '{}'", courseResultNo);
        MyLearnCourseResponse response = myCoursesService.getMyLearnCourse(courseResultNo);
        return ResponseEntity.ok(response);
    }
}
