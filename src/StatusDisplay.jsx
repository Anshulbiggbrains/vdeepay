import React from 'react';
import { Box, Grid, Tooltip, Typography } from '@mui/material';

const StatusDisplay = () => {
  const statuses = [
    { label: 'Failed', value: '9875947', color: '#000' },
    { label: 'Total', value: '875468', color: '#000' },
    { label: 'Pending', value: '9875947', color: '#000' },
    { label: 'Refunded', value: '9875947', color: '#000' },
    { label: 'Success', value: '100.00', color: '#000' },
  ];

  // Function to get the border color based on status
  const getBorderColor = (label) => {
    switch (label) {
      case 'Failed':
        return 'red';
      case 'Success':
        return 'green';
      case 'Pending':
        return 'yellow';
      case 'Refunded':
        return 'blue';
      default:
        return '#ccc'; 
    }
  };

 
  const getBackgroundColor = (label) => {
    switch (label) {
      case 'Failed':
        return '#ffcccc'; 
      case 'Success':
        return '#ccffcc'; 
      case 'Pending':
        return '#ffffcc'; 
      case 'Refunded':
        return '#cce5ff';
      default:
        return '#f0f0f0'; 
    }
  };

  return (
    <Grid display="flex" gap={1.5} justifyContent="space-around" alignItems="center" p={1} borderRadius={2}>
      {statuses.map((status, index) => (
        <Box
          key={index}
         
          sx={{
            padding: { lg: '8px', xs: '4px' },
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between', 
            width: { lg: '220px', sm: '180px', xs: '140px' }, 
            height: { lg: '60px', sm: '55px', xs: '50px' },
            backgroundColor: getBackgroundColor(status.label),
            border: `2px solid ${getBorderColor(status.label)}`,
            overflow: 'hidden',
            marginBottom: '8px',
          }}
         
          border={`2px solid ${getBorderColor(status.label)}`} 
          backgroundColor={getBackgroundColor(status.label)} 
          borderRadius={2}
         width="200px"
        >
          <Box display="flex" flexDirection="column">
            <Typography variant="subtitle2" style={{ color: status.color, fontWeight: 'bold',     fontSize: { lg: '20px', sm: '16px', xs: '14px' }, }}>
              {status.label}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" sx={{ml:"9px"}}  >
            <Tooltip title={`₹ ${status.value}`} arrow>
            <Typography variant="body2" style={{ color: status.color, marginRight: '8px', fontSize: { lg: '22px', sm: '16px', xs: '18px' },
           whiteSpace: 'nowrap',
           overflow: 'hidden',
           textOverflow: 'ellipsis', }}>
              ₹{status.value} 
            </Typography>
            </Tooltip>
          </Box>
        </Box>
      ))}
    </Grid>
  );
};

export default StatusDisplay;
