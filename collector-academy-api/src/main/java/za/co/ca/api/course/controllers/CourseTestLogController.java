package za.co.ca.api.course.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import za.co.ca.api.authentication.payloads.responses.GeneralAPIResponse;
import za.co.ca.api.course.payloads.requests.CourseTestLogRequest;
import za.co.ca.api.course.payloads.responses.CourseTestLogResponse;
import za.co.ca.api.course.services.CoursesService;

/**
 * @author Hanno Seegers
 */
@RestController
@RequestMapping("/api/course/test/log")
@RequiredArgsConstructor
@Slf4j
public class CourseTestLogController {

    private final CoursesService coursesService;

    @PostMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('LEARNER')")
    public ResponseEntity<CourseTestLogResponse> insertCourseTestLog(
            @Valid @RequestBody CourseTestLogRequest courseTestLogRequest
    ) {
        log.info("Insert Course Test Log Request :: Course Test Result No: '{}', Course Test Question No: '{}'", courseTestLogRequest.getCourseTestResultNo(), courseTestLogRequest.getCourseTestQuestionNo());
        CourseTestLogResponse response = coursesService.insertCourseTestLog(courseTestLogRequest);
        return ResponseEntity.ok(response);
    }

    @PutMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('LEARNER')")
    public ResponseEntity<CourseTestLogResponse> updateCourseTestQuestion(
            @Valid @RequestParam(required = true, name = "courseTestLogNo") String courseTestLogNo,
            @Valid @RequestBody CourseTestLogRequest courseTestLogRequest
    ) {
        log.info("Update Course Test Log Request :: Course Test Log No: '{}'", courseTestLogNo);
        CourseTestLogResponse response = coursesService.updateCourseTestLog(courseTestLogNo, courseTestLogRequest);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<GeneralAPIResponse> deleteCourseTestLog(
            @Valid @RequestParam(required = true, name = "courseTestLogNo") String courseTestLogNo
    ) {
        log.info("Delete Course Test Log Request :: Course Test Log No: '{}'", courseTestLogNo);
        GeneralAPIResponse response = coursesService.deleteCourseTestLog(courseTestLogNo);
        return ResponseEntity.ok(response);
    }
}