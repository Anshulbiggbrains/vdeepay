import { Box, Button, IconButton, Tooltip } from "@mui/material";
import React from "react";
import ApiPaginate from "../component/ApiPaginate";
import ApiEndpoints from "../network/ApiEndPoints";
import CachedIcon from "@mui/icons-material/Cached";
import { useState } from "react";
import { CustomStyles } from "../component/CustomStyle";
import { useNavigate } from "react-router-dom";
import { currencySetter } from "../utils/Currencyutil";
import { primaryColor, getHoverInActive } from "../theme/setThemeColor";
import MyButton from "../component/MyButton";
import BankDepDetailsModal from "../modals/admin/BankDepDetailsModal";
import BarChartIcon from "@mui/icons-material/BarChart";
import { ddmmyy, dateToTime } from "../utils/DateUtils";
import { Icon } from "@iconify/react";
import BankChargesModal from "../modals/admin/BankChargesModal";

let refresh;
function refreshFunc(setQueryParams) {
  setQueryParams("");
  if (refresh) refresh();
}
const AdminBanksView = () => {
  const [apiData, setApiData] = useState([]);
  const [query, setQuery] = useState();
  const navigate = useNavigate();
  const columns = [
    {
      name: "Created At",
      selector: (row) => (
        <div className="mb-1">
          {ddmmyy(row.created_at)}
          <br />
          {dateToTime(row.created_at)}
        </div>
      ),
      width: "100px",
    },
    {
      name: "ID",
      selector: (row) => <div className="blue-highlight-txt">{row.id}</div>,
      width: "70px",
    },
    {
      name: "Name",
      selector: (row) => row.name,

      width: "360px",
    },
    {
      name: "Account",
      selector: (row) => row.accNo,
      width: "180px",
    },

    {
      name: "IFSC Code",
      selector: (row) => row.ifsc || "NA",
      width: "170px",
    },
    {
      name: "Branch Name",
      selector: (row) => row.branchname || "NA",
    },
    {
      name: "Balance",
      selector: (row) => currencySetter(row.balance),
    },
    // {
    //   name: "Status",
    //   selector: (row) => (
    //     <Box sx={{ display: "flex" }}>
    //       {row.status === 1 ? (
    //         <Button
    //           size="small"
    //           sx={{
    //             backgroundColor: primaryColor(),
    //             color: "#ffffff",
    //             p: 0,
    //             "&:hover": {
    //               backgroundColor: primaryColor(),
    //               color: "#ffffff",
    //             },
    //           }}
    //         >
    //           Active
    //         </Button>
    //       ) : (
    //         <Button
    //           size="small"
    //           sx={{
    //             backgroundColor: getHoverInActive(),
    //             color: "#ffffff",
    //             px: 1,
    //             py: 0,
    //             "&:hover": {
    //               backgroundColor: getHoverInActive(),
    //               color: "#ffffff",
    //             },
    //           }}
    //         >
    //           InActive
    //         </Button>
    //       )}
    //       {/* <AdminBanksDetailsModal row={row} /> */}
    //     </Box>
    //   ),
    // },
    {
      name: "Statement",
      selector: (row) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Tooltip title="statement">
            <MyButton
              green
              text="Statement"
              onClick={() => {
                navigate("/admin/bankStatement", {
                  state: {
                    bank_id: row.id,
                    bank_name: row.name,
                    balance: row.balance,
                  },
                });
              }}
            />
          </Tooltip>
        </Box>
      ),
    },

    {
      name: <span className="mx-4">Actions</span>,
      selector: (row) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BankChargesModal
            bank_id={row?.id}
            id={row?.id}
            name={row?.name}
            icon={
              <Tooltip title="Bank charges">
                <IconButton sx={{ color: "#bd18c9" }}>
                  <Icon icon="ic:outline-rate-review" width={25} height={25} />
                </IconButton>
              </Tooltip>
            }
            usedInUserTable
          />
          <BankDepDetailsModal
            bank_id={row?.id}
            id={row?.id}
            name={row?.name}
            icon={
              <Tooltip title="Bank Deposit Details">
                <IconButton sx={{ color: "#d04949" }}>
                  <Icon icon="mdi:account-details" width={25} height={25} />
                </IconButton>
              </Tooltip>
            }
            usedInUserTable
          />
        </Box>
      ),
      center: true,
    },
  ];

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
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
      </Box>
      <div>
        <ApiPaginate
          apiEnd={ApiEndpoints.GET_BANKS}
          columns={columns}
          apiData={apiData}
          tableStyle={CustomStyles}
          setApiData={setApiData}
          ExpandedComponent=""
          queryParam={query ? query : ""}
          returnRefetch={(ref) => {
            refresh = ref;
          }}
          paginateServer={false}
          paginate={false}
        />
      </div>
    </Box>
  );
};

export default AdminBanksView;
