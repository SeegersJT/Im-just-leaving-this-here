import Logo from 'components/logo/Logo.component';

function DrawerHeader() {
  return (
    <Logo
      sx={{
        '& .MuiStack-root': {
          margin: '20px 10px'
        }
      }}
    />
  );
}

DrawerHeader.propTypes = {};

export default DrawerHeader;
