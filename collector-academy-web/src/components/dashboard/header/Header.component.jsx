import { MenuFoldOutlined } from '@ant-design/icons';
import { Chip, IconButton, Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function Header() {
  const theme = useTheme();

  return (
    <Toolbar
      sx={{
        borderBottom: `1px solid ${theme.palette.divider}`
      }}
    >
      <IconButton
        disableRipple
        aria-label="open drawer"
        // onClick={() => handlerDrawerOpen(!drawerOpen)}
        edge="start"
        color="secondary"
        variant="light"
        // sx={{ color: 'text.primary', bgcolor: drawerOpen ? iconBackColorOpen : iconBackColor, ml: { xs: 0, lg: -2 } }}
        sx={{ color: 'text.primary', bgcolor: 'grey.200', ml: { xs: 0, lg: -2 } }}
      >
        {/* {!drawerOpen ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} */}
        {<MenuFoldOutlined />}
      </IconButton>
      {
        <Chip
          label={import.meta.env.VITE_APP_VERSION}
          variant="outlined"
          size="small"
          color="secondary"
          sx={{ mt: 0.5, ml: 1, fontSize: '0.725rem', height: 20, '& .MuiChip-label': { px: 0.5 } }}
        />
      }
      {/* {headerContent} */}
    </Toolbar>
  );
}

Header.propTypes = {};

export default Header;
