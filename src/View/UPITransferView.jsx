import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { get, postJsonData } from "../network/ApiController";
import ApiEndpoints from "../network/ApiEndPoints";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { apiErrorToast } from "../utils/ToastUtil";
import DeleteBeneficiaryModal from "../modals/DeleteBeneficiaryModal";
import DmrAddRemitterModal from "../modals/DmrAddRemitterModal";
import AddBeneficiaryUpiModal from "../modals/AddBeneficiaryUpiModal";
import AccountVerificationUpi from "../modals/AccountVerificationUpi";
import RetUpiTransferModal from "../modals/RetUpiTransferModal";
import VerifiedIcon from "@mui/icons-material/Verified";
import Loader from "../component/loading-screen/Loader";
import CustomCard from "../component/CustomCard";
import { back, Banner, Call1, LimitAcc, LimitTran, Name, noDataFoundGif } from "../iconsImports";
import { PATTERNS } from "../utils/ValidationUtil";
import { currencySetter } from "../utils/Currencyutil";
import { randomColors } from "../theme/setThemeColor";
import AuthContext from "../store/AuthContext";
import OutletRegistration from "../component/OutletRegistration";
import { banking } from "../_nav";
import HNavButton from "../component/HNavButton";
import { useNavigate } from "react-router-dom";
import BeneCardComponent from "../component/BeneCardComponent";
import BeneCardUpi from "../component/BeneCardUpi";
import NoDataView from "../component/NoDataView";
import BeneSearchBar from "../component/BeneSearchBar";

const UPITransferView = ({resetView}) => {
  const [infoFetchedMob, setInfoFetchedMob] = useState(false);
  const [request, setRequest] = useState(false);
  const [remitterStatus, setRemitterStatus] = useState();
  const [mobile, setMobile] = useState("");
  const [bene, setBene] = useState([]);
  const [addNewRem, setAddNewRem] = useState(false);
  const [verifyRem, setVerifyRem] = useState(false);
  const [isMobv, setIsMobv] = useState(true);
  const [search, setSearch] = useState("");
  const handleBack=()=>{
    resetView(false)
  }
  const authCtx = useContext(AuthContext);
  const user = authCtx.user;
  const navigate = useNavigate();
  const returnMoneyNew=()=>{
    setInfoFetchedMob(false)
      }
  const getRemitterStatus = (number) => {
    setMobile(number);
    postJsonData(
      ApiEndpoints.GET_REMITTER_STATUS_UPI,
      { rem_number: number },
      setRequest,
      (res) => {
        if (res && res.data) {
          if (res.data.message === "Verify Remitter") {
            setAddNewRem(true);
            setVerifyRem(true);
          } else {
            const data = res.data;
            setMobile(number);
            setRemitterStatus(data.remitter);
            setBene(data.data);
            setInfoFetchedMob(true);
          }
        } else {
          setRemitterStatus();
        }
      },
      (error) => {
        const errorData = error.response;
        const err_status = errorData.status;
        const err_message = errorData.data.message;

        if (err_status === 404 && err_message === "Remitter Not Found") {
          setVerifyRem(true);
          setAddNewRem(true);
        } else {
          apiErrorToast(error);
        }
      }
    );
  };

  const ekycCall = () => {
    get(
      ApiEndpoints.EKYC_INITIATE,
      `rem_mobile=${mobile && mobile}`,
      setRequest,
      (res) => {
        const data = res.data;
        window.open(data.url);
      },
      (error) => {
        apiErrorToast(error);
      }
    );
  };

  return (
    <>
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
                      .map((mitem, index) => (
                        <Grid
                          item
                          md={2}
                          index={index}
                          onClick={() => navigate(mitem.to)}
                          className="horizontal-sidenav"
                        >
                          <HNavButton item={mitem} />
                        </Grid>
                      ))
                  : banking.map((item, index) => (
                      <Grid
                        item
                        md={2}
                        index={index}
                        onClick={() => navigate(item.to)}
                        className="horizontal-sidenav"
                      >
                        <HNavButton item={item} />
                      </Grid>
                    ))}
              </Grid>
            </Box>
          )}
              
          <Box
            sx={{
              height: "max-content",
              px: 7,
            }}
            className="position-relative card-css"
          >
       
            <Loader loading={request} circleBlue />
            <Grid
              container
              spacing={3}
              sx={{ display: "flex", justifyContent: "center", mt: 1 }}
            >
               
              <Grid
                item
                md={12}
                sm={12}
                xs={12}
                sx={{
                  mb: { md: 2, sm: 4, xs: 4 ,lg:4},
                  mr: { md: 0, sm: 1.3, xs: 1.3 },
                  marginLeft: 0,
                }}
              >
               
