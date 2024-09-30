import React from "react";
import BarChartIcon from "@mui/icons-material/BarChart";
import { Box, Grid, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import Loader from "./loading-screen/Loader";
import { currencySetter } from "../utils/Currencyutil";
import RefreshIcon from "@mui/icons-material/Refresh";
import MyEarningsModal from "../modals/admin/MyEarningsModal";
import { useState } from "react";
// import Mount from "./Mount";
import { useRef } from "react";

const DashboardDataComponent1 = ({
  users,
  data,
  index,
  len,
  w1 = "",
  w2 = "",
  getWalletBal,
  getBankBal,

  getAPIBal,
  apiBalancesData,
  getPrimaryBalance,
  getTertiaryBalance,

  walletReq,
  bankBalReq,
  apiBalReq,
  PrimaryRequest = false,
  TertiaryRequest = false,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const apiBalRef = useRef();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const apiRefresh = () => {
    console.log("here");
    if (users && users.name.toLowerCase() === "wallet balance") {
      if (getWalletBal) getWalletBal();
    } else if (users && users.name.toLowerCase() === "bank balance") {
      if (getBankBal) getBankBal();
    } else if (users && users.name.toLowerCase() === "api balances") {
      if (getAPIBal) getAPIBal();
    } else if (users && users.name.toLowerCase() === "primary") {
      if (getPrimaryBalance) getPrimaryBalance();
    } else if (users.name.toLowerCase() === "tertiary") {
      if (getTertiaryBalance) getTertiaryBalance();
    }
  };

  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",

        borderRight: {
          lg:
            data === "txn" ? "" : index === len - 1 ? "" : "1px solid #DADADA",
          md:
            data === "txn" ? "" : index === len - 1 ? "" : "1px solid #DADADA",
          xs: "",
          sm: "",
        },
      }}
      className="position-relative"
    >
      {index === 0 && data === "wallet" && <Loader loading={PrimaryRequest} />}
      {index === 1 && data === "wallet" && (
        <Loader loading={TertiaryRequest} />
      )}
      {index === 2 && data === "wallet" && <Loader loading={walletReq} />}
      {index === 3 && data === "wallet" && (
        <Loader loading={bankBalReq ? bankBalReq : false} />
      )}
      {index === 4 && data === "wallet" && (
        <Loader loading={apiBalReq ? apiBalReq : false} />
      )}
      <Grid
        item
        onClick={() => users.name !== "API Balances" && apiRefresh()}
        sx={{ "&:hover": { cursor: "pointer" } }}
      >
        <div
          style={{
            fontSize: data === "txn" ? "15px" : "",
          }}
          onClick={() => users.name === "API Balances" && apiRefresh()}
        >
          {users.name}{" "}
          {data !== "txn" && (
            <RefreshIcon
              className="refresh-purple"
              sx={{
                fontSize: "16px",
              }}
            />
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
          onClick={(e) => {
            if (users.name === "API Balances") {
              handleMenu(e);
            }
          }}
        >
          <BarChartIcon sx={{ mr: 1, color: users.color }} />
          <Tooltip
            title={
              data === "txn" ? (
                ""
              ) : users.name === "Wallet Balance" ? (
                <>
                  <div>w1: {currencySetter(w1)}</div>
                  <div>w2: {currencySetter(w2)}</div>
                </>
              ) : (
                currencySetter(users.balance)
              )
            }
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "baseline",
              }}
            >
              <Typography sx={{ fontSize: data === "txn" ? "18px" : "24px" }}>
                {data === "txn"
                  ? users.balance
                  : Number(users.balance / 10000000).toFixed(2)}
              </Typography>
              {data !== "txn" && (
                <div
                  style={{
                    marginLeft: "2px",
                    fontSize: "12px",
                  }}
                >
                  Cr
                </div>
              )}
            </div>
          </Tooltip>
        </div>
        {/* when api balances we make the below section a menu item */}
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          style={{
            paddingTop: "0rem",
            width: "350px",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          ref={apiBalRef}
        >
          {apiBalancesData?.length > 0 &&
            apiBalancesData.map((item) => {
              return (
                <MenuItem
                  disableRipple
                  sx={{
                    marginTop: "-8px",
                    width: "inherit",
                    minWidth: "280px",
                    "&:hover": {
                      backgroundColor: "#FFF",
                      cursor: "default",
                    },
                  }}
                >
                  <Box
                    sx={{
                      px: 0.7,
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    {" "}
                    <span style={{ fontSize: "14px" }}>{item.bankName}</span>
                    <span style={{ fontSize: "14px" }}>
                      {currencySetter(item.bankBalance)}
                    </span>
                  </Box>
                </MenuItem>
              );
            })}
        </Menu>
      </Grid>
      <MyEarningsModal users={users} />
    </Grid>
  );
};

export default DashboardDataComponent1;
