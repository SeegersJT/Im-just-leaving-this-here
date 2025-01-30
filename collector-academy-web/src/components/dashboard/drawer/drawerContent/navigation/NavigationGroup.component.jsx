import { Box, List, Typography } from '@mui/material';

function NavigationGroup({ title, navigationChildren }) {
  return (
    <List
      subheader={
        title && (
          <Box sx={{ pl: 3 }}>
            <Typography variant="subtitle2" color="textSecondary">
              {title}
            </Typography>
          </Box>
        )
      }
      sx={{ mb: 1.5, py: 0, zIndex: 0 }}
    >
      {navigationChildren}
    </List>
  );
}

NavigationGroup.propTypes = {};

export default NavigationGroup;
