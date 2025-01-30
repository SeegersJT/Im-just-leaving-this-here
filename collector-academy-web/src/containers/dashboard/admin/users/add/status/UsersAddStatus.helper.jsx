import { CellAlign, CellPadding, CellWeight } from 'utils/constants/Table.enum';

export const getHeaderModifiers = () => [
  { id: 'errors', label: 'REASON', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'name', label: 'NAME', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'surname', label: 'SURNAME', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'idNumber', label: 'ID NUMBER', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'emailAddress', label: 'EMAIL ADDRESS', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'mobileNumber', label: 'MOBILE NUMBER', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'gender', label: 'GENDER', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'branchName', label: 'BRANCH NAME', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  {
    id: 'performanceManagerUsername',
    label: 'PERFORMANCE MANAGER',
    align: CellAlign.LEFT,
    padding: CellPadding.NORMAL,
    weight: CellWeight.BOLD
  }
];

export const getColumnModifiers = (theme) => [
  {
    id: 'errors',
    label: 'REASON',
    align: CellAlign.LEFT,
    padding: CellPadding.NORMAL,
    weight: CellWeight.BOLD,
    color: theme.palette.error.main
  },
  {
    id: 'name',
    label: 'NAME',
    align: CellAlign.LEFT,
    padding: CellPadding.NORMAL,
    color: theme.palette.error.main
  },
  {
    id: 'surname',
    label: 'SURNAME',
    align: CellAlign.LEFT,
    padding: CellPadding.NORMAL,
    color: theme.palette.error.main
  },
  {
    id: 'idNumber',
    label: 'ID NUMBER',
    align: CellAlign.LEFT,
    padding: CellPadding.NORMAL,
    color: theme.palette.error.main
  },
  {
    id: 'emailAddress',
    label: 'EMAIL ADDRESS',
    align: CellAlign.LEFT,
    padding: CellPadding.NORMAL,
    color: theme.palette.error.main
  },
  {
    id: 'mobileNumber',
    label: 'MOBILE NUMBER',
    align: CellAlign.LEFT,
    padding: CellPadding.NORMAL,
    color: theme.palette.error.main
  },
  {
    id: 'gender',
    label: 'GENDER',
    align: CellAlign.LEFT,
    padding: CellPadding.NORMAL,
    color: theme.palette.error.main
  },
  {
    id: 'branchName',
    label: 'BRANCH NAME',
    align: CellAlign.LEFT,
    padding: CellPadding.NORMAL,
    color: theme.palette.error.main
  },
  {
    id: 'performanceManagerUsername',
    label: 'PERFORMANCE MANAGER',
    align: CellAlign.LEFT,
    padding: CellPadding.NORMAL,
    color: theme.palette.error.main
  }
];

export const formatUserUploadsData = (theme, cellData) => {
  return cellData.map((user) => ({
    uuid: user.uuid,
    errors: user.errors[0],
    name: user.name,
    surname: user.surname,
    idNumber: user.idNumber,
    emailAddress: user.emailAddress,
    mobileNumber: user.mobileNumber,
    gender: user.gender,
    branchName: user.branchName,
    performanceManagerUsername: user.performanceManagerUsername,
    rowColor: theme.palette.error.lighter
  }));
};
