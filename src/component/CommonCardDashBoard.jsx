import React from 'react';
import { Box, Tooltip, Typography } from '@mui/material';

const CommonCardDashBoard = ({ name, img, onClick, height, isSelected = false }) => {
  return (
    <Tooltip title={name} placement="top">
      <Box
       
        sx={{
          display: 'flex',
          flexDirection: 'column', // Stack items vertically
          alignItems: 'center', // Center items horizontally
          justifyContent: 'center',
          cursor: 'pointer'
        }}
        onClick={onClick}
      >
        <Box
          sx={{
            width: '80px',
            height: '80px',
            padding:2,
            borderRadius: '50%', // Circular shape
            border: '4px solid #ffb703', // Border color similar to card's accent
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 1, // Margin bottom for spacing between image and text
          }}
        >
          <img
            src={img}
            alt={name}
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%', // Ensures the image is circular
            }}
          />
        </Box>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 500,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {name}
        </Typography>
      </Box>
    </Tooltip>
  );
};

export default CommonCardDashBoard;
