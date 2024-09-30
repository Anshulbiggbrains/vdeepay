import {
  Box,
  Button,
  FormControl,
  Grid,
  Modal,
  TextField,
} from "@mui/material";
import React from "react";
import { secondaryColor } from "../theme/setThemeColor";
import { useState } from "react";
import Loader from "../component/loading-screen/Loader";
import ModalHeader from "./ModalHeader";
import BankSearch from "../component/BankSearch";
import ApiEndpoints from "../network/ApiEndPoints";
import AddIcon from "@mui/icons-material/Add";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  boxShadow: 24,
  fontFamily: "Poppins",
  p: 2,
  height: "max-content",
  overflowY: "scroll",
};

let bankObjCallBack;

const UserAddBankModal = () => {
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState(false);
  const [bankSearchIfsc, setbankSearchIfsc] = useState();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {};
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "end",
        // postition: "absolute",
        // top: "-5%",
        // right: "10%",
      }}
    >
      <Button
        variant="contained"
        style={{
          fontSize: "11px",
          marginLeft: "5px",
          textTransform: "none",
          background: secondaryColor(),
        }}
        onClick={handleOpen}
        startIcon={<AddIcon />}
      >
        Add Bank
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="sm_modal">
          <Loader loading={request} />
          <ModalHeader title="Add Bank" handleClose={handleClose} />
          <Box
            component="form"
            id="forgotPass"
            validate
            autoComplete="off"
            onSubmit={handleSubmit}
            sx={{
              "& .MuiTextField-root": { m: 2 },
            }}
          >
            <Grid container>
              <Grid item md={6} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField autoComplete="off"
                    label="Account Number"
                    id="accNo"
                    size="small"
                    type="number"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField autoComplete="off"
                    label="IFSC"
                    id="accNo"
                    size="small"
                    type="number"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12}>
                <BankSearch
                  //   fromProfile={true}
                  label="Bank Name"
                  endpt={ApiEndpoints.GET_BANK_DMR}
                  bankObj={(bank) => {
                    bankObjCallBack = bank;
                  }}
                  ifscObj={(ifsc) => {
                    setbankSearchIfsc(ifsc);
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default UserAddBankModal;
