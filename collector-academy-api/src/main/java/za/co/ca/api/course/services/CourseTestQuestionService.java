package za.co.ca.api.course.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import za.co.ca.api.course.repositories.CourseTestQuestionRepository;
import za.co.ca.api.common.exceptions.DataNotFoundException;
import za.co.ca.api.course.models.CourseTestQuestion;

import java.util.List;

/**
 * @author Hanno Seegers
 */
@Service
@RequiredArgsConstructor
public class CourseTestQuestionService {

    private final CourseTestQuestionRepository courseTestQuestionRepository;

    public List<CourseTestQuestion> findByCourseTestNo(String courseTestNo) {
        return courseTestQuestionRepository.findByCourseTestNoOrderBySystemDateAsc(courseTestNo);
    }

    public CourseTestQuestion findByCourseTestQuestionNo(String courseTestQuestionNo) {
        return courseTestQuestionRepository.findByCourseTestQuestionNo(courseTestQuestionNo)
                .orElseThrow(() -> new DataNotFoundException("Course Test Question not found :: Course Test Question No: '" + courseTestQuestionNo + "'"));
    }

    public void saveCourseTestQuestion(CourseTestQuestion courseTestQuestion) {
        courseTestQuestionRepository.save(courseTestQuestion);
    }

    public void saveCourseTestQuestions(List<CourseTestQuestion> courseTestQuestions) {
        courseTestQuestionRepository.saveAll(courseTestQuestions);
    }
}
