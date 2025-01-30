package za.co.ca.api.course.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import za.co.ca.api.authentication.payloads.responses.GeneralAPIResponse;
import za.co.ca.api.course.payloads.requests.CourseModuleRequest;
import za.co.ca.api.course.payloads.responses.CourseModuleResponse;
import za.co.ca.api.course.payloads.responses.CourseResponse;
import za.co.ca.api.course.services.CoursesService;

import java.util.List;

/**
 * @author Hanno Seegers
 */
@RestController
@RequestMapping("/api/course/module")
@RequiredArgsConstructor
@Slf4j
public class CourseModuleController {

    private final CoursesService coursesService;

    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<CourseModuleResponse> getCourseModule(
            @Valid @RequestParam(required = true, name = "courseModuleNo") String courseModuleNo
    ) {
        log.info("Get Course Module Request :: Course Module No: '{}'", courseModuleNo);
        CourseModuleResponse response = coursesService.getCourseModule(courseModuleNo);
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<List<CourseModuleResponse>> getAllCourseModules(
            @Valid @RequestParam(required = true, name = "courseNo") String courseNo
    ) {
        log.info("Get all Course Modules Request :: Course No: '{}'", courseNo);
        List<CourseModuleResponse> response = coursesService.getAllCourseModules(courseNo);
        return ResponseEntity.ok(response);
    }

    @PostMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<CourseModuleResponse> insertCourseModule(
            @Valid @RequestParam(required = true, name = "courseNo") String courseNo,
            @Valid @RequestBody CourseModuleRequest courseModuleRequest
    ) {
        log.info("Insert Course Module Request :: Course Module Title: '{}'", courseModuleRequest.getModuleTitle());
        CourseModuleResponse response = coursesService.insertCourseModule(courseNo, courseModuleRequest);
        return ResponseEntity.ok(response);
    }

    @PutMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<CourseModuleResponse> updateCourseModule(
            @Valid @RequestParam(required = true, name = "courseModuleNo") String courseModuleNo,
            @Valid @RequestBody CourseModuleRequest courseModuleRequest
    ) {
        log.info("Update Course Module Request :: Course Module No: '{}'", courseModuleNo);
        CourseModuleResponse response = coursesService.updateCourseModule(courseModuleNo, courseModuleRequest);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<GeneralAPIResponse> deleteCourseModule(
            @Valid @RequestParam(required = true, name = "courseModuleNo") String courseModuleNo
    ) {
        log.info("Delete Course Module Request :: Course Module No: '{}'", courseModuleNo);
        GeneralAPIResponse response = coursesService.deleteCourseModule(courseModuleNo);
        return ResponseEntity.ok(response);
    }
}