import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

const TrafficSourcesChart = ({transactionData}) => {
  console.log("This is your Transaction Data in Traffic Source", transactionData);
  const data = {
    labels: ['Success', 'Pending', 'Failed', 'Total'],
    datasets: [
      {
        label: 'Success',
        data: [1800, 900],  // 300 for success, 700 as background to create full circle
        backgroundColor: ['rgba(75, 192, 192, 1)', 'rgba(211, 211, 211, 1)'], // Gray as background
        borderWidth:5,
      },
      {
        label: 'Pending',
        data: [500, 950],  // 50 for pending, 950 as background
        backgroundColor: ['rgba(255, 159, 64, 1)', 'rgba(211, 211, 211, 1)'], // Gray as background
        borderWidth: 3,
        hoverOffset: 4,
      },
      {
        label: 'Failed',
        data: [100, 900],  // 100 for failed, 900 as background
        backgroundColor: ['rgba(255, 99, 132, 1)', 'rgba(211, 211, 211, 1)'], // Gray as background
        borderWidth:5,
        hoverOffset: 4,
      },
      {
        label: 'Total',
        data: [500, 500],  // 500 for total, 500 as background
        backgroundColor: ['rgba(54, 162, 235, 1)', 'rgba(211, 211, 211, 1)'], // Gray as background
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
      },
      tooltip: {
        enabled: true,
      },
    },
    cutout: '70%', // Adjust cutout for doughnut style
  };

  return (

    <Grid lg={12} md={12} sm={11.8} xs={11.2} >
    <Box style={{ width: '270px', margin: 'auto' }}>

        <Typography variant="h5" component="div" align="left">
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
