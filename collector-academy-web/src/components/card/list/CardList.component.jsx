import {
  Avatar,
  Grid,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  Typography
} from '@mui/material';
import MainCardComponent from 'components/card/MainCard.component';
import { GiftOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Utils } from 'utils/Utils';

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

const emptyList = [
  {
    title: 'No Data Found',
    description: '',
    titleRight: '',
    descriptionRight: '',
    disabled: false
  }
];

function CardList({ title, data, scrollable, height }) {
  const [list, setList] = useState(data);

  useEffect(() => {
    if (Utils.isEmpty(list)) {
      setList(emptyList);
    } else {
      setList(data);
    }
  }, [data, list]);

  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography component="div" sx={{ height: '24px' }} variant="h5">
            {title}
          </Typography>
        </Grid>
        <Grid item />
      </Grid>
      <MainCardComponent sx={{ mt: 2 }} content={false} scrollable={scrollable} height={height}>
        <List
          component="nav"
          sx={{
            px: 0,
            py: 0,
            '& .MuiListItemButton-root': {
              py: 1.5,
              '& .MuiAvatar-root': avatarSX,
              '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
            }
          }}
        >
          {list.map((item, index) => {
            return (
              <ListItemButton divider key={index} disabled={item.disabled} onClick={item.onClick}>
                <ListItemAvatar>
                  <Avatar sx={{ color: item.color, bgcolor: item.backgroundColor }}>{item.icon ? item.icon : <GiftOutlined />}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={<Typography variant="subtitle1">{item.title}</Typography>} secondary={item.description} />
                <ListItemSecondaryAction>
                  <Stack alignItems="flex-end">
                    <Typography variant="subtitle1" noWrap>
                      {item.titleRight}
                    </Typography>
                    <Typography variant="h6" color="secondary" noWrap>
                      {item.descriptionRight}
                    </Typography>
                  </Stack>
                </ListItemSecondaryAction>
              </ListItemButton>
            );
          })}
        </List>
      </MainCardComponent>
    </>
  );
}

CardList.propTypes = {};

export default CardList;
