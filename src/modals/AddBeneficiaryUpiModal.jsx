import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { FormControl, Grid, TextField, Button } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import { apiErrorToast, okSuccessToast } from "../utils/ToastUtil";
import { useState } from "react";
import { postJsonData } from "../network/ApiController";
import useCommonContext from "../store/CommonContext";
import Loader from "../component/loading-screen/Loader";

const AddBeneficiaryUpiModal = ({ rem_mobile, apiEnd, getRemitterStatus }) => {
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState(false);

  const { getRecentData } = useCommonContext();

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
        okSuccessToast("Beneficiary Added Successfully");
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
        variant="text"
        size="small"
        onClick={handleOpen}
        sx={{
          color: "Dark-Blue",
          fontWeight: "bold",
          textTransform: "capitalize",
          fontSize: "10px",
          display: "flex",
          alignItems: "center",
          '&:hover': {
            color: "Dark-Blue",
            backgroundColor: "#D8D8D8",
            borderRadius: 8,
          },
        }}
      >
        <AddCircleIcon sx={{ mr: 1, fontSize: "16px", mb: 0.5 }} />
        Add Beneficiary
      </Button>

      <Drawer open={open} onClose={handleClose} anchor="right">
        <Box
          sx={{
            width: 400,
            p: 2,
            height: "100%",
            boxShadow: 24,
            fontFamily: "Poppins",
            display: "flex", // Added to make the layout flexible
            flexDirection: "column", // Ensure elements stack vertically
            overflowY: "auto",
          }}
          role="presentation"
        >
          <Loader loading={request} />
          <ModalHeader title="Add Beneficiary" handleClose={handleClose} />

          <Box
            component="form"
            id="addbene"
            validate="true"
            autoComplete="off"
            onSubmit={handleSubmit}
            sx={{
              "& .MuiTextField-root": { m: 1 },
              flexGrow: 1, // This makes the form take up the remaining space
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
            <ModalFooter form="addbene" request={request} btn="Add Beneficiary" />
          </Box>

          {/* ModalFooter will always stick to the bottom */}
         
        </Box>
      </Drawer>
    </Box>
  );
};

export default AddBeneficiaryUpiModal;
