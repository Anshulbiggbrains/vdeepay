/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  // InputAdornment,
  TextField,
  // Tooltip,
  Typography,
} from "@mui/material";
import React, { useContext, useRef } from "react";
import BeneSearchBar from "../component/BeneSearchBar";
import { useState } from "react";
import { Banner, Call1, indoNepal, kycVImg, LimitAcc, LimitTran, Name, prabhuMoneyTransfer } from "../iconsImports";
import { randomColors } from "../theme/setThemeColor";
import { PATTERNS } from "../utils/ValidationUtil";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Loader from "../component/loading-screen/Loader";
import { postJsonData } from "../network/ApiController";
import ApiEndpoints from "../network/ApiEndPoints";
// import { currencySetter } from "../utils/Currencyutil";
// import DeleteBeneficiaryModal from "../modals/DeleteBeneficiaryModal";
// import AccountVerificationModal from "../modals/AccountVerificationModal";
// import RetExpresTransferModal from "../modals/RetExpresTransferModal";
import { capitalize1 } from "../utils/TextUtil";
import NepalAddCustomer from "../modals/NepalAddCustomer";
import NTAddRecModal from "../modals/NTAddRecModal";
import NepalMtModal from "../modals/NepalMtModal";
import NepalCusOnboardModal from "../modals/NepalCusOnboardModal";
import ValidateNepalReceivers from "../modals/ValidateNepalReceivers";
import LabelComponent from "../component/LabelComponent";
import DetailsComponent from "../component/DetailsComponent";
import NepalAdditionalInfo from "../component/NepalAdditionalInfo";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useEffect } from "react";
import BorderColorIcon from '@mui/icons-material/BorderColor';

import { apiErrorToast } from "../utils/ToastUtil";
import NepalMachine from "./NepalMachine";
import VerifiedIcon from "@mui/icons-material/Verified";
import AuthContext from "../store/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { banking } from "../_nav";
import HNavButton from "../component/HNavButton";

import Mount from "../component/Mount";
import NoDataView from "../component/NoDataView";

