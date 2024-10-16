import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import PropTypes from "prop-types";
import CustomTabs from "../component/CustomTabs";
import CachedIcon from "@mui/icons-material/Cached";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import SettingsInputAntennaIcon from "@mui/icons-material/SettingsInputAntenna";
import CreateEditLimitAccount from "../component/accountLimits/CreateEditLimtAccount";
import AdminSettelments from "./AdminSettelments";
import Mount from "../component/Mount";
import FilterModal from "../modals/FilterModal";
import AdminAccountLimit from "./AdminAccountLimit";
import { useTheme } from "@mui/material/styles";
import AdminBlockedAc from "./AdminBlockedAc";

let refresh;
function refreshFunc(setQueryParams) {
  setQueryParams("");
  if (refresh) refresh();
}

let refreshFilter;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const AdminRiskView = () => {
  const theme = useTheme();
  const [query, setQuery] = useState();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabs = [
    { label: "ACcount", content: <AdminAccountLimit />, },
    
    { label: "Settelments", content: <AdminSettelments />,  },
    { label: "Blocked Account", content: <AdminBlockedAc />,  },
    // { label: "Notification", content: <AdminNotificationsView />,icon:<NotificationsIcon sx={{ color: "#ee6c4d" }}/>},

  ];

  return (
    <Box sx={{ width: "100%" }}>
      <CustomTabs
        tabs={tabs}
        value={value}
        onChange={handleChange}
       
      />
    </Box>
  );
};

export default AdminRiskView;
