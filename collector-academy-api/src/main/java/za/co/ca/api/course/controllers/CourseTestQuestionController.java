package za.co.ca.api.course.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import za.co.ca.api.authentication.payloads.responses.GeneralAPIResponse;
import za.co.ca.api.course.payloads.requests.CourseTestQuestionRequest;
import za.co.ca.api.course.payloads.responses.CourseTestQuestionResponse;
import za.co.ca.api.course.payloads.responses.CourseTestResponse;
import za.co.ca.api.course.services.CoursesService;

import java.util.List;

/**
 * @author Hanno Seegers
 */
@RestController
@RequestMapping("/api/course/test/question")
@RequiredArgsConstructor
@Slf4j
public class CourseTestQuestionController {

    private final CoursesService coursesService;

    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<CourseTestQuestionResponse> getCourseTestQuestion(
            @Valid @RequestParam(required = true, name = "courseTestQuestionNo") String courseTestQuestionNo
    ) {
        log.info("Get Course Test Question Request :: Course Test Question No: '{}'", courseTestQuestionNo);
        CourseTestQuestionResponse response = coursesService.getCourseTestQuestion(courseTestQuestionNo);
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<List<CourseTestQuestionResponse>> getAllCourseTestQuestions(
            @Valid @RequestParam(required = true, name = "courseTestNo") String courseTestNo
    ) {
        log.info("Get all Course Test Questions Request :: Course Test No: '{}'", courseTestNo);
        List<CourseTestQuestionResponse> response = coursesService.getAllCourseTestQuestions(courseTestNo);
        return ResponseEntity.ok(response);
    }

    @PostMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<CourseTestQuestionResponse> insertCourseTestQuestion(
            @Valid @RequestParam(required = true, name = "courseTestNo") String courseTestNo,
            @Valid @RequestBody CourseTestQuestionRequest courseTestQuestionRequest
    ) {
        log.info("Insert Course Test Question Request :: Course Test Question Title: '{}'", courseTestQuestionRequest.getQuestionTitle());
        CourseTestQuestionResponse response = coursesService.insertCourseTestQuestion(courseTestNo, courseTestQuestionRequest);
        return ResponseEntity.ok(response);
    }

    @PutMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<CourseTestQuestionResponse> updateCourseTestQuestion(
            @Valid @RequestParam(required = true, name = "courseTestQuestionNo") String courseTestQuestionNo,
            @Valid @RequestBody CourseTestQuestionRequest courseTestQuestionRequest
    ) {
        log.info("Update Course Test Question Request :: Course Test Question No: '{}'", courseTestQuestionNo);
        CourseTestQuestionResponse response = coursesService.updateCourseTestQuestion(courseTestQuestionNo, courseTestQuestionRequest);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<GeneralAPIResponse> deleteCourseTestQuestion(
            @Valid @RequestParam(required = true, name = "courseTestQuestionNo") String courseTestQuestionNo
    ) {
        log.info("Delete Course Test Question Request :: Course Test Question No: '{}'", courseTestQuestionNo);
        GeneralAPIResponse response = coursesService.deleteCourseTestQuestion(courseTestQuestionNo
        );
        return ResponseEntity.ok(response);
    }
}
