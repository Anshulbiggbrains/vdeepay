import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import React, { useContext } from "react";
import PropTypes from "prop-types";
import ApiPaginateSearch from "../component/ApiPaginateSearch";
import { useState } from "react";
// import { useContext } from "react";
import AuthContext from "../store/AuthContext";
import { CustomStyles } from "../component/CustomStyle";
import RefreshComponent from "../component/RefreshComponent";
import ApiEndpoints from "../network/ApiEndPoints";
import { datemonthYear, ddmmyy, dateToTime } from "../utils/DateUtils";
import { useTheme } from "@mui/material/styles";
import { mt_tab_value } from "../utils/constants";
import CustomTabs from "../component/CustomTabs";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CommonStatus from "../component/CommonStatus";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
// import { get } from "../network/ApiController";
// import { apiErrorToast } from "../utils/ToastUtil";
import ActiveInactiveModal from "../modals/ActiveInactiveModal";
import EditVirtualAccounts from "../component/accountLimits/EditVirtualAccounts";
import CheckResponseModal from "../modals/CheckResponseModal";
import { currencySetter } from "../utils/Currencyutil";
import FilterCard from "../modals/FilterCard";
import CachedIcon from "@mui/icons-material/Cached";

import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import EditOperator from "../modals/EditOperator";
import EditVirtualTransactions from "../modals/EditVirtualTransactions";
// import AuthContext from "../store/AuthContext";



let refresh;
function refreshFunc(setQueryParams) {
  setQueryParams("");
  if (refresh) refresh();
}
let refreshFilter;

// tabs in top bar

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
          {" "}
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

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  // borderRadius: "4px",
  padding: "12px 10px",
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 80,
    width: "0px",
    backgroundColor: "#ffffff",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(() => ({
  color: "#fff",
  fontSize: "15px",
  minHeight: "15px",
  minWidth: "25px",
  padding: "8px 6px",
  borderRadius: "4px",
  textTransform: "none",
  // backgroundColor: getHoverInActive(),
  "&.Mui-selected": {
    color: "#fff",

    // backgroundColor: primaryColor(),
    backgroundColor: `hsla(0,0%,100%,.2)`,
    transition: `background-color .3s .2s`,
  },
  "&.Mui-focusVisible": {
    backgroundColor: "rgba(100, 95, 228, 0.32)",
  },
}));

