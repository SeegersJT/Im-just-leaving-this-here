import {
  Avatar,
  Box,
  Grid,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  Typography
} from '@mui/material';
import MainCardComponent from '../MainCard.component';
import { GiftOutlined } from '@ant-design/icons';

const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

function CardGroup({ title = 'Card Group', data = [], spacing = 3, wrap }) {
  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography sx={{ height: '24px' }} variant="h5">
            {title}
          </Typography>
        </Grid>
        <Grid item />
      </Grid>
      <List
        component="nav"
        sx={{
          px: 0,
          py: 0,
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          '& .MuiListItemButton-root': {
            py: 1.5,
            '& .MuiAvatar-root': avatarSX,
            '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
          }
        }}
      >
        {data.map((item, index) => (
          <Grid key={index} item xs={12} lg={spacing}>
            <MainCardComponent sx={{ mt: 2, mr: 2 }} content={false} scrollable={true} height={500}>
              <ListItemButton divider key={index} disabled={item.disabled} onClick={item.onClick}>
                <ListItemAvatar>
                  <Avatar sx={{ color: item.color, bgcolor: item.backgroundColor }}>{item.icon ? item.icon : <GiftOutlined />}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      variant="subtitle1"
                      sx={{
                        overflow: 'hidden',
                        whiteSpace: wrap ? 'normal' : 'nowrap',
                        textOverflow: 'ellipsis',
                        maxWidth: '250px' // Adjust based on your layout
                      }}
                    >
                      {item.title}
                    </Typography>
                  }
                  secondary={
                    <Box
                      sx={{
                        overflow: 'hidden',
                        whiteSpace: wrap ? 'normal' : 'nowrap',
                        textOverflow: 'ellipsis',
                        maxWidth: '300px'
                      }}
                    >
                      {item.description}
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  <Stack alignItems="flex-end">
                    <Typography variant="subtitle1" noWrap>
                      {item.titleRight}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="secondary"
                      noWrap
                      sx={{
                        overflow: 'hidden',
                        whiteSpace: wrap ? 'normal' : 'nowrap',
                        textOverflow: 'ellipsis',
                        maxWidth: '150px' // Adjust based on your layout
                      }}
                    >
                      {item.descriptionRight}
                    </Typography>
                  </Stack>
                </ListItemSecondaryAction>
              </ListItemButton>
            </MainCardComponent>
          </Grid>
        ))}
      </List>
    </>
  );
}

CardGroup.propTypes = {};

export default CardGroup;
