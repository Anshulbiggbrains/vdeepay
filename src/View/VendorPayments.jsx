import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { postJsonData } from "../network/ApiController";
import ApiEndpoints from "../network/ApiEndPoints";
import { apiErrorToast } from "../utils/ToastUtil";
// import PersonOutlineSharpIcon from "@mui/icons-material/PersonOutlineSharp";
import VerifiedIcon from "@mui/icons-material/Verified";
import DeleteBeneficiaryModal from "../modals/DeleteBeneficiaryModal";
import DmrNumberListModal from "../modals/DmrNumberListModal";
import DmrAddBeneficiaryModal from "../modals/DmrAddBeneficiaryModal";
import DmrAddRemitterModal from "../modals/DmrAddRemitterModal";
import RetExpresTransferModal from "../modals/RetExpresTransferModal";
import AccountVerificationModal from "../modals/AccountVerificationModal";
import DmrVrifyNewUser from "../modals/DmrVrifyNewUser";
import Loader from "../component/loading-screen/Loader";
import BeneSearchBar from "../component/BeneSearchBar";
import { PATTERNS } from "../utils/ValidationUtil";
import { capitalize1 } from "../utils/TextUtil";
import { getEnv, randomColors } from "../theme/setThemeColor";
import AuthContext from "../store/AuthContext";
import OutletRegistration from "../component/OutletRegistration";
import { mt_tab_value, PROJECTS, vendor_tab_value } from "../utils/constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { banking } from "../_nav";
import HNavButton from "../component/HNavButton";
import { useNavigate } from "react-router-dom";
import { currencySetter } from "../utils/Currencyutil";
import BeneCardComponent from "../component/BeneCardComponent";
import BeneCardVender from "../component/BeneCardVender";
import { back, Call1, LimitAcc, LimitTran, Name } from "../iconsImports";
import NoDataView from "../component/NoDataView";
import CustomTabs from "../component/CustomTabs";

