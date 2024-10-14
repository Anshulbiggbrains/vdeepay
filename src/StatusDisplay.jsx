import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

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
        return '#ccc'; // Default gray color
    }
  };

  // Function to get light background color based on status
  const getBackgroundColor = (label) => {
    switch (label) {
      case 'Failed':
        return '#ffcccc'; // Light red
      case 'Success':
        return '#ccffcc'; // Light green
      case 'Pending':
        return '#ffffcc'; // Light yellow
      case 'Refunded':
        return '#cce5ff'; // Light blue
      default:
        return '#f0f0f0'; // Light gray for other statuses
    }
  };

  return (
    <Grid display="flex" justifyContent="space-around" alignItems="center" p={1} borderRadius={2}>
      {statuses.map((status, index) => (
        <Box
          key={index}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          p={1}
          mx={1}
          border={`2px solid ${getBorderColor(status.label)}`} // Dynamically set the border color
          backgroundColor={getBackgroundColor(status.label)} // Set background color
          borderRadius={2}
         width="200px"
        >
          <Box display="flex" flexDirection="column">
            <Typography variant="subtitle2" style={{ color: status.color, fontWeight: 'bold' }}>
              {status.label}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <Typography variant="body2" style={{ color: status.color, marginRight: '8px' }}>
              ₹ {status.value} {/* Rupee icon added next to value */}
            </Typography>
          </Box>
        </Box>
      ))}
    </Grid>
  );
};

export default StatusDisplay;
