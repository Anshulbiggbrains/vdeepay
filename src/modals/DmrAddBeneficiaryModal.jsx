import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  Grid,
  TextField,
  Button,
  Typography,
  Icon,
  InputAdornment,
  Drawer,
} from "@mui/material";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import ApiEndpoints from "../network/ApiEndPoints";
import { apiErrorToast, okSuccessToast } from "../utils/ToastUtil";
import { postJsonData } from "../network/ApiController";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { PATTERNS } from "../utils/ValidationUtil";
import useCommonContext from "../store/CommonContext";
import Loader from "../component/loading-screen/Loader";
import VerifyOtpLogin from "./VerifyOtpLogin";
import AuthContext from "../store/AuthContext";
import { useContext } from "react";
import PinInput from "react-pin-input";
import ResetMpin from "./ResetMpin";
import ApiSearch from "../component/ApiSearch";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
const DmrAddBeneficiaryModal = ({
  dmtValue,
  rem_mobile,
  apiEnd = [],
  getRemitterStatus,
  // this view is just in the case of MT
  view,
}) => {
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState(false);
  const [accNoV, setAccNoV] = useState(true);
  const [mpin, setMpin] = useState("");
  const [err, setErr] = useState();
  const [isValidName, setIsValidName] = useState(true);
  const [bankId, setBankId] = useState("");
  const [bankName, setBankName] = useState("");
  const [ifscVal, setIfscVal] = useState("");
  const [secureValidate, setSecureValidate] = useState("");
  const [otpRefId, setOtpRefId] = useState("");
  const { getRecentData } = useCommonContext();
  const authCtx = useContext(AuthContext);
  const user = authCtx && authCtx.user;
  const loc = authCtx.location && authCtx.location;
  const [viewMpin, setViewMpin] = useState(false);
  // console.log("view", view);

  // const style = {
  //   position: "absolute",
  //   top: "50%",
  //   left: "50%",
  //   transform: "translate(-50%, -50%)",
  //   width: "40%",
  //   bgcolor: "background.paper",
  //   boxShadow: 24,
  //   fontFamily: "Poppins",
  //   height: "max-content",
  //   overflowY: "scroll",
  //   p: 2,
  // };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setIfscVal("");
    setBankId("");
    setViewMpin(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const buttonName = event?.nativeEvent?.submitter?.innerText;
    const form = event.currentTarget;

    let data = {};
    if (buttonName === "Add Beneficiary" || buttonName === "Add Vendor") {
      data = {
        name: form.name.value,
        rem_mobile: rem_mobile,
        account_number: form.acc_no.value.toUpperCase(),
        ifsc: ifscVal.toUpperCase(),
        bank_id: bankId,
        bank_name: bankName,
        verified: dmtValue === "dmt2" ? 0 : 0,
      };
    } else {
      if (mpin !== "" && viewMpin) {
        data = {
          number: rem_mobile && rem_mobile,
          ben_acc: form.acc_no.value.toUpperCase(),
          ben_id: user.username,
          ifsc: ifscVal,
          latitude: loc.lat,
          longitude: loc.long,
          ben_name: form.name.value,
          pf: "WEB",
          mpin: mpin && mpin,
        };
      } else {
        setViewMpin(true);
        setErr("");
        setMpin("");
        if (mpin === "" && viewMpin) {
          const error = {
            message: "MPIN required",
          };
          setErr(error);
        }
      }
    }

    if (buttonName === "Add Beneficiary" || buttonName === "Add Vendor") {
      postJsonData(
        apiEnd,
        data,
        setRequest,
        (res) => {
          if (
            res?.data?.status === "OTP" &&
            view === "MT_View" &&
            dmtValue === "dmt1"
          ) {
            setSecureValidate("Beneficiary");
            setOtpRefId(res?.data?.otpReference);
          } else {
            if (getRemitterStatus) getRemitterStatus(rem_mobile);
            getRecentData();
            okSuccessToast("Beneficiary Added Successfuly");
            handleClose();
          }
        },
        (error) => {
          if (getRemitterStatus) getRemitterStatus(rem_mobile);
          apiErrorToast(error);
        }
      );
    } else if (mpin !== "") {
      postJsonData(
        ApiEndpoints.VERIFY_ACC,
        data,
        setRequest,
        (res) => {
          getRecentData();
          okSuccessToast(res.data.message);
          const data = {
            name: res.data.message,
            rem_mobile: rem_mobile,
            account_number: form.acc_no.value.toUpperCase(),
            ifsc: ifscVal.toUpperCase(),
            bank_id: bankId,
            bank_name: bankName,
            verified: 1,
          };
          postJsonData(
            apiEnd,
            data,
            setRequest,
            (res) => {
              if (
                res?.data?.status === "OTP" &&
                view === "MT_View" &&
                dmtValue === "dmt1"
              ) {
                setSecureValidate("Beneficiary");
                setOtpRefId(res?.data?.otpReference);
              } else {
                if (getRemitterStatus) getRemitterStatus(rem_mobile);
                getRecentData();
                // okSuccessToast("Beneficiary Added Successfuly");
                handleClose();
              }
            },
            (error) => {
              if (getRemitterStatus) getRemitterStatus(rem_mobile);
              apiErrorToast(error);
              setViewMpin(false);
            }
          );

          // if (remitterStatus) getRemitterStatus(rem_number);
        },
        (error) => {
          if (error && error) {
            if (error.response.data.message === "Invalid M Pin") {
              setErr(error.response.data);
            } else {
              getRecentData();
              setErr("");
              handleClose();
              apiErrorToast(error);
              setViewMpin(false);
            }
            // if (remitterStatus) getRemitterStatus(rem_number);
          }
        }
      );
    } else {
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "end",
      }}
    >
   <Button
  variant="text"
  onClick={handleOpen}
  size="small"
  sx={{
    color: "Dark-Blue",
    fontWeight: "bold",
    textTransform:"capitalize",
    fontSize: "10px",
    display: "flex", // Added to align items
    alignItems: "center",
    borderRadius: 2,
    backgroundColor: "#D9E9FD", // Vertically center the icon and text
    '&:hover': {
      color: "Dark-Blue",
      backgroundColor: "#D8D8D8",
      
    },
  }}
>
  <AddCircleIcon sx={{ mr: 1, fontSize: "16px" ,mb:0.5}} />
  {view === "MT_View" 
    ? "Add beneficiary"
    : "Add vendor"
  }
  <Loader loading={request} size="small" sx={{ ml: 1 }} />
</Button>

      <Box>
        <Drawer
          open={open}
          anchor="right"
          onClose={handleClose}
          // aria-labelledby="modal-modal-title"
          // aria-describedby="modal-modal-description"
        >
          <Box   sx={{
            width: 400,
            p: 2,
            height: "100%",
            boxShadow: 24,
            fontFamily: "Poppins",
            overflowY: "auto",
          }}
          role="presentation"
 >
            <Loader loading={request} />
            <ModalHeader
            subtitle="Empower Your Payments: Add a Beneficiary Today!"
              title={view === "MT_View" ? "Add Beneficiary" : "Add Vendor"}
              handleClose={handleClose}
            />
            <Box
              component="form"
              id="addbene"
              validate
              autoComplete="off"
              onSubmit={handleSubmit}
              sx={{
                "& .MuiTextField-root": { m: 1 },
              }}
            >
              <Grid container sx={{ pt: 1 }}>
              <Grid item xs={12} sm={11.7} md={12} lg={12} xl={11.7}>
  
  <ApiSearch
    label="Search Bank"
    name="user_id"
    placeholder="Bank"
    cb1={(item) => {
      setBankId(
        view === "MT_View" && dmtValue === "dmt2"
          ? item.id
          : item.bankId
      );
      setIfscVal(
        view === "MT_View" && dmtValue === "dmt2"
          ? item.ifsc
          : item.ifscGlobal
      );
      setBankName(item.newValue);
    }}
    nameKeys={["name"]}
    searchApi={
      view === "MT_View" && dmtValue === "dmt2"
        ? ApiEndpoints.DMT2_BANK_LIST
        : ApiEndpoints.GET_BANK_DMR
    }
    sx={{
      mt: 3,
      width: "100%"
    }}
  />
</Grid>

                <Grid item md={12} xs={12}>
                  <FormControl sx={{ width: "100%" }}>
                    <TextField autoComplete="off"
                      label="IFSC"
                      id="ifsc"
                      size="small"
                      value={ifscVal}
                      inputProps={{ style: { textTransform: "uppercase" } }}
                      onChange={(e) => {
                        setIfscVal(e.target.value);
                      }}
                      required
                    />
                  </FormControl>
                </Grid>
                <Grid item md={12} xs={12}>
                  <FormControl sx={{ width: "100%" }}>
                    <TextField autoComplete="off"
                      label="Name"
                      id="name"
                      size="small"
                      error={!isValidName}
                      helperText={!isValidName ? "Enter valid Name" : ""}
                      required
                      inputProps={{ minLength: 3 }}
                      onChange={(e) => {
                        setIsValidName(PATTERNS.NAME.test(e.target.value));
                        if (e.target.value === "") setIsValidName(true);
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={12} xs={12}>
                  <FormControl sx={{ width: "100%" }}>
                    <TextField autoComplete="off"
                      label="Account Number"
                      id="acc_no"
                      size="small"
                      required
                      error={!accNoV}
                      helperText={!accNoV ? "Enter valid Account Number" : ""}
                      inputProps={{ style: { textTransform: "uppercase" } }}
                      onChange={(e) => {
                        setAccNoV(PATTERNS.ACCOUNT_NUMBER.test(e.target.value));
                        if (e.target.value === "") setAccNoV(true);
                      }}
                    />
                  </FormControl>
                </Grid>

                {dmtValue === "dmt2" && viewMpin && (
  <Grid
    item
    md={12}
    xs={12}
    sx={{
      display: "flex",
      justifyContent: "space-between",
      mt: 2,
    }}
  >
    <Button
      variant="contained"
      color="primary"
      type="submit"
      sx={{ width: "48%" }}
    >
      Confirm
    </Button>
    <Button
      variant="outlined"
      color="secondary"
      onClick={handleClose}
      sx={{ width: "48%" }}
    >
      Cancel
    </Button>
  </Grid>
)}
 

                {dmtValue === "dmt2" && viewMpin && (
                  <Grid
                    item
                    md={12}
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 2,
                    }}
                  >
                    {err && err && (
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          mt: 2,
                          fontSize: "12px",
                          px: 2,
                          color: "#DC5F5F",
                        }}
                      >
                        {err.message && err.message && (
                          <div>{err && err.message}</div>
                        )}

                        {err.data && err.message === "Invalid M Pin" && (
                          <div className="blink_text">
                            Attempts remaining:{err && 5 - Number(err.data)}
                          </div>
                        )}
                      </Box>
                    )}
                  </Grid>
                )}
              </Grid>
            </Box>
            <ModalFooter
              form="addbene"
              request={request}
              btn={view === "MT_View" ? "Add Beneficiary" : "Add Vendor"}
              disable={!isValidName || !accNoV}
              twobuttons={dmtValue === "dmt2" ? "Verify & Add" : false}
              // onClick2={() => {
              //   viewMpin === false &&
              //     setTimeout(() => {
              //       setViewMpin(true);
              //     }, 300);
              // }}
            />
          </Box>
        </Drawer>
      </Box>
      <VerifyOtpLogin
        secureValidate={secureValidate}
        setSecureValidate={setSecureValidate}
        showLaoder={false}
        btn="Verify OTP"
        data={otpRefId}
        getRemitterStatus={getRemitterStatus}
        rem_mobile={rem_mobile}
        setOpenBene={setOpen}
      />
    </Box>
  );
};
export default DmrAddBeneficiaryModal;
