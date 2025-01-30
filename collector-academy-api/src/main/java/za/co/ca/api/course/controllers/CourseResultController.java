package za.co.ca.api.course.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import za.co.ca.api.authentication.payloads.responses.GeneralAPIResponse;
import za.co.ca.api.course.payloads.requests.CourseResultRequest;
import za.co.ca.api.course.payloads.responses.CourseResultResponse;
import za.co.ca.api.course.payloads.responses.CourseTestResponse;
import za.co.ca.api.course.services.CoursesService;

import java.util.List;

/**
 * @author Hanno Seegers
 */
@RestController
@RequestMapping("/api/course/result")
@RequiredArgsConstructor
@Slf4j
public class CourseResultController {

    private final CoursesService coursesService;

    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<CourseResultResponse> getCourseResult(
            @Valid @RequestParam(required = true, name = "courseResultNo") String courseResultNo
    ) {
        log.info("Get Course Result Request :: Course Result No: '{}'", courseResultNo);
        CourseResultResponse response = coursesService.getCourseResult(courseResultNo);
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<List<CourseResultResponse>> getAllCourseResults(
            @Valid @RequestParam(required = true, name = "employeeNo") Integer employeeNo
    ) {
        log.info("Get all Course Results Request :: Employee No: '{}'", employeeNo);
        List<CourseResultResponse> response = coursesService.getAllCourseResults(employeeNo);
        return ResponseEntity.ok(response);
    }

    @PostMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<CourseResultResponse> insertCourseResult(
            @Valid @RequestParam(required = true, name = "courseNo") String courseNo,
            @Valid @RequestParam(required = true, name = "employeeNo") Integer employeeNo,
            @Valid @RequestBody CourseResultRequest courseResultRequest
    ) {
        log.info("Insert Course Result Request :: Course No: '{}'", courseNo);
        CourseResultResponse response = coursesService.insertCourseResult(courseNo, employeeNo, courseResultRequest);
        return ResponseEntity.ok(response);
    }

    @PutMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('LEARNER')")
    public ResponseEntity<CourseResultResponse> updateCourseResult(
            @Valid @RequestParam(required = true, name = "courseResultNo") String courseResultNo,
            @Valid @RequestBody CourseResultRequest courseResultRequest
    ) {
        log.info("Update Course Result Request :: Course Result No: '{}'", courseResultNo);
        CourseResultResponse response = coursesService.updateCourseResult(courseResultNo, courseResultRequest);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<GeneralAPIResponse> deleteCourseResult(
            @Valid @RequestParam(required = true, name = "courseResultNo") String courseResultNo
    ) {
        log.info("Delete Course Result Request :: Course Result No: '{}'", courseResultNo);
        GeneralAPIResponse response = coursesService.deleteCourseResult(courseResultNo
        );
        return ResponseEntity.ok(response);
    }
}