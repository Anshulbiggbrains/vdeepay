import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

const TrafficSourcesChart = ({transactionData}) => {

  const successCount = transactionData.reduce((acc, item) => acc + item.success, 0);
  const pendingCount = transactionData.reduce((acc, item) => acc + item.pending, 0);
  const failedCount = transactionData.reduce((acc, item) => acc + item.failed, 0);
  const totalCount = successCount + pendingCount + failedCount;

  const data = {
    labels: ['Success', 'Pending', 'Failed', 'Total'],
    // datasets: transactionData.map((item) => {
    //   {
    //     label: 
    //   }
    // })
    datasets: [
      {
        label: 'Pending',
        data: [100, 5],
        // data: [pendingCount, totalCount - pendingCount], 
        backgroundColor: ['rgba(75, 192, 192, 1)', 'rgba(211, 211, 211, 1)'],
        // backgroundColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 3,
        hoverOffset: 4,
      },
      {
        label: 'Failed',
        data: [100, 10],
        // data: [failedCount, totalCount - failedCount],  
        backgroundColor: ['rgba(255, 159, 64, 1)', 'rgba(211, 211, 211, 1)'], 
        borderWidth:5,
        hoverOffset: 4,
      },
      {
        label: 'Success',
        data: [100, 75],
        // data: [successCount, totalCount - successCount],  
        backgroundColor: ['rgba(255, 99, 132, 1)', 'rgba(211, 211, 211, 1)'], 
        borderWidth:5,
      },
      {
        label: 'Total',
        data: [100, 100],
        // data: [totalCount, 0], 
        backgroundColor: ['rgba(54, 162, 235, 1)', 'rgba(211, 211, 211, 1)'], 
        borderWidth:5,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        display: false
      },
      tooltip: {
        enabled: true,
      },
    },
    // cutout: '70%',
  };

  return (

    <Grid lg={12} md={12} sm={11.8} xs={11.2} >
    <Box style={{ width: '270px', margin: 'auto' }}>

        <Typography variant="h5" component="div" align="center">
          Traffic Sources
        </Typography>
        <Box sx={{mt:2}}>
        <Doughnut data={data} options={options} sx={{width:"300px"}}/>
        </Box>
      </Box>
    
    </Grid>
  );
};

export default TrafficSourcesChart;
