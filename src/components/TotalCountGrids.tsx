import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

type TotalCountGridsProps = {
    title: string;
    icon: string;
    count: number;
    iconBg: string;
    bgColor: string;
    link:string;
};

const TotalCountGrids: React.FC<TotalCountGridsProps> = ({ title, icon, count, iconBg, bgColor,link }) => {
    const navigate = useNavigate();
    return (
        <Grid container onClick={()=>navigate(link)}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '199px',
                height: '287px',
                border: '1.5px solid',
                borderColor: '#EEEEEE',
                borderRadius: '12px',
                paddingX: '22px',
                paddingY: '46px',
            }}>
            <Grid item gap={'32px'}
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}>
                <Grid  sx={{ backgroundImage: `linear-gradient(to bottom, ${bgColor}, ${bgColor}), url(${iconBg})`, width: '45px', height: '46px', display: "flex", justifyContent: "center", borderRadius: '35.3px' }}>
                    <img src={icon} alt={title} />
                </Grid>
                <Box >
                    <Typography sx={{ fontSize: '14px',color:'#616161' }}>
                        {title}
                    </Typography>
                </Box>
                <Box sx={{bord:'1px solid #EEEEEE'}}>
                    <Typography sx={{fontSize:'20px' , fontWeight:600}}>
                    {count}
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
};

export default TotalCountGrids;
