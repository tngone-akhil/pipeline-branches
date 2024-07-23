import { useSelector } from "react-redux";
import { RootState } from "../../utils/store";
import { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Grid, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { ENDPOINTS } from "../../utils/sevices";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
interface responseDataType {
    concept: string;
    location: string;
    maintenanceWork: string;
    poc: string;
    responsibility: string;
    concernRaisedDate: string;
    raisedTime: string;
    status: string;
    aging: string;
    approvedQuotationDate: string;
    actionPlan: string;
    priority: string;
}
function EditTask() {
    const navigate = useNavigate();
    const { id } = useParams();
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
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get<responseDataType>(ENDPOINTS.VIEW_TASK + `/${id}`, { headers })
            .then((response) => {
                setConcept(response.data.concept);
                setPriority(response.data.priority);
                setLocation(response.data.location);
                setMaintenance(response.data.maintenanceWork);
                setContactPerson(response.data.poc);
                setResposibility(response.data.responsibility);
                setRaisedDate(response.data.concernRaisedDate);
                setRaisedTime(response.data.raisedTime);
                setStatus(response.data.status);
                setAging(response.data.aging);
                setApprovedDate(response.data.approvedQuotationDate);
                setActionPlan(response.data.actionPlan);
                console.log(priority)
            }).catch((error) => {
                console.log(error)
                setLoading(false);
            }).finally(() => setLoading(false))
    }, [])
    const handleChange = (event: SelectChangeEvent) => {
        setPriority(event.target.value as string);
    };
    const changeTimeFormat = (e: { target: { value: any; }; }) => {
        let time = e.target.value;
        setRaisedTime(time + ':00');
    }
    const handleSubmit = () => {
        const body = {
            taskId: id,
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
            actionPlan,
        }
        axios.post(ENDPOINTS.EDIT_TASKS, body, { headers })
            .then((response) => {
                console.log(response);
                if(response.data.isSuccess){
                    navigate('/task-management')
                }
            })
            .catch((error: any) => {
                console.log(error)
            })
    }
    return (
        <>
            {
                loading ?
                    <Grid
                        sx={{ width: "85vw", height: "85vh", justifyContent: "center", display: "flex", alignItems: "center" }}>
                        <CircularProgress color="inherit" />
                    </Grid>
                    :

                    <Grid>
                        <Typography sx={{ fontSize: '20px' }}>
                            Edit Task
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
                                        <MenuItem value=''>None</MenuItem>
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
            }
        </>
    )
}

export default EditTask