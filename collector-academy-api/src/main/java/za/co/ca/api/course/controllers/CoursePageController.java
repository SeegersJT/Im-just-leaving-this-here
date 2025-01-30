package za.co.ca.api.course.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import za.co.ca.api.authentication.payloads.responses.GeneralAPIResponse;
import za.co.ca.api.course.payloads.requests.CoursePageRequest;
import za.co.ca.api.course.payloads.responses.CourseModuleResponse;
import za.co.ca.api.course.payloads.responses.CoursePageResponse;
import za.co.ca.api.course.services.CoursesService;

import java.util.List;

/**
 * @author Hanno Seegers
 */
@RestController
@RequestMapping("/api/course/page")
@RequiredArgsConstructor
@Slf4j
public class CoursePageController {

    private final CoursesService coursesService;

    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<CoursePageResponse> getCoursePage(
            @Valid @RequestParam(required = true, name = "coursePageNo") String coursePageNo
    ) {
        log.info("Get Course Page Request :: Course Page No: '{}'", coursePageNo);
        CoursePageResponse response = coursesService.getCoursePage(coursePageNo);
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<List<CoursePageResponse>> getAllCoursePages(
            @Valid @RequestParam(required = true, name = "courseModuleNo") String courseModuleNo
    ) {
        log.info("Get all Course Pages Request :: Course Module No: '{}'", courseModuleNo);
        List<CoursePageResponse> response = coursesService.getAllCoursePages(courseModuleNo);
        return ResponseEntity.ok(response);
    }

    @PostMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<CoursePageResponse> insertCoursePage(
            @Valid @RequestParam(required = true, name = "courseModuleNo") String courseModuleNo,
            @Valid @RequestBody CoursePageRequest coursePageRequest
    ) {
        log.info("Insert Course Page Request :: Course Page Title: '{}'", coursePageRequest.getPageTitle());
        CoursePageResponse response = coursesService.insertCoursePage(courseModuleNo, coursePageRequest);
        return ResponseEntity.ok(response);
    }

    @PutMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<CoursePageResponse> updateCoursePage(
            @Valid @RequestParam(required = true, name = "coursePageNo") String coursePageNo,
            @Valid @RequestBody CoursePageRequest coursePageRequest
    ) {
        log.info("Update Course Module Request :: Course Page No: '{}'", coursePageNo);
        CoursePageResponse response = coursesService.updateCoursePage(coursePageNo, coursePageRequest);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<GeneralAPIResponse> deleteCoursePage(
            @Valid @RequestParam(required = true, name = "coursePageNo") String coursePageNo
    ) {
        log.info("Delete Course Page Request :: Course Page No: '{}'", coursePageNo);
        GeneralAPIResponse response = coursesService.deleteCoursePage(coursePageNo
        );
        return ResponseEntity.ok(response);
    }
}