import React from "react";
import useCommonContext from "../../store/CommonContext";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import SyncIcon from "@mui/icons-material/Sync";
import { Box, Grid, Button, Tooltip } from "@mui/material";
import RefreshComponent from "../RefreshComponent";
import { useNavigate } from "react-router-dom";
import { capitalize } from "../../utils/FormattingUtils";
import { currencySetter } from "../../utils/Currencyutil";
import { datemonthYear } from "../../utils/DateUtils";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/ArrowDownward";
import DoneIcon from "@mui/icons-material/ArrowUpward"; // Add this import

const RecentHistory = () => {
  const { getRecentData, recentData, recentLoading } = useCommonContext();
  const navigate = useNavigate();

  return (
    <Box
      className="card-css"
      sx={{ mt: 2, px: 1, py: 1.5, borderRadius: "10px" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "700",
          fontSize: "20px",
          position: "relative",
          color: "#008ecc",
        }}
      >
        <ArrowForwardIcon
          sx={{
            fontSize: "20px",
            cursor: "pointer",
            position: "absolute",
            left: 0,
            color: " #ff0066",
          }}
          onClick={() => navigate("/some-route")}
        />
        Recent Transactions
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            right: 0,
            color: "#0141CF",
          }}
        >
          <RefreshComponent
            progressColor="#000"
            color="#0000ff"
            refresh={recentLoading}
            onClick={() => {
              getRecentData();
            }}
            size="2rem"
          />
        </Box>
      </Box>

      <Box
        style={{
          marginTop: "12px",
          overflowY: "scroll",
          overflowX: "hidden",
          paddingBottom: "0.5rem",
        }}
      >
        {recentData.map((data, index) => {
          const walletBal = Number(data.amount).toFixed(2);
          return (
            <Grid
              container
              sx={{
                py: 1,
                borderRadius: 3,
                px: 1,
                mb: 0.5,
                border: "2px solid #d48628",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              key={index}
              wrap="nowrap"
            >
              <Grid
                item
                xs={2}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {data.status === "FAILED" ? (
                  <Icon
                    title="Failed"
                    bgColor="#FFD1DC"
                    icon={
                      <CloseIcon sx={{ fontSize: "25px", color: "#ff2c2c" }} />
                    }
                    onClick={() => console.log("Failed clicked")}
                  />
                ) : data.status === "SUCCESS" ? (
                  <Icon
                    title="Success"
                    bgColor="#FFD1DC"
                    icon={
                      <DoneIcon sx={{ fontSize: "25px", color: "	#259625" }} />
                    }
                    onClick={() => console.log("Success clicked")}
                  />
                ) : data.status === "REFUND" ? (
                  <Icon
                    title="Refund"
                    bgColor="#FFDIDC"
                    icon={<SyncIcon sx={{ fontSize: "16px" }} />}
                    onClick={() => console.log("Refund clicked")}
                  />
                ) : (
                  <Icon
                    title="Refund"
                    bgColor="#FFD1DC"
                    icon={<PriorityHighIcon sx={{ fontSize: "16px" }} />}
                    onClick={() => console.log("Other status clicked")}
                  />
                )}
              </Grid>

              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  color: "#004080",
                  minWidth: 0, // Prevents text overflow
                }}
              >
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
                      textOverflow: "ellipsis",
                      width: "100%",
                      textAlign: "left",
                      marginLeft: "6px",
                    }}
                  >
                    {data.operator === "Vendor Payments"
                      ? "settlements"
                      : data.operator}
                  </div>
                </Tooltip>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#787879",
                    marginLeft: "6px",
                    display: "flex",
                  }}
                >
                  {data.number}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#787879",
                    marginLeft: "6px",
                    display: "flex",
                  }}
                >
                  {datemonthYear(data.created_at)}
                </div>
              </Grid>

              <Grid
                item
                xs={4}
                sx={{ display: "flex", flexDirection: "column", minWidth: 0 }}
              >
                <div
                  style={{
                    color:
                      data.status === "SUCCESS"
                        ? "#478778"
                        : data.status === "PENDING"
                        ? "#f48f26"
                        : data.status === "REFUND"
                        ? "#E87204"
                        : "#ff2316",
                    fontWeight: "bold",
                    fontSize: "13px",
                    display: "flex",
                    justifyContent: "flex-end",
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
                        ? "#478778"
                        : data.status === "PENDING"
                        ? "#f48f26"
                        : data.status === "REFUND"
                        ? "#E87204"
                        : "#ff2316",
                    fontWeight: "bold",
                    fontSize: "12px",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  {data.status && capitalize(data.status)}
                </div>
              </Grid>
            </Grid>
          );
        })}
      </Box>
      <div className="flex-he-vc">
        <Button
          className="button-green-bold"
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
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <Tooltip title={title}>{icon}</Tooltip>
    </div>
  );
}
