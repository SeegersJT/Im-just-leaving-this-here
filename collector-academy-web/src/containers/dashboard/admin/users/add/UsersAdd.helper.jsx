import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Stack, Tooltip, Typography } from '@mui/material';
import { CellAlign, CellPadding, CellWeight } from 'utils/constants/Table.enum';

export const getHeaderModifiers = () => [
  { id: 'NAME', label: 'NAME', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'SURNAME', label: 'SURNAME', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'ID_NUMBER', label: 'ID NUMBER', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'EMAIL_ADDRESS', label: 'EMAIL ADDRESS', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'MOBILE_NUMBER', label: 'MOBILE NUMBER', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'GENDER', label: 'GENDER', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'BRANCH_NAME', label: 'BRANCH NAME', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'PERFORMANCE_MANAGER', label: 'PERFORMANCE MANAGER', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD }
];

export const getColumnModifiers = () => [
  { id: 'NAME', label: 'NAME', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'SURNAME', label: 'SURNAME', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'ID_NUMBER', label: 'ID NUMBER', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'EMAIL_ADDRESS', label: 'EMAIL ADDRESS', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'MOBILE_NUMBER', label: 'MOBILE NUMBER', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'GENDER', label: 'GENDER', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'BRANCH_NAME', label: 'BRANCH NAME', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD },
  { id: 'PERFORMANCE_MANAGER', label: 'PERFORMANCE MANAGER', align: CellAlign.LEFT, padding: CellPadding.NORMAL, weight: CellWeight.BOLD }
];

export const formatUsersData = (theme, cellData, validityUsersData, validityReasonUsersData) => {
  return cellData.map((user) => {
    const randomId = user.randomId;

    const validity = validityUsersData.find((item) => item.randomId === randomId);
    const validityReason = validityReasonUsersData.find((item) => item.randomId === randomId);

    const formatCell = (header) => {
      const isValid = validity ? validity[header] : true;
      const reason = validityReason ? validityReason[header] || 'No reason provided' : 'No reason provided';

      return (
        <Tooltip key={`${randomId}-${header}`} title={isValid ? '' : reason}>
          <Stack direction="row" spacing={2} alignItems="center">
            {isValid ? (
              <CheckCircleOutlined style={{ fontSize: '1.15rem', color: theme.palette.success.main }} />
            ) : (
              <CloseCircleOutlined style={{ fontSize: '1.15rem', color: theme.palette.error.main }} />
            )}
            <Typography color={isValid ? 'textPrimary' : 'error'}>{user[header]}</Typography>
          </Stack>
        </Tooltip>
      );
    };

    return {
      uuid: user.uuid,
      NAME: formatCell('NAME'),
      SURNAME: formatCell('SURNAME'),
      ID_NUMBER: formatCell('ID_NUMBER'),
      EMAIL_ADDRESS: formatCell('EMAIL_ADDRESS'),
      MOBILE_NUMBER: formatCell('MOBILE_NUMBER'),
      GENDER: formatCell('GENDER'),
      BRANCH_NAME: formatCell('BRANCH_NAME'),
      PERFORMANCE_MANAGER: formatCell('PERFORMANCE_MANAGER')
    };
  });
};
