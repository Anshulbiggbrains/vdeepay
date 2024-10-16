import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import ApiPaginateSearch from "../component/ApiPaginateSearch";
import { useState } from "react";
// import { useContext } from "react";
// import AuthContext from "../store/AuthContext";
import { CustomStyles } from "../component/CustomStyle";
import RefreshComponent from "../component/RefreshComponent";
import ApiEndpoints from "../network/ApiEndPoints";
import { mt_tab_value } from "../utils/constants";
import { ddmmyy, dateToTime, datemonthYear } from "../utils/DateUtils";
import { currencySetter } from "../utils/Currencyutil";
import { useTheme } from "@mui/material/styles";
import CustomTabs from "../component/CustomTabs";
import CreateEditLimitAccount from "../component/accountLimits/CreateEditLimtAccount";
import AdminDeleteLimitedAccounts from "../component/accountLimits/AdminDeleteLimitedAccounts";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AdminApprovesBene from "../modals/AdminApprovesBene";
import CommonStatus from "../component/CommonStatus";
import Mount from "../component/Mount";
import FilterCard from "../modals/FilterCard";
import FilterModal from "../modals/FilterModal";
import { get } from "../network/ApiController";
import { apiErrorToast } from "../utils/ToastUtil";
import ActiveInactiveModal from "../modals/ActiveInactiveModal";
import EditVirtualAccounts from "../component/accountLimits/EditVirtualAccounts";
import CheckResponseModal from "../modals/CheckResponseModal";
import CachedIcon from "@mui/icons-material/Cached";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import SettingsInputAntennaIcon from "@mui/icons-material/SettingsInputAntenna";
import AdminAccountLimit from "./AdminAccountLimit";
import DeleteBlockedAcc from "../modals/DeleteBlockedAcc";
import AddBlockedAccount from "../modals/AddBlockedAccount";







let refresh;
function refreshFunc(setQueryParams) {
  setQueryParams("");
  if (refresh) refresh();
}
let refreshFilter;

// tabs in top bar



const AdminBlockedAc = () => {
  const theme = useTheme();
  const [apiData, setApiData] = useState([]);
  const [query, setQuery] = useState();
  const [singleUser, setSingleUser] = useState(null);

  //   const authCtx = useContext(AuthContext);
  //   const user = authCtx.user;
  //   const role = user?.role;
  const [value, setValue] = useState(0);
  const [currentType, setCurrentType] = useState();
 

  const searchOptions = [
    { field: "AC Name", parameter: "acc_name" },
    { field: "AC Number", parameter: "acc_no" },
  ];
  const searchOptionsVa = [
    { field: "AC Name", parameter: "acc_name" },
    { field: "AC Number", parameter: "acc_no" },
  ];

 


  const settlementBeneficiarys = [
    {
      name: "CreatedAt",
      selector: (row) => (
        <>
          <div className="mb-2" style={{ textAlign: "left" }}>
            {ddmmyy(row.created_at)} {dateToTime(row.created_at)}
          </div>
          <div>
            {ddmmyy(row.updated_at)} {dateToTime(row.updated_at)}
          </div>
        </>
      ),
      width: "160px",
    },
    {
      name: "UpdatedAt",
      selector: (row) => (
        <>
          <div className="mb-2" style={{ textAlign: "left" }}>
            {ddmmyy(row.created_at)} {dateToTime(row.updated_at)}
          </div>
          <div>
            {ddmmyy(row.updated_at)} {dateToTime(row.updated_at)}
          </div>
        </>
      ),
      width: "160px",
    },
  
    {
      name: "Account Number",
      cell: (row) => (
        <div style={{ textAlign: "center" }}>
          <div>{row.acc_no}</div>
        
        </div>
      ),
      center: true,
      wrap: true,
      width: "280px",
    },
  
   
    {
      name: "Ifsc",
      cell: (row) => (
        <div style={{ textAlign: "center" }}>
          <div>{row.ifsc}</div>
        
        </div>
      ),
      center: true,
      wrap: true,
      width: "280px",
    },
  
  
    {
      name: "Actions",
      selector: (row) =>   
        <>
          <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
     
      
      <DeleteBlockedAcc row={row} refresh={refresh} />,
      </div>
      
      </>
    },
  ];
  
 
  return (

      <Grid container>
      
   
      
        {/* 1  "Settlement Beneficiary's" */}
        <Grid item md={12} sm={12} xs={12}>
        
        
            <ApiPaginateSearch
              showSearch={true}
              actionButtons={
                <Grid
                  item
                  md={12}
                  sm={12}
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: { md: "end", xs: "start" },
                    alignItems: "center",
                    pr: 1,
                    mt: { md: 0, xs: 2, sm: 2 },
                  }}
                >
                  <AddBlockedAccount  refresh={refresh}/>
                  <Tooltip title="refresh">
                    <IconButton
                      aria-label="refresh"
                      // color="success"
                      sx={{
                        color: "#0F52BA",
                      }}
                      onClick={() => {
                        refreshFunc(setQuery);
                      }}
                    >
                      <CachedIcon className="refresh-purple" />
                    </IconButton>
                  </Tooltip>
                </Grid>
              }
              apiEnd={ApiEndpoints.GET_BLOCKED_AC}
              searchOptions={searchOptions}
              setQuery={setQuery}
              columns={settlementBeneficiarys}
              apiData={apiData}
              setApiData={setApiData}
              tableStyle={CustomStyles}
              queryParam={query ? query : ""}
              returnRefetch={(ref) => {
                refresh = ref;
              }}
              isFilterAllowed={true}
           
            />
         
        </Grid>
       
      </Grid>
  
  );
};

export default AdminBlockedAc;
