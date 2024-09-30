import {
  Box,
  Button,
  Grid,
  IconButton,
  Tooltip,
  // Typography,
} from "@mui/material";
import React, { useEffect } from "react";
// import ApiPaginate from "../component/ApiPaginate";
import ApiEndpoints from "../network/ApiEndPoints";
import CachedIcon from "@mui/icons-material/Cached";
import { useState } from "react";
import { CustomStyles } from "../component/CustomStyle";
import { datemonthYear, yyyymmdd } from "../utils/DateUtils";
import ExcelUploadModal from "../modals/ExcelUploadModal";
import { get } from "../network/ApiController";
import moment from "moment";
import { json2Csv, json2Excel } from "../utils/exportToExcel";
import { apiErrorToast } from "../utils/ToastUtil";
import ApiPaginateSearch from "../component/ApiPaginateSearch";
import LaptopIcon from "@mui/icons-material/Laptop";
import AppleIcon from "@mui/icons-material/Apple";
import AndroidIcon from "@mui/icons-material/Android";
import InstallMobileIcon from "@mui/icons-material/InstallMobile";
import { DateRangePicker } from "rsuite";
import SyncAltIcon from "@mui/icons-material/SyncAlt";

// ### NEW TRANSACTION VIEW CODE ####
import { primaryColor } from "../theme/setThemeColor";
import useCommonContext from "../store/CommonContext";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../store/AuthContext";
import { USER_ROLES } from "../utils/constants";
import predefinedRanges from "../utils/predefinedRanges";

let refresh;
let handleCloseModal;
const prefilledQuery = "type_txn=SALE";
function refreshFunc(setQueryParams) {
  setQueryParams(prefilledQuery);
  if (refresh) refresh();
}
const AdSaleView = () => {
  const authCtx = useContext(AuthContext);
  const user = authCtx.user;
  const role = user?.role;
  const navigate = useNavigate();
  const { setChooseInitialCategoryFilter } = useCommonContext();

  const [apiData, setApiData] = useState([]);
  const [query, setQuery] = useState("");
  const [request, setRequest] = useState(false);
  const [noOfResponses, setNoOfResponses] = useState(0);
  const [filterValues, setFilterValues] = useState({ date: {}, dateVal: null });
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
          `My Sale Transactions ${moment(new Date().toJSON()).format(
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
          `My Sale Transactions ${moment(new Date().toJSON()).format(
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
    // {
    //   name: "Platform",
    //   selector: (row) => row.platform,
    //   width: "80px",
    // },
    {
      name: "Platform",
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
      width: "80px",
    },

    {
      name: "Info",
      selector: (row) => row.info,
    },
    {
      name: "Service",
      selector: (row) => row.operator,
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
            color: "#fff",
            backgroundColor:
              row.status && row.status === "SUCCESS"
                ? "#00BF78"
                : row.status && row.status === "PENDING"
                ? "#F08D17"
                : row.status && row.status === "REFUND"
                ? "#4045A1"
                : row.status && row.status === "FAILED"
                ? "#DC6F6F"
                : "#00BF78",
            fontWeight: "bold",
            borderRadius: "4px",
            minWidth: "85px",
          }}
        >
          {row.status && row.status === "SUCCESS"
            ? "Success"
            : row.status && row.status === "PENDING"
            ? "Pending"
            : row.status && row.status === "REFUND"
            ? "Refund"
            : row.status && row.status === "FAILED"
            ? "Failed"
            : "Success"}
        </div>
      ),
    },
  ];

  const searchOptions = [{ field: "Info", parameter: "info" }];
  return (
    <Box>
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
          {/* back button */}
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
              } else if (role === USER_ROLES.MD) {
                navigate("/md/transactions");
              } else {
              }
            }}
          >
            <KeyboardBackspaceIcon fontSize="small" /> Back
          </Button>
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
          <Tooltip title="refresh">
            <IconButton
              aria-label="refresh"
              color="success"
              onClick={() => {
                refreshFunc(setQuery);
              }}
            >
              <CachedIcon className="refresh-purple" />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        {/* <ExcelUploadModal
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
        <Tooltip title="refresh">
          <IconButton
            aria-label="refresh"
            color="success"
            onClick={() => {
              refreshFunc(setQuery);
            }}
          >
            <CachedIcon className="refresh-purple" />
          </IconButton>
        </Tooltip> */}
      </Box>
      <Grid sx={{ pr: { xs: 1.3, lg: 0 } }}>
        <ApiPaginateSearch
          showSearch
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
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "center", mx: 2 }}>
                <DateRangePicker
                  placement={isBig ? "leftStart" : "auto"}
                  showOneCalendar
                  placeholder="Date"
                  size="xs"
                  cleanable
                  value={filterValues.dateVal}
                  ranges={predefinedRanges}
                  onChange={(value) => {
                    const dateVal = value;
                    const dates = {
                      start: dateVal && dateVal[0],
                      end: dateVal && dateVal[1],
                    };
                    setFilterValues({
                      ...filterValues,
                      date: {
                        start: yyyymmdd(dates.start),
                        end: yyyymmdd(dates.end),
                      },
                      dateVal,
                    });
                    if (dateVal) {
                      setQuery(
                        `type_txn=SALE&start=${yyyymmdd(
                          dateVal[0]
                        )}&end=${yyyymmdd(dateVal[1])}`
                      );
                    } else {
                      setQuery(`type_txn=SALE`);
                    }
                  }}
                  // disabledDate={afterToday()}
                />
              </Box>

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
              <Tooltip title="refresh">
                <IconButton
                  aria-label="refresh"
                  color="success"
                  onClick={() => {
                    refreshFunc(setQuery);
                  }}
                >
                  <CachedIcon className="refresh-purple" />
                </IconButton>
              </Tooltip>
            </Grid>
          }
          backButton={
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
                } else if (role === USER_ROLES.MD) {
                  navigate("/md/transactions");
                } else {
                }
              }}
            >
              <KeyboardBackspaceIcon fontSize="small" /> Back
            </Button>
          }
          apiEnd={ApiEndpoints.GET_TRANSACTIONS}
          searchOptions={searchOptions}
          columns={columns}
          apiData={apiData}
          query={query}
          setQuery={setQuery}
          tableStyle={CustomStyles}
          setApiData={setApiData}
          ExpandedComponent=""
          queryParam={query ? query : ""}
          returnRefetch={(ref) => {
            refresh = ref;
          }}
          responses={(val) => {
            setNoOfResponses(val);
          }}
          prefilledQuery={prefilledQuery}
        />
      </Grid>
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
          responses={(val) => {
            setNoOfResponses(val);
          }}
        /> */}
    </Box>
  );
};

export default AdSaleView;
