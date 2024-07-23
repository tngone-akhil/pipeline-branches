import { CircularProgress, Grid, Typography } from '@mui/material'
import TaskList from '../components/TaskList'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { ENDPOINTS } from '../utils/sevices';
import { useSelector } from 'react-redux';
import { RootState } from '../utils/store';
import { useParams } from 'react-router-dom';
interface DatasTypes {
    actionPlan: string,
    concept: string,
    status: string,
    location: string,
    concernRaisedDate: string,
    taskId:string
}

function Tasks() {
    const { status } = useParams<{ status: string }>()
    const pageName = status == 'completed' ? 'Completed' : 'Pending';
    const pageUrl = status == 'completed' ? ENDPOINTS.GET_ALL_COMPLETED_TASKS : ENDPOINTS.GET_ALL_PENDING_TASKS;
    const [datas, setDatas] = useState<DatasTypes[]>([]);
    const headers = useSelector((state: RootState) => state.auth.token)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        axios.get(pageUrl, { headers })
            .then((response) => {
                setDatas(response.data);
            }).catch((error) => {
                alert(error)
                setLoading(false)
            }).finally(() => { setLoading(false) })
    }, [])
    return (
        <>
           <Typography>{pageName}</Typography>
            <Grid container gap={'31px'} mt={'30px'} display={'flex'} flexWrap={'wrap'}>
                {loading ?
                    <Grid
                        sx={{ width: "100vw", height: "85vh", justifyContent: "center", display: "flex", alignItems: "center" }}>
                        <CircularProgress color="inherit" />
                    </Grid>
                    :
                    datas.map((data, index) => {
                        return (
                            <TaskList key={index} task={data.actionPlan} taskFor={data.concept} taskStatus={data.status} location={data.location} date={data.concernRaisedDate} taskId={data.taskId} />
                        )
                    })
                }
            </Grid>
        </>
    )
}


export default Tasks
