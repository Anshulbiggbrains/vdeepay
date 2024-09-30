import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FormControl, Grid, TextField } from "@mui/material";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import ApiEndpoints from "../network/ApiEndPoints";
import { apiErrorToast, okSuccessToast } from "../utils/ToastUtil";
import { postJsonData } from "../network/ApiController";
import { useState } from "react";
import Loader from "../component/loading-screen/Loader";

const DmrAddRemitterModal = ({
  rem_mobile,
  getRemitterStatus,
  apiEnd,
  view,
  setAddNewRem,
  verifyRem,
  setVerifyRem,
  otpRef,
  setOtpRef,
}) => {
  const [open, setOpen] = useState(true);
  const [request, setRequest] = useState(false);

  const [mobile, setMobile] = useState(rem_mobile);
  const [otpRefId, setOtpRefId] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  // console.log("showOtp", showOtp);
  // console.log("otpRef", otpRef);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    bgcolor: "background.paper",
    boxShadow: 24,
    fontFamily: "Poppins",
    height: "max-content",
    overflowY: "scroll",
    p: 2,
  };
  const handleClose = () => {
    setOpen(false);
    if (setAddNewRem) setAddNewRem(false);
    if (setOtpRef) setOtpRef(null);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data =
      view && view === "upiTransfer"
        ? {
            rem_number: mobile,
            name: form.rem_name.value,
          }
        : {
            first_name: form.first_name.value,
            last_name: form.last_name.value,
            number: mobile,
          };
    if (showOtp && showOtp) {
      postJsonData(
        verifyRem && verifyRem
          ? ApiEndpoints.VERIFY_REM_UPI
          : ApiEndpoints.VALIDATE_OTP,
        {
          rem_number: mobile,
          otp: form.otp.value,
          otpReference: otpRefId,
        },
        setRequest,
        (res) => {
          if (getRemitterStatus) {
            getRemitterStatus(mobile);
          }
          setShowOtp(false);
          setOtpRefId("");
          setTimeout(() => {
            handleClose();
          }, 200);
        },
        (error) => {
          apiErrorToast(error);
        }
      );
    } else if (otpRef && otpRef) {
      postJsonData(
        apiEnd,
        {
          number: mobile,
          otp: form.otp.value,
          otpReference: otpRef,
          first_name: form.first_name.value,
          last_name: form.last_name.value,
        },
        setRequest,
        (res) => {
          if (getRemitterStatus) {
            getRemitterStatus(mobile);
          }

          handleClose();
          okSuccessToast(res.data.message);
        },
        (error) => {
          apiErrorToast(error);
        }
      );
    } else {
      postJsonData(
        apiEnd,
        data,
        setRequest,
        (res) => {
          const data = res.data;
          setOtpRefId(data.otp_ref_id);
          setShowOtp(true);
        },
        (error) => {
          apiErrorToast(error);
        }
      );
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "end",
      }}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="sm_modal">
          <Loader loading={request} />
          <ModalHeader title="Add Remitter" handleClose={handleClose} />
          <Box
            component="form"
            id="add_rem"
            validate
            autoComplete="off"
            onSubmit={handleSubmit}
            sx={{
              "& .MuiTextField-root": { m: 1 },
            }}
          >
            <Grid container sx={{ pt: 1 }}>
              <Grid item md={12} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField autoComplete="off"
                    label="Mobile"
                    id="mobile"
                    size="small"
                    required
                    value={mobile}
                    inputProps={{ maxLength: "10" }}
                    onChange={(e) => {
                      setMobile(e.target.value);
                    }}
                  />
                </FormControl>
              </Grid>

              {view && view === "upiTransfer" ? (
                <Grid item md={12} xs={12}>
                  <FormControl sx={{ width: "100%" }}>
                    <TextField autoComplete="off"
                      label="Name"
                      id="rem_name"
                      size="small"
                      required
                      inputProps={{ minLength: 3 }}
                    />
                  </FormControl>
                </Grid>
              ) : (
                <Grid item md={12} xs={12}>
                  <Grid item md={12} xs={12}>
                    <FormControl sx={{ width: "100%" }}>
                      <TextField autoComplete="off"
                        label="First name"
                        id="first_name"
                        size="small"
                        required
                        inputProps={{ minLength: 3 }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <FormControl sx={{ width: "100%" }}>
                      <TextField autoComplete="off"
                        label="Last Name"
                        id="last_name"
                        size="small"
                        required
                        inputProps={{ minLength: 3 }}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              )}

              {(showOtp || otpRef) && (
                <Grid item md={12} xs={12}>
                  <FormControl sx={{ width: "100%" }}>
                    <TextField autoComplete="off"
                      label="OTP"
                      id="otp"
                      size="small"
                      required
                      inputProps={{ maxLength: 6 }}
                    />
                  </FormControl>
                </Grid>
              )}
            </Grid>
          </Box>
          <ModalFooter form="add_rem" request={request} btn="Proceed" />
        </Box>
      </Modal>
    </Box>
  );
};
export default DmrAddRemitterModal;
