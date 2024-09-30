import React, { useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import ApiPaginate from "../component/ApiPaginate";
import { CustomStyles } from "../component/CustomStyle";
import SendNewNoti from "../modals/SendNewNoti";
import ApiEndpoints from "../network/ApiEndPoints";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { ddmmyy, dateToTime1 } from "../utils/DateUtils";
import DeleteNotification from "../modals/DeleteNotification";
import { getPriorityBg, getPriorityColor } from "../theme/setThemeColor";
let refresh;
function refreshFunc(setQueryParams) {
  setQueryParams("");
  if (refresh) refresh();
}
const AdminNotificationsView = () => {
  const [apiData, setApiData] = useState([]);
  const [query, setQuery] = useState();

  const columns = [
    {
      name: "id",
      selector: (row) => row.id,
      width: "70px",
    },
    {
      name: "Created At",
      selector: (row) => (
        <div style={{ textAlign: "left" }}>
          {ddmmyy(row.created_at)} {dateToTime1(row.created_at)}
        </div>
      ),
    },
    {
      name: "Notification Id",
      selector: (row) => row.notification_id,
    },
    {
      name: "user Id",
      selector: (row) => (
        <div className="blue-highlight-txt" style={{ textAlign: "left" }}>
          {row.user_id}
        </div>
      ),
    },
    {
      name: "Priority",
      selector: (row) => (
        <div
          style={{
            color: getPriorityColor(row.priority),
            backgroundColor: getPriorityBg(row.priority),
            padding: "0.2rem",
            borderRadius: "3px",
          }}
        >
          {row.priority}
        </div>
      ),
    },
    {
      name: "Message",
      selector: (row) => (
        <div
          className="break-words"
          style={{
            textAlign: "left",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          {row.message}
        </div>
      ),
      width: "750px",
      grow: 1,
      wrap: true,
    },
    // {
    //   name: "Is Read",
    //   selector: (row) => row.is_read,
    // },

    {
      name: <span className="mx-4">Actions</span>,
      selector: (row) => (
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            gap: 7,

            pr: 0,
            width: "100px",
          }}
        >
          {row.is_read === 0 ? (
            <Tooltip title="Unread">
              <DoneIcon sx={{ color: "grey" }} />
            </Tooltip>
          ) : (
            <Tooltip title="Read">
              <DoneAllIcon color="success" />
            </Tooltip>
          )}

          <div>
            <DeleteNotification row={row} refresh={refresh} />
          </div>
        </div>
      ),
    },
  ];
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          mb: 1,
        }}
      >
        {/* <AddOperatorModal /> */}
        <SendNewNoti refresh={refresh} />
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
          apiEnd={ApiEndpoints.GET_NOTIFICATION}
          ExpandedComponent={false}
          expandVisible={false}
          setQuery={setQuery}
          columns={columns}
          tableStyle={CustomStyles}
          apiData={apiData}
          setApiData={setApiData}
          queryParam={query ? query : ""}
          returnRefetch={(ref) => {
            refresh = ref;
          }}
        />
      </div>
    </>
  );
};

export default AdminNotificationsView;
