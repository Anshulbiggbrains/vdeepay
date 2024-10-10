import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  Grid,
  TextField,
  IconButton,
  Tooltip,
  Button,
  Drawer,
} from "@mui/material";
import ApiEndpoints from "../network/ApiEndPoints";
import { postJsonData } from "../network/ApiController";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import { apiErrorToast, okSuccessToast } from "../utils/ToastUtil";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CloseIcon from "@mui/icons-material/Close";
import numWords from "num-words";
import { useState } from "react";
import PinInput from "react-pin-input";
import ResetMpin from "./ResetMpin";
import { secondaryColor } from "../theme/setThemeColor";
import { Icon } from "@iconify/react";

const CreditRequestModal = ({ row, action = "status", refresh }) => {
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState(false);
  const [mpin, setMpin] = useState("");
  const [remarkVal, setRemarkVal] = useState("");
  const [numberToWord, setNumberToWord] = useState(numWords(row.amount));
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
    setNumberToWord(numWords(row.amount));
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // console.log(remarkVal);

  const handleAmountChange = (event) => {
    console.log("handleAmountChange called", event.target.value);
    setNumberToWord(numWords(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = {
      id: row.id,
      amount: form.amt.value,
      // remark: form.remarks.value,
      remark: remarkVal && remarkVal,
      action: action,
      mpin: mpin,
    };

    setRequest(true);

    // if (validateApiCall()) {
    postJsonData(
      ApiEndpoints.CRED_REQ_APPROVE,
      data,
      setRequest,
      (res) => {
        if (data.action === "REJECT") {
          okSuccessToast("Request cancelled successfully");
          handleClose();
          if (refresh) refresh();
        } else {
          okSuccessToast("Request Processed successfully");
          handleClose();
          if (refresh) refresh();
        }
      },
      (error) => {
        apiErrorToast(error);
      }
    );
    // } else {
    //   setErr("");
    //   const error = {
    //     message: "Kindly wait some time before another request",
    //   };
    //   setErr(error);
    // }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 0.4,
      }}
    >
      {action && action === "APPROVE" && (
        <Tooltip title="Approve">
          <IconButton
            onClick={handleOpen}
            sx={{
              color: "#32b83b",
              "&:hover": {
                color: "#00A300",

                transform: "scale(1)",
              },
            }}
          >
            <Icon icon="charm:square-tick" width={25} height={25} />
          </IconButton>
        </Tooltip>
      )}
      {action && action === "REOPEN" && (
        <Tooltip title="Reopen">
          <Button
            className="button-red"
            sx={{ fontSize: "10px", background: secondaryColor() }}
            variant="contained"
            onClick={handleOpen}
          >
            Reopen
          </Button>
        </Tooltip>
      )}
      {action && action === "REJECT" && (
        <Tooltip title="Reject">
          <IconButton
            onClick={handleOpen}
            sx={{
              color: "#e01a1a",
              "&:hover": {
                color: "#F10000",
                transform: "scale(1)",
              },
            }}
          >
            <Icon icon="charm:square-cross" width={25} height={25} />
          </IconButton>
        </Tooltip>
      )}
      <Box>
        <Drawer open={open} anchor="right" onClose={handleClose}>
          <Box sx={{ width: 400 }} className="sm_modal">
            <ModalHeader
              subtitle="Take Action: Quick and Simple Fund Request!"
              title={`${action} (${row.name})`}
              handleClose={handleClose}
            />
            {action && action !== "APPROVE" ? (
              <Box
                component="form"
                id="cred_req"
                validate
                autoComplete="off"
                onSubmit={handleSubmit}
                sx={{
                  "& .MuiTextField-root": { m: 2 },
                  objectFit: "contain",
                  overflowY: "scroll",
                }}
              >
                <Grid container sx={{ pt: 1 }}>
                  <Grid item md={12} xs={12}>
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        autoComplete="off"
                        label="Amount"
                        // defaultValue={row.amount}
                        inputProps={{ readOnly: true }}
                        value={row.amount}
                        id="amt"
                        onChange={handleAmountChange}
                        size="small"
                        required
                      />
                    </FormControl>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        autoComplete="off"
                        label="Amount in Words"
                        id="inWords"
                        // defaultValue={numWords(row.amount)}
                        // defaultValue={numberToWord}
                        value={numberToWord}
                        inputProps={{ readOnly: true }}
                        size="small"
                        required
                      />
                    </FormControl>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        autoComplete="off"
                        label="Remarks"
                        id="remarks"
                        size="small"
                        required
                        onChange={(e) => {
                          setRemarkVal(e.target.value);
                        }}
                        className="new-password"
                        inputProps={{
                          autoFocus: "off",
                          form: {
                            autoComplete: "off",
                          },
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    md={12}
                    xs={12}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <FormControl>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        M-PIN
                      </div>
                      <PinInput
                        length={6}
                        focus
                        type="password"
                        onChange={(value, index) => {
                          setMpin(value);
                        }}
                        inputMode="text"
                        autoSelect={false}
                        regexCriteria={/^[0-9]*$/}
                      />
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    md={12}
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "end",
                      pr: 12,
                      mt: 2,
                    }}
                  >
                    <Box sx={{ mr: 4 }}>
                      <ResetMpin variant="text" />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            ) : (
              <Box
                component="form"
                id="cred_req"
                autoComplete="off"
                validate
                onSubmit={handleSubmit}
                sx={{
                  "& .MuiTextField-root": { m: 2 },
                  objectFit: "contain",
                  overflowY: "scroll",
                }}
              >
                <Grid container sx={{ pt: 1 }}>
                  <Grid item md={12} xs={12}>
                    {/* <FormControl sx={{ width: "100%" }}>
                      <TextField autoComplete="off"
                        label="Amount"
                        defaultValue={row.amount} // amountField
                        id="amt"
                        size="small"
                        required
                      />
                    </FormControl> */}
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        autoComplete="off"
                        label="Amount"
                        defaultValue={row.amount}
                        id="amt"
                        inputProps={{ maxLength: 9, type: "number" }}
                        onChange={handleAmountChange}
                        size="small"
                        required
                      />
                    </FormControl>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    {/* <FormControl sx={{ width: "100%" }}>
                      <TextField autoComplete="off"
                        label="Amount in Words"
                        id="inWords"
                        defaultValue={numWords(row.amount)} // Word Field
                        size="small"
                        required
                      />
                    </FormControl> */}
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        autoComplete="off"
                        label="Amount in Words"
                        id="inWords"
                        // defaultValue={numWords(row.amount)}
                        // defaultValue={numberToWord}
                        value={numberToWord}
                        size="small"
                        required
                      />
                    </FormControl>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        autoComplete="off"
                        label="Remarks"
                        id="remarks"
                        size="small"
                        onChange={(e) => {
                          setRemarkVal(e.target.value);
                        }}
                        required
                        inputProps={{
                          autoFocus: "off",
                          form: {
                            autoComplete: "off",
                          },
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    md={12}
                    xs={12}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <FormControl>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        M-PIN
                      </div>
                      <PinInput
                        length={6}
                        type="password"
                        onChange={(value, index) => {
                          setMpin(value);
                        }}
                        inputMode="text"
                        regexCriteria={/^[0-9]*$/}
                      />
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    md={12}
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "end",
                      pr: 12,
                      mt: 2,
                    }}
                  >
                    <Box sx={{ mr: 4 }}>
                      <ResetMpin variant="text" />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}

            <ModalFooter form="cred_req" type="submit" request={request} />
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
};
export default CreditRequestModal;
