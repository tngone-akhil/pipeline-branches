import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import { useState } from "react";

function NewPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMessage, setPasswordMessage] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(false);


    const validatePassword = (password: any) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            setPasswordMessage('Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number, and one special character');
        } else {
            setPasswordMessage('');
        }
    }
    const PasswordMatch = (confirmPassword: any) => {
        if (password != confirmPassword) {
            setPasswordMatch(true);
        } else {
            setPasswordMatch(false);
            setConfirmPassword(confirmPassword)
        }
    }
    const handlePasswordChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        validatePassword(newPassword)
    }
    const handleSubmit = () => {
        console.log(confirmPassword)
    };
    return (
        <Grid container sx={{ minHeight: '100vh' }} spacing={'5.5%'}>
            <Grid item xs={6}>
                <Grid sx={{ width: '71.66%', mt: '27.5%', ml: '20.65%' }}>
                    <Box width={'45%'}>
                        <Typography sx={{ color: '#202224', fontSize: '32px', fontWeight: '700' }}>Set New Password</Typography>
                        <Typography sx={{ color: '#202224', fontSize: '18px', fontWeight: 500, opacity: '80%', mt: '1.21%' }}>Your new password must be different to
                            previously used password.</Typography>
                    </Box>
                    <Grid container display={'flex'} flexDirection={'column'} sx={{ mt: '2.99%' }} spacing={'38px'}>
                        <Grid item>
                            <Typography sx={{ color: '#202224', fontSize: '18px', fontWeight: 500, opacity: '80%' }} >New Password</Typography>
                            <TextField onChange={handlePasswordChange} type="password" variant="outlined" sx={{ width: "100%", mt: '1.40%' }} InputProps={{
                                style: {
                                    borderRadius: '12px',
                                    border: '1px solid #D8D8D8'
                                }

                            }} />
                            {passwordMessage && (<span style={{ color: "red" }}>{passwordMessage}</span>)}
                        </Grid>
                        <Grid item>
                            <Typography sx={{ color: '#202224', fontSize: '18px', fontWeight: 500, opacity: '80%' }} >Confirm Password</Typography>
                            <TextField onChange={PasswordMatch} type="password" variant="outlined" sx={{ width: "100%", mt: '1.40%' }} InputProps={{
                                style: {
                                    borderRadius: '12px',
                                    border: '1px solid #D8D8D8'
                                }
                            }} required />
                            {passwordMatch && (<span style={{ color: "red" }}>Password Not Match !</span>)}
                        </Grid>
                        <Grid item>
                            <Button onClick={handleSubmit} fullWidth variant="contained" sx={{ mt: '3.45%', height: '56px', borderRadius: '12px', bgcolor: '#0368E9' }}>Reset Password</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <Grid sx={{ width: '79%', height: '75%', bgcolor: '#EEF2FF', borderRadius: '32px', mt: '20.11%' }}>
                    <Grid display={'flex'} justifyContent={'center'} py='22%'>
                        <img src="img/mobile-lock.png" alt="reset-password" width={'325px'} height={'325px'} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default NewPassword