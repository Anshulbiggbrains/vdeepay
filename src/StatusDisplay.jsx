import React, { useContext } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import AuthContext from './store/AuthContext';

const StatusDisplay = ({ sumData = {},setSumData }) => {  // Provide a default value for sumData
  console.log("state data sum", sumData);
  const authCtx = useContext(AuthContext);
  const user = authCtx.user;
  setSumData(true)
  // Define a mapping from sumData keys to human-readable labels
  const labelMapping = {
    a_comm: 'A Comm',
    ad_comm: 'Ad Comm',
    ad_tds: 'Ad TDS',
    amount: ' Amount',
    ret_comm: 'Ret Comm',
    ret_tds: 'Ret TDS',
  };
  const labelMappingRet = {
   
    amount: ' Amount',
    ret_comm: 'Ret Comm',
    ret_tds: 'Ret TDS',
  };
  // Function to get the border color based on label
  const getBorderColor = (label) => {
    switch (label) {
      case 'a_comm':
      case 'ret_comm':
        return 'green';
      case 'ad_comm':
      case 'ret_tds':
        return 'blue';
      case 'ad_tds':
        return 'red';
      case 'amount':
        return 'yellow';
      default:
        return '#ccc'; // Default gray color
    }
  };

  // Function to get light background color based on label
  const getBackgroundColor = (label) => {
    switch (label) {
      case 'a_comm':
      case 'ret_comm':
        return '#ccffcc'; // Light green
      case 'ad_comm':
      case 'ret_tds':
        return '#cce5ff'; // Light blue
      case 'ad_tds':
        return '#ffcccc'; // Light red
      case 'amount':
        return '#ffffcc'; // Light yellow
      default:
        return '#f0f0f0'; // Light gray for other statuses
    }
  };

  // Check if sumData is empty
  if (Object.keys(sumData).length === 0) {
    return <Typography variant="h6">No data available</Typography>; // Show a message if there's no data
  }

  return (
    <Grid display="flex" justifyContent="space-around" alignItems="center" p={1} borderRadius={2}>
      {Object.keys(sumData).map((key, index) => (
        <Box
        key={index}
        display="flex"
        flexDirection="column" // Change direction to column
        alignItems="center" // Center-align items
        justifyContent="center" // Center justify content
        p={1}
        mx={1}
        border={`2px solid ${getBorderColor(key)}`} // Dynamically set the border color
        backgroundColor={getBackgroundColor(key)} // Set background color
        borderRadius={2}
        width="200px"
      >
       <Typography
  variant="subtitle2"
  style={{ color: '#000', fontWeight: 'bold', textAlign: 'center' }}
>
  {user.role === "Admin" 
    ? (labelMapping[key] || key) // If the role is Admin, use labelMapping or fallback to key
    : user.role === "Dd" 
      ? (labelMappingRet[key] || key) // If the role is Dd, use labelMappingRet or fallback to key
      : key // Fallback to key if neither role matches
  }
</Typography>

      
        <Typography variant="body2" style={{ color: '#000', marginTop: '8px' }}>
          ₹ {sumData[key]} {/* Display the value */}
        </Typography>
      </Box>
      
      ))}
    </Grid>
  );
};

export default StatusDisplay;
