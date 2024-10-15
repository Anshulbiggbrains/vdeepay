import {
  Box,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ApiPaginateSearch from "../component/ApiPaginateSearch";
import { ddmmyy, dateToTime } from "../utils/DateUtils";

// Icons
import LaptopIcon from "@mui/icons-material/Laptop";
import AppleIcon from "@mui/icons-material/Apple";
import AndroidIcon from "@mui/icons-material/Android";
import ApiEndpoints from "../network/ApiEndPoints";
import { CustomStyles } from "../component/CustomStyle";
import { android2, macintosh2, windows2 } from "../iconsImports";

const LoginHistory = () => {
  const [apiData, setApiData] = useState([]);
  const [query, setQuery] = useState("");

  const columns = [
    {
      name: "ID",
      selector: (row) => <div className="blue-highlight-txt">{row.id}</div>,
      width: "70px",
    },
    {
      name: "User Id",
      selector: (row) => <></>,
      center: true,
    },
    {
      name: "Created At",
      selector: (row) => (
        <div>
          {ddmmyy(row.created_at)} {dateToTime(row.created_at)}
        </div>
      ),
      center: true,
    },
    {
      name: "Login Ip",
      selector: (row) => row.ip,
      center: true,
    },
    {
      name: "Device",
      selector: (row) => {
        let icon;

        if (row.device.toLowerCase().includes("windows")) {
          icon = <img src={windows2} style={{width:"22px"}} alt="description of image" />;
        } else if (row.device.toLowerCase().includes("android")) {
          icon = <img src={android2} style={{width:"22px"}} alt="description of image" />;
        } else if (row.device.toLowerCase().includes("mac")) {
          icon = <img src={macintosh2} style={{width:"22px"}} alt="description of image" />;
        } else {
          icon = <LaptopIcon sx={{ color: "blue", marginRight: "8px" }} />;
        }

        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: "13px",
              textAlign: "justify",
            }}
          >
            {icon}
            {/* <Typography>{row.device}</Typography> */}
          </Box>
        );
      },
      center: true ,
    },
  ];

  return (
    <Box>
      <Grid container>
        <Grid item md={12} sm={12} xs={12}>
          <ApiPaginateSearch
            showSearch={true}
            isFilterAllowed
            apiEnd={ApiEndpoints.GET_LOGIN_HISTORY}
            columns={columns}
            apiData={apiData}
            setApiData={setApiData}
            tableStyle={CustomStyles}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginHistory;
