import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface TaskDetails {
    task: string,
    taskFor: string,
    taskStatus: string,
    location: string,
    date: string
    taskId: string
}
const TaskList: React.FC<TaskDetails> = ({ task, taskFor, taskStatus, location, date, taskId }) => {
    const navigate = useNavigate();
    return (
        <Grid item
            width={'340px'} sx={{
                border: '1px solid',
                borderColor: '#D9D9D9',
                borderRadius: '13px',
                padding: '20px'
            }}> 
            <Grid
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    height: '64px',
                    borderBottom: '1px solid #D9D9D9'
                }} >
                <Box>
                    <Typography sx={{ fontSize: '16px', color: '#0D1829', fontWeight: '600' }}>
                        {task}
                    </Typography>
                    <Typography sx={{ fontSize: '14px', color: '#0D1829', fontWeight: '400', opacity: '60%' }}>
                        For - {taskFor}
                    </Typography>
                </Box>
                <Typography sx={{ fontSize: '14px', color: taskStatus == 'COMPLETED' ? '#007830' : '#F95600', fontWeight: '500' }}>
                    {taskStatus == 'COMPLETED' ? 'Completed' : 'Pending'}
                </Typography>
            </Grid>
            <Grid
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: '10px',
                    alignItems: 'center',
                }}>
                <Grid>
                    <Box>
                        <Typography sx={{ fontSize: "14px", color: '#0D1829', fontWeight: '400', opacity: '60%' }}>
                            Date
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' ,mt:'12px'}}>
                        <img src='/img/Calendar.svg' width={'18px'} height={'20px'} />
                        <Typography sx={{ color: '#445668', fontSize: '14px' }}>
                            {date}
                        </Typography>
                    </Box>
                </Grid>
                <Grid>
                    <Box>
                        <Typography sx={{ fontSize: "14px", color: '#0D1829', fontWeight: '400', opacity: '60%' }}>
                            Location
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '5px',mt:'12px' }}>
                        <img src='/img/Location.svg' />
                        <Typography sx={{ color: '#445668', fontSize: '14px' }}>
                            {location}
                        </Typography>
                    </Box>
                </Grid>
                <Grid>
                    <Button variant='text'><img src='/img/Edit.svg' onClick={()=>navigate(`/task-management/edit-task/${taskId}`)}/></Button>
                </Grid>
            </Grid>
        </Grid>
        
    )
}

export default TaskList