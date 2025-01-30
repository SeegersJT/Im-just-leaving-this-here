package za.co.ca.api.course.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import za.co.ca.api.common.exceptions.DataNotFoundException;
import za.co.ca.api.course.enums.CourseDifficultyEnum;
import za.co.ca.api.course.models.CourseDifficulty;
import za.co.ca.api.course.repositories.CourseDifficultyRepository;

import java.util.List;

/**
 * @author Hanno Seegers
 */
@Service
@RequiredArgsConstructor
public class CourseDifficultyService {
    private final CourseDifficultyRepository courseDifficultyRepository;

    public List<CourseDifficulty> findAll() {
        return courseDifficultyRepository.findAll();
    }

    public CourseDifficulty findByCourseDifficulty(CourseDifficultyEnum courseDifficultyEnum) {
        return courseDifficultyRepository.findByCourseDifficulty(courseDifficultyEnum)
                .orElseThrow(() -> new DataNotFoundException("Course Difficulty not found :: Course Difficulty: '" + courseDifficultyEnum.name() + "'"));
    }

    public CourseDifficulty findByCourseDifficultyNo(Integer courseDifficultyNo) {
        return courseDifficultyRepository.findByCourseDifficultyNo(courseDifficultyNo)
                .orElseThrow(() -> new DataNotFoundException("Course Difficulty not found :: Course Difficulty No: '" + courseDifficultyNo.toString() + "'"));
    }
}
