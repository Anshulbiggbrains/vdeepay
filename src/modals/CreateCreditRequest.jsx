import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import {
  FormControl,
  Grid,
  TextField,
  Tooltip,
  IconButton,
  MenuItem,
  Button,
} from "@mui/material";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import ApiEndpoints from "../network/ApiEndPoints";
import { apiErrorToast, okSuccessToast } from "../utils/ToastUtil";
import { get, postJsonData } from "../network/ApiController";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
import { yyyymmdd } from "../utils/DateUtils";
import { creditReqGuidelinesImg } from "../iconsImports";
import { whiteColor } from "../theme/setThemeColor";

const CreateCreditRequest = ({ refresh }) => {
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState(false);
  const [dateValue, setDateValue] = useState("");
  const [bank, setBank] = useState("");
  const [mode, setMode] = useState("");
  const [bankList, setBankList] = useState([]);
  const [modeList, setModeList] = useState([]);

  const getCredDataList = () => {
    get(
      ApiEndpoints.GET_BANK_CREDIT_REQ,
      "",
      setRequest,
      (res) => {
        if (res && res.data) {
          setBankList(res.data.data.banks);
          setModeList(res.data.data.modes);
          setOpen(true);
        } else {
          apiErrorToast("Error fetching bank/mode data.");
        }
      },
      (error) => {
        apiErrorToast("error=> ", error);
      }
    );
  };

  const handleOpen = () => {
    getCredDataList();
  };

  const handleClose = () => {
    setDateValue("");
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = {
      bank_name: bank,
      mode: mode,
      bank_ref_id: form.ref_id.value,
      date: dateValue, // Since this is already in YYYY-MM-DD format
      amount: form.amt.value,
    };
    setRequest(true);
    postJsonData(
      ApiEndpoints.CREDIT_REQ,
      data,
      setRequest,
      (res) => {
        okSuccessToast("Request Created successfully");
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
      <Tooltip title="Credit Request">
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
          Add Request
        </Button>
      </Tooltip>

      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
      >
        <Box
          sx={{
            width: 400,
            p: 2,
            height: "100%",
            boxShadow: 24,
            fontFamily: "Poppins",
            overflowY: "auto",
          }}
          role="presentation"
        >
          <ModalHeader title="Add Credit Request" handleClose={handleClose} />
          <Box
            component="form"
            id="createCreditReq"
            validate
            autoComplete="off"
            onSubmit={handleSubmit}
            sx={{
              "& .MuiTextField-root": { m: 1 },
            }}
          >
            <Grid container sx={{ pt: 1 }}>
              <Grid item md={12} xs={12}>
                <img
                  src={creditReqGuidelinesImg}
                  alt="disclaimer"
                  width="100%"
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    select
                    value={bank && bank}
                    onChange={(e) => {
                      setBank(e.target.value);
                    }}
                    id="bank"
                    label="Select Bank"
                    size="small"
                    required
                  >
                    <MenuItem dense value="select">
                      Select
                    </MenuItem>
                    {bankList &&
                      bankList.map((item, index) => (
                        <MenuItem
                          dense
                          key={index}
                          value={item.name}
                          sx={{ fontSize: "12px" }}
                        >
                          {item.name}
                        </MenuItem>
                      ))}
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item md={12} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    select
                    value={mode && mode}
                    onChange={(e) => {
                      setMode(e.target.value);
                    }}
                    id="mode"
                    label="Select Mode"
                    size="small"
                    required
                  >
                    <MenuItem dense value="select">
                      Select
                    </MenuItem>
                    {modeList &&
                      modeList.map((item, index) => (
                        <MenuItem
                          dense
                          key={index}
                          value={item}
                          sx={{ fontSize: "12px" }}
                        >
                          {item}
                        </MenuItem>
                      ))}
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item md={12} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    label="Reference Id"
                    id="ref_id"
                    size="small"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item md={12} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    label="Select Date"
                    id="date"
                    size="small"
                    type="date"
                    value={dateValue}
                    onChange={(e) => setDateValue(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item md={12} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    label="Amount"
                    id="amt"
                    size="small"
                    type="number"
                    InputProps={{
                      inputProps: {
                        max: 10000000,
                        min: 500,
                      },
                    }}
                    required
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <ModalFooter form="createCreditReq" request={request} btn="Save" />
        </Box>
      </Drawer>
    </Box>
  );
};

export default CreateCreditRequest;
