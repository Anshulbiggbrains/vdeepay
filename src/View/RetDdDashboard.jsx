import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { Grid, Typography, Box } from "@mui/material";
import AuthContext from "../store/AuthContext";
import CommonCardDashBoard from "../component/CommonCardDashBoard";
import {
  aepsIcon,
  BBPS,
  broadband,
  cmsIcon,
  dthIcon,
  elecIcon,
  gasIcon,
  landIcon,
  mobileR_img,
  upi,
  waterIcon,
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
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import HouseIcon from '@mui/icons-material/House';
import TrainIcon from '@mui/icons-material/Train';
import FlightIcon from '@mui/icons-material/Flight';

const RetDdDashboard = () => {
  const [currentView, setCurrentView] = useState(null); // State to track the current view

  const location = useLocation();
  const authCtx = useContext(AuthContext);
  const role = authCtx.user.role;

  // JSON format dummy data categorized into different sections
  const dataCategories = [
    {
      title: "Banking",
      data: [
        { id: 1, name: "DMT", img: null, component: DmtContainer ,},
        { id: 2, name: "CMS ", img: cmsIcon, component: CMSView },
        { id: 3, name: "Nepal Transfer", img: null, component: NepalTransfer },
        { id: 4, name: "Vendor Payments", img: null, component: VendorPayments },
        { id: 5, name: "UPI", img: upi, component: UPITransferView },
        { id: 6, name: "Aeps", img: aepsIcon, component: AEPS2View },
      ],
    },
    {
      title: "Utility",
      data: [
        { id: 7, name: "Mobile Recharge", img: mobileR_img, component: MobileRechargeForm },
        { id: 8, name: "DTH", img: dthIcon, component: MobileRechargeForm },
        { id: 9, name: "Electricity", img: elecIcon, component: ElectricityForm },
        { id: 10, name: "Credit Card ", img: null, component: CreditcardForm },
        { id: 11, name: "BroadBand", img: broadband, component: ElectricityForm },
        { id: 12, name: "Gas", img: gasIcon, component: ElectricityForm },
        { id: 13, name: "Water", img: waterIcon, component: ElectricityForm },
        { id: 14, name: "Insurance", img: null, component: ElectricityForm },
        { id: 15, name: "Landline", img: landIcon, component: ElectricityForm },
        { id: 16, name: "Bbps", img: BBPS, component: BBPSView },
      ],
    },
    {
      title: "Travel",
      data: [
        { id: 17, name: "AIR", img: FlightIcon ,component:FlightTab },
        { id: 18, name: "BUS", img: null ,component:BusTab},
        { id: 19, name: "HOTELS", img: null ,component:HotelsTab},
        { id: 20, name: "IRCTC", img: null ,component:TrainTab},
      ],
    },
  ];


  const handleCardClick = (item) => {
    // Check if the clicked item has a component associated
    if (item.component) {
      setCurrentView({
        component: item.component,
        type:
          item.name === "DMT 1"
            ? "dmt1"
            : item.name === "DMT 2"
            ? "dmt2"
            : item.name === "CMS 1"
            ? "cms1"
            : item.name === "CMS 2"
            ? "cms2"
            : item.name === "Vendor Payments"
            ? "express"
            : item.name === "Nepal Transfer"
            ? "nepal"
            : item.name === "Super"
            ? "super"
            : item.name === "UPI"
            ? "upi"
            : item.name === "Mobile Recharge"
            ? "mobile"
            : item.name === "Water"
            ? "WATER"
            : item.name === "DTH"
            ? "dth"
            : item.name === "Gas"
            ? "GAS"
            : item.name === "Broadband"
            ? "BROADBAND"
            : item.name === "Insurance"
            ? "INSURANCE"
            : item.name === "Electricity"
            ? "ELECTRICITY"
            : item.name // default case
      });
      
    }
  };

  const resetView = () => {
    setCurrentView(null); // Reset to dashboard view
  };

  return (
    <>
      {!currentView ? (
      
        dataCategories.map((category, index) => (
          <Box
            key={index}
            sx={{
              marginBottom: 2,
              border: "solid 1px lightgray",
              p: { xs: 1, sm: 3 }, // Responsive padding
              borderRadius: 3,
              // background: "#f5e9e9",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Typography
              variant="h6"
              align="left"
              sx={{ pl: 1, mt: -2, mb: 1, fontSize: { xs: "1rem", sm: "1.25rem" } }} // Responsive typography
            >
              {category.title}
            </Typography>
            <Grid container spacing={2}>
              {category.data.map((item) => (
                <Grid item xs={12} sm={6} md={3} lg={2} key={item.id}>
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
        // Show the selected view component
        <currentView.component
          type={currentView.type}
          resetView={resetView} // Function to reset the view
        />
      )}
    </>
  );
};

export default RetDdDashboard;
