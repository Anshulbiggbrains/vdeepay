import React from 'react';
import { Box, Tooltip, Typography } from '@mui/material';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';

const CardComponent = ({ title, img, onClick, height, py, px, isSelected = false }) => {
  // Dynamically load image or fallback to a default
  let imageSrc;
  try {
    imageSrc = require(`../assets/operators/${img}.png`);
  } catch (error) {
    imageSrc = null; // Fallback if image not found
  }

  // Calculate the word count in the title
  const wordCount = title.split(' ').length;

  // Define the font size based on the word count, dynamically adjusting for long titles
  const fontSize = wordCount > 9 ? '0.75rem' : '1rem';

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
          ml: 1,
          // px: px ? px : 0.5,
          // py: py ? py : 2,
          mt: 2,
          overflow: 'hidden',
          backgroundClip: 'padding-box',
          position: 'relative',
          border: isSelected ? '2px solid #1877F2' : '2px solid transparent', // Highlight border if selected
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
        {/* Display image */}
        <img
          src={imageSrc || img}
          alt={title}
          width="50px"
          style={{ borderRadius: '50%', marginRight: '10px' }}
        />

        {/* Operator name */}
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 500,
            fontSize: fontSize, // Dynamic font size
            overflow: 'hidden', // Ensure text doesn't overflow
            whiteSpace: 'nowrap', // Keep text on one line
            textOverflow: 'ellipsis', // Show ellipsis for overflowed text
            color: '#000',
          }}
        >
          {title}
        </Typography>
      </Box>
    </Tooltip>
  );
};

export default CardComponent;
