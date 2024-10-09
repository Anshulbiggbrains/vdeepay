import React, { useState } from 'react';
import CustomTabs from '../CustomTabs';
import { Transaction_Tab } from '../../utils/constants';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import SettingsCellIcon from '@mui/icons-material/SettingsCell';
import SatelliteIcon from '@mui/icons-material/Satellite'
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CollectionsIcon from '@mui/icons-material/Collections';
import TrainIcon from '@mui/icons-material/Train';
import BuildIcon from '@mui/icons-material/Build';
const RetDbTransactionTab = ({ setQuery, setTabQueryreset }) => {
  const [value, setValue] = useState(0);

  const tabs = [
    { label: 'ALL',icon:<Diversity2Icon  sx={{ fontSize: 20 }} /> },
    { label: 'Prepaid',icon:< SettingsCellIcon  sx={{ fontSize: 20 }}/> },
    { label: 'Dth',icon:<SatelliteIcon  sx={{ fontSize: 20 }}/> },
    { label: 'Utility',icon:<BuildIcon  sx={{ fontSize: 20 }}/> },
    { label: 'Verification',icon:<BeenhereIcon  sx={{ fontSize: 20 }}/>  },
    { label: 'Money Transfer',icon:<SwapHorizIcon  sx={{ fontSize: 20, ml:4 }}/> },
    { label: 'Collections' ,icon:<CollectionsIcon  sx={{ fontSize: 20 }} />},
    { label: 'IRCTC' ,icon:< TrainIcon sx={{ fontSize: 20 }}/>},
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);

    const selectedTab = Transaction_Tab[newValue];

    // Trigger the reset and update the query
    // setTabQueryreset(true);  // Signal to reset filters

    // Delay the query update slightly to ensure the reset happens first
    setTimeout(() => {
      setQuery(`category=${selectedTab}`);
      // setTabQueryreset(false); // After updating the query, allow further resets
    }, 0);
  };

  return (
    <CustomTabs
      tabs={tabs}
      value={value}
      onChange={handleChange}
      
    />
  );
};

export default RetDbTransactionTab;
