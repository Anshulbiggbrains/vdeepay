import React from 'react';
import { Box, Tooltip, Typography } from '@mui/material';

const CardComponent = ({ title, img, onClick, height, isSelected = false }) => {
  // Dynamically import the operator's image
  let imageSrc;
  try {
    imageSrc = require(`../assets/operators/${img}.png`);
  } catch (error) {
    imageSrc = null; // Fallback if image not found
  }

  return (
    <Tooltip title={title} placement="top">
      <Box
        className={isSelected ? "card-selected" : "card-unselected"}
        sx={{
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(-65deg, var(--bg) 50%, var(--accent) 50%)',
          boxShadow: 2,
          borderRadius: '8px',
          textAlign: 'left',
          cursor: 'pointer',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          width: '95%',
          height: height || "75%",
          ml: 1,
          padding: 2,
          mt: 2,
          overflow: 'hidden',
          backgroundClip: 'padding-box',
          position: 'relative',
          border: isSelected ? '2px solid #1877F2' : '2px solid transparent',
          
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: 4,
            border: '2px solid black',
            animation: 'pulse 1s infinite',
          },

          '@keyframes pulse': {
            '0%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.05)' },
            '100%': { transform: 'scale(1)' },
          },
        }}
        onClick={onClick}
      >
        <img
          src={imageSrc || img}
          alt="img"
          width="40px"
          style={{ borderRadius: '50%', marginRight: '10px' }} 
        />

     
<Typography
  variant="subtitle1"
  sx={{
    fontWeight: 500,
    color: '#000', // Text color
    overflow: 'hidden',
    wordWrap: 'break-word',
    maxWidth: 'calc(100% - 70px)',

    
    '@media (max-width: 600px)': {
      fontSize: '12px', 
    },
    
  
    '@media (min-width: 601px) and (max-width: 900px)': {
      fontSize: '10px',
    },

    // Large screens (over 900px)
    '@media (min-width: 901px)': {
      fontSize: '17px', 
    },
  }}
>
  {title}
</Typography>

      </Box>
    </Tooltip>
  );
};

export default CardComponent;
