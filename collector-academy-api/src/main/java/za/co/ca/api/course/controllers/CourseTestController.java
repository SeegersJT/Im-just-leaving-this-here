package za.co.ca.api.course.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import za.co.ca.api.authentication.payloads.responses.GeneralAPIResponse;
import za.co.ca.api.course.payloads.responses.CourseModuleResponse;
import za.co.ca.api.course.services.CoursesService;
import za.co.ca.api.course.payloads.requests.CourseTestRequest;
import za.co.ca.api.course.payloads.responses.CourseTestResponse;

import java.util.List;

/**
 * @author Hanno Seegers
 */
@RestController
@RequestMapping("/api/course/test")
@RequiredArgsConstructor
@Slf4j
public class CourseTestController {

    private final CoursesService coursesService;

    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<CourseTestResponse> getCourseTest(
            @Valid @RequestParam(required = true, name = "courseTestNo") String courseTestNo
    ) {
        log.info("Get Course Test Request :: Course Test No: '{}'", courseTestNo);
        CourseTestResponse response = coursesService.getCourseTest(courseTestNo);
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<List<CourseTestResponse>> getAllCourseTests(
            @Valid @RequestParam(required = true, name = "courseNo") String courseNo
    ) {
        log.info("Get all Course Tests Request :: Course No: '{}'", courseNo);
        List<CourseTestResponse> response = coursesService.getAllCourseTests(courseNo);
        return ResponseEntity.ok(response);
    }

    @PostMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<CourseTestResponse> insertCourseTest(
            @Valid @RequestParam(required = true, name = "courseNo") String courseNo,
            @Valid @RequestBody CourseTestRequest courseTestRequest
    ) {
        log.info("Insert Course Test Request :: Course Test Title: '{}'", courseTestRequest.getTestTitle());
        CourseTestResponse response = coursesService.insertCourseTest(courseNo, courseTestRequest);
        return ResponseEntity.ok(response);
    }

    @PutMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<CourseTestResponse> updateCourseTest(
            @Valid @RequestParam(required = true, name = "courseTestNo") String courseTestNo,
            @Valid @RequestBody CourseTestRequest courseTestRequest
    ) {
        log.info("Update Course Test Request :: Course Test No: '{}'", courseTestNo);
        CourseTestResponse response = coursesService.updateCourseTest(courseTestNo, courseTestRequest);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<GeneralAPIResponse> deleteCourseTest(
            @Valid @RequestParam(required = true, name = "courseTestNo") String courseTestNo
    ) {
        log.info("Delete Course Test Request :: Course Test No: '{}'", courseTestNo);
        GeneralAPIResponse response = coursesService.deleteCourseTest(courseTestNo);
        return ResponseEntity.ok(response);
    }
}
