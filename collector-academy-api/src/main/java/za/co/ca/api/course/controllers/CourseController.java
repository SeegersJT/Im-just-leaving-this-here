package za.co.ca.api.course.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
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
@RequestMapping("/api/course")
@RequiredArgsConstructor
@Slf4j
public class CourseController {

    private final CoursesService coursesService;

    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<CourseResponse> getCourse(
            @Valid @RequestParam(required = true, name = "courseNo") String courseNo
    ) {
        log.info("Get Course Request :: Course No: '{}'", courseNo);
        CourseResponse response = coursesService.getCourse(courseNo);
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<List<CourseResponse>> getAllCourses() {
        log.info("Get all Courses Request");
        List<CourseResponse> response = coursesService.getAllCourses();
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/assigned", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<List<CourseAssignResponse>> getAllAssignedCourses(
            @Valid @RequestParam(required = true, name = "employeeNo") Integer employeeNo
    ) {
        log.info("Get all Assigned Courses Request :: Employee No: '{}'", employeeNo);
        List<CourseAssignResponse> response = coursesService.getAllAssignedCourses(employeeNo);
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/unassigned", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<List<CourseAssignResponse>> getAllUnassignedCourses(
            @Valid @RequestParam(required = true, name = "employeeNo") Integer employeeNo
    ) {
        log.info("Get all Unassigned Courses Request :: Employee No: '{}'", employeeNo);
        List<CourseAssignResponse> response = coursesService.getAllUnassignedCourses(employeeNo);
        return ResponseEntity.ok(response);
    }

    @PostMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<CourseResponse> insertCourse(
            @Valid @RequestBody CourseRequest courseRequest
    ) {
        log.info("Insert Course Request :: Course Title: '{}'", courseRequest.getCourseTitle());
        CourseResponse response = coursesService.insertCourse(courseRequest);
        return ResponseEntity.ok(response);
    }

    @PutMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<CourseResponse> updateCourse(
            @Valid @RequestParam(required = true, name = "courseNo") String courseNo,
            @Valid @RequestBody CourseRequest courseRequest
    ) {
        log.info("Update Course Request :: Course No: '{}'", courseNo);
        CourseResponse response = coursesService.updateCourse(courseNo, courseRequest);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<GeneralAPIResponse> deleteCourse(
            @Valid @RequestParam(required = true, name = "courseNo") String courseNo
    ) {
        log.info("Delete Course Request :: Course No: '{}'", courseNo);
        GeneralAPIResponse response = coursesService.deleteCourse(courseNo);
        return ResponseEntity.ok(response);
    }
}
