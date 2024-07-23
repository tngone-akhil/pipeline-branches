
import { Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import {  useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../utils/slice";
import { ENDPOINTS } from "../utils/sevices";

function Login() {
    const [inputEmail, setEmail] = useState<string>('');
    const navigate = useNavigate();
    const [emailMessage, setEmailMessage] = useState('');
    const dispatch = useDispatch()

    const handleEmailChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
    }
    const validateEmail = (email: string) => {
        let verifyEmail = true;
        if (!email) {
            setEmailMessage('Please enter a valid email address');
            verifyEmail = false;
            return verifyEmail
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setEmailMessage('Please enter a valid email address');
            verifyEmail = false;

        } else {
            setEmailMessage('');
            verifyEmail = true;
        }
        return verifyEmail

    }
    const HandleSubmit = async () => {
        if (!validateEmail(inputEmail)) return 

        var data = {
            email: inputEmail,
        }
        navigate('/verification');
        return
        await axios.post(ENDPOINTS.LOGIN_URL, data)
            .then((response) => {
                if (response.data.success == true) {
                    dispatch(setToken({ AUTHKEY: response.data.token }))
                }
                else {
                    alert(response.data.success)
                }
            }).catch((error) => {
                alert(error)
            })
    }

    return (
        <Grid container sx={{ display: 'flex' }}>
            <Grid item xs={5} sx={{ px: '4%', display: 'flex', backgroundColor: "#EEF2FF", height: '100vh', backgroundImage: `url(${'img/login-bg.svg'})`, justifyContent: 'center', alignItems: 'center' }}>
                <img src='img/od.png' alt="cover-pic" width={'100%'} height={'auto'} style={{ maxHeight: "100vh", maxWidth: "30vw", borderRadius: '20px' }} />
            </Grid>
            <Grid item xs={6.3} sx={{ display: 'flex' }}>
                <Grid container sx={{ paddingTop: "160px", paddingLeft: '115px', flexDirection: 'column' }}>
                    <Grid item>
                        <img src="img/oslogoBlack.png" alt="logo" width="400px" height="auto" style={{ marginTop: '20px' }} />
                    </Grid>
                    <Grid item sx={{ mt: '21.89px' }}>
                        <Typography sx={{ fontSize: '32px', fontWeight: 600 }}>Login To Account</Typography>
                        <Typography sx={{ fontSize: '18px', fontWeight: 400, opacity: 0.8, color: '#667085' }}>Please enter your email to continue</Typography>
                    </Grid>
                    <form action="POST">
                        <Grid item sx={{ mt: '50px' }}>
                            <Typography>Email address</Typography>
                            <TextField type="email" variant="outlined" onChange={handleEmailChange} sx={{ width: '80%', mt: '15px' }} InputProps={{
                                style: {
                                    borderRadius: '12px',
                                    border: '1px solid #D8D8D8'
                                }
                            }} required /><br />
                            {emailMessage && (<span style={{ color: "red", marginTop: "10px" }}>{emailMessage}</span>)}
                        </Grid>
                        <Grid sx={{ mt: '37px' }}>
                            <Button variant="contained" sx={{ width: '80%', borderRadius: '16px', height: '56px' }} onClick={HandleSubmit}>Log in</Button>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Login
