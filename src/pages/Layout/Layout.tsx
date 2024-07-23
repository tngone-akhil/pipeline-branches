import { Grid, List, ListItem, ListItemText, ImageListItem, ListItemButton, ListItemIcon, Box, Typography, Button, Popover, Stack, CircularProgress, useMediaQuery } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ENDPOINTS } from '../../utils/sevices'
import { useSelector } from 'react-redux';
import { RootState } from '../../utils/store';
import { useTheme } from '@mui/material/styles';
import styles from './Layout.module.css'

interface RowsTypes {
  message: string,
  createdDate: string
}
function Layout() {
  const [notificationAnchor, setNotificationAnchor] = React.useState<HTMLButtonElement | null>(null);
  const [rows, setRows] = useState<RowsTypes[]>([{
    message: ' ',
    createdDate: ' '
  }]);

  const headers = useSelector((state: RootState) => state.auth.token);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const [dashBoardActive, setDashboardActive] = useState(false);
  const [taskManageActive, setTaskManageActive] = useState(false);
  const [settingsActive, setSettingsActive] = useState(false);

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  useEffect(() => {
    setDashboardActive(['/', '/tasks/completed', '/tasks/pending'].includes(location.pathname));
    setTaskManageActive(location.pathname.startsWith('/task-management'));
    setSettingsActive(location.pathname === '/settings');
  });


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/login')
  }
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleNotiClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    setNotificationAnchor(event.currentTarget);
    await axios.get(ENDPOINTS.NOTIFICATION_URL, { headers })
      .then((response) => {
        setRows(response.data.notificationList);
      }).catch((error) => {
        setLoading(false)
        console.log("error", error)
      }).finally(() => { setLoading(false) })
  };
  const handleNotiClose = () => {
    setNotificationAnchor(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const notificationOpen = Boolean(notificationAnchor);
  const notificationId = notificationOpen ? 'simple-popover' : undefined;
  return (
    <Grid container display={'flex'}>
      <Grid item className={isLargeScreen ? '' : styles.ForLargeScreen} border={1} borderColor={'#EEEEEE'} height={'100vh'}>
        <Grid display={'flex'} justifyContent={'flex-start'}>
          <List>
            <ListItem >
              <ImageListItem >
                <img src='/img/logo-def.png' alt='nnl' />
              </ImageListItem>
            </ListItem>
            <ListItem >
              <ListItemButton onClick={() => navigate('/')} className={dashBoardActive ? 'active-button' : ''} sx={{ bgcolor: 'white', color: '#616161', borderRadius: '12px', height: '49px', width: '100%' }}>
                <ListItemIcon>
                  <img src={dashBoardActive ? '/img/Category_Active.svg' : '/img/Category.svg'} />
                </ListItemIcon>
                <ListItemText>Dashboard</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem >
              <ListItemButton onClick={() => navigate('/task-management')} className={taskManageActive ? 'active-button' : ''} sx={{ bgcolor: 'white', color: '#616161', borderRadius: '12px', height: '49px', width: '214px' }}>
                <ListItemIcon>
                  <img src={taskManageActive ? '/img/Document_Active.svg' : '/img/Document.svg'}></img>
                </ListItemIcon>
                <ListItemText sx={{ fontSize: '16px' }}>Task Management</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem >
              <ListItemButton onClick={() => navigate('/settings')} className={settingsActive ? 'active-button' : ''} sx={{ bgcolor: 'white', color: '#616161', borderRadius: '12px', height: '49px', width: '214px' }}>
                <ListItemIcon>
                  <img src={settingsActive ? '/img/Setting_Active.svg' : '/img/Setting.svg'}></img>
                </ListItemIcon>
                <ListItemText>Settings</ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <Grid item overflow={'auto'} height={'100vh'} flex={1}>
        <Grid
          position={'fixed'}
          width={'100vw'}
          top={0}
          z-index={100}
          height={'7.47%'}
          display={'flex'}
          justifyContent={isLargeScreen ? 'flex-end' : 'space-between'}
          alignItems={'center'}
          border={1}
          borderColor={'#EEEEEE'}
          sx={{ backgroundColor: 'white', opacity: 1 }}
        >
          <Grid className={!isLargeScreen ? '' : styles.ForLargeScreen} >
            <img src='/img/menu_Icon.svg' />
          </Grid>
          <Grid display={'flex'} alignItems={'center'} >
            <Box mr={'15px'} >
              <Button aria-describedby={id} variant="text" onClick={handleNotiClick}>
                <img src='/img/Notification.svg' />
              </Button>
              <Popover
                id={notificationId}
                open={notificationOpen}
                anchorEl={notificationAnchor}
                onClose={handleNotiClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <Button variant='text' sx={{ position: 'absolute', bgcolor: '#FFFFFF', right: 0, mt: '15px' }} onClick={handleNotiClose}>
                  <img src='/img/Close Square.svg' />
                </Button>
                <Grid container sx={{
                  width: '393px',
                  height: '448px',
                  overflow: 'scroll',
                  py: '26px',
                }}>
                  {loading ?
                    <Grid
                      sx={{ width: "100vw", justifyContent: "center", display: "flex", alignItems: "center" }}>
                      <CircularProgress color="inherit" />
                    </Grid>
                    :
                    rows.map((row, i) => {
                      return (
                        <Grid key={i} item xs={12} minHeight={'93px'} borderBottom={'1px solid #EEEEEE'}>
                          <Stack direction={'row'} height={'100%'}>
                            <Box p={'16px'} >
                              <img src='/img/flash.svg' style={{ backgroundColor: '#DDDEE1', padding: '8px', borderRadius: '32px' }} />
                            </Box>
                            <Stack py={'16px'} direction={'column'} justifyContent={'space-between'}>
                              <Box>
                                <Typography sx={{ fontSize: '14px' }}>
                                  <b>{row.message}</b>
                                </Typography>
                              </Box>
                              <Box>
                                <Typography sx={{ color: '#A5ACB8', fontSize: '14px', fontWeight: 500 }}>
                                  {row.createdDate}
                                </Typography>
                              </Box>
                            </Stack>
                          </Stack>
                        </Grid>
                      )
                    })
                  }
                </Grid>
              </Popover>
            </Box>
            <Box>
              <Button aria-describedby={id} onClick={handleClick}
                sx={{ textTransform: 'none !important' }}>
                <Grid display={'flex'} flexDirection={'column'}>
                  <Box>
                    <Typography sx={{ fontSize: '16px', color: '#0F0F0F' }}>name</Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '12px', color: '#7B7B7B' }} >position</Typography>
                  </Box>
                </Grid>
                <img src='/img/chevron-down.svg' />
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                anchorReference="anchorPosition"
                anchorPosition={{ top: 70, left: 1777 }}
                onClick={handleLogout}
              >
                <Typography sx={{
                  width: '207px',
                  height: '53.59px',
                  justifyContent: 'flex-start',
                  display: 'flex',
                  alignItems: 'center',
                  pl: 2,
                  color: '#FF0909',
                  cursor: 'pointer'
                }}>Log out</Typography>
              </Popover>
            </Box>
          </Grid>
        </Grid>
        <Grid item p={'4%'} mt={'25px'}>
          <Outlet />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Layout;
