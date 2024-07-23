import { Box, Button, CircularProgress, Grid, MenuItem, Modal, Select, SelectChangeEvent, TextField, Typography } from '@mui/material'
import TaskList from '../components/TaskList'
import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { ENDPOINTS } from '../utils/sevices';
import { useSelector } from 'react-redux';
import { RootState } from '../utils/store';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers';

interface DatasTypes {
    actionPlan: string,
    concept: string,
    status: string,
    location: string,
    concernRaisedDate: string,
    taskId: string
}
function TaskManagement() {
    const [filter,setFilter] = useState(false);
    const [priority, setPriority] = useState('');
    const [concept, setConcept] = useState('');
    const [responsibility, setResposibility] = useState('');
    const [status, setStatus] = useState('');
    const [fromDate, setFromDate] = useState<Date | null>(null);
    const [toDate, setToDate] = useState<Date | null>(null);
    const [inputLocation, setInputLocation] = useState<string | null>(null);
    const handleChange = (event: SelectChangeEvent) => {
        setPriority(event.target.value as string);
    };
    const handleStatusChange = (event:SelectChangeEvent)=>{
        setStatus(event.target.value);
    }
    const [datas, setDatas] = useState<DatasTypes[]>([]);
    const headers = useSelector((state: RootState) => state.auth.token)
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();
    useEffect(() => {
        setLoading(true)
        const body = {
            concept: concept,
            location: inputLocation,
            poc: "",
            responsibility: responsibility,
            status: status,
            priority: priority,
            toDate: toDate?toDate:"0001-01-01",
            fromDate: fromDate? fromDate :"0001-01-01",
            pageNumber: 0,
            rowsPerPage: 0
        }
        axios.post(ENDPOINTS.GET_ALL_TASKS, body, { headers })
            .then((response) => {
                setDatas(response.data);
            }).catch((error) => {
                alert(error)
                setLoading(false)
            }).finally(() => { setLoading(false) })
    }, [filter])
    const ApplyFilter = () => {
        setFilter(true)
    }
    const ClearFilter = () => {
        setConcept('');
        setInputLocation('');
        setResposibility('');
        setStatus('')
        setPriority('');
        setToDate(null);
       setFromDate(null);
       setFilter(false)
    }
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute' as 'absolute',
                    top: '40%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: "40%",
                    bgcolor: 'background.paper',
                    borderRadius: '16px',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Grid overflow={'auto'} height={'70vh'}>
                        <Grid display={'flex'} justifyContent={'space-between'}>
                            <Box>
                                <Typography sx={{ fontSize: '32px', fontWeight: 600 }}>Filters</Typography>
                            </Box>
                            <Box>
                                <Button variant='text' onClick={handleClose}><img src='/img/Close Square.svg' /></Button>
                            </Box>
                        </Grid>
                        <Grid display={'flex'} flexDirection={'column'} gap={'14px'} mt={'38px'} >
                            <Typography>Date</Typography>
                            <DatePicker
                                label='From'
                                value={fromDate}
                                onChange={(value: Date | null) => {
                                    setFromDate(value)
                                }}
                            />
                            <DatePicker label='To'
                                value={toDate}
                                onChange={(value: Date | null) => {
                                    setToDate(value)
                                }}
                            />
                            <Typography sx={{ mt: '30px', fontSize: '24px', fontWeight: 700 }}>Multilevel Filters</Typography>
                            <Typography>Concept</Typography>
                            <TextField label='Enter concept'
                                value={concept}
                                onChange={(event) => {
                                    setConcept(event.target.value)
                                }} />
                            <Typography>Location</Typography>
                            <TextField label='Enter Location'
                                value={inputLocation}
                                onChange={(event) => {
                                    setInputLocation(event.target.value)
                                }} />
                            <Typography>Responsibility</Typography>
                            <TextField label='Enter Responsibility'
                                value={responsibility}
                                onChange={(event) => {
                                    setResposibility(event.target.value)
                                }} />
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
                            <Typography>Status</Typography>
                            <Select
                            sx={{ width: '100%' }}
                            value={status}
                            onChange={handleStatusChange}
                        >
                            <MenuItem value={'COMPLETED'}>Completed</MenuItem>
                            <MenuItem value={'PENDING'}>Pending</MenuItem>
                        </Select>
                            <Grid display={'flex'} flexDirection={'row'} justifyContent={'flex-end'} gap={'20px'} py={'32px'}>
                                <Button variant='outlined' sx={{ width: '207px', height: '44px', borderRadius: '20px' }}
                                    onClick={ClearFilter}>clear Filter</Button>
                                <Button variant='contained' sx={{ width: '207px', height: '44px', borderRadius: '20px' }}
                                    onClick={ApplyFilter}
                                >Apply</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
            <Grid sx={{ display: 'flex', justifyContent: 'space-between' }} >
                <Typography sx={{ fontSize: '20px' }}>Task Management</Typography>
                <Grid sx={{ display: 'flex', gap: '12px' }}>

                    <Button variant="outlined"
                        sx={{
                            borderRadius: '11.93px',
                            color: '#0368E9',
                            width: '168px',
                            height: '39.92px',
                            textTransform: 'none'
                        }}>
                        <img src='/img/Download.svg' width={'21px'} height={'21px'} />
                        <Typography
                            sx={{
                                fontSize: '14px',
                                ml: "4px"
                            }}>
                            Download
                        </Typography>
                    </Button>
                    <Button onClick={handleOpen}
                        variant='contained'
                        sx={{
                            bgcolor: '#0D0D0D',
                            width: '131px',
                            height: '42.26px',
                            borderRadius: '10.7px',
                            textTransform: 'none'
                        }}>
                        <img src='/img/Filter.svg' />
                        <Typography
                            sx={{
                                ml: '4px',
                                fontSize: '14px'
                            }}>
                            Filter
                        </Typography>
                    </Button>
                    <Button variant="contained"
                        onClick={() => navigate('/task-management/add-task')}
                        sx={{
                            borderRadius: '11.93px',
                            width: '147px',
                            height: '39.92px',
                            textTransform: 'none'
                        }}>
                        <img src='/img/iconplus.svg' width={'14px'} height={'14px'} />
                        <Typography
                            sx={{
                                fontSize: '14px',
                                ml: "4px"
                            }}>
                            Add Task
                        </Typography>
                    </Button>
                </Grid>
            </Grid>

            <Grid container gap={'31px'} mt={'30px'} display={'flex'} flexWrap={'wrap'}>
                {loading ?
                    <Grid
                        sx={{ width: "100vw", height: "85vh", justifyContent: "center", display: "flex", alignItems: "center" }}>
                        <CircularProgress color="inherit" />
                    </Grid>
                    :
                    datas.map((data, index) => {
                        return (
                            <TaskList key={index} task={data.concept} taskFor={data.actionPlan} taskStatus={data.status} location={data.location} date={data.concernRaisedDate} taskId={data.taskId} />
                        )
                    })
                }
            </Grid>
        </>
    )
}


export default TaskManagement