const AdminVirtualAccounts = ({value}) => {
  const theme = useTheme();
  const [apiData, setApiData] = useState([]);
  const [query, setQuery] = useState();
    const authCtx = useContext(AuthContext);
    const user = authCtx.user;
    const role = user?.role;
    console.log("value is define hear",value)
  // const [value, setValue] = useState(0);
  const [currentType, setCurrentType] = useState();
  // const tabs = [
  //   {
  //     label: "VIRTUAL ACCOUNTS",
  //     content: "",
  //     icon: <ManageAccountsRoundedIcon />,
  //   },
  //   { label: "VIRTUAL TRANSACTIONS", content: "", icon: <CurrencyRupeeIcon /> },
  // ];
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  //   setCurrentType(mt_tab_value[newValue]);
  // };
  const searchOptionsVa = [
    { field: "AC Name", parameter: "acc_name" },
    { field: "AC Number", parameter: "acc_no" },
  ];

  //   const getSingleUser = (id) => {
  //     get(
  //       ApiEndpoints.GET_USERS,
  //       `page=1&paginate=10&export=&user_id=${id}`,
  //       "",
  //       (res) => {
  //         const userArray = res.data;
  //         // console.log("userArr", userArray);
  //         setSingleUser();
  //       },
  //       (error) => {
  //         apiErrorToast(error);
  //       }
  //     );
  //   };

  const virtualAccounts = [
    {
      name: "Created/Updated",
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
      width: "150px",
    },
    {
      name: <span className="mx:5">ID</span>,
      selector: (row) => (
        <div className="blue-highlight-txt" style={{ textAlign: "left" }}>
          {row.user_id}
        </div>
      ),

      width: "100px",
    },
    {
      name: "User",
      selector: (row) => (
        <div
          style={{ textAlign: "left" }}
          //   onClick={() => getSingleUser(row.user_id)}
        >
          {row.establishment}
        </div>
      ),
      wrap: true,
      width: "280px",
    },
    {
      name: "Virtual Account",
      cell: (row) => (
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "#473b7f" }}>{row.va}</div>
        </div>
      ),

      wrap: true,
    },
    {
      name: "Allowed Accounts",
      cell: (row) => (
        <div style={{ textAlign: "left" }}>
          {" "}
          <div>{row.allowed_accounts}</div>
        </div>
      ),
      wrap: true,
      width: "300px",
    },
    // {
    //   name: "Status",
    //   selector: (row) => <ActiveInactiveModal row={row} refresh={refresh} />,
    //   center: true,
    // },
    {
      name: " Actions",
      selector: (row) => (
        <Box
          sx={{
            display: "flex",

            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {/* edit */}
          <ActiveInactiveModal row={row} refresh={refresh} />
          <EditVirtualAccounts
            row={row}
            refresh={refresh}
            setApiData={setApiData}
          />
        </Box>
      ),
      right: true,
    },
  ];
  const virtualTransactions = [
    {
      name: "Created/Updated",
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
    },
    {
      name: "UTR",
      cell: (row) => (
        <div style={{ textAlign: "left", fontSize: "13px" }}>
          {row.utr_number}
        </div>
      ),
      wrap: true,
      width: "190px",
    },
    {
      name: "Account Number",
      cell: (row) => (
        <div style={{ textAlign: "left" }}>
          <div>{row.acc_number}</div>
          <div className="light-text" style={{ textAlign: "center" }}>
            {row.ifsc}
          </div>
        </div>
      ),

      width: "170px",
      wrap: true,
    },

    {
      name: "Sender Name/Info",
      cell: (row) => (
        <div style={{ textAlign: "left", fontSize: "13px" }}>
          <div>{row.sender_name}</div>
          <div className="light-text">{row.sender_info}</div>
        </div>
      ),

      wrap: true,
      width: "180px",
    },
    {
      name: "VA",
      cell: (row) => (
        <div style={{ textAlign: "center" }}>
          {" "}
          <div>{row.va_account}</div>
        </div>
      ),
      center: true,
      wrap: true,
    },
    {
      name: "Credit Date",
      cell: (row) => (
        <div style={{ textAlign: "center" }}>
          {" "}
          <div>{row?.credit_date?.split(" ")[0]}</div>
        </div>
      ),
      center: true,
      wrap: true,
    },
    {
      name: "Amount",
      cell: (row) => (
        <div style={{ textAlign: "center", fontWeight: 500, fontSize: "15px" }}>
          <div>{currencySetter(row.amount)}</div>
        </div>
      ),
      center: true,
      grow: 1,
      wrap: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <CommonStatus
          status={row.status}
          approvedStatusText="Success"
          pendingStatusText="Pending"
          rejectedStatusText="Failed"
          refundStatusText="Refund"
          fontSize="14px"
        />
      ),
      center: true,
      width: "110px",
    },

    {
      name: <span className="mx-4">Response</span>,
      selector: (row) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mx: 4,
          }}
        >
          {/* edit */}

          <CheckResponseModal
            row={row}
            fontSize="11px"
            width="130px"
            height="30px"
          />
        </Box>
      ),
      width: "150px",
    },
    {
      name: "Actions",
      selector: (row) => (
        <Box sx={{ display: "flex", mr: 3 }}>
          {/* Conditional rendering based on user.id */}
          {/* {user.role === "SAdmin" ? ( */}
          {user.id === 1 ? (
            <>
              {/* Render EditVirtualTransactions when user.id is "1" */}
              <EditVirtualTransactions row={row} refresh={refresh} />
            </>
          ) : null}
        </Box>
      ),
      right: true,
    }
    
  ];

  return (
    <Grid container>
      <Grid
        item
        md={12}
        sm={12}
        xs={12}
        sx={{
          // width: "100%",
          // background:"#4056A1" ,
          backgroundImage: `linear-gradient(90deg, #0077c0 0%, #00aaff 100%);`,
          maxHeight: "60px",
          borderTopRightRadius: "4px",
          borderTopLeftRadius: "4px",
        }}
      >
        {/* <CustomTabs tabs={tabs} value={value} onChange={handleChange} /> */}
        {/* <StyledTabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          variant="fullWidth"
          scrollButtons="auto"
          aria-label="full width tabs example"
        >
          <StyledTab label="Virtual Accounts" value={2} />
          <StyledTab label="Virtual Transactions" value={3} />
        </StyledTabs> */}
      </Grid>
      <Grid container>
        <Grid
          item
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: { md: "none", sm: "none", xs: "flex" },
            justifyContent: "end",
            alignItems: "center",
            flexDirection: { md: "row" },
            pr: 1,
          }}
        >
          {/*  */}
          <RefreshComponent
            className="refresh-icon-table"
            onClick={() => {
              refresh();
            }}
          />
        </Grid>
        {/* 2  virtual accounts*/}
        { value===3&&
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
                    pr: 2,
                    mt: { md: 0, xs: 2, sm: 2 },
                  }}
                >
                  {/* <RefreshComponent
                    className="refresh-icon-table"
                    onClick={() => {
                      refresh();
                    }}
                  /> */}
                </Grid>
              }
              apiEnd={ApiEndpoints.VIRTUAL_ACCS}
              // searchOptions={searchOptions}
              setQuery={setQuery}
              columns={virtualAccounts}
              apiData={apiData}
              setApiData={setApiData}
              tableStyle={CustomStyles}
              queryParam={query ? query : ""}
              returnRefetch={(ref) => {
                refresh = ref;
              }}
              isFilterAllowed={true}
              filterComponent={
                <FilterCard
                  bottomMargin={-1}
                  showSearch={false}
                  ifUsernameFilter
                  setQuery={setQuery}
                  query={query}
                  clearHookCb={(cb) => {
                    refreshFilter = cb;
                  }}
                  refresh={refresh}
                  actionButtons={
                    <>
                      <Tooltip title="refresh">
                        <IconButton
                          aria-label="refresh"
                          sx={{
                            width: "30px",
                            color: "#0F52BA",
                            ml: -1,
                          }}
                          onClick={() => {
                            refreshFunc(setQuery);
                          }}
                        >
                          <CachedIcon className="refresh-purple " />
                        </IconButton>
                      </Tooltip>
                    </>
                  }
                  />
                }
            />
         
        </Grid>
}
        {/* 3  virtual transactions*/}
        {value===4&&
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
                    pr: 2,
                    mt: { md: 0, xs: 2, sm: 2 },
                  }}
                ></Grid>
              }
              apiEnd={ApiEndpoints.VIRTUAL_TRANSACTIONS}
              searchOptions={searchOptionsVa}
              setQuery={setQuery}
              columns={virtualTransactions}
              apiData={apiData}
              setApiData={setApiData}
              tableStyle={CustomStyles}
              queryParam={query ? query : ""}
              returnRefetch={(ref) => {
                refresh = ref;
              }}
              isFilterAllowed={true}
              filterComponent={
                <FilterCard
                  topMargin={-1}
                  bottomMargin={-1}
                  showSearch={false}
                  ifBeneKycStatus
                  ifSenderNameFilter
                  ifaccountNumberFilter
                  ifUtrFilter
                  ifdateFilter
                  setQuery={setQuery}
                  query={query}
                  clearHookCb={(cb) => {
                    refreshFilter = cb;
                  }}
                  refresh={refresh}
                  actionButtons={
                    <>
                      <Tooltip title="refresh">
                        <IconButton
                          aria-label="refresh"
                          sx={{
                            width: "30px",
                            color: "#0F52BA",

                            ml: -1,
                          }}
                          onClick={() => {
                            refreshFunc(setQuery);
                          }}
                        >
                          <CachedIcon className="refresh-purple " />
                        </IconButton>
                      </Tooltip>
                    </>
                  }
                />
              }
            />
         
        </Grid>}
      </Grid>
    </Grid>
  );
};

export default AdminVirtualAccounts;
