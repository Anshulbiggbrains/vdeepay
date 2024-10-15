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

const LoginHistory = () => {
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

 

  const columns = [
    {
      name: "id",
      selector: (row) => <>{row.id}</>,
    },

    {
      name: "userId",
      cell: (row) => (
      <>{row.user_id}</>
      ),
      center: false,

      width: "70px",
    },
    {
      name: "Login ip",
      selector: (row) => (
   <> {row.ip}</>
      ),
      center: false,
    },
    {
      name: "device",
      selector: (row) => (
       <> {row.device}</>
      ),
      center: false,
    },
    {
      name: "created_at",
      selector: (row) => <>{row.created_at}</>,
    },
    {
      name: "updated_at",
      selector: (row) => (
       <>{row.updated_at}</>
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
      
          apiEnd={ApiEndpoints.GET_LOGIN_HISTORY}
          // searchOptions={searchOptions}
          // setQuery={setQuery}
          columns={columns}
          apiData={apiData}
          setApiData={setApiData}
          tableStyle={CustomStyles}
          // queryParam={query ? query : ""}
          // returnRefetch={(ref) => {
          //   refresh = ref;
          // }}
        //   responses={(val) => {
        //     setNoOfResponses(val);
        //   }}
        //   prefilledQuery={prefilledQuery}
        //   backButton={
        // <></>
        //   }

          
       
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

export default LoginHistory;
