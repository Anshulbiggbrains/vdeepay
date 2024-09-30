import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FormControl, Grid, TextField, Button } from "@mui/material";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import { apiErrorToast, okSuccessToast } from "../utils/ToastUtil";
import { useState } from "react";
import { postJsonData } from "../network/ApiController";
import useCommonContext from "../store/CommonContext";
import Loader from "../component/loading-screen/Loader";
import AddCircleIcon from '@mui/icons-material/AddCircle';

const AddBeneficiaryUpiModal = ({ rem_mobile, apiEnd, getRemitterStatus }) => {
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState(false);

  const { getRecentData } = useCommonContext();

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
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = {
      name: form.name.value,
      rem_number: rem_mobile,
      vpa: form.vpa.value,
    };
    postJsonData(
      apiEnd,
      data,
      setRequest,
      (res) => {
        getRecentData();
        okSuccessToast("Beneficiary Added Successfuly");
        handleClose();
        if (getRemitterStatus) getRemitterStatus(rem_mobile);
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
      <Button
        // className="button-red"
        variant="text"
        size="small"
        onClick={handleOpen}
        sx={{
          color: "Dark-Blue",
          fontWeight: "bold",
          textTransform:"capitalize",
          fontSize: "10px",
          display: "flex", // Added to align items
          alignItems: "center", // Vertically center the icon and text
          '&:hover': {
            color: "Dark-Blue",
            backgroundColor: "#D8D8D8",
            borderRadius: 8,
          },
        }}
      >
          <AddCircleIcon sx={{ mr: 1, fontSize: "16px" ,mb:0.5}} />

        Add Beneficiary
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="sm_modal">
          <Loader loading={request} />
          <ModalHeader title="Add Beneficiary" handleClose={handleClose} />
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
              <Grid item md={12} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField autoComplete="off" label="Name" id="name" size="small" required />
                </FormControl>
              </Grid>
              <Grid item md={12} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField autoComplete="off" label="VPA" id="vpa" size="small" required />
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <ModalFooter form="addbene" request={request} btn="Add Beneficiary" />
        </Box>
      </Modal>
    </Box>
  );
};
export default AddBeneficiaryUpiModal;
