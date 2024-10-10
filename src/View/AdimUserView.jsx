import React, { useState } from "react";
import {
  Box,
  IconButton,
  Tooltip,
  Snackbar,
  Grid,
  Typography,
  // FormGroup,
  // FormControlLabel,
  // Switch,
} from "@mui/material";
import ApiEndpoints from "../network/ApiEndPoints";
import {
  dateDifference,
  datemonthYear,
  dateToTime,
  ddmmyy,
  myDateDDMMTT,
} from "../utils/DateUtils";
import { CustomStyles } from "../component/CustomStyle";
import BlockUnBlockModal from "../modals/BlockUnBlockModal";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { get } from "../network/ApiController";
import { apiErrorToast } from "../utils/ToastUtil";
import CachedIcon from "@mui/icons-material/Cached";
import { useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../store/AuthContext";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import MoneyTransferModal from "../modals/MoneyTransferModal";
import DmtModal from "../modals/DmtModal";
import AddRetailerinAdUser from "../modals/AddRetailerinAdUser";
import ApiPaginateSearch from "../component/ApiPaginateSearch";
import { currencySetter } from "../utils/Currencyutil";
import { json2Csv, json2Excel } from "../utils/exportToExcel";
import ExcelUploadModal from "../modals/ExcelUploadModal";
import moment from "moment";
// import Loader from "../component/loading-screen/Loader";
import { primaryColor } from "../theme/setThemeColor";
import { useLocation } from "react-router-dom";
// ACTIONS SECTION
import UserServiceSetting from "../modals/UserServiceSetting";
import ViewUserModal from "../modals/ViewUserModal";
//
import AdminDocsViewModal from "../../src/modals/AdminDocsViewModal";
import Mount from "../component/Mount";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import FilterCard from "../modals/FilterCard";
import {
  ROLE_LIST,
  ROLE_LIST4AD,
  adTab,
  adminTab,
  asmTab,
  mdTab,
  zsmTab,
} from "../utils/constants";
import FilterModal from "../modals/FilterModal";
import WalletDebitModal from "../modals/WalletDebitModal";
import AsmProductSaleModal from "../modals/admin/AsmProductSaleModal";
import BarChartIcon from "@mui/icons-material/BarChart";
import AdminDeletesUserModal from "../modals/AdminDeletesUserModal";
import RefreshComponent from "../component/RefreshComponent";
import AdminChargesForApiUsers from "../modals/AdminChargesForApiUsers";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AdminCreateVirtualAcct from "../modals/AdminCreateVirtualAcct";
import CustomTabs from "../component/CustomTabs";
import { Icon } from "@iconify/react";
import AdminUserTab from "../component/Tab/AdminUserTab ";
import { capitalize1 } from "../utils/TextUtil";
// styled tabls
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
          {/* {" "} */}
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
  padding: "2px 10px",
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
  minHeight: "30px",
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(() => ({
  color: "#fff",
  fontSize: "15px",
  minHeight: "15px",
  minWidth: "25px",
  padding: "4px 6px",
  borderRadius: "4px",
  textTransform: "none",
  // backgroundColor: getHoverInActive(),
  "&.Mui-selected": {
    color: "#fff",

    backgroundColor: primaryColor(),
    backgroundColor: `hsla(0,0%,100%,.2)`,
    transition: `background-color .3s .2s`,
  },
  "&.Mui-focusVisible": {
    backgroundColor: "rgba(100, 95, 228, 0.32)",
  },
}));

//  tab pannel ends

let handleCloseModal;
const AdimUserView = () => {
  const theme = useTheme();
  const [apiData, setApiData] = useState([]);
  const [query, setQuery] = useState();
  const [asmList, setAsmList] = useState([]);
  const [open, setOpen] = useState(false);
  const [adMdVal, setAdMdVal] = useState([]);
  // console.log("adMdVal", adMdVal);
  const authCtx = useContext(AuthContext);
  const user = authCtx.user;
  const [request, setRequest] = useState(false);
  const [noOfResponses, setNoOfResponses] = useState(0);
  const [prefilledQuery, setPreFilledQuery] = useState(`platform=WEB`);
  const [tabQueryreset, setTabQueryreset] = useState(false);
  const location = useLocation();
  let refresh;

  // console.log("prefilled", prefilledQuery);

  const getAdMdValue = (passValue) => {
    get(
      ApiEndpoints.GET_USERS,
      `page=1&paginate=10&role=${passValue ? "Md" : "Ad"}&platform=WEB&export=`,
      "",
      (res) => {
        const adArray = res.data.data;
        setAdMdVal(adArray);
      },
      (error) => {
        apiErrorToast(error);
      }
    );
  };

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    console.log("value is ", newValue);

    setValue(newValue);
    if (newValue === 0 || newValue == "undefined") {
      setPreFilledQuery("platform=WEB");
      console.log("inside tab 0 ");
    } else if (newValue === 1) {
      setPreFilledQuery("role=api&platform=WEB");
      console.log("inside tab 1");
    } else if (newValue === 2) {
      setPreFilledQuery("role=Zsm&platform=WEB");
      console.log("inside tab 2 ");
    } else if (newValue === 3) {
      setPreFilledQuery("role=Asm&platform=WEB");
      console.log("inside tab 3 ");
    } else if (newValue === 4) {
      getAdMdValue(4);
      setPreFilledQuery("role=Md&platform=WEB");
      console.log("inside tab 4 ");
    } else if (newValue === 5) {
      setPreFilledQuery("role=Ad&platform=WEB");
      console.log("inside tab 5 ");
    } else if (newValue === 6) {
      setPreFilledQuery("role=Dd&platform=WEB");
      console.log("inside tab 6 ");
    } else if (newValue === 7) {
      setPreFilledQuery("role=Ret&platform=WEB");
      console.log("inside tab 7 ");
    } else if (newValue === 8) {
      setPreFilledQuery("role=Irctc&platform=WEB");
      console.log("inside tab 8 ");
    } else if (newValue === 9) {
      setPreFilledQuery("role=Unverified&platform=WEB");
      console.log("inside tab 9 ");
    } else {
      setPreFilledQuery("platform=WEB");
      console.log("inside tab 10 ");
    }
  };

  console.log("prefilledQuery", prefilledQuery);
  // useEffect(() => {
  //   if (refresh) handleChange()

  //   return () => {
  //   }
  // }, [refresh])

  function refreshFunc(setQuery) {
    setQuery("");
    if (refresh) refresh();
  }

  const handleClickSnack = () => {
    setOpen(true);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const copyToClipBoard = (copyMe) => {
    try {
      navigator.clipboard.writeText(copyMe);
    } catch (err) {
      console.log(err);
    }
  };

  const getAsmValue = () => {
    get(
      ApiEndpoints.GET_USERS,
      `page=1&paginate=10&role=Asm&platform=WEB&export=`,
      "",
      (res) => {
        const asmArray = res.data.data;
        setAsmList(
          asmArray &&
            asmArray.map((item) => {
              return {
                id: item.id,
                name: item.name,
              };
            })
        );
      },
      (error) => {
        apiErrorToast(error);
      }
    );
  };

  const getExcel = () => {
    get(
      ApiEndpoints.GET_USERS,
      `${
        query
          ? query + "&page=1&paginate=10&platform=WEB&export=1"
          : "page=1&paginate=10&platform=WEB&export=1"
      }`,
      setRequest,
      (res) => {
        const apiData = res.data.data;
        const newApiData = apiData.map((item) => {
          const created_at = moment(item.created_at).utc().format("DD-MM-YYYY");
          const updated_at = moment(item.updated_at).utc().format("DD-MM-YYYY");
          return { ...item, created_at, updated_at };
        });
        json2Excel(
          `Users ${moment(new Date().toJSON()).format(
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
      ApiEndpoints.GET_USERS,
      `${
        query
          ? query + "&page=1&paginate=10&platform=WEB&export=1"
          : "page=1&paginate=10&platform=WEB&export=1"
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
          `Users ${moment(new Date().toJSON()).format(
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

  useEffect(() => {
    if (asmList.length < 1) {
      getAsmValue();
    }
    if (adMdVal.length < 1) {
      getAdMdValue();
    }
  }, []);

  useEffect(() => {
    if (location.state) {
      setQuery(`username=${location.state.username}`);
    }
  }, [location.state]);

  //

  const getParent = (row, parent = false, asm = false) => {
    if (parent) {
      let item =
        adMdVal && adMdVal.find((item) => item.id === parseInt(row.parent));
      // console.log("item", item);
      if (item) {
        return item.establishment;
      } else {
        return "";
      }
    } else if (asm) {
      let item = asmList && asmList.find((item) => item.id === Number(row.asm));
      // return item && item.name
      if (item) {
        return item.name;
      } else {
        return "";
      }
    }
  };
  // Helper function to format the date and time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);

    // Format the date part (Month, Day, Year)
    const datePart = date.toLocaleDateString("en-US", {
      month: "short", // "May"
      day: "numeric", // "12"
      year: "2-digit", // "24"
    });

    // Format the time part (Hour, Minute)
    const timePart = date.toLocaleTimeString("en-US", {
      hour: "2-digit", // "08"
      minute: "2-digit", // "30"
      hour12: true, // "AM/PM"
    });

    // Combine both parts
    return `${datePart} ${timePart}`;
  };

  // ############# table columns ################ //
  const columns = [
    {
      name: "Id",
      selector: (row) => (
        <>
          <div
            hidden={
              user && user.role === "Admin"
                ? false
                : user && user.role === "Asm"
                ? false
                : true
            }
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "left",
            }}
          >
            {row.id}
          </div>
        </>
      ),
      // Adjust width to accommodate date and time
      omit: !(user && user.role === "Admin") || !(user && user.role === "Asm"),
    },
    {
      name: "Date",

      selector: (row) => (
        <>
          <div
            hidden={
              user && user.role === "Admin"
                ? false
                : user && user.role === "Asm"
                ? false
                : true
            }
            style={{ textAlign: "left", cursor: "context-menu" }}
          >
            <Tooltip title={dateToTime(row.created_at)}>
              <span>{ddmmyy(row.created_at)}</span>
            </Tooltip>
          </div>
        </>
      ),
      width: "80px", // Adjust width to accommodate date and time
    },

    {
      name: "Mobile",
      selector: (row) => (
        <>
          <div
            onClick={() => {
              copyToClipBoard(row.username);
              handleClickSnack();
            }}
            style={{ textAlign: "left" }}
          >
            {row.username}
          </div>
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleCloseSnack}
            message="number copied"
            sx={{ zIndex: 10000 }}
          />

          <Mount visible={user.role === "Admin"}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Mount visible={row.instId}>
                <AepsIdButton
                  id={row.instId}
                  onClick={() => {
                    copyToClipBoard(row.instId);
                    handleClickSnack();
                  }}
                />
              </Mount>
              <Mount visible={row.fingId}>
                <AepsIdButton
                  id={row.fingId}
                  onClick={() => {
                    copyToClipBoard(row.fingId);
                    handleClickSnack();
                  }}
                />
              </Mount>
            </Box>
          </Mount>
        </>
      ),
      wrap: true,
    },
    {
      name: "Name",
      selector: (row) => (
        <>
          <div className="break-spaces">{row.name}</div>
          <div
            style={{
              whiteSpace: "break-spaces",
              overflow: "hidden",
              textOverflow: "clip",
              textAlign: "left",
              fontSize: "10px",
              color: primaryColor(),
            }}
          >
            {row.establishment}
          </div>
          <div
            style={{
              whiteSpace: "break-spaces",
              overflow: "hidden",
              textOverflow: "clip",
              textAlign: "left",
              fontSize: "10px",
            }}
            className="fw-bold"
          >
            {row?.irctc}
          </div>
        </>
      ),
      wrap: true,
    },
    {
      name: "Role",
      selector: (row) => <div className="blue-highlight-txt">{row.role}</div>,
    },
    {
      name:"Platform",
      selector:(row)=>(
      <div>
         <Tooltip title={capitalize1(row.platform)}>
            <div style={{ textAlign: "left" }}>
              <div
                className="break-words"
                style={{
                  fontSize: "12px",
                }}
              >
                {capitalize1(row.platform)}
              </div>
            </div>
          </Tooltip>
      </div>
      ),
      wrap: true,
      width: "105px",
    
    },
    {
      name: "Parent",
      cell: (row) => (
        <div
          style={{
            whiteSpace: "break-spaces",
            overflow: "hidden",
            textOverflow: "clip",
            textAlign: "left",
          }}
        >
          {getParent(row && row, true, false)
            ? getParent(row && row, true, false)
            : "NA"}
        </div>
      ),
      wrap: true,
      center: false,

      grow: 1.7,
      omit:
        user && user.role === "Admin"
          ? false
          : user && user.role === "Asm"
          ? false
          : user && user.role === "Zsm"
          ? false
          : true,
    },
    {
      name: "Asm",
      cell: (row) => (
        <div
          style={{
            whiteSpace: "break-spaces",
            overflow: "hidden",
            textOverflow: "clip",
            textAlign: "left",
          }}
        >
          {getParent(row && row, false, true)
            ? getParent(row && row, false, true)
            : "NA"}
        </div>
      ),
      wrap: true,
      center: false,

      grow: 1.7,
      omit:
        user && user.role === "Admin"
          ? false
          : user && user.role === "Zsm"
          ? false
          : true,
    },
    {
      name: "InActive",
      cell: (row) => (
        <section>
          {" "}
          <div>{dateDifference(row.updated_at, new Date())} days</div>
          <div>{row.last_transaction}</div>
        </section>
      ),
      wrap: true,
      width: "80px",
      omit: user && user.role === "Ret" ? true : false,
    },

    {
      name: "WB",
      selector: (row) => (
        <div style={{ textAlign: "left" }}>
          <div>{currencySetter(row.w1 / 100)}</div>
          <div style={{ color: "#199ebb" }}>{currencySetter(row.w2 / 100)}</div>
          <div>
            {row.hold && row.hold > 0 ? (
              <span style={{ color: "red" }}>{currencySetter(row.hold)}</span>
            ) : (
              ""
            )}
          </div>
        </div>
      ),
      grow: 1,
      center: false,
      width: "90px",
    },
    {
      name: <span className="ms-2">DMT</span>,
      selector: (row) =>
        user &&
        (user.role === "Ad" || user.role === "Md" || user.role === "Admin") ? (
          <DmtModal row={row} refresh={refresh} />
        ) : (
          <span>{Number(row.dmt_slab2).toFixed(2)}%</span>
        ),
      center: false,
      width: "70px",
    },
    {
      name: "Transfer",
      selector: (row) => <MoneyTransferModal refresh={refresh} row={row} />,
      omit: user && (user.role === "Ad" || user.role === "Md") ? false : true,
    },

    {
      name: "Actions",
      selector: (row) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
          }}
        >
          {user && user.role === "Admin" ? (
            <BlockUnBlockModal row={row} />
          ) : (
            <Box sx={{ width: "100%" }}>
              {row.status === 1 ? (
                <Tooltip title="Unblocked">
                  <LockOpenOutlinedIcon sx={{ color: "#00BF78" }} />
                </Tooltip>
              ) : (
                <Tooltip title="Blocked">
                  <LockOutlinedIcon sx={{ color: "#DC5F5F" }} />
                </Tooltip>
              )}
            </Box>
          )}

          {((user && user.role === "Admin") ||
            (user && user.role === "Asm")) && (
            <Box
              sx={{
                fontSize: "10px",
                color: row.kyc && row.kyc === 1 ? "#00BF78" : "#DC5F5F",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                ml: 1,
              }}
            >
              <Mount visible={row?.kyc === 1 && !row.fingId}>
                <Tooltip title="Kyc Done">
                  <DoneAllIcon />
                </Tooltip>
              </Mount>
              <Mount visible={row?.kyc === 1 && row.fingId}>
                <Tooltip title="Kyc / AePS2 Done">
                  <PlaylistAddCheckIcon />
                </Tooltip>
              </Mount>

              <Mount visible={row?.kyc !== 1}>
                <Tooltip title="Kyc Pending">
                  <IconButton>
                    <Icon
                      icon="ph:clock-countdown-bold"
                      width={24}
                      height={24}
                      color="#FF4200"
                    />
                  </IconButton>
                </Tooltip>
              </Mount>
            </Box>
          )}

          {user && user.role === "Admin" && (
            <AdminCreateVirtualAcct user={user} row={row} refresh={refresh} />
          )}
          {user && user.role === "Admin" && (
            <AsmProductSaleModal
              role={row.role}
              name={row.name}
              id={row.id}
              amount={
                <Tooltip title="Performace Report" placement="bottom">
                  <BarChartIcon sx={{ color: "#DE3163" }} />
                </Tooltip>
              }
              usedInUserTable
            />
          )}
          {user && user.role === "Admin" && (
            <AdminDocsViewModal row={row} refresh={refresh} />
          )}
          {user && user.role === "Admin" && <WalletDebitModal row={row} />}
          {user && user.role === "Admin" && (
            <ViewUserModal
              row={row}
              refresh={refresh}
              asmArray={asmList}
              adArray={adMdVal}
            />
          )}
          <UserServiceSetting row={row} />
          {user?.id.toString() === "1" && (
            <AdminDeletesUserModal row={row} refresh={refresh} />
          )}
        </Box>
      ),
      omit: user && user.role === "Admin" ? false : true,

      center: true,
    },
  ];

  const apiUsersColumns = [
    {
      name: "Id",
      selector: (row) => (
        <>
          <div
            hidden={
              user && user.role === "Admin"
                ? false
                : user && user.role === "Asm"
                ? false
                : true
            }
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "left",
            }}
          >
            {row.id}
          </div>
        </>
      ),
      width: "40px", // Adjust width to accommodate date and time
      omit: !(user && user.role === "Admin") || !(user && user.role === "Asm"),
    },
    {
      name: "Date",

      selector: (row) => (
        <>
          <div
            hidden={
              user && user.role === "Admin"
                ? false
                : user && user.role === "Asm"
                ? false
                : true
            }
            style={{ textAlign: "left", cursor: "context-menu" }}
          >
            <Tooltip title={dateToTime(row.created_at)}>
              <span>{ddmmyy(row.created_at)}</span>
            </Tooltip>
          </div>
        </>
      ),
      width: "80px", // Adjust width to accommodate date and time
    },

    {
      name: "Mobile",
      selector: (row) => (
        <>
          <div
            onClick={() => {
              copyToClipBoard(row.username);
              handleClickSnack();
            }}
            style={{ textAlign: "left" }}
          >
            {row.username}
          </div>
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleCloseSnack}
            message="number copied"
            sx={{ zIndex: 10000 }}
          />

          <Mount visible={user.role === "Admin"}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Mount visible={row.instId}>
                <AepsIdButton
                  id={row.instId}
                  onClick={() => {
                    copyToClipBoard(row.instId);
                    handleClickSnack();
                  }}
                />
              </Mount>
              <Mount visible={row.fingId}>
                <AepsIdButton
                  id={row.fingId}
                  onClick={() => {
                    copyToClipBoard(row.fingId);
                    handleClickSnack();
                  }}
                />
              </Mount>
            </Box>
          </Mount>
        </>
      ),
      wrap: true,
    },
    {
      name: "Name",
      selector: (row) => (
        <>
          <div className="break-spaces">{row.name}</div>
          <div
            style={{
              whiteSpace: "break-spaces",
              overflow: "hidden",
              textOverflow: "clip",
              textAlign: "left",
              fontSize: "10px",
              color: primaryColor(),
            }}
          >
            {row.establishment}
          </div>
        </>
      ),
      wrap: true,
    },
    {
      name: "Role",
      selector: (row) => <div className="blue-highlight-txt">{row.role}</div>,
    },
    {
      name:"Platform",
      selector:(row)=>(
      <div>
         <Tooltip title={capitalize1(row.platform)}>
            <div style={{ textAlign: "left" }}>
              <div
                className="break-words"
                style={{
                  fontSize: "12px",
                }}
              >
                {capitalize1(row.platform)||'NA'}
              </div>
            </div>
          </Tooltip>
      </div>
      ),
      wrap: true,
      width: "105px",
    
    },
    {
      name: "InActive",
      cell: (row) => (
        <section>
          {" "}
          <div>{dateDifference(row.updated_at, new Date())} days</div>
          <div>{row.last_transaction}</div>
        </section>
      ),
      wrap: true,

      omit: user && user.role === "Ret" ? true : false,
    },
    {
      name: "Asm",
      cell: (row) => (
        <div
          style={{
            whiteSpace: "break-spaces",
            textOverflow: "clip",
            overflow: "hidden",
            textAlign: "left",
          }}
        >
          {getParent(row && row, false, true)
            ? getParent(row && row, false, true)
            : "NA"}
        </div>
      ),
      wrap: true,
      grow: 2,
      omit: user && user.role === "Admin" ? false : true,
    },
    {
      name: "Wallet Balance",
      selector: (row) => (
        <div style={{ textAlign: "center" }}>
          <div>{currencySetter(row.w1 / 100)}</div>
          <div style={{ color: "#199ebb" }}>{currencySetter(row.w2 / 100)}</div>
          <div>
            {row.hold && row.hold > 0 ? (
              <span style={{ color: "red" }}>{currencySetter(row.hold)}</span>
            ) : (
              ""
            )}
          </div>
        </div>
      ),
      grow: 1,

      center: false,
    },
    {
      name: "Transfer",
      selector: (row) => <MoneyTransferModal refresh={refresh} row={row} />,
      omit: user && user.role === "Ad" ? false : true,
    },

    {
      name: "Actions",
      selector: (row) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
          }}
        >
          {user && user.role === "Admin" ? (
            <BlockUnBlockModal row={row} />
          ) : (
            <Box sx={{ width: "100%" }}>
              {row.status === 1 ? (
                <Tooltip title="Unblocked">
                  <LockOpenOutlinedIcon sx={{ color: "#00BF78" }} />
                </Tooltip>
              ) : (
                <Tooltip title="Blocked">
                  <LockOutlinedIcon sx={{ color: "#DC5F5F" }} />
                </Tooltip>
              )}
            </Box>
          )}

          {((user && user.role === "Admin") ||
            (user && user.role === "Asm")) && (
            <Box
              sx={{
                fontSize: "10px",
                color: row.kyc && row.kyc === 1 ? "#00BF78" : "#DC5F5F",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                ml: 1,
              }}
            >
              <Mount visible={row?.kyc === 1 && !row.fingId}>
                <Tooltip title="Kyc Done">
                  <DoneAllIcon />
                </Tooltip>
              </Mount>
              <Mount visible={row?.kyc === 1 && row.fingId}>
                <Tooltip title="Kyc / AePS2 Done">
                  <PlaylistAddCheckIcon />
                </Tooltip>
              </Mount>

              <Mount visible={row?.kyc !== 1}>
                <Tooltip title="Kyc Pending">
                  <IconButton>
                    <Icon
                      icon="ph:clock-countdown-bold"
                      width={24}
                      height={24}
                      color="#FF4200"
                    />
                  </IconButton>
                </Tooltip>
              </Mount>
            </Box>
          )}
          {user && user.role === "Admin" && (
            <AdminCreateVirtualAcct row={row} refresh={refresh} />
          )}
          {user && user.role === "Admin" && (
            <AsmProductSaleModal
              role={row.role}
              name={row.name}
              id={row.id}
              amount={
                <Tooltip title="Performace Report" placement="bottom">
                  <BarChartIcon sx={{ color: "#DE3163" }} />
                </Tooltip>
              }
              usedInUserTable
            />
          )}
          {user && user.role === "Admin" && (
            <AdminDocsViewModal row={row} refresh={refresh} />
          )}
          {user && user.role === "Admin" && <WalletDebitModal row={row} />}
          {user?.id.toString() === "1" && <AdminChargesForApiUsers row={row} />}

          <UserServiceSetting row={row} />
          {user?.id.toString() === "1" && (
            <AdminDeletesUserModal row={row} refresh={refresh} />
          )}
        </Box>
      ),
      omit: user && user.role === "Admin" ? false : true,
      width: "360px",
      center: true,
    },
  ];

  const searchOptions = [
    { field: "EST", parameter: "establishment" },
    { field: "Mobile", parameter: "username" },
    {
      field: user?.role === "Ad" ? "" : "Outlet Id",
      parameter: user?.role === "Ad" ? "" : "instId",
    },
  ];

  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      {/* tab pannels here */}
      <Grid container>
        <Grid
          item
          md={12}
          sm={12}
          xs={12}
          sx={{
            // width: "100%",

            backgroundColor: "#e87204",
            borderTopRightRadius: "4px",
            borderTopLeftRadius: "4px",
          }}
        ></Grid>
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
          {/* excel */}
          <div className="mx-2">
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
          <div className="">
            <RefreshComponent
              onClick={() => {
                refreshFunc(setQuery);
              }}
            />
          </div>
          {/* filter modal */}

          <FilterModal
            query={query}
            setQuery={setQuery}
            // ifRoleFilter
            ifestFilter
            ifUsernameFilter
            setTabQueryreset={setTabQueryreset}
            ifInstIdFilter={user?.role === "Admin"}
            // ifFingIdFilter={user?.role === "Admin"}
            // ifIrctcIdFilter={user?.role === "Admin"}
            ifAsmFilter={user?.role === "Admin" || user?.role === "Zsm"}
            roleList={user?.role === "Ad" ? ROLE_LIST4AD : ROLE_LIST}
            asmList={asmList}
            clearHookCb={(cb) => {
              refresh = cb;
            }}
            refresh={refresh}
          />
        </Grid>
      </Grid>
{user.role!=="Ad"&&
      <AdminUserTab setQuery={setQuery} user={user} />
}
      <ApiPaginateSearch
        showSearch={true}
        apiEnd={ApiEndpoints.GET_USERS}
        searchOptions={searchOptions}
        setQuery={setQuery}
        columns={apiUsersColumns}
        tabQueryreset={tabQueryreset}
        setTabQueryreset={setTabQueryreset}
        prefilledQuery={prefilledQuery}
        apiData={apiData}
        tableStyle={CustomStyles}
        setApiData={setApiData}
        queryParam={query ? query : ""}
        returnRefetch={(ref) => {
          refresh = ref;
        }}
        responses={(val) => {
          setNoOfResponses(val);
        }}
        isFilterAllowed={true}
        filterComponent={
          <FilterCard
            showSearch={false}
            query={query}
            setQuery={setQuery}
            // ifRoleFilter
            ifAdIdFilter
            setTabQueryreset={setTabQueryreset}
            ifestFilter
            ifUsernameFilter
            tabQueryreset={tabQueryreset}
            ifInstIdFilter={user?.role === "Admin"}
            // ifFingIdFilter={user?.role === "Admin"}
            // ifIrctcIdFilter={user?.role === "Admin"}
            ifAsmFilter={user?.role === "Admin" || user?.role === "Zsm"}
            roleList={user?.role === "Ad" ? ROLE_LIST4AD : ROLE_LIST}
            asmList={asmList}
            clearHookCb={(cb) => {
              refresh = cb;
            }}
            refresh={refresh}
            // buttons
            actionButtons={
              <>
                <Box sx={{ display: "flex", ml: -2 }}>
                  {user && user.role !== "Ad" && (
                    <ExcelUploadModal
                      twobuttons="Download Csv"
                      btn
                      request={request}
                      getExcel={getExcel}
                      getCsv={getCsv}
                      noOfResponses={noOfResponses}
                      handleCloseCB={(closeModal) => {
                        handleCloseModal = closeModal;
                      }}
                    />
                  )}

                  <Tooltip title="refresh">
                    <IconButton
                      className=""
                      aria-label="refresh"
                      color="success"
                      onClick={() => {
                        refreshFunc(setQuery);
                      }}
                    >
                      <CachedIcon className="refresh-purple" />
                    </IconButton>
                  </Tooltip>
                  {
                    user && user.role === "Admin"
                      ? ""
                      : user && user.role === "Asm"
                      ? ""
                      : ""
                    // <AddRetailerinAdUser refresh={refresh} />
                  }
                </Box>
              </>
            }
          />
        }
      />
    </Box>
  );
};

export default AdimUserView;

function AepsIdButton({ id, onClick }) {
  return (
    <Typography
      component="button"
      sx={{
        mt: 0.8,
        mx: 0.3,
        fontSize: "10px",
        fontWeight: "bold",
        color: primaryColor(),
      }}
      onClick={onClick}
    >
      {id}
    </Typography>
  );
}