const VendorPayments = ({ resetView }) => {
  const [infoFetchedMob, setInfoFetchedMob] = useState(false);
  const [request, setRequest] = useState(false);
  const [remitterStatus, setRemitterStatus] = useState();
  const [mobile, setMobile] = useState("");
  const [bene, setBene] = useState([]);
  const [verifyotp, setVerifyotp] = useState(false);
  const [addNewRem, setAddNewRem] = useState(false);
  const [otpRefId, setOtpRefId] = useState("");
  const [search, setSearch] = useState("");
  const [filteredBenelist, setFilteredBenelist] = useState([]);
  const [isMobv, setIsMobv] = useState(true);
  const authCtx = useContext(AuthContext);
  const user = authCtx.user;
  const envName = getEnv();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [currentType, setCurrentType] = useState(0);
  const [type, settype] = useState(0);

  const handleBack = () => {
    resetView(false);
  };
  //
  // const envName = getEnv();
  console.log("type is ", type);

  useEffect(() => {
    if (user) {
      // console.log("here in if", user);
      // if (!infoFetchedMob) {
      //   setChoosenVendor(
      //     user?.dmt4 === 1 && user?.st === 1
      //       ? "express"
      //       : user?.dmt4 === 1
      //       ? "express"
      //       : user?.st === 1
      //       ? "super"
      //       : "express"
      //   );
      // }
    }
  }, [user]);

  const getRemitterStatus = (number) => {
    postJsonData(
      ApiEndpoints.GET_REMMITTER_STATUS,
      {
        number: number,
      },
      setRequest,
      (res) => {
        if (res && res.status === 200 && res.data.message === "OTP Sent") {
          setOtpRefId(res.data.otpReference);
          setVerifyotp(true);
        } else if (res && res.data && res.data) {
          const data = res.data;
          setMobile(number);
          setRemitterStatus(data.remitter);
          setBene(data.data);
          setInfoFetchedMob(true);
          setNumberList("");
        } else {
          setRemitterStatus();
        }
      },
      (error) => {
        if (error && error) {
          if (
            error.response.status === 404 &&
            error.response.data.message === "Remitter Not Found"
          ) {
            setAddNewRem(true);
          } else {
            apiErrorToast(error);
          }
        }
      }
    );
  };
  const refreshRemitterStatus = (number) => {
    postJsonData(
      ApiEndpoints.REF_REMMITTER_STATUS,
      {
        number: number,
      },
      setRequest,
      (res) => {
        if (res && res.status === 200 && res.data.message === "OTP Sent") {
          setOtpRefId(res.data.otpReference);
          setVerifyotp(true);
        } else if (res && res.data && res.data) {
          const data = res.data;
          setMobile(number);
          setRemitterStatus(data.remitter);
          setBene(data.data);
          setInfoFetchedMob(true);
          setNumberList("");
        } else {
          setRemitterStatus();
        }
      },
      (error) => {
        if (error && error) {
          if (
            error.response.status === 404 &&
            error.response.data.message === "Remitter Not Found"
          ) {
            setAddNewRem(true);
          } else {
            // apiErrorToast(error);
          }
        }
      }
    );
  };
  useEffect(() => {
    if (search) {
      const myList = bene.filter((item) => {
        return item.bene_name.toUpperCase().includes(search.toUpperCase());
      });
      setFilteredBenelist(myList);
    } else {
      setFilteredBenelist(bene);
    }

    return () => {};
  }, [search, bene]);
  const returnMoneyNew = () => {
    setInfoFetchedMob(false);
  };
  const [numberList, setNumberList] = useState([]);

  const getRemitterStatusByAcc = (event) => {
    event.preventDefault();
    const number = document.getElementById("acc")?.value;
    postJsonData(
      ApiEndpoints.GET_REMMITTER_STATUS_ACC,
      {
        number: number,
      },
      setRequest,
      (res) => {
        if (res && res.data && res.data) {
          const data = res.data.data;
          if (data.length > 0) {
            setNumberList(data);
            document.getElementById("acc").value = "";
            document.getElementById("acc").focus = "off";
          } else {
            apiErrorToast("No Vendor Found! Kindly Change Account Number");
          }
        } else {
          setRemitterStatus();
        }
      },
      (error) => {
        apiErrorToast(error);
      }
    );
  };
  const tabs = [{ label: "Vendor Payment" }, { label: "Super" }];
  const handleChange = (event, newValue) => {
    console.log("newval", newValue);
    setValue(newValue);
    settype(vendor_tab_value[newValue]);
    setCurrentType(vendor_tab_value[newValue]);

    console.log("cms value is", type);
  };

  return (
    <>
      {envName === PROJECTS.moneyoddr && infoFetchedMob && (
        <div style={{ textAlign: "left", marginBottom: "10px" }}>
          <Button
            className="button-red"
            variant="contained"
            startIcon={<ArrowBackIcon />}
            sx={{ py: 0.2, px: 2 }}
            onClick={() => {
              setInfoFetchedMob(false);
              setRemitterStatus();
              setMobile("");
            }}
          >
            back
          </Button>
        </div>
      )}
      {user && !user.instId && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <OutletRegistration autoOpen />
        </Box>
      )}
      {user && user.instId && (
        <>
          {user?.layout && user?.layout === 2 && (
            <Box
              className="card-css"
              sx={{
                width: "100%",
                my: 2,
                p: 2,
                py: 1,
              }}
            >
              <Typography className="services-heading">
                Banking Services
              </Typography>
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
                        if (
                          user?.dmt4 === 0 &&
                          item.title === "Express Transfer"
                        ) {
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

          <div
            // style={{
            //   display: "flex",
            //   justifyContent: "center",
            //   height: "90vh",
            //   alignItems: infoFetchedMob
            //     ? "flex-start"
            //     : user?.layout && user?.layout === 2
            //     ? "start"
            //     : "center",
            // }}
            className="position-relative"
          >
            <Loader circleBlue loading={request} />
            {/* initial form */}
            <Grid container sx={{ display: "flex", justifyContent: "center" }}>
              <Grid
                item
                lg={12}
                sm={12}
                xs={12}
                sx={{
                  mb: { md: 2, sm: 6, xs: 4 },
                  mr: { md: 0, sm: 1.3, xs: 1.3 },
                  marginLeft: 0,
                }}
              >
                                                    {!infoFetchedMob && !infoFetchedMob&&  <CustomTabs
      tabs={tabs}
      value={value}
      onChange={handleChange}
    />
                                                    }
                <Card
                  className="card-css"
                  sx={{
                    px: 7,
                    width: "100%",
                    py: 3,
                  }}
                >
                  <Grid
                    item
                    md={12}
                    xs={12}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Button
                      size="small"
                      id="verify-btn"
                      className="button-props"
                      onClick={handleBack}
                      sx={{ p: 1 }}
                    >
                      <span style={{ marginRight: "5px" }}>Back</span>
                      <img
                        src={back}
                        alt="UPI logo"
                        style={{ width: "18px", height: "20px" }}
                      />
                    </Button>
                    {user?.dmt4 === 1 && user?.st === 1 && (
                      <div
                        sx={{ display: "flex" }}
                        hidden={remitterStatus}
                      ></div>
                    )}
                    {!mobile ? (
                      <Typography
                        sx={{
                          fontSize: "24px",
                          fontWeight: "bold",
                          letterSpacing: "0.05rem",
                          textAlign: "center",
                          mt: 1,
                          flexGrow: 1,
                        }}
                      >
                        {type == "express"
                          ? "Express Money Transfer"
                          : "Super Money Transfer"}
                      </Typography>
                    ) : null}
                  </Grid>
                  <Box
                    component="form"
                    id="seachRemByAcc"
                    sx={{
                      pt: 1,
                      "& .MuiTextField-root": { mt: 2 },
                      objectFit: "contain",
                      overflowY: "scroll",
                    }}
                    onSubmit={getRemitterStatusByAcc}
                  >
                    <Grid
                      container
                      md={12}
                      sm={12}
                      xs={12}
                      sx={{
                        mb: { md: 2, sm: 4, xs: 4 },
                        mr: { md: 0, sm: 1.3, xs: 1.3 },
                      }}
                    >
                      <Grid item md={12} xs={12}>
                        {!infoFetchedMob && !infoFetchedMob && (
                          <FormControl sx={{ width: "100%" }}>
                            <TextField
                              autoComplete="off"
                              label="Mobile Number"
                              id="mobile"
                              name="mobile"
                              type="tel"
                              value={mobile}
                              size="small"
                              required
                              onChange={(e) => {
                                setIsMobv(PATTERNS.MOBILE.test(e.target.value));
                                if (e.target.value === "") {
                                  setRemitterStatus("");
                                  setInfoFetchedMob(false);
                                  bene && setBene([]);

                                  setIsMobv(true);
                                }

                                setMobile(e.target.value);
                                if (e.target.value.length === 9) {
                                  setRemitterStatus("");
                                  setInfoFetchedMob(false);
                                  bene && setBene([]);
                                }
                                if (PATTERNS.MOBILE.test(e.target.value)) {
                                  getRemitterStatus(e.target.value);
                                }
                              }}
                              error={!isMobv}
                              helperText={!isMobv ? "Enter valid Mobile" : ""}
                              inputProps={{
                                form: {
                                  autocomplete: "off",
                                },
                                maxLength: "10",
                              }}
                              disabled={request && request && true}
                            />
                          </FormControl>
                        )}
                      </Grid>

                      {/* {infoFetchedMob && infoFetchedMob && (
                        // <div style={{ width: "100%" }}>
                        //   <Grid item md={12} xs={12}>
                        //     <FormControl sx={{ width: "100%" }}>
                        //       <TextField autoComplete="off"
                        //         label="Name"
                        //         id="name"
                        //         size="small"
                        //         value={
                        //           remitterStatus &&
                        //           remitterStatus.firstName +
                        //             " " +
                        //             remitterStatus.lastName
                        //         }
                        //         disabled={request && request && true}
                        //       />
                        //     </FormControl>
                        //   </Grid>                       
                        // </div>
                        <Grid className="remitter-card" container sx={{ display: 'flex' }}>
                        <Grid item lg={6} sm={6} xs={6} sx={{ display: 'flex', flexDirection: 'column', px: 2 }}>
                          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', mb: 2 }}>
                            <Box component="img" src={Name} alt="Name" sx={{ maxWidth: "25px", maxHeight: "50px", mr: 1 }} />
                            <Typography sx={{ fontSize: "12px" }}>
                            {
                                   remitterStatus &&
                                  remitterStatus.firstName +
                                    " " +
                                    remitterStatus.lastName
                                }
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }}>
                    <Box component="img" src={Call1} alt="Call" sx={{ maxWidth: "25px", maxHeight: "50px", mr: 1 }} />
                    <Typography sx={{ fontSize: "12px" }}>{remitterStatus?.mobile}</Typography>
                    <BorderColorIcon sx={{ color: "Black", width: 15 }} onClick={returnMoneyNew} />
                  </Box>
                  <Grid item lg={6} sm={6} xs={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: "end", px: 2 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'end',justifyContent:"end" ,marginRight:{lg:3.5 , sm:3},mb:2 }}>
                    <Box component="img" src={LimitAcc} alt="Limit" sx={{ maxWidth: "25px", maxHeight: "50px", mr: 1 }} />
                    <Typography sx={{ fontSize: "12px", mr: 1 }}>Limit Available</Typography>
                    <Box sx={{ fontWeight: 'bold' }}>{remitterStatus?.limitTotal}</Box>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center',justifyContent:"end" }}>
                    <Box component="img" src={LimitTran} alt="Limit" sx={{ maxWidth: "25px", maxHeight: "50px", mr: 1 }} />
                    <Typography sx={{ fontSize: "12px", mr: 1 }}>Limit Per Transaction</Typography>
                    <Box sx={{ fontWeight: 'bold' }}>{remitterStatus?.limitPerTransaction}</Box>
                  </Box>
                </Grid>
               
                          </Grid>
                          </Grid>
                      )}                 */}
                      {infoFetchedMob && infoFetchedMob && (
                        <Grid
                          className="remitter-card"
                          container
                          sx={{ display: "flex" }}
                        >
                          <Grid
                            item
                            lg={6}
                            sm={6}
                            xs={6}
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              px: 2,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "start",
                                mb: 2,
                              }}
                            >
                              <Box
                                component="img"
                                src={Name}
                                alt="Name"
                                sx={{
                                  maxWidth: "25px",
                                  maxHeight: "50px",
                                  mr: 1,
                                }}
                              />
                              <Typography
                                sx={{
                                  fontSize: "12px",
                                  fontWeight: "600",
                                  mt: 0.5,
                                }}
                              >
                                {type === "dmt2"
                                  ? remitterStatus?.fname
                                  : remitterStatus?.firstName}{" "}
                                {type === "dmt2"
                                  ? remitterStatus?.lname
                                  : remitterStatus?.lastName}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "start",
                              }}
                            >
                              <Box
                                component="img"
                                src={Call1}
                                alt="Call"
                                sx={{
                                  maxWidth: "25px",
                                  maxHeight: "50px",
                                  mr: 1,
                                }}
                              />
                              <Typography
                                sx={{
                                  fontSize: "12px",
                                  fontWeight: "600",
                                  mt: 0.4,
                                }}
                              >
                                {remitterStatus?.mobile}
                              </Typography>
                              <BorderColorIcon
                                sx={{ color: "Black", width: 15 }}
                                onClick={returnMoneyNew}
                              />
                            </Box>
                          </Grid>

                          <Grid
                            item
                            lg={6}
                            sm={6}
                            xs={6}
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "end",
                              px: 2,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "end",
                                justifyContent: "end",
                                marginRight: { lg: 7, sm: 3 },
                                mb: 2,
                              }}
                            >
                              <Box
                                component="img"
                                src={LimitAcc}
                                alt="Limit"
                                sx={{
                                  maxWidth: "25px",
                                  maxHeight: "50px",
                                  mr: 1,
                                }}
                              />
                              <Typography
                                sx={{
                                  fontSize: "12px",
                                  mr: 1,
                                  fontWeight: "600",
                                  mb: 0.5,
                                }}
                              >
                                Limit Available
                              </Typography>
                              <Box sx={{ fontWeight: "bold" }}>
                                {remitterStatus?.limitTotal}
                              </Box>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "end",
                                marginRight: { lg: 3.5, sm: 3 },
                              }}
                            >
                              <Box
                                component="img"
                                src={LimitTran}
                                alt="Limit"
                                sx={{
                                  maxWidth: "25px",
                                  maxHeight: "50px",
                                  mr: 1,
                                }}
                              />
                              <Typography
                                sx={{
                                  fontSize: "12px",
                                  mr: 1,
                                  fontWeight: "600",
                                }}
                              >
                                Limit Per Transaction
                              </Typography>
                              <Box sx={{ fontWeight: "bold" }}>
                                {remitterStatus?.limitPerTransaction}
                              </Box>
                            </Box>
                          </Grid>

                          <Grid
                            lg={6}
                            xl={6}
                            xs={6}
                            sx={{
                              display: "flex",
                              justifyContent: {
                                xs: "center",
                                sm: "flex-start",
                                lg: "center",
                              }, // Center on small screens, left on larger
                              width: "100%",
                              marginLeft: { md: 23, sm: 23, xs: 13 },
                              marginBottom: { xs: 2, sm: "-2%" }, // Responsive bottom margin
                              padding: { xs: 2, sm: 0 }, // Add padding for small screens
                            }}
                          >
                            <DmrAddBeneficiaryModal
                              rem_mobile={mobile}
                              apiEnd={ApiEndpoints.ADD_BENE_EXPRESS}
                              getRemitterStatus={refreshRemitterStatus}
                            />
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                  </Box>
                  {infoFetchedMob && infoFetchedMob && (
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
                            maxWidth: {
                              lg: "100%",
                              md: "200px",
                              sm: "150px",
                              xs: "100%",
                            }, // Adjust max-width based on screen size
                          }}
                        >
                          <BeneSearchBar
                            setSearch={setSearch}
                            label="Search Vendors"
                          />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "end",
                            mx: { md: 2, sm: 1, xs: 0 },
                            mr: { xs: 1.3, md: 2 },
                          }}
                        >
                          <Typography sx={{ fontSize: "18px", mb: 1 }}>
                            Vendor List ({bene.length})
                          </Typography>
                        </Box>
                      </Box>
                      <div
                        className="enable-scroll"
                        style={{
                          overflow: "auto",
                          height: "85vh",
                          height: "85vh", // Fixed height to control the scrolling area
                          paddingBottom: "8px",
                          "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar for Webkit browsers
                          msOverflowStyle: "none", // Hide scrollbar for Internet Explorer and Edge
                          scrollbarWidth: "none",
                        }}
                      >
                        {bene.length <= 0 ? (
                          <Typography sx={{ mt: 2 }}>
                            No Vendor found.
                            <Typography sx={{ fontWeight: "bold" }}>
                              Enter Remitter's Mobile Number to view Vendor List
                            </Typography>
                            <NoDataView />
                          </Typography>
                        ) : filteredBenelist.length <= 0 ? (
                          <Typography sx={{ mt: 2 }}>
                            No Vendor found.
                          </Typography>
                        ) : (
                          // Vendor mapping......
                          filteredBenelist.map((ben, index) => {
                            return (
                              <>
                                <BeneCardVender
                                  type={type}
                                  ben={ben}
                                  index={index}
                                  mobile={mobile}
                                  remitterStatus={remitterStatus}
                                  getRemitterStatus={getRemitterStatus}
                                  view="MT_View"
                                />
                              </>
                            );
                          })
                        )}
                      </div>
                    </Grid>
                  )}
                </Card>

                {/* {numberList && numberList.length > 0 && ( */}
                <DmrNumberListModal
                  numberList={numberList}
                  setMobile={(mob) => {
                    setMobile(mob);
                    getRemitterStatus(mob);
                  }}
                />
                {/* )} */}
              </Grid>
            </Grid>
            {addNewRem && addNewRem && (
              <DmrAddRemitterModal
                rem_mobile={mobile}
                getRemitterStatus={getRemitterStatus}
                apiEnd={ApiEndpoints.ADD_REM}
                view="expressTransfer"
                setAddNewRem={setAddNewRem}
                setOtpRef={setOtpRefId}
              />
            )}
            {verifyotp && verifyotp && (
              <DmrVrifyNewUser
                rem_mobile={mobile}
                getRemitterStatus={getRemitterStatus}
                view="expressTransfer"
                verifyotp={verifyotp}
                apiEnd={ApiEndpoints.VALIDATE_OTP}
                otpRefId={otpRefId && otpRefId}
                setOtpRefId={setOtpRefId}
                setVerifyotp={setVerifyotp}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default VendorPayments;