const NepalTransfer = () => {
  const [search, setSearch] = useState("");
  const [isMobv, setIsMobv] = useState(true);
  // const [idValue, setIdValue] = useState("");
  const [request, setRequest] = useState(false);

  const [prabhuReq, setPrabhuReq] = useState(false);
  const [infoFetchedMob, setInfoFetchedMob] = useState(false);
  const [filteredBenelist, setFilteredBenelist] = useState([]);
  const [newCustomer, setNewCustomer] = useState("");

  // console.log("filteredBenelist", filteredBenelist);
  const [nepalAllRes, setNepalAllRes] = useState({
    status: "",
    ekyc: "",
    message: "",
    customer: {},
    receivers: [],
  });

  // console.log("nepalAllRes", nepalAllRes);
  const [machineRequest, setMachineRequest] = useState(false);
  const authCtx = useContext(AuthContext);
  const user = authCtx.user;
  const nepalUser = authCtx.nepalUser;
  // console.log("nepalUser", nepalUser);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const customerId = searchParams.get("customerId");
  const reqNoparam = searchParams.get("cpuniquerefno");
  const reqNo = useRef(localStorage.getItem("nepal_req_id"));
  const returnMoneyNew=()=>{
    setInfoFetchedMob(false)
      }
  // const token = authCtx.nepalToken;
  // const [token, setToken] = useState("");

  // console.log("customerId", customerId);
  // console.log("reqNo", reqNo);
  const [nepalOnboardModalOpen, setNepalOnboardModalOpen] = useState("");
  const [mobile, setMobile] = useState("");
  const [customerMobile, setCustomerMobile] = useState("");
  // console.log("customerMobile", customerMobile);
  useEffect(() => {
    if (nepalAllRes?.customer?.Mobile) {
      setCustomerMobile(
        typeof nepalAllRes?.customer.Mobile.string === "string"
          ? nepalAllRes?.customer.Mobile.string
          : nepalAllRes?.customer.Mobile.string[0]
      );
    }
  }, [nepalAllRes?.customer]);

  useEffect(() => {
    if (nepalUser && customerId) {
      localStorage.setItem("nepal_req_id", reqNoparam);
      setInfoFetchedMob(true);
      setNepalAllRes({
        ...nepalAllRes,
        status: nepalUser.status,
        ekyc: nepalUser.ekyc,
        message: nepalUser.message,
        customer: nepalUser.customer,
        // receivers: nepalUser.receivers,
        receivers: Array.isArray(nepalUser.receivers)
          ? nepalUser.receivers
          : nepalUser.receivers === null
          ? []
          : [nepalUser.receivers],
      });
      // console.log("here in setting nepal number");
      setMobile(
        customerId
          ? typeof nepalUser?.customer?.Mobile?.string === "string"
            ? nepalUser?.customer?.Mobile?.string
            : nepalUser?.customer?.Mobile?.string[0]
          : ""
      );
    }
  }, [customerId, nepalUser]);

  const getCustomerByMobileOrId = (value, type) => {
    let data = {};
    if (value) {
      if (type === "byId") {
        data.operator = "Id";
        data.number = value;
      } else {
        data.operator = "number";
        data.number = value;
      }
    }

    postJsonData(
      ApiEndpoints.NEPAL_CUSTOMER_STATUS,
      data,
      setRequest,
      (res) => {
        const data = res.data;

        if (data?.message.toLowerCase() !== "no record found") {
          setNepalAllRes({
            ...nepalAllRes,
            status: data.status,
            ekyc: data.ekyc,
            message: data.message,
            customer: data.customer,
            receivers: Array.isArray(data.receivers)
              ? data.receivers
              : data.receivers === null
              ? []
              : [data.receivers],
          });
          setInfoFetchedMob(true);
          authCtx.saveNepalUser(data);
        }
      },
      (err) => {
        // console.log("er", err);
        if (err?.response?.data?.message.toLowerCase() === "no record found") {
          // apiErrorToast(data?.message);
          setNewCustomer("Add");
          setNepalAllRes({
            status: "",
            ekyc: "",
            message: "",
            customer: {},
            receivers: [],
          });
        }
        console.log(err);
      }
    );
  };

  const getPrabhuKYCLink = () => {
    postJsonData(
      ApiEndpoints.PRABHU_KYC,
      { CustomerID: nepalAllRes?.customer?.CustomerId },
      setPrabhuReq,
      (res) => {
        // console.log("res.data", res.data);
        // setToken(res?.data?.token);
        authCtx.nepalTokenSetter(res?.data?.token);
        if (
          nepalAllRes?.ekyc.toLowerCase() === "verified" &&
          nepalAllRes?.customer.OnboardingStatus !== "Success"
        ) {
          setNepalOnboardModalOpen("addCustomer");
        }
        if (res?.data?.Url) window.open(res?.data?.Url, "_blank");
      },
      (err) => {
        apiErrorToast(err);
      }
    );
  };

  useEffect(() => {
    if (search && infoFetchedMob) {
      const myList = nepalAllRes?.receivers?.filter((item) => {
        return item.Name.toUpperCase().includes(search.toUpperCase());
      });
      setFilteredBenelist(myList);
    } else {
      setFilteredBenelist(nepalAllRes?.receivers);
    }

    return () => {};
  }, [search, nepalAllRes?.receivers]);

  return (
    <>
      {user?.layout && user?.layout === 2 && (
        <Box
          className="card-css"
          sx={{
            width: "100%",
            my: 2,
            p: 2,
            py: 1,
            mt:12
          }}
        >
          <Typography className="services-heading">Banking Services</Typography>
          <Grid container>
            {user?.st === 0 ||
            user.dmt4 === 0 ||
            user?.aeps === 0 ||
            user?.nepal_transfer === 0 ||
            user?.upi_transfer === 0
              ? banking
                  .filter((item) => {
                    if (user?.st === 0 && item.title === "Super Transfer") {
                      return undefined;
                    }
                    if (user?.dmt4 === 0 && item.title === "Express Transfer") {
                      return undefined;
                    }
                    if (user?.aeps === 0 && item.title === "AEPS") {
                      return undefined;
                    }
                    if (
                      user?.nepal_transfer === 0 &&
                      item.title === "Nepal Transfer"
                    ) {
                      return undefined;
                    }
                    if (
                      user?.upi_transfer === 0 &&
                      item.title === "UPI Transfer"
                    ) {
                      return undefined;
                    } else {
                      return item;
                    }
                  })
                  .map((mitem, index) => {
                    return (
                      <Grid
                        item
                        md={2}
                        index={index}
                        onClick={() => navigate(mitem.to)}
                        className="horizontal-sidenav"
                      >
                        <HNavButton item={mitem} />
                      </Grid>
                    );
                  })
              : banking.map((item, index) => {
                  return (
                    <Grid
                      item
                      md={2}
                      index={index}
                      onClick={() => navigate(item.to)}
                      className="horizontal-sidenav"
                    >
                      <HNavButton item={item} />
                    </Grid>
                  );
                })}
          </Grid>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pl: 2,
        }}
      >
        {/* <span style={{ fontSize: "24px", fontWeight: "600" }}>
            Nepal Transfer
          </span> */}
        <img
          src={indoNepal}
          width="220"
          alt="bbps"
          style={{ display: infoFetchedMob ? "block" : "none" }}
        />
        <Box sx={{ mr: { md: 2, xs: 0 } }}>
          <img
            src={prabhuMoneyTransfer}
            width="120"
            alt="bbps"
            style={{ display: infoFetchedMob ? "block" : "none" }}
          />
        </Box>
      </Box>
      <div     
        className="position-relative"
      >
        <Loader circleBlue loading={request} />
        <Grid
          container
          spacing={3}
          sx={{ display: "flex"}}
        >
          <Grid
            item
            lg={12}
            sm={12}
            xs={12}
            sx={{
              mb: { md: 2, sm: 4, xs: 4 },
              mr: { md: 0, sm: 1.3, xs: 1.3 },
              marginLeft:0
            }}
          >
            <Card
              className="card-css"
              sx={{
                width: "100%",
                px: 7,
                py: 2,
                                      mt:2

              }}
            >
                      {!mobile?(
                      <Typography
                        sx={{
                          fontSize: "24px",
                          fontWeight: "bold",
                          letterSpacing: "0.05rem",
                          textAlign: "center",
                          mt: 0,
                        }}
                      >
                        Nepal Transfer
                      </Typography>
                      ):null}
              <Box
                // component="form"
                // id="seachNepalByID"
                sx={{
                  pt: 1,
                  "& .MuiTextField-root": { mt: 1 },
                  objectFit: "contain",
                  overflowY: "scroll",
                }}
                // onSubmit={getCustomerByMobileOrId}
              >
                <Grid container >
                  <Grid item md={12} xs={12}>
                  {!infoFetchedMob && !infoFetchedMob&&
                    <FormControl sx={{ width: "100%" }}>
                      <TextField autoComplete="off"
                        label="Mobile Number"
                        id="mobile"
                        name="mobile"
                        type="tel"
                        value={mobile}
                        size="small"
                        onChange={(e) => {
                          setIsMobv(PATTERNS.MOBILE.test(e.target.value));
                          setMobile(e.target.value);
                          if (e.target.value === "") {
                            setNewCustomer("");
                            setInfoFetchedMob(false);
                            //   bene && setBene([]);
                            setIsMobv(true);
                          } else if (e.target.value.length === 9) {
                            setNewCustomer("");
                            setInfoFetchedMob(false);
                            //   bene && setBene([]);
                          } else if (PATTERNS.MOBILE.test(e.target.value)) {
                            getCustomerByMobileOrId(e.target.value, "byMobile");
                          }
                        }}
                        error={!isMobv}
                        helperText={!isMobv ? "Enter valid Mobile" : ""}
                        onKeyDown={(e) => {
                          if (
                            (e.which >= 65 &&
                              e.which <= 90 &&
                              e.which !== 86) ||
                            e.key === "+"
                          ) {
                            e.preventDefault();
                          }
                          if (e.target.value.length === 10) {
                            if (e.key.toLowerCase() !== "backspace") {
                              e.preventDefault();
                            }

                            if (e.key.toLowerCase() === "backspace") {
                            }
                          }
                        }}
                        inputProps={{
                          form: {
                            autocomplete: "off",
                          },
                          maxLength: "10",
                        }}
                        disabled={(request && request && true) || customerId}
                      />
                    </FormControl>
}
                  </Grid>
                  {/* <Mount visible={infoFetchedMob}>
                    <Grid container sx={{ mt: 3 }}>
                      <Grid item md={6} xs={12} sx={{ my: 2 }}>
                        <LabelComponent label="Name" />
                        <DetailsComponent
                          detail={nepalAllRes?.customer?.Name}
                        />
                      </Grid>
                      <Grid item md={6} xs={12} sx={{ my: 2 }}>
                        <LabelComponent label="Mobiles" />
                        <DetailsComponent
                          detail={nepalAllRes?.customer?.Mobile?.string}
                        />
                      </Grid>

                      <Grid item md={6} xs={12} sx={{ my: 2 }}>
                        <LabelComponent label="ID Type" />
                        <DetailsComponent
                          detail={nepalAllRes?.customer?.Ids?.Id?.IdType}
                        />
                      </Grid>
                      <Grid item md={6} xs={12} sx={{ my: 2 }}>
                        <LabelComponent label="ID Number" />
                        <DetailsComponent
                          detail={nepalAllRes?.customer?.Ids?.Id?.IdNumber}
                        />
                      </Grid>
                      <Grid item md={12} xs={12} sx={{ my: 2 }}>
                        <LabelComponent label="Transaction Count" />
                        <DetailsComponent
                          detail={nepalAllRes?.customer?.TransactionCount}
                          objData
                          horizontal
                        />
                      </Grid>
                    </Grid>
                  </Mount>                */}
                  {infoFetchedMob && infoFetchedMob && (
  <Grid className="remitter-card" container sx={{ display: 'flex'}}>
                        <Grid item lg={6} sm={6} xs={6} sx={{ display: 'flex', flexDirection: 'column', px: 2 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', mb: 2 }}>
                        <Box component="img" src={Name} alt="Name" sx={{ maxWidth: "25px", maxHeight: "50px", mr: 1 }} />
        <DetailsComponent detail={nepalAllRes?.customer?.Name} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }}>
      <Box component="img" src={Call1} alt="Call" sx={{ maxWidth: "25px", maxHeight: "50px", mr: 1 }} />
        <DetailsComponent detail={nepalAllRes?.customer?.Mobile?.string} />
        <BorderColorIcon sx={{ color: "Black", width: 15 }} onClick={returnMoneyNew}/>
      </Box>
    </Grid>

    <Grid item lg={6} sm={6} xs={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: "end", px: 2 }}>
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'end',justifyContent:"end" ,marginRight:{lg:11 , sm:10.5},mb:2 }}>
    <Box component="img" src={LimitAcc} alt="Limit" sx={{ maxWidth: "25px", maxHeight: "50px", mr: 1 }} />
        {/* <Box sx={{ fontWeight: 'bold' }}>{nepalAllRes?.customer?.Ids?.Id?.IdType}</Box> */}
        <DetailsComponent detail={nepalAllRes?.customer?.Ids?.Id?.IdType} />

      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center',justifyContent:"end" }}>
      <Box component="img" src={LimitTran} alt="Limit" sx={{ maxWidth: "25px", maxHeight: "50px", mr: 1 }} />
        <DetailsComponent detail={nepalAllRes?.customer?.TransactionCount} objData
                          horizontal/>
      </Box>
    </Grid>

    <Box
      sx={{
        display: 'flex',
        justifyContent: { xs: 'center', sm: 'flex-start' },
        width: '100%',
        marginLeft: { lg: 50, md: 23, sm: 23, xs: 13 },
        marginBottom: { xs: 2, sm: '-2%' },
        padding: { xs: 2, sm: 0 },
      }}
    >
<NTAddRecModal
                      nepalAllRes={nepalAllRes}
                      reqNo={reqNo}
                      customerMobile={customerMobile}
                      // token={token}
                      getCustomerByMobileOrId={getCustomerByMobileOrId}
                    />    </Box>
  </Grid>
)}
                
                </Grid>
              
            <Grid item lg={12} sm={12} xs={12} className="position-relative">
              {(nepalAllRes?.customer?.EKYCStatus === "Unverified" ||
                nepalUser?.customer?.OnboardingStatus === "Pending") &&
              !customerId ? (
                <Grid
                  lg={12}
                  sm={12}
                  xs={12}
                  sx={{
                    mb: { md: 2, sm: 4, xs: 4 },
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  className="card-css"
                >
                  <Typography sx={{ fontWeight: "600", fontSize: "18px" }}>
                    Your Ekyc Is Pending Go For Ekyc
                  </Typography>
                  <img src={kycVImg} alt="kyc verifiation" width="335" />
                  <Button
                    sx={{
                      textTransform: "none",
                      minWidth: "180px",
                      mt: 3,
                    }}
                    className="btn-background-add-bene"
                    disabled={prabhuReq}
                    onClick={() => {
                      // openWindow();
                      getPrabhuKYCLink();
                      // setTimeout(() => {
                      //   window.close();
                      // }, [500]);
                    }}
                  >
                    <Loader loading={prabhuReq} size="small" />
                    Complete EKyc
                  </Button>
                </Grid>
              ) : nepalAllRes?.ekyc === "Unverified" ||
                nepalUser?.customer?.OnboardingStatus === "Pending" ? (
                <Grid
                  container
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    position: "relative",
                  }}
                >
                  <Loader loading={machineRequest} />
                  <Typography sx={{ fontWeight: "600" }}>
                    1. Your Aadhaar verification is complete
                    <VerifiedIcon color="success" sx={{ ml: 2 }} />
                  </Typography>

                  <Typography sx={{ fontWeight: "600", mt: 3 }}>
                    2. Biometric verification
                  </Typography>

                  <NepalMachine
                    setMachineRequest={setMachineRequest}
                    machineRequest={machineRequest}
                    nepalAllRes={nepalAllRes}
                    reqNo={reqNo}
                    setNepalOnboardModalOpen={setNepalOnboardModalOpen}
                  />
                </Grid>
              ) : (
                <Grid
                  lg={12}
                  sm={12}
                  xs={12}
                  sx={{ mb: { md: 2, sm: 4, xs: 4 } }}

                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "end",
                      mx: { md: 2, sm: 1, xs: 0 },
                      mr: { xs: 1.3, md: 2 },
                    }}
                  >
                      <Box
                  sx={{
                    flex: 1, // Ensure it takes available space
                    maxWidth: { lg: '100%', md: '200px', sm: '150px', xs: '100%' }, // Adjust max-width based on screen size
                  }}
                  >
                    <BeneSearchBar
                    
                      setSearch={setSearch}
                      label="Search for receiver"
                    />
                  </Box>
                    <Typography sx={{ fontSize: "18px",mb:1}}>
                      Receivers List ({nepalAllRes?.receivers?.length})
                    </Typography>
                    
                  </Box>
                
                  {/* <Typography
                    sx={{
                      textAlign: "end",
                      mx: { md: 2, sm: 1, xs: 0 },
                      mr: { xs: 1.3, md: 2 },
                      mt: 0.5,
                      fontSize: "13px",
                      opacity: "0.8",
                    }}
                  >
                    For more info click <InfoOutlinedIcon fontSize="small" />
                  </Typography> */}
                  <div
                    className="
                    enable-scroll "
                           style={{
                             overflow: "auto", // Ensure that the overflow behavior is automatic
                             height: "85vh", // Fixed height to control the scrolling area
                             paddingBottom: "8px",
                             "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar for Webkit browsers
                             msOverflowStyle: "none", // Hide scrollbar for Internet Explorer and Edge
                             scrollbarWidth: "none",
                    }}
                  >
                    {/* <Loader loading={filteredBenelist.length === 0} /> */}
                    {/* condition for no receivers found is here */}
                    {nepalAllRes?.receivers === null && (
                      <Typography sx={{ mt: 2 }}>No Receiver found.
                      
                      </Typography>
                    )}
                    {nepalAllRes?.receivers &&
                    (nepalAllRes?.receivers.length === 0 ||
                      nepalAllRes?.receivers === null) ? (
                      <Typography sx={{ mt: 2 }}>No Receiver found.
                       <NoDataView/>
                      </Typography>
                      
                    ) : filteredBenelist?.length === 0 ? (
                      <Typography sx={{ mt: 2 }}>No Receiver found.</Typography>
                     
                    ) : (
                      filteredBenelist &&
                      filteredBenelist.length > 0 &&
                      filteredBenelist.map((item, index) => {
                        return (
                          <>
                            <Card
                              className="card-css"
                              key={index}
                              sx={{
                                display: "flex",
                                justifyContent: "left",
                                px: 2,
                                py: 1.5,
                                m: { md: 2, sm: 1, xs: 1 },
                                ml: { md: 2, sm: 0, xs: 0.5 },
                              }}
                            >
                              <Box
                                sx={{
                                  alignItems: "center",
                                  justifyContent: "center",
                                  display: {
                                    md: "flex",
                                    sm: "none",
                                    xs: "none",
                                  },
                                  background: randomColors(),
                                  borderRadius: "4px",
                                  height: "64px",
                                  width: "64px",
                                  p: 1,
                                  position: "relative",
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: "40px",
                                  }}
                                >
                                  {item?.Name?.charAt(0).toUpperCase()}
                                </Typography>
                                <Box>
                                 

                                  {item?.BankName?.toLowerCase() ===
                                    "prabhu bank limited" && (
                                    <ValidateNepalReceivers
                                      accNo={item.AcNumber}
                                      nepalAllRes={nepalAllRes}
                                      reqNo={reqNo}
                                      // token={token}
                                    />
                                  )}
                                </Box>
                              </Box>
                              {/* the verification code here */}

                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: { xs: "column", md: "row" },
                                  justifyContent: "space-between",
                                  width: "100%",
                                  alignContent: "center",
                                }}
                              >
                                <Box
                                  sx={{
                                    ml: { xs: 1, md: 3 },
                                    textAlign: "center",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "left",
                                      alignItems: "center",
                                      fontWeight: "500",
                                      textTransform: "capitalize",
                                      fontSize: "16px",
                                      textAlign: {
                                        md: "center",
                                        sm: "left",
                                        xs: "left",
                                      },
                                    }}
                                  >
                                    {capitalize1(item?.Name)}
                                    <span
                                      style={{
                                        marginLeft: "5px",
                                        fontSize: "13px",
                                      }}
                                    >
                                      ({item?.Relationship})
                                    </span>
                                    {/* hide the icon when payment mode is CP */}
                                    {item?.PaymentMode !== "Cash Payment" && (
                                      <NepalAdditionalInfo
                                        receiverDetails={item}
                                      />
                                    )}
                                  </div>
                                  {/* if mop is cash then we dont show the below details cause they dont exist */}
                                  {item?.PaymentMode !== "Cash Payment" ? (
                                    <Grid
                                      sx={{
                                        display: { xs: "flex", md: "grid" },
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          textAlign: "left",
                                          fontSize: "13px",
                                        }}
                                      >
                                        A/C : {item?.AcNumber}
                                      </Typography>

                                      <Typography
                                        sx={{
                                          textAlign: "left",
                                          fontSize: "13px",
                                        }}
                                      >
                                        Bank : {item?.BankName}{" "}
                                      </Typography>
                                      <Typography
                                        sx={{
                                          textAlign: "left",
                                          fontSize: "13px",
                                        }}
                                      >
                                        Mobile : {item?.Mobile}{" "}
                                      </Typography>
                                    </Grid>
                                  ) : (
                                    <Grid
                                      sx={{
                                        display: { xs: "flex", md: "grid" },
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          textAlign: "left",
                                          fontSize: "13px",
                                        }}
                                      >
                                        Mobile : {item?.Mobile}
                                      </Typography>
                                    </Grid>
                                  )}
                                </Box>
                              </Box>
                              <div
                                style={{
                                  display: "grid",
                                  alignItems: "center",
                                }}
                              >
                                <NepalMtModal
                                  receiver={item}
                                  nepalAllRes={nepalAllRes}
                                  customerMobile={customerMobile}
                                  reqNo={reqNo}

                                  // token={token}
                                />
                              </div>
                            </Card>
                          </>
                        );
                      })
                    )}
                  </div>
                </Grid>
              )}
            </Grid>
          
              </Box>
            </Card>
          </Grid>
    {/* condition here if ekyc is not done if info is fetched */}
       
        </Grid>
      </div>
      {/* add customer if not found */}
      <NepalAddCustomer
        modelOpenHook={newCustomer}
        setMobile={setMobile}
        getCustomerByMobileOrId={getCustomerByMobileOrId}
      />
      {/* nepal cus on boarding modal  */}
      <NepalCusOnboardModal
        nepalAllRes={nepalAllRes}
        reqNo={reqNo}
        nepalOnboardModalOpen={nepalOnboardModalOpen}
        getCustomerByMobileOrId={getCustomerByMobileOrId}
      />  
    </>
  );
};

export default NepalTransfer;
