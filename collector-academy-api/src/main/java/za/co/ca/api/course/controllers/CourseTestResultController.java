package za.co.ca.api.course.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import za.co.ca.api.authentication.payloads.responses.GeneralAPIResponse;
import za.co.ca.api.course.payloads.responses.CourseTestResultResponse;
import za.co.ca.api.course.services.CoursesService;

/**
 * @author Hanno Seegers
 */
@RestController
@RequestMapping("/api/course/test/result")
@RequiredArgsConstructor
@Slf4j
public class CourseTestResultController {
    private final CoursesService coursesService;

    @PostMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('LEARNER')")
    public ResponseEntity<CourseTestResultResponse> insertCourseTestResult(
            @Valid @RequestParam(required = true, name = "courseResultNo") String courseResultNo,
            @Valid @RequestParam(required = true, name = "courseTestNo") String courseTestNo
    ) {
        log.info("Insert Course Test Result Request :: Course Result No: '{}', Course Test No: '{}'", courseResultNo, courseTestNo);
        CourseTestResultResponse response = coursesService.insertCourseTestResult(courseResultNo, courseTestNo);
        return ResponseEntity.ok(response);
    }

    @PutMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('LEARNER')")
    public ResponseEntity<CourseTestResultResponse> updateCourseTestResult(
            @Valid @RequestParam(required = true, name = "courseTestResultNo") String courseTestResultNo
    ) {
        log.info("Update Course Test Result Request :: Course Test Result No: '{}'", courseTestResultNo);
        CourseTestResultResponse response = coursesService.updateCourseTestResult(courseTestResultNo);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<GeneralAPIResponse> deleteCourseTestResult(
            @Valid @RequestParam(required = true, name = "courseTestResultNo") String courseTestResultNo
    ) {
        log.info("Delete Course Test Result Request :: Course Test Result No: '{}'", courseTestResultNo);
        GeneralAPIResponse response = coursesService.deleteCourseTestResult(courseTestResultNo
        );
        return ResponseEntity.ok(response);
    }
}
