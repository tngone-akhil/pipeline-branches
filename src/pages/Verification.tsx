import { Box, Button, Grid, Typography } from "@mui/material"
import OTP from "../components/OTP";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Verification() {
    const initialTimer = localStorage.getItem('otpTimer') ? Number(localStorage.getItem('otpTimer')) : 180;
    const [timer, setTimer] = useState(initialTimer);
    const [showResend, setShowResend] = useState(false);
    const [showSubmitBtn, setShowSubmitBtn] = useState(false);
    const navigate = useNavigate();

    const [otp, setOtp] = React.useState('');
    useEffect(() => {
        if (otp.length == 6) {
            setShowSubmitBtn(true);
        } else {
            setShowSubmitBtn(false);
        }
    }, [otp]);
    const handleSubmit = () => {
        console.log(otp)
        navigate('/')
    }
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer > 0) {
                    return prevTimer - 1;
                } else {
                    clearInterval(interval);
                    setShowResend(true);
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    });

    useEffect(() => {
        localStorage.setItem('otpTimer', timer.toString());
    }, [timer]);

    const handleResend = () => {
        setTimer(15);
        setShowResend(false);
    };

    const formatTime = (time:any) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <Grid container sx={{ minHeight: '100vh', display: 'flex', justifyContent: "space-between" }}>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid sx={{ width: '71.66%', height: '40.74%' }}>
                    <Typography sx={{ color: '#202224', fontSize: '45px', fontWeight: '500' }}>OTP</Typography>
                    <Typography sx={{ color: '#202224', fontSize: '45px', fontWeight: '500', lineHeight: '40.57px' }}>Verification</Typography>
                    <Grid >
                        <Grid display={'flex'} justifyContent={'center'} flexDirection={'column'}>
                            <Typography sx={{ marginTop: '24.12px', color: '#2051E5', fontSize: '21px', fontWeight: 500 }}>{formatTime(timer)}</Typography>
                            <Grid
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                    width: '100%',
                                    mt: '17.95px'
                                }}
                            >
                                <OTP separator={<span>  </span>} value={otp} onChange={setOtp} length={6} />
                            </Grid>
                            <Grid display={'flex'} >
                                <Box sx={{ mt: '25px' }}>
                                    <Typography sx={{ fontSize: '23px' }}>I didn't recieve any code .</Typography>
                                </Box>
                                <Box>
                                    <Button sx={{ fontSize: '22px', pt: '21px', color: '#2051E5' }} onClick={handleResend} disabled={!showResend}>Resend</Button>
                                </Box>
                            </Grid>
                            <Button variant="contained" sx={{ mt: '3.45%', height: '56px', borderRadius: '12px', width: '90%' }} onClick={handleSubmit} disabled={!showSubmitBtn}>submit</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid sx={{ bgcolor: '#EEF2FF', borderRadius: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingX: '10%' }}>
                    <Grid display={'flex'} justifyContent={'center'} py={'50%'} px={'50%'} >
                        <img src="img/one-time-password.png" alt="reset-password" />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Verification