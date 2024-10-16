import * as React from "react";
import Box from "@mui/material/Box";
import {
  FormControl,
  Grid,
  TextField,
  Tooltip,
  IconButton,
  Button,
  Drawer,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import ApiEndpoints from "../network/ApiEndPoints";
import { apiErrorToast, okSuccessToast } from "../utils/ToastUtil";
import { get, postJsonData } from "../network/ApiController";
import { whiteColor } from "../theme/setThemeColor";

const AddBlockedAccount = ({ refresh }) => {
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState(false);
  const [asmList, setAsmList] = useState([]);

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
    getAsmList();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    // Get the form field values
    const data = {
      acc_no: form.acc_no.value, // correct name for acc_no
      // ifsc: form.ifsc.value,             // correct name for ifsc
    };

    setRequest(true);
    postJsonData(
      ApiEndpoints.GET_BLOCKED_AC,
      data,
      setRequest,
      (res) => {
        okSuccessToast("Account added successfully");
        handleClose();
        if (refresh) refresh();
      },
      (error) => {
        apiErrorToast(error);
      }
    );
  };

  const getAsmList = () => {
    get(
      ApiEndpoints.GET_USERS,
      `page=1&paginate=10&role=Asm&export=`,
      setRequest,
      (res) => {
        const asmArray = res.data.data;
        setAsmList(
          asmArray &&
            asmArray.map((item) => ({
              id: item.id,
              name: item.name,
            }))
        );
        setOpen(true);
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
      <Tooltip title="Add Account">
        <Button
          variant="outlined"
          className="refresh-icon-risk"
          onClick={handleOpen}
          startIcon={
            <IconButton
              sx={{
                p: 0,
                color: whiteColor(),
              }}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          }
          sx={{ py: 0.3 }}
        >
          Block Account
        </Button>
      </Tooltip>

      <Box>
        <Drawer open={open} anchor="right" onClose={handleClose}>
          <Box sx={{ width: 400 }}>
            <ModalHeader
              title="Add Account"
              handleClose={handleClose}
              subtitle="Easily Add New Accounts with VdeePay"
            />
            <Box
              component="form"
              id="addAcc"
              validate="true"
              autoComplete="off"
              onSubmit={handleSubmit}
              sx={{
                "& .MuiTextField-root": { m: 1 },
              }}
            >
              <Grid container sx={{ pt: 1 }}>
                <Grid item md={12} xs={12}>
                  <FormControl sx={{ width: "100%" }}>
                    <TextField
                      autoComplete="off"
                      label="Account Number"
                      id="acc_no" // Corrected ID for account number
                      size="small"
                      required
                    />
                  </FormControl>
                </Grid>
                <Grid item md={12} xs={12}>
                  <FormControl sx={{ width: "100%" }}>
                    <TextField
                      autoComplete="off"
                      label="IFSC"
                      id="ifsc" // Corrected ID for IFSC
                      size="small"
                     
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <Box sx={{ mr: "5px" }}>
                <ModalFooter form="addAcc" request={request} />
              </Box>
            </Box>
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
};

export default AddBlockedAccount;
