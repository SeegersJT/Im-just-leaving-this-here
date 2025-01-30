package za.co.ca.api.course.enums;

import lombok.Getter;

/**
 * @author Hanno Seegers
 */
@Getter
public enum CourseBreakoutStepEnum {
    NOT_STARTED("Course assigned to user"),
    STARTED("Course started by user"),
    COMPLETED_PASSED("Course completed and passed by user"),
    COMPLETED_FAILED("Course completed and failed by user"),
    EXPIRED("Course expired before completion; user did not pass")
    ;

    private final String breakoutStep;

    CourseBreakoutStepEnum(String breakoutStep) {
        this.breakoutStep = breakoutStep;
    }
}
