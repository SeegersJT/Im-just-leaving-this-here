import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const getIsValidBorderColor = (theme, type) => {
  switch (type) {
    case 0:
      return theme.palette.error.main;
    case 2:
      return theme.palette.warning.main;
    case 1:
    default:
      return theme.palette.secondary.light;
  }
};

const getIsValidHoverColor = (theme, type) => {
  switch (type) {
    case 0:
      return theme.palette.error.main;
    case 2:
      return theme.palette.warning.main;
    case 1:
    default:
      return theme.palette.primary.main;
  }
};
const getIsValidFocusColor = (theme, type) => {
  switch (type) {
    case 0:
      return theme.palette.error.main;
    case 2:
      return theme.palette.warning.main;
    case 1:
    default:
      return theme.palette.primary.main;
  }
};

const getIsValidColor = (theme, type) => {
  switch (type) {
    case 0:
      return theme.palette.error.main;
    case 2:
      return theme.palette.warning.main;
    case 1:
    default:
      return theme.palette.secondary[600];
  }
};

const selectLabelStyle = (theme, type) => {
  return {
    flex: 1,
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: getIsValidBorderColor(theme, type)
      },
      '&:hover fieldset': {
        borderColor: getIsValidHoverColor(theme, type)
      },
      '&.Mui-focused fieldset': {
        borderColor: getIsValidBorderColor(theme, type)
      },
      '& .MuiFormLabel-root': {
        color: getIsValidColor(theme, type)
      }
    },
    '& .MuiFormLabel-root.Mui-focused': {
      color: getIsValidFocusColor(theme, type)
    }
  };
};

function SelectLabel({ title, type = 1, menuItems, multiple = false, selectedItems, onSelectedMenuItemsChange }) {
  const theme = useTheme();

  const handleOnTestChange = (value) => {
    onSelectedMenuItemsChange(value);
  };

  return (
    <>
      <FormControl sx={selectLabelStyle(theme, type)}>
        <InputLabel id="select-label">{title}</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          inputProps={{ 'aria-label': 'Without label' }}
          multiple={multiple}
          value={selectedItems}
          label={title}
          onChange={(event) => handleOnTestChange(event.target.value)}
        >
          <MenuItem sx={{ display: 'none' }} disabled value="">
            <em>No Items Selected</em>
          </MenuItem>
          {menuItems.map((menuItem, index) => (
            <MenuItem disabled={menuItem.value === 0} key={index} value={menuItem.value}>
              {menuItem.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

SelectLabel.propTypes = {};

export default SelectLabel;
