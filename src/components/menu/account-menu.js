import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import PermIdentity from '@mui/icons-material/PermIdentity';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import NextLink from 'next/link';
import { getAvatar, signOutRequest } from '../../utils/config';
import { useEffect, useState } from 'react';

export const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('USER_INFORMATION')) !== null) {
      if (typeof JSON.parse(localStorage.getItem('USER_INFORMATION')).avatarUrl !== 'undefined') {
        getAvatar(JSON.parse(localStorage.getItem('USER_INFORMATION')).avatarUrl)
          .then(imageBlob => {
            if (imageBlob.type === 'application/octet-stream') {
              const imageObjectURL = URL.createObjectURL(imageBlob);
              setAvatar(imageObjectURL);
            }
          });
      }
    }
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account Settings">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <Avatar sx={{ width: 40, height: 40 }} src={avatar}/>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <NextLink href={'/account'} passHref>
          <MenuItem>
            <ListItemIcon>
              <PermIdentity fontSize="small"/>
            </ListItemIcon>
            Profile
          </MenuItem>
        </NextLink>
        <NextLink href={'/settings'} passHref>
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small"/>
            </ListItemIcon>
            Settings
          </MenuItem>
        </NextLink>
        <NextLink href={'/login'} passHref>
          <MenuItem onClick={() => {
            const token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH'));

            if (token !== null) {
              signOutRequest(token.accessToken);
            }
          }}>
            <ListItemIcon>
              <Logout fontSize="small"/>
            </ListItemIcon>
            Logout
          </MenuItem>
        </NextLink>
      </Menu>
    </React.Fragment>
  );
};