{
  !mobile?(
           <Typography
                  sx={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                   <Button
        size="small"
        id="verify-btn"
        className="button-props"
        onClick={handleBack}
      >
                <span style={{ marginRight: '5px' }}>Back</span>
        <img src={back} alt="UPI logo" style={{ width: '18px', height: '20px' }} />
      </Button>
                  UPI Transfer
                </Typography>
  ): null}

                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { mt: 2 },
                    objectFit: "contain",
                    overflowY: "scroll",
                  }}
                >
                  <Grid container sx={{ pt: 1 }}>
                    <Grid item md={12} xs={12} lg={12}>
                    {!infoFetchedMob && !infoFetchedMob&&

                      <FormControl sx={{ width: "100%" }}>
                        <TextField autoComplete="off"
                          sx={{ width: "100%" }}
                          label="Mobile Number"
                          id="mobile"
                          name="mobile"
                          type="tel"
                          size="small"
                          value={mobile}
                          onChange={(e) => {
                            setInfoFetchedMob(false);
                            setBene("");
                            setRemitterStatus("");
                            setIsMobv(PATTERNS.MOBILE.test(e.target.value));
                            if (e.target.value === "") setIsMobv(true);
                            setMobile(e.target.value);
                            if (PATTERNS.MOBILE.test(e.target.value)) {
                              getRemitterStatus(e.target.value);
                            }
                          }}
                          error={!isMobv}
                          helperText={!isMobv ? "Enter valid Mobile" : ""}
                          onKeyDown={(e) => {
                            if (
                              (e.which >= 65 && e.which <= 90) ||
                              e.key === "+"
                            ) {
                              e.preventDefault();
                            }
                            if (e.target.value.length === 10) {
                              if (e.key.toLowerCase() !== "backspace") {
                                e.preventDefault();
                              }
                            }
                          }}
                          inputProps={{
                            form: {
                              autocomplete: "off",
                            },
                            maxLength: "10",
                          }}
                          disabled={request && request && true}
                        />
                      </FormControl>
}
                    </Grid>
                    {infoFetchedMob && infoFetchedMob && (
                      
                        <Grid className="remitter-card" container sx={{ display: 'flex' }}>
                        <Grid item lg={6} sm={6} xs={6} sx={{ display: 'flex', flexDirection: 'column', px: 2 }}>
                          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', mb: 2 }}>
                            <Box component="img" src={Name} alt="Name" sx={{ maxWidth: "25px", maxHeight: "50px", mr: 1 }} />
                            <Typography sx={{ fontSize: "12px" ,fontWeight:"600",mt:0.5 }}> 
                            {
                                   remitterStatus &&
                                  remitterStatus.name 
                            
                                }
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }}>
                    <Box component="img" src={Call1} alt="Call" sx={{ maxWidth: "25px", maxHeight: "50px", mr: 1 }} />
                    <Typography sx={{ fontSize: "12px" ,fontWeight:"600",mt:0.4}}>{remitterStatus?.number}</Typography>
                    <BorderColorIcon sx={{ color: "Black", width: 15 }}   onClick={returnMoneyNew}  />
                  </Box>
                </Grid>

                <Grid item lg={6} sm={6} xs={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: "end", px: 2 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'end',justifyContent:"end" ,marginRight:{lg:4.7 , sm:5},mb:2 }}>
                    <Box component="img" src={LimitAcc} alt="Limit" sx={{ maxWidth: "25px", maxHeight: "50px", mr: 1 }} />
                    <Typography sx={{ fontSize: "12px", mr: 1 ,fontWeight:"600",mb:0.5}}>Limit Available</Typography>
                    <Box sx={{ fontWeight: 'bold' }}>{remitterStatus?.rem_limit}</Box>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center',justifyContent:"end" }}>
                    <Box component="img" src={LimitTran} alt="Limit" sx={{ maxWidth: "25px", maxHeight: "50px", mr:1 }} />
                    <Typography sx={{ fontSize: "12px", mr: 1 ,fontWeight:"600"}}>Limit Per Transaction</Typography>
                    <Box sx={{ fontWeight: 'bold' }}>{remitterStatus?.rem_limit}</Box>
                  </Box>
                </Grid>
                <Grid
                lg={6}
                xl={6}
                xs={6}
  sx={{
    display: 'flex',
    justifyContent: { xs: 'center', sm: 'flex-start',lg:"center" }, // Center on small screens, left on larger
    width: '100%',
    marginLeft: {  md: 23, sm: 23, xs: 13 },
    marginBottom: { xs: 2, sm: '-2%' }, // Responsive bottom margin
    padding: { xs: 2, sm: 0 }, // Add padding for small screens
  }}
