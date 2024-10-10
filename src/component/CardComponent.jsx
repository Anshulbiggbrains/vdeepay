// import React from 'react';
// import { Box, Tooltip, Typography } from '@mui/material';
// import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
// // Card component for displaying operator information
// const CardComponent = ({ title, img, onClick, height, isSelected = false }) => {
//   // Try to dynamically import the operator's image
//   let imageSrc;
//   try {
//     imageSrc = require(`../assets/operators/${img}.png`);
//   } catch (error) {
//     imageSrc = null; 
//   }

//   return (
//     <Tooltip title={title} placement="top">
//       <Box
//         className={isSelected ? "card-selected" : "card-unselected"}
//         sx={{
//           display: 'flex',
//           alignItems: 'center',
//           background: 'linear-gradient(-65deg, var(--bg) 50%, var(--accent) 50%)',
//           boxShadow: 2,
//           borderRadius: '8px',
//           textAlign: 'left',
//           cursor: 'pointer',
//           transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
//           width: '95%',
//           height: height ? height : "75%",
//           ml: 1,
//           padding: 2,
//           mt: 2,
//           overflow: 'hidden',
//           whiteSpace: 'nowrap',
//           textOverflow: 'ellipsis',
//           backgroundClip: 'padding-box',
//           position: 'relative',
//           border: isSelected ? '2px solid #1877F2' : '2px solid transparent', // Highlight border if selected

        
//           '&:hover': {
//             transform: 'scale(1.05)',
//             boxShadow: 4,
//             border: '2px solid black',
//             animation: 'pulse 1s infinite',
//           },

         
//           '@keyframes pulse': {
//             '0%': { transform: 'scale(1)' },
//             '50%': { transform: 'scale(1.05)' },
//             '100%': { transform: 'scale(1)' },
//           },
//         }}
//         onClick={onClick}
//       >
       
//         <img
//           src={imageSrc||img}
//           alt={title}
//           width="40px"
//           style={{ borderRadius: '50%', marginRight: '10px' }} 
//         />

//         {/* Operator name */}
//         <Typography
//           variant="subtitle1"
//           sx={{
//             ml: 1,
//             fontWeight: 500,
//             overflow: 'hidden',
//             whiteSpace: 'nowrap',
//             textOverflow: 'ellipsis',
//             color: '#000', // Text color
//           }}
//         >
//           {title}
//         </Typography>
//       </Box>
//     </Tooltip>
//   );
// };

// export default CardComponent;
import React from 'react';
import { Box, Tooltip, Typography } from '@mui/material';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt'; // Optional icon for illustration

const CardComponent = ({ title, img, onClick, height, isSelected = false }) => {
  // Dynamically load image or fallback to placeholder
  let imageSrc;
  try {
    imageSrc = require(`../assets/operators/${img}.png`);
  } catch (error) {
    imageSrc = null; // Fallback if image not found
  }

  return (
    <Tooltip title={title} placement="top">
      <Box
        onClick={onClick}
        className={isSelected ? "card-selected" : "card-unselected"}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: isSelected
            ? 'linear-gradient(135deg, #1877F2 30%, #00A8FF 90%)' // Updated gradient for selected
            : 'linear-gradient(135deg, #FFF 30%, #F1F1F1 90%)', // Neutral gradient for unselected
          boxShadow: isSelected ? 4 : 2,
          borderRadius: '12px', // Rounded corners
          textAlign: 'left',
          cursor: 'pointer',
          ml:1,
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          width: '94%',
          height: height || "100px", // Adjusted height
          padding: 2,
          marginTop: 2,
          border: isSelected ? '2px solid #1877F2' : '2px solid transparent', // Border for selected
          overflow: 'hidden',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: 6,
          },
        }}
      >
        {/* Image section */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexGrow: 1,
          }}
        >
          <img
            src={imageSrc || img} // Fallback to img if dynamic loading fails
            alt={title}
            width="50px"
            style={{
              borderRadius: '50%',
              marginRight: '15px',
              border: isSelected ? '3px solid #00A8FF' : '3px solid #E0E0E0',
            }}
          />

          {/* Operator name */}
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              color: isSelected ? '#FFF' : '#333', // Dark text for unselected, white for selected
            }}
          >
            {title}
          </Typography>
        </Box>

        {/* Optional icon (replace or remove based on requirement) */}
        {isSelected && (
          <ElectricBoltIcon sx={{ color: '#FFF', fontSize: '24px', marginLeft: 'auto' }} />
        )}
      </Box>
    </Tooltip>
  );
};

export default CardComponent;
