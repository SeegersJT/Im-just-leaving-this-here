import { useLocation } from 'react-router';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import { Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import MainCardComponent from 'components/card/MainCard.component';
import { Utils } from 'utils/Utils';

function BreadcrumbsContainer({ ...others }) {
  const location = useLocation();

  const locationSet = location.pathname.split('/').filter(Boolean);

  return (
    <>
      <MainCardComponent border={false} sx={{ m: 2, bgcolor: 'transparent' }} {...others} content={false}>
        <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={1}>
          <Grid item>
            <MuiBreadcrumbs aria-label="breadcrumb">
              {locationSet.map((location, index) => {
                const pathTo = `/${locationSet.slice(0, index + 1).join('/')}`;

                const isLast = index === locationSet.length - 1;

                return (
                  <Typography
                    key={index}
                    component={isLast ? 'span' : Link}
                    to={isLast ? undefined : pathTo}
                    color={isLast ? 'textPrimary' : 'textSecondary'}
                    variant={isLast ? 'subtitle1' : 'h6'}
                    sx={{ textDecoration: 'none' }}
                  >
                    {Utils.capitalizeFirstCharacter(location)}
                  </Typography>
                );
              })}
            </MuiBreadcrumbs>
          </Grid>
        </Grid>
      </MainCardComponent>
    </>
  );
}

BreadcrumbsContainer.propTypes = {};

export default BreadcrumbsContainer;
