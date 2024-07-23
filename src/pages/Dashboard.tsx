import { Box, Button, CircularProgress, Grid, Modal, TextField, Typography } from '@mui/material';
import TotalCountGrids from '../components/TotalCountGrids';
import axios from 'axios';
import { ENDPOINTS } from '../utils/sevices';
import { useSelector } from 'react-redux';
import { RootState } from '../utils/store';
import React, { useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


interface dataCountType {
  adminCount: number,
  clientCount: number,
  completedTaskCount: number,
  pendingTaskCount: number,
  performanceScore: number,
  totalTaskCount: number,
  totalUserCount: number
}
function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [inputFromDate, setInputFromDate] = useState<Date | null>(null);
  const [inputToDate, setInputToDate] = useState<Date | null>(null);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [inputLocation, setInputLocation] = useState<string | null>(null);
  const [updatedLocation, setUpdatedLocation] = useState('');

  const [dataCount, setDataCount] = useState<dataCountType>({
    adminCount: 0,
    clientCount: 0,
    completedTaskCount: 0,
    pendingTaskCount: 0,
    performanceScore: 0,
    totalTaskCount: 0,
    totalUserCount: 0
  });

  const headers = useSelector((state: RootState) => state.auth.token)
  useEffect(() => {
    setLoading(true);
    const body = {
      toDate: toDate ? toDate : "0001-01-01",
      fromDate: fromDate ? fromDate : "0001-01-01",
      location: updatedLocation ? updatedLocation : ""
    }
    console.log(body)
    axios.post(ENDPOINTS.DASHBOARD_KPIVALUES, body, { headers })
      .then((response) => {
        setDataCount(
          {
            adminCount: response.data.adminCount,
            clientCount: response.data.clientCount,
            completedTaskCount: response.data.completedTaskCount,
            pendingTaskCount: response.data.pendingTaskCount,
            performanceScore: response.data.performanceScore,
            totalTaskCount: response.data.totalTaskCount,
            totalUserCount: response.data.totalUserCount
          }
        )
      }).catch(() => {
        setLoading(false);
      }).finally(() => {
        setLoading(false);
      })
  }, [fromDate, toDate, updatedLocation])
  const ApplyFilter = () => {
    if (inputFromDate !== null) {
      const fdate = new Date(inputFromDate);
      const fromdateString = fdate.toLocaleDateString('en-CA');
      setFromDate(fromdateString)
    } else {
      setFromDate('0001-01-01')
    }
    if (inputToDate !== null) {
      const tdate = new Date(inputToDate);
      const todateString = tdate.toLocaleDateString('en-CA');
      setToDate(todateString);
    } else {
      setToDate('0001-01-01');
    }
    if (inputLocation !== null) {
      setUpdatedLocation(inputLocation);
    } else {
      setUpdatedLocation('');
    }
  }
  const ClearFilter = () => {
    setFromDate('0001-01-01')
    setToDate('0001-01-01')
    setUpdatedLocation('')
    setInputFromDate(null)
    setInputToDate(null)
    setInputLocation('');
  }
  const totalItemsData = [
    {
      title: 'Total Users',
      icon: '/img/ThreeUser.svg',
      iconbg: '/img/Button.svg',
      color: '#2051E5',
      count: dataCount.totalUserCount,
      link: ''
    },
    {
      title: 'Total Clients',
      icon: '/img/TwoUser.svg',
      iconbg: '/img/Button.svg',
      color: '#FF4B4B',
      count: dataCount.clientCount,
      link: ''
    },
    {
      title: 'Total Admin',
      icon: '/img/Add User.svg',
      iconbg: '/img/Button.svg',
      color: '#A95B00',
      count: dataCount.adminCount,
      link: ''
    },
    {
      title: 'Total Task',
      icon: '/img/Document_Active.svg',
      iconbg: '/img/Button.svg',
      color: '#7000FE',
      count: dataCount.totalTaskCount,
      link: ''
    },
    {
      title: 'Total Pending Task',
      icon: '/img/Paper-Upload.svg',
      iconbg: '/img/Button.svg',
      color: '#F0AD00',
      count: dataCount.pendingTaskCount,
      link: '/tasks/pending'
    },
    {
      title: 'Completed Task',
      icon: '/img/Tick Square.svg',
      iconbg: '/img/Button.svg',
      color: '#10B559',
      count: dataCount.completedTaskCount,
      link: '/tasks/completed'
    }
  ]
  const DownloadReport = () => {
    const downloadExcel = (base64: any) => {
      const linkSource = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${base64}`;
      const downloadLink = document.createElement("a");
      downloadLink.href = linkSource;
      downloadLink.target = "_blank";
      downloadLink.click();
    };
    const data = {
      concept: "",
      poc: "",
      responsibility: "",
      status: "",
      priority: "",
      toDate: toDate ? toDate : "0001-01-01",
      fromDate: fromDate ? fromDate : "0001-01-01",
      location: updatedLocation ? updatedLocation : ""
    }
    axios.post(ENDPOINTS.DOWNLOAD_REPORT, data, { headers })
      .then((response) => {
        downloadExcel(response.data);
      })
  }
  return (
    <Grid container>
      {loading ?
        <Grid
          sx={{
            width: "80%",
            height: "80%",
            alignItems: 'center',
            justifyContent: 'center',
            display: "flex",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            position: 'absolute'
          }}
        >
          <CircularProgress color="inherit" />
        </Grid>
        :
        ''
      }
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
          p: 4
        }}>
          <Grid display={'flex'} justifyContent={'space-between'}>
            <Box>
              <Typography sx={{ fontSize: '32px', fontWeight: 600 }}>Filters</Typography>
            </Box>
            <Box>
              <Button variant='text' onClick={handleClose}><img src='/img/Close Square.svg' /></Button>
            </Box>
          </Grid>
          <Grid display={'flex'} flexDirection={'column'} gap={'14px'} mt={'38px'}>
            <Typography>Date</Typography>
            <DatePicker
              label='From'
              value={inputFromDate}
              onChange={(value: Date | null) => {
                setInputFromDate(value)
              }}
            />
            <DatePicker label='To'
              value={inputToDate}
              onChange={(value: Date | null) => {
                setInputToDate(value)
              }}
            />
            <Typography sx={{ mt: '30px' }}>Location</Typography>
            <TextField label='Location'
              value={inputLocation}
              onChange={(event) => {
                setInputLocation(event.target.value)
              }} />
            <Grid display={'flex'} flexDirection={'row'} justifyContent={'flex-end'} gap={'20px'} py={'32px'}>
              <Button variant='outlined' sx={{ width: '207px', height: '44px', borderRadius: '20px' }}
                onClick={ClearFilter}>clear Filter</Button>
              <Button variant='contained' sx={{ width: '207px', height: '44px', borderRadius: '20px' }}
                onClick={ApplyFilter}
              >Apply</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Grid item xs={12} container direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography sx={{ fontSize: '20px', fontWeight: '500', color: '#060606' }}>
            Good Morning
          </Typography>
        </Box>
        <Box display="flex" gap={'12px'}>
          <Button variant="outlined" onClick={DownloadReport}
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
        </Box>
      </Grid>
      <Grid container
        mt={'42px'}
        display={'flex'}
        width={'100%'}
        height={"16%"}
        bgcolor={'#E9F3FF'}
        justifyContent={'space-between'}
        borderRadius={"12px"}
        alignItems={'center'}>
        <Grid item pl={'38px'}>
          <Box>
            <Typography
              sx={{
                fontSize: '32.42px',
                fontWeight: 300,
                color: '#0368E9'
              }}
            >Performance</Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: '30.42px',
                fontWeight: 600,
                color: '#0368E9'
              }}>{dataCount.performanceScore}</Typography>
          </Box>
        </Grid>
        <Grid item pr={'62px'}>
          <img src='img/score.png' width={'126px'} height={'126px'} />
        </Grid>
      </Grid>
      <Grid gap={'31px'} mt={'30px'} display={'flex'} flexWrap={'wrap'} justifyContent={'center'}>
        {totalItemsData.map((data, key) => {
          return (
            <Box key={key}>
              <TotalCountGrids title={data.title} icon={data.icon} count={data.count} iconBg={data.iconbg} bgColor={data.color} link={data.link} />
            </Box>
          )
        })}
      </Grid>
    </Grid>
  );
}
export default Dashboard;
