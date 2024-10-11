import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh'; // For refresh icon
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'; // Wallet icon

const StatusDisplay = () => {
  const statuses = [
   
    { label: 'Failed', value: '9875947', color: '#000' },
    { label: 'Total', value: '875468', color: '#000' },
    { label: 'Pending', value: '9875947', color: '#000' },
    { label: 'Refunded', value: '9875947', color: '#000' },
    { label: 'Success', value: '₹ 100.00',  color: '#000' },
  ];

  return (
    <Box display="flex" justifyContent="space-around" alignItems="center" p={1} borderRadius={2}>
      {statuses.map((status, index) => (
        <Box
          key={index}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          p={1} // Reduced padding to decrease height
          mx={1}
          border="2px solid #ccc" // Gray border
          borderRadius={2}
          minWidth="200px"
        >
          <Box display="flex" flexDirection="column">
            <Typography variant="subtitle2" style={{ color: status.color, fontWeight: 'bold' }}>
              {status.label}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <Typography variant="body2" style={{ color: status.color, marginRight: '8px' }}>
              {status.value}
            </Typography>
            {status.icon && (
              <IconButton size="small">
                {status.icon}
              </IconButton>
            )}
            <IconButton size="small">
              <RefreshIcon />
            </IconButton>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default StatusDisplay;
