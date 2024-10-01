import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { Grid, Typography, Box } from "@mui/material";
import AuthContext from "../store/AuthContext";
import AskForDocsModal from "../modals/AskForDocsModal";
import CommonCardDashBoard from "../component/CommonCardDashBoard";
import { cmsIcon } from "../iconsImports";
import DmtContainer from "./DMTcontainer"; // Ensure this path is correct
import { mt_tab_value } from "../utils/constants";
import CMSView from "./CMSView";
import VendorPayments from "./VendorPayments";
import NepalTransfer from "./NepalTransfer";
import UPITransferView from "./UPITransferView";

const RetDdDashboard = () => {
  const [open, setOpen] = useState(false);
  const [currentType, setCurrentType] = useState(null);
  const [showDmtContainer, setShowDmtContainer] = useState(false);
  const [showCms, setShowCms] = useState(false);
  const [showVendorPayments, setShowVendorPayments] = useState(false);
  const [showNepalTransfer, setShowNepalTransfer] = useState(false);
  const [showUpi,setShowUpi]=useState(false)
  
  const location = useLocation();
  const authCtx = useContext(AuthContext);
  const role = authCtx.user.role;
  const [value, setValue] = useState(0);

  // JSON format dummy data categorized into different sections
  const dataCategories = [
    {
      title: "Money Transfer",
      data: [
        { id: 1, name: "DMT 1", img: null },
        { id: 2, name: "DMT 2", img: null },
        { id: 3, name: "CMS 1", img: cmsIcon },
        { id: 4, name: "CMS 2", img: cmsIcon },
        { id: 5, name: "Nepal Transfer", img: null },
        { id: 6, name: "Vendor Payments", img: null },
        { id: 7, name: "Super", img: null },
        { id: 8, name: "UPI", img: null },
      ],
    },
    {
      title: "Recharges",
      data: [
        { id: 9, name: "DTH", img: null },
        { id: 10, name: "Credit Card Payment", img: null },
        { id: 11, name: "LIC", img: null },
        { id: 12, name: "Insurance", img: null },
        { id: 13, name: "Fast Tag", img: null },
      ],
    },
    {
      title: "AEPS",
      data: [
        { id: 14, name: "Aeps 1", img: null },
        { id: 15, name: "Aeps 2", img: null },
      ],
    },
    {
      title: "QrCode",
      data: [
        { id: 16, name: "QRCODE", img: null },
        { id: 17, name: "QRCODE 1", img: null },
        { id: 18, name: "QRCODE 2", img: null },
        { id: 19, name: "QRCODE 3", img: null },
      ],
    },
    {
      title: "Travel",
      data: [
        { id: 20, name: "Travel", img: null },
        { id: 21, name: "Pg", img: null },
        { id: 22, name: "Pg 2", img: null },
      ],
    },
  ];

  const handleCardClick = (itemName) => {
    // Reset all views first
    setShowDmtContainer(false);
    setShowCms(false);
    setShowVendorPayments(false);
    setShowNepalTransfer(false);

    // Handle each case for Money Transfer
    switch (itemName) {
      case "DMT 1":
        setCurrentType("dmt1");
        setShowDmtContainer(true);
        break;
      case "DMT 2":
        setCurrentType("dmt2");
        setShowDmtContainer(true);
        break;
      case "CMS 1":
        setCurrentType("cms1")
        setShowCms(true);
        break;
        case "CMS 2":
          setCurrentType("cms2")
          setShowCms(true);
          break;
      case "Vendor Payments":
        setShowVendorPayments(true);
        setCurrentType("express");
        break;
      case "Nepal Transfer":
        setShowNepalTransfer(true);
        setCurrentType("nepal");
        break;
      case "Super":
        setShowVendorPayments(true);
        setCurrentType("super");
        break;
        case "UPI":
          setShowUpi(true);
          setCurrentType("upi");
          break;
      default:
        // No action required, all views are reset above
        break;
    }
  };

  return (
    <>
      {/* Render the card section or DmtContainer/CMSView/VendorPayments/NepalTransfer based on the state */}
      {!showDmtContainer && !showCms && !showVendorPayments && !showNepalTransfer && !showUpi ? (
        dataCategories.map((category, index) => (
          <Box
            key={index}
            sx={{
              marginBottom: 2,
              border: "solid 1px lightgray",
              p: 3,
              borderRadius: 3,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Typography
              variant="h6"
              align="left"
              sx={{ pl: 1, mt: -2, mb: 1 }}
            >
              {category.title}
            </Typography>
            <Grid container spacing={2}>
              {category.data.map((item) => (
                <Grid item xs={12} sm={6} md={3} lg={2} key={item.id}>
                  <CommonCardDashBoard
                    name={item.name}
                    img={item.img}
                    onClick={() => handleCardClick(item.name)} // Handle click event
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        ))
      ) : showDmtContainer ? (
        <DmtContainer type={currentType} setShowDmtContainer={setShowDmtContainer} />
      ) : showCms ? (
        <CMSView cmsType={currentType} setShowCms={setShowCms} />
      ) : showNepalTransfer ? (
        <NepalTransfer type={currentType} setShowNepalTransfer={setShowNepalTransfer} />
      ) : showUpi ? (
        <UPITransferView type={currentType} setShowUpi={setShowUpi} />
      ) : showVendorPayments ? (
        <VendorPayments type={currentType} setShowVendorPayments={setShowVendorPayments} />
      ) : null}
    </>
  );
};

export default RetDdDashboard;
