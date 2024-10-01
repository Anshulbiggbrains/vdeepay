import React from 'react';
import { Box, Tooltip, Typography } from '@mui/material';

const CommonCardDashBoard = ({ name, img, onClick, height, isSelected = false }) => {
  return (
    <Tooltip title={name} placement="top">
      <Box
        className={isSelected ? "card-selected" : "card-unselected"}
        sx={{
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(-65deg, var(--bg) 50%, var(--accent) 50%)',
          boxShadow: 2,
          textAlign: 'left',
          cursor: 'pointer',
          transition: 'box-shadow 0.3s ease-in-out',
          width: '100%',
          height: '100%',
          padding: 2,
          mt: 2,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
        onClick={onClick}
      >
        <img
          src={img}
          alt={name}
          width="40px"
          style={{ borderRadius: '50%', marginRight: '10px' }}
        />
        <Typography
          variant="subtitle1"
          sx={{
            ml: 1,
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
