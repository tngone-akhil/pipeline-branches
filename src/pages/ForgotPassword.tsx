import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [inputEmail, setEmail] = useState<string>('');
  const navigate = useNavigate();
  const handleSubmit = ()=>{
    console.log(inputEmail);
    navigate('/verification');
  }
  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      <Grid item xs={6}>
        <Grid sx={{ width: '71.66%', height: '40.74%', mt: '35.5%', ml: '12.5%' }}>
          <Typography sx={{ color: '#202224', fontSize: '32px', fontWeight: '700' }}>Forgot Password ?</Typography>
          <Typography sx={{ color: '#202224', fontSize: '18px', fontWeight: 600, opacity: 0.8, mt: '1.21%' }}>No worries we'll send you reset instructions.</Typography>
          <Grid sx={{ mt: '2.99%' }}>
            <Typography sx={{ color: '#202224', fontSize: '18px', fontWeight: 600, opacity: 0.8 }} >Email Address:</Typography>
            <TextField id="outlined-basic" type="email" variant="outlined" onChange={(e) => { setEmail(e.target.value) }} sx={{ width:"100%",mt: '1.40%' }} InputProps={{
              style: {
                borderRadius: '12px',
                border: '1px solid #D8D8D8'
              }
            }} required />
            <Button fullWidth variant="contained" sx={{ mt: '3.45%', height: '56px', borderRadius: '12px' }} onClick={handleSubmit}>Reset Password</Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Grid sx={{ width:'587px' ,maxWidth: '567px', maxheight: '589px', bgcolor: '#EEF2FF', borderRadius: '32px', mt: '20.11%' }}>
          <Box display={'flex'} justifyContent={'center'} py='18.1%' px={'18.1%'}>
            <img src="img/reset-password-01.png" alt="reset-password" style={{width: '100%' ,height:'100%' }}/>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ForgotPassword