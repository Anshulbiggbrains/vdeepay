import React from 'react';
import { Box, Tooltip, Typography } from '@mui/material';

const CardComponent = ({ title, img, onClick, height, py, px, isSelected = false }) => {
  // Dynamically load image or fallback to a default
  let imageSrc;
  try {
    imageSrc = require(`../assets/operators/${img}.png`);
  } catch (error) {
    imageSrc = null; // Fallback if image not found
  }

  // Set a fixed height for the card (ensuring height stays constant)
  const cardHeight = height || "100px"; // Default height to 100px if not provided

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
          width: '100%',
          height: cardHeight, // Fixed height for the card
          ml: 1,
          padding: 2,
          mt: 2,
          overflow: 'hidden',
          position: 'relative',
          border: isSelected ? '2px solid #1877F2' : '2px solid transparent',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: 4,
            border: '2px solid black',
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
            fontSize: '1rem',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2, // Limit the text to 2 lines
            whiteSpace: 'normal', // Allow text wrapping for large titles
            textOverflow: 'ellipsis', // Show ellipsis if text overflows
            color: '#000',
            lineHeight: '1.2rem', // Adjust line height for consistency
            maxHeight: '2.4rem', // Ensures that even long text stays within 2 lines
          }}
        >
          {title}
        </Typography>
      </Box>
    </Tooltip>
  );
};

export default CardComponent;
