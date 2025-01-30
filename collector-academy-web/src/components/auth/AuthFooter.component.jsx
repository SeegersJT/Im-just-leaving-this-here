import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

function AuthFooter() {
  return (
    <Container maxWidth="xl">
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent={{ xs: 'center', sm: 'space-between' }}
        spacing={2}
        textAlign={{ xs: 'center', sm: 'inherit' }}
      >
        <Typography variant="subtitle2" color="secondary">
          This site is protected by{' '}
          <Typography component={Link} variant="subtitle2" href="/under-construction" underline="hover">
            Privacy Policy
          </Typography>
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 3 }} textAlign={{ xs: 'center', sm: 'inherit' }}>
          <Typography variant="subtitle2" color="secondary" component={Link} href="/under-construction" underline="hover">
            Terms and Conditions
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
}

export default AuthFooter;
