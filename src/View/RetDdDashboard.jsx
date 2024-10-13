import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { Grid, Typography, Box, IconButton } from "@mui/material";
import AuthContext from "../store/AuthContext";
import CommonCardDashBoard from "../component/CommonCardDashBoard";
import {
  moneyl,
  cms1,
  nepal1,
  aeps1,
  upi1,
  vpay1,
  airplane1,
  bus1,
  hotel1,
  train1,
  electricity1,
  creditcard1,
  insurance1,
  dth1,
  broadband1,
  gas1,
  water1,
  landline1,
  recharge1,
  bbps1,
  BBPS,
} from "../iconsImports";
import DmtContainer from "./DMTcontainer";
import CMSView from "./CMSView";
import VendorPayments from "./VendorPayments";
import NepalTransfer from "./NepalTransfer";
import UPITransferView from "./UPITransferView";
import MobileRechargeForm from "../component/MobileRechargeForm";
import CreditcardForm from "../component/CreditcardForm";
import ElectricityForm from "../component/ElectricityForm";
import AEPS2View from "./aeps/AEPS2View";
import BBPSView from "./BBPSView";
import TravelContainer from "./Travel/TravelContainer";
import FlightTab from "../component/Travel/FlightTab";
import BusTab from "../component/Travel/BusTab";
import TrainTab from "../component/Travel/TrainTab";
import HotelsTab from "../component/Travel/HotelsTab";

const RetDdDashboard = () => {
  const [currentView, setCurrentView] = useState(null);

  const location = useLocation();
  const authCtx = useContext(AuthContext);
  const user = authCtx.user;
  console.log("user is ", user);

  const dataCategories = [
    {
      title: "Banking",
      data: [
        { id: 1, name: "DMT", img: moneyl, component: DmtContainer },
        { id: 2, name: "CMS ", img: cms1, component: CMSView },
        {
          id: 3,
          name: "Nepal Transfer",
          img: nepal1,
          component: NepalTransfer,
        },
        {
          id: 4,
          name: "Vendor Payments",
          img: vpay1,
          component: VendorPayments,
        },
        { id: 5, name: "UPI", img: upi1, component: UPITransferView },
        { id: 6, name: "Aeps", img: aeps1, component: AEPS2View },
      ],
    },
    {
      title: "Utility",
      data: [
        {
          id: 7,
          name: "Prepaid",
          img: recharge1,
          component: MobileRechargeForm,
        },
        {
          id: 8,
          name: "Postpaid",
          img: recharge1,
          component: MobileRechargeForm,
        },
        { id: 9, name: "DTH", img: dth1, component: MobileRechargeForm },
        {
          id: 10,
          name: "Electricity",
          img: electricity1,
          component: ElectricityForm,
        },
        {
          id: 11,
          name: "Credit Card",
          img: creditcard1,
          component: CreditcardForm,
        },
        {
          id: 12,
          name: "BroadBand",
          img: broadband1,
          component: ElectricityForm,
        },
        { id: 13, name: "Gas", img: gas1, component: ElectricityForm },
        { id: 14, name: "Water", img: water1, component: ElectricityForm },
        {
          id: 15,
          name: "Insurance",
          img: insurance1,
          component: ElectricityForm,
        },
        {
          id: 16,
          name: "Landline",
          img: landline1,
          component: ElectricityForm,
        },
        { id: 17, name: "Bbps", img: BBPS, component: BBPSView },
      ],
    },
    {
      title: "Travel",
      data: [
        { id: 18, name: "AIR", img: airplane1, component: FlightTab },
        { id: 19, name: "BUS", img: bus1, component: BusTab },
        { id: 20, name: "HOTELS", img: hotel1, component: HotelsTab },
        { id: 21, name: "IRCTC", img: train1, component: TrainTab },
      ],
    },
  ];

  const handleCardClick = (item) => {
    let title = ""; // Define a title variable
    if (item.name === "Prepaid") {
      title = "Prepaid";
    } else if (item.name === "Postpaid") {
      title = "Postpaid";
    }

    // Check if the clicked item has a component associated
    if (item.component) {
      setCurrentView({
        component: item.component,
        type:
          item.name === "DMT"
            ? "dmt1"
            : item.name === "CMS"
            ? "cms1"
            : item.name === "Vendor Payments"
            ? "express"
            : item.name === "Nepal Transfer"
            ? "nepal"
            : item.name === "UPI"
            ? "upi"
            : item.name === "Prepaid" || item.name === "Postpaid"
            ? "mobile"
            : item.name === "DTH"
            ? "dth"
            : item.name,
        title, // Add title prop
      });
    }
  };

  const resetView = () => {
    setCurrentView(null);
  };

  return (
    <>
      {user.role === "Dd"&& location.pathname === "/customer/dashboard" ||
        (user.role === "Ret" && location.pathname === "/customer/dashboard" && (
          <Grid
            item
            xs={12}
            sm={12}
            md={8}
            lg={9}
            sx={{
              // marginTop: { xs: "1rem" },
              textAlign: "center",
              display: "flex",
              borderRadius: "8px",
              backgroundColor: "#fEDCDB",
              color: "#004080",
              fontSize: "14px",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "0.5rem",
              padding: "8px 6px",
            }}
          >
            <marquee behavior="scroll" direction="left">
              Digital payments are growing faster than ever! UPI is leading the
              way, making transactions quick and easy for millions.
            </marquee>
          </Grid>
        ))}

      {!currentView ? (
        dataCategories.map((category, index) => (
          <Box
            key={index}
            sx={{
              marginBottom: 2,
              border: "solid 1px lightgray",
              p: { xs: 1, sm: 3 },
              borderRadius: 3,
              overflow: "wrap",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Typography
              variant="h6"
              align="left"
              sx={{
                pl: 1,
                mt: -2,
                mb: 1,
                fontSize: { xs: "1rem", sm: "1.25rem" },
              }}
            >
              {category.title}
            </Typography>
            <Grid container spacing={2}>
              {category.data.map((item) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  lg={2}
                  key={item.id}
                  sx={{ mb: 1 }}
                >
                  <CommonCardDashBoard
                    name={item.name}
                    img={item.img}
                    onClick={() => handleCardClick(item)}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        ))
      ) : (
        <currentView.component
          type={currentView.type}
          title={currentView.title} // Pass the title prop
          resetView={resetView}
        />
      )}
    </>
  );
};

export default RetDdDashboard;
