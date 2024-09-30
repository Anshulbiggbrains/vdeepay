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

const AdminRiskView = () => {
  const theme = useTheme();
  const [apiData, setApiData] = useState([]);
  const [query, setQuery] = useState();
  const [singleUser, setSingleUser] = useState(null);

  //   const authCtx = useContext(AuthContext);
  //   const user = authCtx.user;
  //   const role = user?.role;
  const [value, setValue] = useState(0);
  const [currentType, setCurrentType] = useState();
  const tabs = [
    {
      label: "Account Limit",
      content: "",
      icon: <LabelImportantIcon sx={{ color: "#ee6c4d" }} />,
    },
    {
      label: "Settlement Beneficiary's",
      content: "",
      icon: <SettingsInputAntennaIcon sx={{ color: "#ee6c4d" }} />,
    },
    {
      label: "Blocked Accounts",
      content: "",
      icon: <SettingsInputAntennaIcon sx={{ color: "#ee6c4d" }} />,
    },
  ];
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setCurrentType(mt_tab_value[newValue]);
  };
  const searchOptions = [
    { field: "AC Name", parameter: "acc_name" },
    { field: "AC Number", parameter: "acc_no" },
  ];
  const searchOptionsVa = [
    { field: "AC Name", parameter: "acc_name" },
    { field: "AC Number", parameter: "acc_no" },
  ];

  const getSingleUser = (id) => {
    get(
      ApiEndpoints.GET_USERS,
      `page=1&paginate=10&export=&user_id=${id}`,
      "",
      (res) => {
        const userArray = res.data;
        console.log("userArr", userArray);
        setSingleUser();
      },
      (error) => {
        apiErrorToast(error);
      }
    );
  };

  const columns = [
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
      name: "AC Name",
      selector: (row) => (
        <div style={{ textAlign: "left" }}>{row.acc_name}</div>
      ),
      wrap: true,
    },
    {
      name: "AC Number",
      selector: (row) => row.acc_no,
    },
    {
      name: "AC IFSC",
      selector: (row) => row.ifsc,
    },
    {
      name: "AC Type",
      selector: (row) => row.acc_type,
    },
    {
      name: "AC Limit",
      selector: (row) => currencySetter(row.acc_limit),
    },
    {
      name: "Actions",
      selector: (row) => (
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          {/* edit */}

          <CreateEditLimitAccount edit row={row} refresh={refresh} />
          <AdminDeleteLimitedAccounts row={row} refresh={refresh} />
        </Box>
      ),
      right: true,
    },
  ];

  const settlementBeneficiarys = [
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
      width: "160px",
    },
    {
      name: "Id",
      selector: (row) => (
        <div className="blue-highlight-txt" style={{ textAlign: "left" }}>
          {row.id}
        </div>
      ),
      width: "60px",
    },
    {
      name: "Name",
      cell: (row) => (
        <div style={{ textAlign: "center" }}>
          {" "}
          <div>{row.name}</div>
          <div
            style={{
              marginTop: "2px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {" "}
            <CommonStatus
              status={row.status}
              approvedStatusText="Verified"
              fontSize="13px"
              // minWidth="120px"
              maxWidth="120px"
            />
          </div>
        </div>
      ),
      center: true,
      wrap: true,
      width: "280px",
    },
    {
      name: "Bank",
      cell: (row) => (
        <div style={{ textAlign: "left" }}>
          <div>{row.bank}</div>
        </div>
      ),
      wrap: true,
      width: "180px",
    },
    {
      name: "Ifsc",
      cell: (row) => (
        <div style={{ textAlign: "left" }}>
          <div>{row.ifsc}</div>
        </div>
      ),
      wrap: true,
    },
    {
      name: "Account",
      cell: (row) => (
        <div style={{ textAlign: "left" }}>
          <div>{row.acc_number}</div>
        </div>
      ),
      wrap: true,
    },
    {
      name: "KYC",
      selector: (row) => (
        <div style={{ textAlign: "left" }}>
          <CommonStatus
            status={row.kyc_status}
            approvedStatusText="Verified"
            pendingStatusText="Pending"
            rejectedStatusText="Not Done"
            fontSize="13px"
            minWidth="120px"
          />
        </div>
      ),
      center: true,
      width: "150px",
    },
    {
      name: "Actions",
      selector: (row) => <AdminApprovesBene row={row} refresh={refresh} />,
      center: true,
    },
  ];
  const virtualAccounts = [
    {
      name: "Created/Updated",
      selector: (row) => (
        <>
          <div className="mb-2">
            {ddmmyy(row.created_at)} {dateToTime(row.created_at)}
          </div>
          <div>
            {ddmmyy(row.updated_at)} {dateToTime(row.updated_at)}
          </div>
        </>
      ),
    },
    {
      name: "Id",
      selector: (row) => (
        <div
          className="blue-highlight-txt"
          style={{ textAlign: "left" }}
          onClick={() => getSingleUser(row.user_id)}
        >
          {row.user_id}
        </div>
      ),
      width: "50px",
    },
    {
      name: "Virtual Account",
      cell: (row) => (
        <div style={{ textAlign: "center" }}>
          {" "}
          <div>{row.va}</div>
        </div>
      ),
      center: true,
      wrap: true,
    },
    {
      name: "Allowed Accounts",
      cell: (row) => (
        <div style={{ textAlign: "center" }}>
          {" "}
          <div>{row.allowed_accounts}</div>
        </div>
      ),
      center: true,
      wrap: true,
    },
    {
      name: "Status",
      selector: (row) => <ActiveInactiveModal row={row} refresh={refresh} />,
      center: true,
    },
    {
      name: "Actions",
      selector: (row) => (
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          {/* edit */}

          <EditVirtualAccounts row={row} refresh={refresh} />
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
      cell: (row) => <div style={{ textAlign: "left" }}>{row.utr_number}</div>,
      wrap: true,
      width: "150px",
    },
    {
      name: "Account Number",
      cell: (row) => (
        <div style={{ textAlign: "center" }}>
          <div>{row.acc_number}</div>
          <div>{row.ifsc}</div>
        </div>
      ),
      center: true,
      wrap: true,
    },

    {
      name: "Sender Name/Info",
      cell: (row) => (
        <div style={{ textAlign: "center" }}>
          {" "}
          <div>{row.sender_name}</div>
          <div>{row.sender_info}</div>
        </div>
      ),
      center: true,
      wrap: true,
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
      name: "Status",
      selector: (row) => (
        <CommonStatus
          status={row.status}
          approvedStatusText="Success"
          pendingStatusText="Pending"
          rejectedStatusText="Not Done"
          fontSize="13px"
          minWidth="120px"
        />
      ),
      center: true,
    },
    {
      name: "Response",
      selector: (row) => (
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          {/* edit */}

          <CheckResponseModal
            row={row}
            width="35px"
            height="30px"
            fontSize="12px"
          />
        </Box>
      ),
      right: true,
    },
  ];

  return (
    <Grid container>
      <Grid
        item
        md={12}
        sm={12}
        xs={12}
        sx={{
          backgroundImage: `linear-gradient(90deg, #0077c0 0%, #00aaff 100%);`,
          maxHeight: "60px",
          borderTopRightRadius: "4px",
          borderTopLeftRadius: "4px",
        }}
      >
        <CustomTabs tabs={tabs} value={value} onChange={handleChange} />
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
            width: "150%",
          }}
        >
          <Mount visible={value === 0}>
            <div className="mx-2">
              <CreateEditLimitAccount refresh={refresh} />
            </div>
          </Mount>
          <Mount visible={value === 1}>
            <div className="mx-2">
              <FilterModal
                showSearch={false}
                ifBeneKycStatus
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
                  </>
                }
              />
            </div>
          </Mount>

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
        {/* 0 Account limit  */}
        <Grid
          item
          md={12}
          sm={12}
          xs={12}
          sx={{
            mt: "-11px",
          }}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <ApiPaginateSearch
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
                  <div className="mx-2">
                    <CreateEditLimitAccount refresh={refresh} />
                  </div>
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
              apiEnd={ApiEndpoints.ADMIN_ACCOUNTS_LIMITS}
              searchOptions={searchOptions}
              setQuery={setQuery}
              columns={columns}
              apiData={apiData}
              setApiData={setApiData}
              tableStyle={CustomStyles}
              queryParam={query ? query : ""}
              returnRefetch={(ref) => {
                refresh = ref;
              }}
            />
          </TabPanel>
        </Grid>
        {/* 1  "Settlement Beneficiary's" */}
        <Grid item md={12} sm={12} xs={12}>
          <TabPanel value={value} index={1} dir={theme.direction}>
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
              apiEnd={ApiEndpoints.PAYOUT_BENES}
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
              filterComponent={
                <FilterCard
                  showSearch={false}
                  ifBeneKycStatus
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
                          // color="success"
                          sx={{
                            color: "#0F52BA",

                            ml: -2,
                          }}
                          onClick={() => {
                            refreshFunc(setQuery);
                          }}
                        >
                          <CachedIcon className="refresh-purple" />
                        </IconButton>
                      </Tooltip>
                    </>
                  }
                />
              }
            />
          </TabPanel>
        </Grid>
        {/* 2  virtual accounts*/}
        <Grid item md={12} sm={12} xs={12}>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <ApiPaginateSearch
              showSearch={false}
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
              // filterComponent={
              //   <FilterCard
              //     showSearch={false}
              //     ifBeneKycStatus
              //     setQuery={setQuery}
              //     query={query}
              //     clearHookCb={(cb) => {
              //       refreshFilter = cb;
              //     }}
              //     refresh={refresh}
              //     actionButtons={
              //       <>
              //         <RefreshComponent
              //           className="refresh-icon-table"
              //           onClick={() => {
              //             refresh();
              //           }}
              //         />
              //       </>
              //     }
              //   />
              // }
            />
          </TabPanel>
        </Grid>
        {/* 3  virtual transactions*/}
        <Grid item md={12} sm={12} xs={12}>
          <TabPanel value={value} index={3} dir={theme.direction}>
            <ApiPaginateSearch
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
              // filterComponent={
              //   <FilterCard
              //     showSearch={false}
              //     ifBeneKycStatus
              //     setQuery={setQuery}
              //     query={query}
              //     clearHookCb={(cb) => {
              //       refreshFilter = cb;
              //     }}
              //     refresh={refresh}
              //     actionButtons={
              //       <>
              //         <RefreshComponent
              //           className="refresh-icon-table"
              //           onClick={() => {
              //             refresh();
              //           }}
              //         />
              //       </>
              //     }
              //   />
              // }
            />
          </TabPanel>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdminRiskView;
