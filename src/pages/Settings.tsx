import { Grid, Typography } from '@mui/material'
function SettingsPage() {
  return (
    <Grid container display={'flex'} flexDirection={'column'}>
      <Grid item>
        <Typography sx={{fontSize:'20px'}}>Settings</Typography>
      </Grid>
      <Grid item mt={'51px'} gap={'39px'} display={'flex'} flexWrap={'wrap'}>
        <Grid sx={{ bgcolor: '#876FFF', width: '244px', height: '155px', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <img src='/img/Profile.svg' />
          <Typography sx={{ color: 'white',fontSize:'16px', mt:'12px',fontWeight:600 }}>Profile</Typography>
        </Grid>
        <Grid sx={{ bgcolor:'#0184E9', width: '244px', height: '155px', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <img src='/img/Unlock.svg' />
          <Typography sx={{ color: 'white',fontSize:'16px', mt:'12px',fontWeight:600 }}>Change Password</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default SettingsPage