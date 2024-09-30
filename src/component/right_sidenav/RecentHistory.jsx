import React from "react";
import useCommonContext from "../../store/CommonContext";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
// import DoneIcon from "@mui/icons-material/Done";
// import CloseIcon from "@mui/icons-material/Close";
import SyncIcon from "@mui/icons-material/Sync";
import { Box, Grid, Button, Tooltip } from "@mui/material";
import RefreshComponent from "../RefreshComponent";
import { useNavigate } from "react-router-dom";
import { capitalize } from "../../utils/FormattingUtils";
import { currencySetter } from "../../utils/Currencyutil";
import { datemonthYear } from "../../utils/DateUtils";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from '@mui/icons-material/ArrowDownward';
import DoneIcon from '@mui/icons-material/ArrowUpward'; // Add this import

const RecentHistory = () => {
  const { getRecentData, recentData, recentLoading } = useCommonContext();
  const navigate = useNavigate();

  return (
    <Box
      className="card-css"
      sx={{ mt: 2, px: 3, py: 1.5, borderRadius: "10px" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center", // Center the text horizontally
          alignItems: "center",
          fontWeight: "bold",
          fontSize: "20px",
          position: "relative", // Allows positioning the refresh icon
        }}
      >
        <ArrowForwardIcon
          sx={{ fontSize: "20px", cursor: "pointer", position: "absolute", left: 0 }}
          onClick={() => navigate("/some-route")} // Replace with your desired route
        />
        Recent history
        {/* ######### REFRESH COMPONENT ######### */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute", // Positioning the refresh icon to the right
            right: 0,
          }}
        >
          <RefreshComponent
            progressColor="#000"
            color="#000"
            refresh={recentLoading}
            onClick={() => {
              getRecentData();
            }}
            size="2rem"
          />
        </Box>
      </Box>

      {/* ######## CONTENT ######## */}
      <div
        style={{
          marginTop: "12px",
          overflowY: "scroll",
          overflowX: "hidden",
          paddingBottom: "0.5rem",
          paddingRight: "0.5rem",
        }}
      >
        {recentData.map((data, index) => {
          const walletBal = Number(data.amount).toFixed(2);
          return (
            <Grid container sx={{ py: 1 }} key={index}>
              {/* ######### ICON GRID ######### */}
              <Grid item xs={2} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                {data.status === "FAILED" ? (
                  <Icon
                    title="Failed"
                    bgColor="#E6E6E6"
                    icon={<CloseIcon sx={{ fontSize: "25px",color:"#FF0000" }} />}
                    onClick={() => console.log("Failed clicked")}
                  />
                ) : data.status === "SUCCESS" ? (
                  <Icon
                    title="Success"
                   bgColor="#E6E6E6"
                    icon={<DoneIcon sx={{ fontSize: "25px",color:"green" }} />}
                    onClick={() => console.log("Success clicked")}
                  />
                ) : data.status === "REFUND" ? (
                  <Icon
                    title="Refund"
                    bgColor="#E87204"
                    icon={<SyncIcon sx={{ fontSize: "16px" }} />}
                    onClick={() => console.log("Refund clicked")}
                  />
                ) : (
                  <Icon
                    title="Refund"
                    bgColor="#f48f26"
                    icon={<PriorityHighIcon sx={{ fontSize: "16px" }} />}
                    onClick={() => console.log("Other status clicked")}
                  />
                )}
              </Grid>

              {/* ######### DETAILS GRID ######### */}
              <Grid item xs={6} sx={{ display: "grid", justifyItems: "left" }}>
                <Tooltip
                  title={
                    data.operator === "Vendor Payments"
                      ? "settlements"
                      : data.operator
                  }
                >
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "clip",
                      width: "100%",
                      textAlign: "left",
                    }}
                  >
                    {data.operator === "Vendor Payments"
                      ? "settlements"
                      : data.operator}
                  </div>
                </Tooltip>
                <div style={{ fontSize: "12px", color: "#676970" }}>
                  {data.number}
                </div>
                <div style={{ fontSize: "12px", color: "#676970" }}>
                  {datemonthYear(data.created_at)}
                </div>
              </Grid>

              {/* ######### WALLET BALANCE GRID ######### */}
              <Grid item xs={4}>
                <div
                  style={{
                    color:
                      data.status === "SUCCESS"
                        ? "#00bf78"
                        : data.status === "PENDING"
                        ? "#f48f26"
                        : data.status === "REFUND"
                        ? "#E87204"
                        : "#DC143C",
                    fontWeight: "bold",
                    fontSize: "15px",
                    display: "flex",
                    justifyContent: "end",
                  }}
                  className="diff-font"
                >
                  <span>{data.txn_type === "DR" ? "- " : "+ "}</span>
                  {currencySetter(walletBal)}
                </div>
                <div
                  style={{
                    color:
                      data.status === "SUCCESS"
                        ? "#00bf78"
                        : data.status === "PENDING"
                        ? "#f48f26"
                        : data.status === "REFUND"
                        ? "#E87204"
                        : "#DC143C",
                    fontWeight: "bold",
                    fontSize: "12px",
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  {data.status && capitalize(data.status)}
                </div>
              </Grid>
            </Grid>
          );
        })}
      </div>
      <div className="flex-he-vc">
        <Button
          className="otp-hover-purple"
          onClick={() => {
            navigate("/customer/transactions");
          }}
        >
          More
        </Button>
      </div>
    </Box>
  );
};

export default RecentHistory;

// {/* ######################################## */}
// {/* # TRANSACTION STATUS COMMON COMPONENT # */}
// {/* ######################################## */}
function Icon({ title = "Success", bgColor = "", icon, onClick }) {
  return (
    <div
      style={{
        borderRadius: "25px",
        width: "50px",
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        background: bgColor,
        marginTop: "0.3rem",
        cursor: "pointer", // Added to make the icon clickable
      }}
      onClick={onClick}
    >
      <Tooltip title={title}>{icon}</Tooltip>
    </div>
  );
}
