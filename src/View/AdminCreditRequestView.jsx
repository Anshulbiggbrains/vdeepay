/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  FormControl,
  MenuItem,
  TextField,
  IconButton,
  Tooltip,
  Container,
  Snackbar,
  Button,
  Grid,
} from "@mui/material";
import ApiEndpoints from "../network/ApiEndPoints";
// import ApiPaginate from "../component/ApiPaginate";
import { yyyymmdd, ddmmyy, dateToTime1 } from "../utils/DateUtils";
import { CustomStyles } from "../component/CustomStyle";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CreditRequestModal from "../modals/CreditRequestModal";
import numWords from "num-words";
import CachedIcon from "@mui/icons-material/Cached";
// import FilterComponent from "../component/FilterComponent";
import { useContext } from "react";
import AuthContext from "../store/AuthContext";
import CreateCreditRequest from "../modals/CreateCreditRequest";
import { useNavigate } from "react-router-dom";
import { currencySetter } from "../utils/Currencyutil";
// import ApiPaginateSearch from "../component/ApiPaginateSearch";
import ApiPaginate from "../component/ApiPaginate";
import { get } from "../network/ApiController";
import { apiErrorToast } from "../utils/ToastUtil";
import { json2Excel } from "../utils/exportToExcel";
import moment from "moment";
import ExcelUploadModal from "../modals/ExcelUploadModal";
import { DateRangePicker } from "rsuite";
import predefinedRanges from "../utils/predefinedRanges";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { capitalize1 } from "../utils/TextUtil";
import CommonStatus from "../component/CommonStatus";
import { Icon } from "@iconify/react";
import VisibilityIcon from "@mui/icons-material/Visibility";
// import TextToSpeech from "../component/TextToSpeech";