>
<AddBeneficiaryUpiModal
                      rem_mobile={mobile}
                      apiEnd={ApiEndpoints.ADD_BENE_UPI}
                      getRemitterStatus={getRemitterStatus}
                    />
</Grid>

                          </Grid>
                        
                      )}  
                    <Grid
                      item
                      md={4}
                      xs={12}
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              
              <Grid
                    lg={12}
                    sm={12}
                    xs={12}
                    sx={{ mb: { md: 2, sm: 4, xs: 12 } }}
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
      <BeneSearchBar setSearch={setSearch} />
    </Box>
    <Box 
     sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "end",
      mx: { md: 2, sm: 1, xs: 0 },
      mr: { xs: 1.3, md: 2 },
      marginTop: 4
    }}>        
                 <Typography sx={{ fontSize: "18px", mb:1 }}>
                      Beneficiary List ({bene.length})
                    </Typography>
                    </Box>
 
                  </Box>
                  <Grid
                    container
                    spacing={2}
                    sx={{
                      pr: { xs: 1.3, md: 2 },
                      pt: 2,
                      mb: { md: 2, sm: 4, xs: 4 },
                      marginLeft: 1,
                    }}
                  >
                    {bene.length <= 0 ? (
                      <Grid
                        item
                        xs={12}
                        className="d-flex align-items-start justify-content-center"
                      >
                        <Typography sx={{ mt: 2 }}>No beneficiary found.
                      <Typography sx={{fontWeight:"bold"}}>
                      Enter Remitter's Mobile Number to view Beneficiary List
                    </Typography>
                    <NoDataView/>
                   
                  </Typography>
                      </Grid>
                    ) : (
                      bene.map((ben, index) => (
                        <Grid item xs={12} key={index}>
                          {/* <CustomCard
                          lg={12}
                            width="100%"
                            icon={
                              <Box
                                sx={{
                                  alignItems: "center",
                                  justifyContent: "center",
                                  display: "flex",
                                  borderRadius: "4px",
                                  height: "64px",
                                  background: randomColors(),
                                  width: "64px",
                                }}
                              >
                                <Typography sx={{ fontSize: "40px" }}>
                                  {ben.bene_name.charAt(0).toUpperCase()}
                                </Typography>
                              </Box>
                            }
                           
                            title={ben.bene_acc}
                            
                            description={
                              <div style={{ display: "flex", alignItems: "center" }}>
                                <RetUpiTransferModal ben={ben} rem_number={mobile} />
                              </div>
                            }
                            descriptionSup={
                              <DeleteBeneficiaryModal
                                bene={ben}
                                mob={mobile}
                                getRemitterStatus={getRemitterStatus}
                                apiEnd={ApiEndpoints.REMOVE_BENE_UPI}
                                view="expressTransfer"
                              />

                            }
                            iconSup={
                              <div style={{  }}>
                                {ben.last_success_date ? (
                                  <Box
                                    sx={{
                                      position: "absolute",
                                      top: "-74px",
                                      right: "-68px",
                                      color: "#00bf78",
                                    }}
                                  >
                                    <Tooltip title="Already Verified">
                                      <VerifiedIcon sx={{ fontSize: "17px" }} />
                                    </Tooltip>
                                  </Box>
                                ) : (
                                  <AccountVerificationUpi rem_number={mobile} ben={ben} />
                                )}
                              </div>
                            }
                          /> */}
                          <BeneCardUpi  ben={ben} mobile={mobile}/>
                      
                        </Grid>
                      ))
                    )}
                  </Grid>
                </Grid>
            
              {addNewRem && (
                <DmrAddRemitterModal
                  rem_mobile={mobile}
                  getRemitterStatus={getRemitterStatus}
                  apiEnd={ApiEndpoints.ADD_REM_UPI}
                  view="upiTransfer"
                  setAddNewRem={setAddNewRem}
                  verifyRem={verifyRem}
                  setVerifyRem={setVerifyRem}
                />
              )}
            </Grid>
          </Box>
        </>
      )}
    </>
  );
};

export default UPITransferView;
