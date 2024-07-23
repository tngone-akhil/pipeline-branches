import { Box, Button, Grid, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { useState } from 'react';
import { ENDPOINTS } from '../../utils/sevices';
import { useSelector } from 'react-redux';
import { RootState } from '../../utils/store';

function AddTask() {

    const [priority, setPriority] = useState('');
    const [concept, setConcept] = useState('');
    const [location, setLocation] = useState('');
    const [maintenanceWork, setMaintenance] = useState('');
    const [poc, setContactPerson] = useState('');
    const [responsibility, setResposibility] = useState('');
    const [concernRaisedDate, setRaisedDate] = useState('');
    const [raisedTime, setRaisedTime] = useState('');
    const [status, setStatus] = useState('');
    const [aging, setAging] = useState('');
    const [approvedQuotationDate, setApprovedDate] = useState('');
    const [actionPlan, setActionPlan] = useState('');
    const headers = useSelector((state: RootState) => state.auth.token);

    const handleChange = (event: SelectChangeEvent) => {
        setPriority(event.target.value as string);
    };
    const changeTimeFormat = (e: { target: { value: any; }; }) => {
        let time = e.target.value;
        setRaisedTime(time + ':00');
    }
    const handleSubmit = () => {
        const body = {
            concept,
            location,
            maintenanceWork,
            poc,
            responsibility,
            concernRaisedDate,
            raisedTime,
            priority,
            status,
            aging,
            approvedQuotationDate,
            actionPlan
        }
        console.log(body)
        axios.post(ENDPOINTS.TASK_CREATION, body, { headers })
            .then((response) => {
                console.log(response)
            })
            .catch((error: any) => {
                console.log(error)
            })
    }
    return (
        <Grid>
            <Typography sx={{ fontSize: '20px' }}>
                Add Task
            </Typography>
            <Grid sx={{ width: '60%', gap: '20px', display: 'flex', flexDirection: 'column', mt: '20px' }}>
                <Grid display={'flex'} gap={'30px'} >
                    <Box sx={{ width: '100%' }}>
                        <Typography>Concept</Typography>
                        <TextField variant="outlined" sx={{ width: "100%" }} value={concept} onChange={(e) => setConcept(e.target.value)} />
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <Typography>Location</Typography>
                        <TextField variant="outlined" sx={{ width: "100%" }} value={location} onChange={(e) => setLocation(e.target.value)} />
                    </Box>
                </Grid>
                <Grid sx={{ width: '100%' }}>
                    <Typography>Maintenance work</Typography>
                    <TextField
                        variant="outlined"
                        sx={{
                            width: '100%',
                            '& .MuiInputBase-input': {
                                padding: '30px 14px',
                            },
                        }}
                        value={maintenanceWork} onChange={(e) => setMaintenance(e.target.value)}
                    />
                </Grid>
                <Grid display={'flex'} gap={'30px'}>
                    <Box sx={{ width: '100%' }}>
                        <Typography>Person to contact in store name</Typography>
                        <TextField variant="outlined" sx={{ width: "100%" }} value={poc} onChange={(e) => setContactPerson(e.target.value)} />
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <Typography>Responsibility</Typography>
                        <TextField variant="outlined" sx={{ width: "100%" }} value={responsibility} onChange={(e) => setResposibility(e.target.value)} />
                    </Box>
                </Grid>
                <Grid display={'flex'} gap={'30px'}>
                    <Box sx={{ width: '100%' }}>
                        <Typography>Concern raise date</Typography>
                        <TextField variant="outlined" type='date' sx={{ width: "100%" }} value={concernRaisedDate} onChange={(e) => setRaisedDate(e.target.value)} />
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <Typography>Raised Time</Typography>
                        <TextField variant="outlined" type='time' sx={{ width: "100%" }} value={raisedTime} onChange={changeTimeFormat} />
                    </Box>
                </Grid>
                <Grid display={'flex'} gap={'30px'}>
                    <Box sx={{ width: '100%' }}>
                        <Typography>Priority</Typography>
                        <Select
                            sx={{ width: '100%' }}
                            value={priority}
                            onChange={handleChange}
                        >
                            <MenuItem value={'P1'}>P1</MenuItem>
                            <MenuItem value={'P2'}>P2</MenuItem>
                            <MenuItem value={'P3'}>P3</MenuItem>
                            <MenuItem value={'P4'}>P4</MenuItem>
                        </Select>
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <Typography>status</Typography>
                        <TextField variant="outlined" sx={{ width: "100%" }} value={status} onChange={(e) => setStatus(e.target.value)} />
                    </Box>
                </Grid>
                <Grid display={'flex'} gap={'30px'}>
                    <Box sx={{ width: '100%' }}>
                        <Typography>Aging</Typography>
                        <TextField variant="outlined" sx={{ width: "100%" }} value={aging} onChange={(e) => setAging(e.target.value)} />
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <Typography>Approved Quoatation Date</Typography>
                        <TextField variant="outlined" type='date' sx={{ width: "100%" }} value={approvedQuotationDate} onChange={(e) => setApprovedDate(e.target.value)} />
                    </Box>
                </Grid>
                <Grid sx={{ width: '100%' }}>
                    <Typography>Action Plan</Typography>
                    <TextField label="Enter Action Plan" variant="outlined" sx={{
                        width: "100%",
                        '& .MuiInputBase-input': {
                            padding: '30px 14px',
                        },
                    }} value={actionPlan} onChange={(e) => setActionPlan(e.target.value)} />
                </Grid>
                <Grid display={'flex'} justifyContent={'flex-end'}>
                    <Button variant='contained' onClick={handleSubmit}>Save</Button>
                </Grid>
            </Grid>
        </Grid>
    )
}
export default AddTask