import FilterCard from "../modals/FilterCard";
import useCommonContext from "../store/CommonContext";
import MyButton from "../component/MyButton";
const CreditRequestView = () => {
  const navigate = useNavigate();
  const [prefilledQuery, SetPrefilledQuery] = useState("status=");

  const [apiData, setApiData] = useState([]);
  const [query, setQuery] = useState("status=PENDING");

  const [open, setOpen] = useState(false);
  const [defaultStatus, setDefaultStatus] = useState("PENDING");
  const [noOfResponses, setNoOfResponses] = useState(0);
  // console.log("noOfResponses", noOfResponses);
  const [request, setRequest] = useState(false);
  const [asmVal, setAsmVal] = useState([]);
  const [filterValues, setFilterValues] = useState({ date: {}, dateVal: null });
  //
  const [isShowFilterCard, setIsShowFilterCard] = useState(false);
  const {
    setChooseInitialCategoryFilter,
    chooseInitialCategoryFilter,
    refreshUser,
  } = useCommonContext();

  function refreshFunc(setQueryParams) {
    if (refresh) refresh();
  }

  // check screen is big or small
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

  let handleCloseModal;
  let refresh;
  function refreshFunc(setQueryParams) {
    // setQueryParams("status=PENDING");
    // setDefaultStatus("PENDING");
    if (refresh) refresh();
  }
  //
  const authCtx = useContext(AuthContext);
  const user = authCtx.user;

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
    } catch (err) {}
  };

  // const handleChangeStatus = (event) => {
  //   setDefaultStatus(event.target.value);
  //   if (defaultStatus !== "Status") {
  //     SetPrefilledQuery(`status=${event.target.value}`);
  //     setQuery(`status=${event.target.value}`);
  //   } else if (defaultStatus === "Status") setQuery(`status=`);
  // };

  const getUserAsm = () => {
    get(
      ApiEndpoints.GET_USERS,
      `page=1&paginate=100&role=Asm&export=`,
      null,
      (res) => {
        const asmArray = res.data.data;
        setAsmVal(
          asmArray &&
            asmArray.map((item) => {
              return {
                id: item.id,
                name: item.name,
              };
            })
        );
      },
      (err) => {
        apiErrorToast(err);
      }
    );
  };

  const findAsmWithId = (id) => {
    let item = asmVal && asmVal.find((item) => item.id === Number(id));
    // return item && item.name
    if (item) {
      return item.name;
    } else {
      return "";
    }
  };

  useEffect(() => {
    if (user.role === "Admin") getUserAsm();
  }, []);

  const columns = [
    {
      name: "Created/Updated",
      selector: (row) => (
        <>
          <div className="mb-2">
            {ddmmyy(row.created_at)} {dateToTime1(row.created_at)}
          </div>
          <div>
            {ddmmyy(row.updated_at)} {dateToTime1(row.updated_at)}
          </div>
        </>
      ),
      wrap: true,
      width: "125px",
    },
    {
      name: "Req Date",
      selector: (row) => <div>{row.date}</div>,
      wrap: true,
    },
    {
      name: <span className="mx-2">Establishment</span>,
      // name: (
      //   <FilterComponent
      //     name="Number"
      //     onKeyDown={(e) => {
      //       if (
      //         e.target.value.length === 10 &&
      //         e.key.toLowerCase() !== "backspace"
      //       ) {
      //         setQuery(`status=${defaultStatus}&number=${e.target.value}`);
      //       }
      //     }}
      //   />
      // ),
      selector: (row) => (
        <>
          <div style={{ textAlign: "left" }}>
            <div>{capitalize1(row.name)}</div>
          </div>
          <div
            onClick={() => {
              copyToClipBoard(row.username);
              handleClickSnack();
            }}
          >
            {row.username}
            <Tooltip title="Go To Account">
              <IconButton
                sx={{ color: "#1877F2", mx: 0.5, mb: 0.4 }}
                onClick={() => {
                  navigate("/admin/accountStatement", {
                    state: {
                      mobile: row.username,
                      acc_name: row.name,
                      bal: row.balance,
                    },
                  });
                }}
              >
                <Icon icon="ion:arrow-undo-sharp" width={22} height={22} />
              </IconButton>
            </Tooltip>
            <Snackbar
              open={open}
              autoHideDuration={3000}
              onClose={handleCloseSnack}
              message="number copied"
              sx={{ zIndex: 10000 }}
            />
          </div>
          {/* <div>
            {user && user.role === "Admin" && (
              <Button
                variant="text"
                sx={{ fontSize: "8px", alignItems: "left" }}
                onClick={() => {
                  navigate("/admin/accountStatement", {
                    state: {
                      mobile: row.username,
                      acc_name: row.name,
                      bal: row.balance,
                    },
                  });
                }}
              >
                Go to acc
              </Button>
            )}
          </div> */}
        </>
      ),
      wrap: true,
      width: "150px",

      omit:
        user && user.role === "Admin"
          ? false
          : user && user.role === "Asm"
          ? false
          : true,
    },

    {
      name: "Role",
      selector: (row) => (
        <div className="blue-highlight-txt" style={{ textAlign: "left" }}>
          {row.role && row.role === "Ret"
            ? "Ret"
            : row.role && row.role === "Ad"
            ? "AD"
            : row.role && row.role === "Api"
            ? "Corp"
            : row.role && row.role === "Asm"
            ? "SM"
            : row.role && row.role === "Dd"
            ? "DD"
            : ""}
        </div>
      ),
      wrap: true,

      omit:
        user && user.role === "Admin"
          ? false
          : user && user.role === "Asm"
          ? false
          : true,
    },
    {
      name: "ASM",
      selector: (row) => (
        <div style={{ fontSize: "13px" }}>
          {findAsmWithId(row.asm_Id) ? findAsmWithId(row.asm_Id) : "NA"}
        </div>
      ),
      wrap: true,

      omit:
        user && user.role === "Admin"
          ? false
          : user && user.role === "Asm"
          ? true
          : true,
    },
    {
      name: "Bank",
      selector: (row) => (
        <div style={{ textAlign: "left", fontSize: "12px" }}>
          <div>{row.bank_name}</div>
        </div>
      ),
      wrap: true,
    },
    {
      name: "MOP",
      selector: (row) => (
        <div style={{ textAlign: "left", fontSize: "13px" }}>
          <div style={{ color: "grey" }}>{row.mode}</div>
        </div>
      ),
      wrap: true,
      center: false,
    },

    {
      name: "Ref",
      selector: (row) => (
        <div style={{ textAlign: "left", fontsize: "13px" }}>
          {row.bank_ref_id}
        </div>
      ),
      wrap: true,
    },
    {
      name: "Amount",
      selector: (row) => (
        <div style={{ textAlign: "left" }}>
          <div>{currencySetter(row.amount)}</div>
          <Box sx={{ color: "grey", fontSize: "10.5px", mt: 0.5 }}>
            {numWords(row.amount)}
          </Box>
        </div>
      ),
      wrap: true,
    },
    {
      name: "Credit",
      selector: (row) => currencySetter(row.ledger_bal),
      wrap: true,

      // omit: user && (user.role === "Ret" || user.role === "Dd"),
      omit: user && user.role !== "Admin",
    },
    {
      name: "Remarks",
      selector: (row) => (
        <div style={{ fontSize: "13px", textAlign: "left" }}>
          {row.remark ? row.remark : "NA"}
        </div>
      ),
      wrap: true,
    },
    {
      name: "Status",
      selector: (row) => {
        return (
          <Box
            sx={{
              display: "flex",

              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <CommonStatus
              status={row?.status}
              approvedStatusText="APPROVED"
              pendingStatusText="PENDING"
              rejectedStatusText="REJECTED"
              fontSize="11px"
            />
          </Box>
        );
      },
      wrap: true,
    },

    {
      name: <span className="mx-3">Action</span>,
      selector: (row) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {row?.status === "REJECTED" ? (
            <CreditRequestModal row={row} action="REOPEN" refresh={refresh} />
          ) : row?.status === "PENDING" ? (
            <div style={{ display: "flex" }}>
              <CreditRequestModal
                row={row}
                action="APPROVE"
                refresh={refresh}
              />
              <CreditRequestModal row={row} action="REJECT" refresh={refresh} />

              <Tooltip title="View">
                <IconButton
                  sx={{ color: "#5234ea" }}
                  onClick={() => {
                    navigate("", {});
                  }}
                >
                  <Icon
                    icon="material-symbols:pageview-outline"
                    width={25}
                    height={25}
                  />
                </IconButton>
              </Tooltip>
            </div>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", color: "green" }}>
              <CheckCircleIcon sx={{ mr: 0.3 }} />
              Already Approved
            </Box>
          )}
        </Box>
      ),
      wrap: true,
      width: "130px",
      omit:
        user && user.role === "Admin"
          ? defaultStatus && defaultStatus === "APPROVED"
            ? true
            : false
          : true,
    },
  ];

  // excel api call
  const getExcel = () => {
    get(
      ApiEndpoints.CRED_REQ,
      `${
        query
          ? query + "&page=1&paginate=10&export=1"
          : "page=1&paginate=10&export=1&status=ALL"
      }`,
      setRequest,
      (res) => {
        const apiData = res.data.data;
        // console.log("data", apiData);
        json2Excel(
          `Fund Request ${moment(new Date().toJSON()).format(
            "Do MMM YYYY"
          )} | ${moment(new Date().toJSON()).format("hh:mm a")}`,
          JSON.parse(JSON.stringify(apiData && apiData))
        );
        handleCloseModal();
      },
      (err) => {
        apiErrorToast(err);
      }
    );
  };

  return (
    <Grid>
      <Grid
        className="table-container"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pt: 1,
          pb: 1,
          gap: 5,
        }}
      >
        <FilterCard
          ifestFilter={user.role !== "Api"}
          ifnumberFilter
          ifAsmFilter={
            user.role !== "Api" && user.role !== "Ret" && user.role !== "Dd"
          }
          ifStatusFilter
          setQuery={setQuery}
          query={query}
          chooseInitialCategoryFilter={
            chooseInitialCategoryFilter !== "ALL"
              ? chooseInitialCategoryFilter
              : false
          }
          refresh={refresh}
          isShowFilterCard={isShowFilterCard}
          setIsShowFilterCard={setIsShowFilterCard}
          actionButtons={
            <>
              <Tooltip title="export">
                <ExcelUploadModal
                  btn
                  request={request}
                  getExcel={getExcel}
                  noOfResponses={noOfResponses}
                  setQuery={setQuery}
                  handleCloseCB={(closeModal) => {
                    handleCloseModal = closeModal;
                  }}
                />
              </Tooltip>

              <Tooltip title="refresh">
                <IconButton
                  aria-label="refresh"
                  sx={{
                    color: "#0F52BA",
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

        {user && user.role === "Admin" ? (
          ""
        ) : user && user.role === "Asm" ? (
          ""
        ) : (
          <CreateCreditRequest refresh={refresh} />
        )}
      </Grid>

      <Grid xs={12}>
        <ApiPaginate
          apiEnd={ApiEndpoints.CRED_REQ}
          columns={columns}
          apiData={apiData}
          tableStyle={CustomStyles}
          setApiData={setApiData}
          queryParam={query ? query : ""}
          returnRefetch={(ref) => {
            refresh = ref;
          }}
          ExpandedComponent={null}
          responses={(val) => {
            setNoOfResponses(val);
          }}
        />
      </Grid>
    </Grid>
  );
};

export default CreditRequestView;

{
  /* date filter */
}
{
  /* <Box sx={{ mx: 2 }}>
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
                  `${prefilledQuery}&start=${yyyymmdd(
                    dateVal[0]
                  )}&end=${yyyymmdd(dateVal[1])}`
                );
              } else {
                setQuery(`${prefilledQuery}`);
              }
            }}
            // disabledDate={afterToday()}
          />
        </Box> */
}
