import { CellAlign, CellPadding, CellWeight } from 'utils/constants/Table.enum';
import { Utils } from 'utils/Utils';

export const getHeaderModifiers = () => [
  { id: 'courseTitle', label: 'COURSE TITLE', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'courseStatusDescription', label: 'STATUS', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'courseResultStatus', label: 'RESULT', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'courseAssignedUsername', label: 'ASSIGNED BY', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'courseAssignedDate', label: 'ASSIGNED BY DATE', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'courseStartedDate', label: 'STARTED DATE', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'courseCompletedDate', label: 'COMPLETED DATE', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'courseExpiryDate', label: 'EXPIRY DATE', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'courseBreakoutStep', label: 'BREAKOUT', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'courseBreakoutStepDate', label: 'BREAKOUT DATE', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD }
];

export const getColumnModifiers = () => [
  { id: 'courseTitle', label: 'COURSE TITLE', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'courseStatusDescription', label: 'STATUS', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'courseResultStatus', label: 'RESULT', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'courseAssignedUsername', label: 'ASSIGNED BY', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'courseAssignedDate', label: 'ASSIGNED BY DATE', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'courseStartedDate', label: 'STARTED DATE', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'courseCompletedDate', label: 'COMPLETED DATE', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'courseExpiryDate', label: 'EXPIRY DATE', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'courseBreakoutStep', label: 'BREAKOUT', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'courseBreakoutStepDate', label: 'BREAKOUT DATE', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD }
];

export const formatMyCoursesData = (cellData) => {
  return cellData.map((myCourse) => {
    return {
      uuid: myCourse.uuid,
      courseResultNo: myCourse.courseResultNo,
      courseNo: myCourse.courseNo,
      courseTitle: myCourse.courseTitle,
      courseDescription: myCourse.courseDescription,
      courseDuration: myCourse.courseDuration,
      courseDifficultyNo: myCourse.courseDifficultyNo,
      courseDifficulty: myCourse.courseDifficulty,
      employeeNo: myCourse.employeeNo,
      username: myCourse.username,
      courseStatusNo: myCourse.courseStatusNo,
      courseStatus: myCourse.courseStatus,
      courseStatusDescription: myCourse.courseStatusDescription,
      courseResultStatusNo: myCourse.courseResultStatusNo,
      courseResultStatus: myCourse.courseResultStatus,
      courseAssignedBy: myCourse.courseAssignedBy,
      courseAssignedUsername: myCourse.courseAssignedUsername,
      courseAssignedDate: Utils.formatDate(myCourse.courseAssignedDate),
      courseStartedDate: Utils.formatDate(myCourse.courseStartedDate),
      courseCompletedDate: Utils.formatDate(myCourse.courseCompletedDate),
      courseExpiryDate: Utils.formatDate(myCourse.courseExpiryDate),
      courseBreakoutStep: myCourse.courseBreakoutStep,
      courseBreakoutStepDate: Utils.formatDate(myCourse.courseBreakoutStepDate),
      active: myCourse.active
    };
  });
};
