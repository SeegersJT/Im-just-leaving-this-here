import { CellAlign, CellPadding, CellWeight } from 'utils/constants/Table.enum';
import { Utils } from 'utils/Utils';

export const getHeaderModifiers = () => [
  { id: 'courseTitle', label: 'TITLE', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'courseDescription', label: 'DESCRIPTION', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'courseDuration', label: 'DURATION', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'courseDifficulty', label: 'DIFFICULTY', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'courseDate', label: 'DATE', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD }
];

export const getColumnModifiers = () => [
  { id: 'courseTitle', label: 'TITLE', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'courseDescription', label: 'DESCRIPTION', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'courseDuration', label: 'DURATION', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'courseDifficulty', label: 'DIFFICULTY', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'courseDate', label: 'DATE', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD }
];

export const formatCoursesData = (coursesData) => {
  return coursesData.map((course) => ({
    uuid: course.uuid,
    courseTitle: course.courseTitle,
    courseDescription: course.courseDescription,
    courseDuration: Utils.formatMinutes(course.courseDuration),
    courseDifficulty: course.courseDifficulty,
    courseDate: Utils.formatDateTime(course.courseDate)
  }));
};
