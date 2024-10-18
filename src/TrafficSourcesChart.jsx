import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

const TrafficSourcesChart = ({transactionData}) => {
  console.log("This is a transaction data in traffic comp", transactionData)

  // const successCount = transactionData.reduce((acc, item) => acc + item.success, 0);
  // const pendingCount = transactionData.reduce((acc, item) => acc + item.pending, 0);
  // const failedCount = transactionData.reduce((acc, item) => acc + item.failed, 0);
  // const totalCount = successCount + pendingCount + failedCount;

  console.log("This is your mapped data", 
    transactionData.map((item) => (
      {
      label: item.name,
      data: [parseInt(item.percent)],
      backgroundColor: [item.bgColor],
      borderWidth: 5,
      hoverOffset: 4
      }
    ))
  )

  const data = {
    // labels: ['Success', 'Pending', 'Failed', 'Total'],
    // labels: transactionData.map((item) => item.name),
    datasets: 
    transactionData.map((item) => (
      {
      label: item.name,
      data: [item.percent],
      backgroundColor: [item.bgColor, 'rgba(211, 211, 211, 1)'],
      borderWidth: 5,
      hoverOffset: 4
      }
    ))
    // datasets: [
    //   {
    //     label: 'Total',
    //     data: [100],
    //     // data: [totalCount, 0], 
    //     data: filteredObject.Total,
    //     backgroundColor: ['rgba(54, 162, 235, 1)', 'rgba(211, 211, 211, 1)'], 
    //     borderWidth:5,
    //     hoverOffset: 4,
    //   },
    //   {
    //     label: 'Pending',
    //     data: [5, 95],
    //     // data: [pendingCount, totalCount - pendingCount], 
    //     backgroundColor: ['rgba(75, 192, 192, 1)', 'rgba(211, 211, 211, 1)'],
    //     // backgroundColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
    //     borderWidth: 3,
    //     hoverOffset: 4,
    //   },
    //   {
    //     label: 'Failed',
    //     data: [10, 90],
    //     // data: [failedCount, totalCount - failedCount],  
    //     backgroundColor: ['rgba(255, 159, 64, 1)', 'rgba(211, 211, 211, 1)'], 
    //     borderWidth:5,
    //     hoverOffset: 4,
    //   },
    //   {
    //     label: 'Success',
    //     data: [75, 25],
    //     // data: [successCount, totalCount - successCount],  
    //     backgroundColor: ['rgba(255, 99, 132, 1)', 'rgba(211, 211, 211, 1)'], 
    //     borderWidth:5,
    //   },
      
    // ],
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
