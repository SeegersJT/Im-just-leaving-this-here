import { forwardRef } from 'react';

import { useTheme } from '@mui/material/styles';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

function NavigationItem({ item, level }) {
  const theme = useTheme();

  let itemTarget = '_self';

  if (item.target) {
    itemTarget = '_blank';
  }
  let listItemProps = { component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url} target={itemTarget} />) };

  if (item?.external) {
    listItemProps = { component: 'a', href: item.url, target: itemTarget };
  }

  const Icon = item.icon;
  const itemIcon = item.icon ? <Icon style={{ fontSize: '1rem' }} /> : false;

  const { pathname } = useLocation();
  //   const isSelected = !!matchPath({ path: item.url, end: false }, pathname) || openItem === item.id;
  const isSelected = !!matchPath({ path: item.url, end: false }, pathname);

  const textColor = 'text.primary';
  const iconSelectedColor = 'primary.main';

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      //   onClick={() => handlerActiveItem(item.id)}
      onClick={() => {}}
      selected={isSelected}
      sx={{
        zIndex: 1201,
        pl: `${level * 28}px`,
        py: 1.25,
        ...{
          '&:hover': {
            bgcolor: 'primary.lighter'
          },
          '&.Mui-selected': {
            bgcolor: 'primary.lighter',
            borderRight: `2px solid ${theme.palette.primary.main}`,
            color: iconSelectedColor,
            '&:hover': {
              color: iconSelectedColor,
              bgcolor: 'primary.lighter'
            }
          }
        }
      }}
    >
      {itemIcon && (
        <ListItemIcon
          sx={{
            minWidth: 28,
            color: isSelected ? iconSelectedColor : textColor,
            ...{
              borderRadius: 1.5,
              width: 36,
              height: 36,
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                bgcolor: 'secondary.lighter'
              }
            },
            ...(isSelected && {
              bgcolor: 'primary.lighter',
              '&:hover': {
                bgcolor: 'primary.lighter'
              }
            })
          }}
        >
          {itemIcon}
        </ListItemIcon>
      )}
      <ListItemText
        primary={
          <Typography variant="h6" sx={{ color: isSelected ? iconSelectedColor : textColor }}>
            {item.title}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

NavigationItem.propTypes = {};

export default NavigationItem;
