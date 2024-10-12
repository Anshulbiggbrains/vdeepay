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
      selector: (row) => {
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Tooltip title=" Statement">
              <Button
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px",
                  fontSize: "12px",
                  color: "#ffffff",
                  fontWeight: "700",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  justifyContent: "center",
                  background: "linear-gradient(45deg, #ff9248, 	#ff6600)",
                  boxShadow: "0px 4px 15px rgba(255, 165, 0, 0.5)",
                  "&:hover": {
                    boxShadow: "0px 6px 20px rgba(255, 165, 0, 0.5)",
                    background: "#e0561f",
                  },
                }}
                onClick={() => {
                  navigate("/admin/bankStatement", {
                    state: {
                      bank_id: row.id,
                      bank_name: row.name,
                      balance: row.balance,
                    },
                  });
                }}
              >
                Statement
              </Button>
            </Tooltip>
          </Box>
        );
      },
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
                <IconButton sx={{ color: "#560b7f" }}>
                  <Icon icon="ri:funds-box-line" width={25} height={25} />
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
                <IconButton sx={{ color: "#f10066" }}>
                  <Icon
                    icon="mdi:card-account-details-star-outline"
                    width={25}
                    height={25}
                  />
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
