package za.co.ca.api.course.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import za.co.ca.api.course.repositories.CourseTestAnswerRepository;
import za.co.ca.api.common.exceptions.DataNotFoundException;
import za.co.ca.api.course.models.CourseTestAnswer;

import java.util.List;

/**
 * @author Hanno Seegers
 */
@Service
@RequiredArgsConstructor
public class CourseTestAnswerService {

    private final CourseTestAnswerRepository courseTestAnswerRepository;

    public List<CourseTestAnswer> findByCourseTestQuestionNo(String courseTestQuestionNo) {
        return courseTestAnswerRepository.findByCourseTestQuestionNoOrderBySystemDateAsc(courseTestQuestionNo);
    }

    public CourseTestAnswer findByCourseTestAnswerNo(String courseTestAnswerNo) {
        return courseTestAnswerRepository.findByCourseTestAnswerNo(courseTestAnswerNo)
                .orElseThrow(() -> new DataNotFoundException("Course Test Answer not found :: Course Test Answer No: '" + courseTestAnswerNo + "'"));
    }

    public void saveCourseTestAnswer(CourseTestAnswer courseTestAnswer) {
        courseTestAnswerRepository.save(courseTestAnswer);
    }

    public void saveCourseTestAnswers(List<CourseTestAnswer> courseTestAnswers) {
        courseTestAnswerRepository.saveAll(courseTestAnswers);
    }
}
