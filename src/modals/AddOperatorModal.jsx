import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  Grid,
  TextField,
  Tooltip,
  IconButton,
  Button,
  Drawer,
} from "@mui/material";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import ApiEndpoints from "../network/ApiEndPoints";
import { apiErrorToast, okSuccessToast } from "../utils/ToastUtil";
import { postJsonData } from "../network/ApiController";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";

import { whiteColor } from "../theme/setThemeColor";

const AddOperatorModal = ({ refresh }) => {
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    fontFamily: "Poppins",
    p: 2,
    height: "max-content",
    overflowY: "scroll",
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
      code: form.code.value,
      category: form.category.value,
      route: form.route.value,
      param1: form.param1.value,
      is_fetch: form.is_fetch.value,
      admin_comm: form.admin_comm.value,
      ret_comm: form.ret_comm.value,
      ad_comm: form.ad_comm.value,
      dd_comm: form.dd_comm.value,
      img: form.img.value,
    };
    setRequest(true);
    postJsonData(
      ApiEndpoints.ADD_OPERATOR,
      data,
      setRequest,
      (res) => {
        okSuccessToast("Operator added successfully");
        handleClose();
        if (refresh) refresh();
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
    <Tooltip title="Add operator">
        <Button
          variant="outlined"
          // className="button-transparent"
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
       Operator
        </Button>
      </Tooltip>

    <Box>
      <Drawer
        open={open}
        onClose={handleClose}
        anchor="right"

      >
        <Box sx={{width:400}} className="sm_modal">
          <ModalHeader title="Add Operator" handleClose={handleClose} />
          <Box
            component="form"
            id="addOperator"
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
                  <TextField label="Name" id="name" size="small" required />
                </FormControl>
              </Grid>
              <Grid item md={12} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField label="Code" id="code" size="small" required />
                </FormControl>
              </Grid>
              <Grid item md={12} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField label="Route" id="route" size="small" required />
                </FormControl>
              </Grid>
              <Grid item md={12} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    label="Category"
                    id="category"
                    size="small"
                    required
                  />
                </FormControl>
              </Grid>

              <Grid item md={12} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    label="Param1"
                    id="param1"
                    size="small"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item md={12} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    label="Is fetch"
                    id="is_fetch"
                    size="small"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item md={12} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    label="Admin Commission"
                    id="admin_comm"
                    size="small"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item md={12} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    label="Retailer Commission"
                    id="ret_comm"
                    size="small"
                    required
                  />
                </FormControl>
              </Grid>

              <Grid item md={12} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    label="Area Distributer Commission"
                    id="ad_comm"
                    size="small"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item md={12} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    label="Direct Dealer Commission"
                    id="dd_comm"
                    size="small"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item md={12} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField label="Image" id="img" size="small" required />
                </FormControl>
              </Grid>
            </Grid>
            <ModalFooter form="addOperator" request={request} />
          </Box>
        </Box>
      </Drawer>
    </Box>
  </Box>
    
  );
};
export default AddOperatorModal;
