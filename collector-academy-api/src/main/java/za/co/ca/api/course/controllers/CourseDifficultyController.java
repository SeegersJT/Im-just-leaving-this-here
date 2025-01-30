package za.co.ca.api.course.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import za.co.ca.api.course.payloads.responses.CourseDifficultyResponse;
import za.co.ca.api.course.services.CoursesService;

import java.util.List;

/**
 * @author Hanno Seegers
 */
@RestController
@RequestMapping("/api/course/difficulty")
@RequiredArgsConstructor
@Slf4j
public class CourseDifficultyController {

    private final CoursesService coursesService;

    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<CourseDifficultyResponse> getCourseDifficulty(
            @Valid @RequestParam(required = true, name = "courseDifficultyNo") Integer courseDifficultyNo
    ) {
        log.info("Get Course Difficulty Request :: Course Difficulty No: '{}'", courseDifficultyNo);
        CourseDifficultyResponse response = coursesService.getCourseDifficulty(courseDifficultyNo);
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<List<CourseDifficultyResponse>> getAllCourseDifficulties() {
        log.info("Get all Course Difficulties Request");
        List<CourseDifficultyResponse> response = coursesService.getAllCourseDifficulties();
        return ResponseEntity.ok(response);
    }
}
