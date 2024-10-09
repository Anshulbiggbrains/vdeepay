import {
  Box,
  Button,
  Grid,
  IconButton,
  Snackbar,
  Tooltip,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import ApiEndpoints from "../network/ApiEndPoints";
import CachedIcon from "@mui/icons-material/Cached";
import { useState } from "react";
import { CustomStyles } from "../component/CustomStyle";
import { datemonthYear, yyyymmdd } from "../utils/DateUtils";
import GetAdUserInfoByUsername from "../modals/GetAdUserInfoByUsername";
import AuthContext from "../store/AuthContext";
import ApiPaginateSearch from "../component/ApiPaginateSearch";
import { get } from "../network/ApiController";
import moment from "moment";
import { json2Csv, json2Excel } from "../utils/exportToExcel";
import { apiErrorToast } from "../utils/ToastUtil";
import ExcelUploadModal from "../modals/ExcelUploadModal";

// icons
import InstallMobileIcon from "@mui/icons-material/InstallMobile";
import LaptopIcon from "@mui/icons-material/Laptop";
import AppleIcon from "@mui/icons-material/Apple";
import AndroidIcon from "@mui/icons-material/Android";
import { DateRangePicker } from "rsuite";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import { primaryColor } from "../theme/setThemeColor";
import useCommonContext from "../store/CommonContext";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { USER_ROLES } from "../utils/constants";
import FilterCard from "../modals/FilterCard";
import FilterModal from "../modals/FilterModal";
import predefinedRanges from "../utils/predefinedRanges";

let refresh;
let handleCloseModal;
function refreshFunc(setQueryParams) {
  setQueryParams(``);
  if (refresh) refresh();
}

const MyPurchaseView = () => {
  const authCtx = useContext(AuthContext);
  const user = authCtx.user;
  const role = user?.role;
  const [apiData, setApiData] = useState([]);
  const [query, setQuery] = useState("");
  const prefilledQuery = "type_txn=PURCHASE";

  const [open, setOpen] = React.useState(false);
  const [request, setRequest] = useState(false);
  const [noOfResponses, setNoOfResponses] = useState(0);
  const [filterValues, setFilterValues] = useState({ date: {}, dateVal: null });

  const { setChooseInitialCategoryFilter } = useCommonContext();

  const navigate = useNavigate();

  const [isBig, setIsBig] = React.useState(
    window.innerWidth < 900 ? false : true
  );

  const changeApply = () => {
    if (window.innerWidth < 900) setIsBig(false);
    if (window.innerWidth > 900) setIsBig(true);
  };
  useEffect(() => {
    window.addEventListener("resize", changeApply);
    return () => {
      window.removeEventListener("resize", changeApply);
    };
  }, []);

  const copyToClipBoard = (copyMe) => {
    try {
      navigator.clipboard.writeText(copyMe);
    } catch (err) {}
  };

  const handleClickSnack = () => {
    setOpen(true);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const getExcel = () => {
    get(
      ApiEndpoints.GET_TRANSACTIONS,
      `${
        query
          ? query + `&page=1&paginate=10&export=1`
          : `page=1&paginate=10&export=1`
      }`,
      setRequest,
      (res) => {
        const apiData = res.data.data;
        const newApiData = apiData.map((item) => {
          const created_at = moment(item.created_at).format("DD-MM-YYYY");
          const time_updated_at = moment(item.updated_at).format("LTS");
          return { ...item, created_at, time_updated_at };
        });
        json2Excel(
          `My Purchase Transactions ${moment(new Date().toJSON()).format(
            "Do MMM YYYY"
          )} | ${moment(new Date().toJSON()).format("hh:mm a")}`,
          JSON.parse(JSON.stringify(newApiData && newApiData))
        );
        handleCloseModal();
      },
      (err) => {
        apiErrorToast(err);
      }
    );
  };

  const getCsv = () => {
    get(
      ApiEndpoints.GET_TRANSACTIONS,
      `${
        query
          ? query + `&page=1&paginate=10&export=1`
          : `page=1&paginate=10&export=1`
      }`,
      setRequest,
      (res) => {
        const apiData = res.data.data;
        const newApiData = apiData.map((item) => {
          const created_at = moment(item.created_at).format("DD-MM-YYYY");
          const time_updated_at = moment(item.updated_at).format("LTS");
          return { ...item, created_at, time_updated_at };
        });
        json2Csv(
          `My Purchase Transactions ${moment(new Date().toJSON()).format(
            "Do MMM YYYY"
          )} | ${moment(new Date().toJSON()).format("hh:mm a")}`,
          JSON.parse(JSON.stringify(newApiData && newApiData))
        );
        handleCloseModal();
      },
      (err) => {
        apiErrorToast(err);
      }
    );
  };

  const columns = [
    {
      name: "Date",
      selector: (row) => datemonthYear(row.created_at),
    },

    {
      name: "Route",
      cell: (row) => (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <div>
            {row.platform === "APP" ? (
              <Tooltip title="APP">
                <InstallMobileIcon fontSize="small" />
              </Tooltip>
            ) : row.platform === "WEB" ? (
              <Tooltip title="WEB">
                <LaptopIcon fontSize="small" />
              </Tooltip>
            ) : row.platform === "ANDROID" ? (
              <Tooltip title="ANDROID">
                <AndroidIcon fontSize="small" />
              </Tooltip>
            ) : row.platform === "IOS" ? (
              <Tooltip title="IOS">
                <AppleIcon fontSize="small" />
              </Tooltip>
            ) : (
              <Tooltip title="API">
                <SyncAltIcon fontSize="small" />
              </Tooltip>
            )}
          </div>
          <div className="fw-bold">{row.platform}</div>
        </div>
      ),
      center: false,

      width: "70px",
    },
    {
      name: "Number",
      selector: (row) => (
        <div style={{ textAlign: "left" }} className="d-flex">
          <span
            style={{ marginRight: "4px" }}
            onClick={() => {
              copyToClipBoard(row.number);
              handleClickSnack();
            }}
          >
            {" "}
            {row.number}
            <Snackbar
              open={open}
              autoHideDuration={3000}
              onClose={handleCloseSnack}
              message="number copied"
              sx={{ zIndex: 10000 }}
            />
          </span>

          {user && user.username !== Number(row && row.number) ? (
            <GetAdUserInfoByUsername row={row} />
          ) : (
            ""
          )}
        </div>
      ),
      center: false,
    },
    {
      name: "Service",
      selector: (row) => (
        <div style={{ textAlign: "left" }}>{row.operator}</div>
      ),
      center: false,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
    },
    {
      name: "Net Amount",
      selector: (row) => (
        <div>
          {row.txn_type && row.txn_type === "CR" ? "+" : "-"}
          {row.net_amount}
        </div>
      ),
    },
    {
      name: "Wallet Balance",
      selector: (row) => (
        <div>
          <div>{Number(row.w1).toFixed(2)}</div>
          {/* <div>{Number(row.w2).toFixed(2)}</div> */}
        </div>
      ),
    },
    {
      name: "Status",
      selector: (row) => (
        <div
          className="px-2 text-uppercase"
          style={{
            // fontSize: "12px",

            color: "#fff",
            backgroundColor:
              row.status && row.status === "SUCCESS"
                ? "#00BF78"
                : row.status && row.status === "PENDING"
                ? "#F08D17"
                : row.status && row.status === "REFUND"
                ? "#F08D17"
                : "#DC6F6F",
            fontWeight: "bold",
            borderRadius: "4px",
            minWidth: "70px",
          }}
        >
          {row.status && row.status === "SUCCESS"
            ? "Success"
            : row.status && row.status === "PENDING"
            ? "Pending"
            : row.status && row.status === "REFUND"
            ? "Refund"
            : "Failed"}
        </div>
      ),
    },
  ];
  const searchOptions = [{ field: "Number", parameter: "number" }];
  return (
    <Box>
      <Grid container sx={{ pr: { xs: 1.3, lg: 0 } }}>
        {/* small screen button */}
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
          {/* back button */}
          <div className="me-3">
            <Button
              size="small"
              className="otp-hover-purple mb-2"
              sx={{
                color: primaryColor(),
              }}
              onClick={() => {
                setChooseInitialCategoryFilter(false);
                if (role === USER_ROLES.AD) {
                  navigate("/ad/transactions");
                } else if (role === USER_ROLES.RET || role === USER_ROLES.DD) {
                  navigate("/customer/transactions");
                } else if (role === USER_ROLES.MD) {
                  navigate("/md/transactions");
                } else {
                }
              }}
            >
              <KeyboardBackspaceIcon fontSize="small" /> Back
            </Button>
          </div>
          <div className="mx-1">
            <ExcelUploadModal
              twobuttons="Download Csv"
              btn
              request={request}
              getExcel={getExcel}
              getCsv={getCsv}
              noOfResponses={noOfResponses}
              setQuery={setQuery}
              handleCloseCB={(closeModal) => {
                handleCloseModal = closeModal;
              }}
            />
          </div>
          {/* refresh */}
          <Tooltip title="refresh">
            <IconButton
              aria-label="refresh"
              sx={{color:"#0F52BA"}}
              onClick={() => {
                refreshFunc(setQuery);
              }}
            >
              <CachedIcon className="refresh-purple" />
            </IconButton>
          </Tooltip>
          {/* filter modal */}
          <FilterModal
            ifdateFilter
            ifnumberFilter
            setQuery={setQuery}
            query={query}
            clearHookCb={(cb) => {
              refresh = cb;
            }}
            refresh={refresh}
          />
        </Grid>
        <ApiPaginateSearch
          showSearch={true}
          isFilterAllowed
          actionButtons={
            <></>
            // <Grid
            //   item
            //   md={12}
            //   sm={12}
            //   xs={12}
            //   sx={{
            //     display: "flex",
            //     justifyContent: { md: "end", xs: "start" },
            //     alignItems: "center",
            //     pr: 5,
            //   }}
            // >
            //   <Box sx={{ display: "flex", justifyContent: "center", mx: 2 }}>
            //     <DateRangePicker
            //       placement={isBig ? "leftStart" : "auto"}
            //       showOneCalendar
            //       placeholder="Date"
            //       size="xs"
            //       cleanable
            //       value={filterValues.dateVal}
            //       ranges={predefinedRanges}
            //       onChange={(value) => {
            //         const dateVal = value;
            //         const dates = {
            //           start: dateVal && dateVal[0],
            //           end: dateVal && dateVal[1],
            //         };
            //         setFilterValues({
            //           ...filterValues,
            //           date: {
            //             start: yyyymmdd(dates.start),
            //             end: yyyymmdd(dates.end),
            //           },
            //           dateVal,
            //         });
            //         if (dateVal) {
            //           setQuery(
            //             `${prefilledQuery}&start=${yyyymmdd(
            //               dateVal[0]
            //             )}&end=${yyyymmdd(dateVal[1])}`
            //           );
            //         } else {
            //           setQuery(`${prefilledQuery}`);
            //         }
            //       }}
            //       // disabledDate={afterToday()}
            //     />
            //   </Box>

            //   <ExcelUploadModal
            //     twobuttons="Download Csv"
            //     btn
            //     request={request}
            //     getExcel={getExcel}
            //     getCsv={getCsv}
            //     noOfResponses={noOfResponses}
            //     setQuery={setQuery}
            //     handleCloseCB={(closeModal) => {
            //       handleCloseModal = closeModal;
            //     }}
            //   />
            //   <Tooltip title="refresh">
            //     <IconButton
            //       aria-label="refresh"
            //     sx={{color:"#0F52BA"}}
            //       onClick={() => {
            //         refreshFunc(setQuery);
            //       }}
            //     >
            //       <CachedIcon className="refresh-purple" />
            //     </IconButton>
            //   </Tooltip>
            // </Grid>
          }
          apiEnd={ApiEndpoints.GET_TRANSACTIONS}
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
          responses={(val) => {
            setNoOfResponses(val);
          }}
          prefilledQuery={prefilledQuery}
          // backButton={
          //   <Button
          //     size="small"
          //     className="otp-hover-purple mb-2"
          //     sx={{
          //       color: primaryColor(),
          //     }}
          //     onClick={() => {
          //       setChooseInitialCategoryFilter(false);
          //       if (role === USER_ROLES.AD) {
          //         navigate("/ad/transactions");
          //       } else if (role === USER_ROLES.RET || role === USER_ROLES.DD) {
          //         navigate("/customer/transactions");
          //       } else if (role === USER_ROLES.MD) {
          //         navigate("/md/transactions");
          //       } else {
          //       }
          //     }}
          //   >
          //     <KeyboardBackspaceIcon fontSize="small" /> Back
          //   </Button>
          // }

          
          filterComponent={
            <>
            <Grid sx={{justifyContent:"end", display:"relative"}}>
            <FilterCard
              showSearch={false}
              ifdateFilter
              //
              ifnumberFilter
              setQuery={setQuery}
              query={query}
              clearHookCb={(cb) => {
                refresh = cb;
              }}
              refresh={refresh}
              // buttons
              // backButton={
              //   <Button
              //     size="small"
              //     className="otp-hover-purple"
              //     sx={{
              //       color: primaryColor(),
              //     }}
              //     onClick={() => {
              //       setChooseInitialCategoryFilter(false);
              //       if (role === USER_ROLES.AD) {
              //         navigate("/ad/transactions");
              //       } else if (
              //         role === USER_ROLES.RET ||
              //         role === USER_ROLES.DD
              //       ) {
              //         navigate("/customer/transactions");
              //       } else if (role === USER_ROLES.MD) {
              //         navigate("/md/transactions");
              //       } else {
              //       }
              //     }}
              //   >
              //     <KeyboardBackspaceIcon fontSize="small" /> Back
              //   </Button>
              // }
              actionButtons={
                <>
                <Box sx={{display:"flex", mt:2,ml:-1.5}}>
                  <ExcelUploadModal
                    twobuttons="Download Csv"
                    btn
                    request={request}
                    getExcel={getExcel}
                    getCsv={getCsv}
                    noOfResponses={noOfResponses}
                    setQuery={setQuery}
                    handleCloseCB={(closeModal) => {
                      handleCloseModal = closeModal;
                    }}
                  />
                  <Tooltip title="refresh" >
                    <IconButton
                      aria-label="refresh"
                      sx={{color:"#0F52BA"}}
                      onClick={() => {
                        refreshFunc(setQuery);
                      }}
                    >
                      <CachedIcon className="refresh-purple" />
                    </IconButton>
                  </Tooltip>
                  </Box>
                </>
              }
            />
            </Grid>
            </>
          }
        />
        {/* <ApiPaginate
          apiEnd={ApiEndpoints.GET_TRANSACTIONS}
          columns={columns}
          apiData={apiData}
          tableStyle={CustomStyles}
          setApiData={setApiData}
          ExpandedComponent=""
          queryParam={query ? query : ""}
          returnRefetch={(ref) => {
            refresh = ref;
          }}
        /> */}
      </Grid>
    </Box>
  );
};

export default MyPurchaseView;
