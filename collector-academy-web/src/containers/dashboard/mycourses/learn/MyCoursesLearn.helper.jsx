export const getTestStatusColor = (statusNo, theme) => {
  switch (statusNo) {
    case 1:
      return {
        color: theme.palette.warning.main,
        backgroundColor: theme.palette.warning.lighter
      };
    case 2:
      return {
        color: theme.palette.success.main,
        backgroundColor: theme.palette.success.lighter
      };
    case null:
      return {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.lighter
      };
    default:
      return {
        color: theme.palette.error.main,
        backgroundColor: theme.palette.error.lighter
      };
  }
};
