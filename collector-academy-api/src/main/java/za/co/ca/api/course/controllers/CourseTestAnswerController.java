package za.co.ca.api.course.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import za.co.ca.api.authentication.payloads.responses.GeneralAPIResponse;
import za.co.ca.api.course.payloads.requests.CourseTestAnswerRequest;
import za.co.ca.api.course.payloads.responses.CourseTestAnswerResponse;
import za.co.ca.api.course.payloads.responses.CourseTestQuestionResponse;
import za.co.ca.api.course.services.CoursesService;

import java.util.List;

/**
 * @author Hanno Seegers
 */
@RestController
@RequestMapping("/api/course/test/answer")
@RequiredArgsConstructor
@Slf4j
public class CourseTestAnswerController {

    private final CoursesService coursesService;

    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<CourseTestAnswerResponse> getCourseTestAnswer(
            @Valid @RequestParam(required = true, name = "courseTestAnswerNo") String courseTestAnswerNo
    ) {
        log.info("Get Course Test Answer Request :: Course Test Answer No: '{}'", courseTestAnswerNo);
        CourseTestAnswerResponse response = coursesService.getCourseTestAnswer(courseTestAnswerNo);
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<List<CourseTestAnswerResponse>> getAllCourseTestAnswers(
            @Valid @RequestParam(required = true, name = "courseTestQuestionNo") String courseTestQuestionNo
    ) {
        log.info("Get all Course Test Answers Request :: Course Test Question No: '{}'", courseTestQuestionNo);
        List<CourseTestAnswerResponse> response = coursesService.getAllCourseTestAnswers(courseTestQuestionNo);
        return ResponseEntity.ok(response);
    }

    @PostMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<CourseTestAnswerResponse> insertCourseTestAnswer(
            @Valid @RequestParam(required = true, name = "courseTestQuestionNo") String courseTestQuestionNo,
            @Valid @RequestBody CourseTestAnswerRequest courseTestAnswerRequest
    ) {
        log.info("Insert Course Test Answer Request :: Course Test Answer Title: '{}'", courseTestAnswerRequest.getTestAnswer());
        CourseTestAnswerResponse response = coursesService.insertCourseTestAnswer(courseTestQuestionNo, courseTestAnswerRequest);
        return ResponseEntity.ok(response);
    }

    @PutMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<CourseTestAnswerResponse> updateCourseTestAnswer(
            @Valid @RequestParam(required = true, name = "courseTestAnswerNo") String courseTestAnswerNo,
            @Valid @RequestBody CourseTestAnswerRequest courseTestAnswerRequest
    ) {
        log.info("Update Course Test Answer Request :: Course Test Answer No: '{}'", courseTestAnswerNo);
        CourseTestAnswerResponse response = coursesService.updateCourseTestAnswer(courseTestAnswerNo, courseTestAnswerRequest);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<GeneralAPIResponse> deleteCourseTestAnswer(
            @Valid @RequestParam(required = true, name = "courseTestAnswerNo") String courseTestAnswerNo
    ) {
        log.info("Delete Course Test Answer Request :: Course Test Answer No: '{}'", courseTestAnswerNo);
        GeneralAPIResponse response = coursesService.deleteCourseTestAnswer(courseTestAnswerNo
        );
        return ResponseEntity.ok(response);
    }
}
