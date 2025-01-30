import { ColorEnum } from 'utils/constants/Colors.enum';
import { CourseResultStatusEnum, CourseStatusEnum } from 'utils/constants/Users.enum';
import regex from 'utils/regex/Regex';

export const validateField = (type, value) => {
  switch (type) {
    case 'name':
    case 'surname':
      return regex.name.test(value);
    case 'emailAddress':
      return regex.email.test(value);
    case 'mobileNumber':
      return regex.mobileNumber.test(value);
    default:
      return true;
  }
};

export const getCourseStatusColor = (theme, backgroundColor, courseStatus, courseResultStatus) => {
  let color = ColorEnum.PRIMARY;

  if (courseStatus === CourseStatusEnum.NOT_STARTED) {
    color = ColorEnum.WARNING;
  }

  if (courseStatus === CourseStatusEnum.STARTED) {
    color = ColorEnum.PRIMARY;
  }

  if (courseStatus === CourseStatusEnum.COMPLETED) {
    if (courseResultStatus === CourseResultStatusEnum.PASSED) {
      color = ColorEnum.SUCCESS;
    }

    if (courseResultStatus === CourseResultStatusEnum.FAILED) {
      color = ColorEnum.ERROR;
    }
  }

  switch (color) {
    case ColorEnum.SECONDARY:
      return backgroundColor ? theme.palette.secondary.lighter : theme.palette.secondary.main;
    case ColorEnum.SUCCESS:
      return backgroundColor ? theme.palette.success.lighter : theme.palette.success.main;
    case ColorEnum.WARNING:
      return backgroundColor ? theme.palette.warning.lighter : theme.palette.warning.main;
    case ColorEnum.ERROR:
      return backgroundColor ? theme.palette.error.lighter : theme.palette.error.main;
    case ColorEnum.PRIMARY:
    default:
      return backgroundColor ? theme.palette.primary.lighter : theme.palette.primary.main;
  }
};
