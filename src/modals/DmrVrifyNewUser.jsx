import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FormControl, Grid, TextField } from "@mui/material";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import { apiErrorToast } from "../utils/ToastUtil";
import { postJsonData } from "../network/ApiController";
import { useState } from "react";

const DmrVrifyNewUser = ({
  rem_mobile,
  getRemitterStatus,
  view,
  verifyotp,
  apiEnd,
  otpRefId,
  setOtpRefId,
  setVerifyotp,
}) => {
  const [open, setOpen] = useState(true);
  const [request, setRequest] = useState(false);

  const [mobile, setMobile] = useState(rem_mobile);

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
    setOtpRefId("");
    setVerifyotp(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    postJsonData(
      apiEnd,
      {
        otpReference: otpRefId && otpRefId,
        otp: form.otp.value,
      },
      setRequest,
      (res) => {
        if (getRemitterStatus) {
          getRemitterStatus(mobile);
        }
        handleClose();
      },
      (error) => {
        apiErrorToast(error);
      }
    );
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
          <ModalHeader title="Verify Remitter" handleClose={handleClose} />
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
              <Grid item md={12} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField autoComplete="off"
                    label="Enter OTP"
                    id="otp"
                    size="small"
                    required
                    inputProps={{ maxLength: 6 }}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <ModalFooter form="add_rem" request={request} />
        </Box>
      </Modal>
    </Box>
  );
};
export default DmrVrifyNewUser;
