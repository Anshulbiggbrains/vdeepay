import React from 'react';
import { Box, Tooltip, Typography } from '@mui/material';

const CommonCardDashBoard = ({ name, img, onClick, height, isSelected = false }) => {
  return (
    <Tooltip title={name} placement="top">
      <Box
        className={isSelected ? "card-selected" : "card-unselected"}
        sx={{
          display: 'flex',
          flexDirection: 'column', // Stack items vertically
          alignItems: 'center', // Center items horizontally
          justifyContent: 'center',
          background: 'linear-gradient(-65deg, var(--bg) 50%, var(--accent) 50%)',
        //   boxShadow: 2,
          textAlign: 'center', // Center the text
          cursor: 'pointer',
          
          transition: 'box-shadow 0.3s ease-in-out',
          width: '100%',
          height: '100%',
       
      
          overflow: 'hidden',
        }}
        onClick={onClick}
      >
        <Box
          sx={{
            width: '80px',
            height: '80px',
            padding:2,
            borderRadius: '50%', // Circular shape
            border: '5px solid green', // Border color similar to card's accent
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
