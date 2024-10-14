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
import numWords from "num-words";
import { creditReqGuidelinesImg } from "../iconsImports";
import { whiteColor } from "../theme/setThemeColor";
import { urltoFile } from "../utils/cropImageUtils";

const CreateCreditRequest = ({ refresh }) => {
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState(false);
  const [dateValue, setDateValue] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [bank, setBank] = useState("");
  const [fileType, setFileType] = useState("");
  const [mode, setMode] = useState("");
  const [bankList, setBankList] = useState([]);
  const [modeList, setModeList] = useState([]);
  const [fileValue, setFileValue] = useState(null);
  const [numToWords, setNumToWords] = useState(null);

  const resetForm = () => {
    setBank("");
    setMode("");
    setDateValue("");
    setFileValue(null);
    setErrorMessage("");
    setNumToWords(null);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileValue(file);
  };

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

  const handleAmountChange = (val) => {
    const newVal = numWords(parseInt(val.target.value));
    setNumToWords(newVal);
  };

  React.useEffect(() => {
    resetForm();
    const today = new Date().toISOString().split("T")[0];
    setDateValue(today);
  }, [open]);

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
    const formData = new FormData();

    formData.append("bank_name", bank);
    formData.append("mode", mode);
    formData.append("bank_ref_id", form.ref_id.value);
    formData.append("date", dateValue);
    formData.append("amount", form.amt.value);

    // Append file only if it's uploaded
    if (fileValue) {
      formData.append("request_image", fileValue);
    }

    setRequest(true);
    postJsonData(
      ApiEndpoints.CREDIT_REQ,
      formData,
      setRequest,
      (res) => {
        okSuccessToast("Request Created successfully");
        handleClose();
        if (refresh) refresh();
      },
      (error) => {
        setErrorMessage(error.response.data.message);
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
          className="refresh-icon-risk "
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
        >
          Request
        </Button>
      </Tooltip>

      <Drawer anchor="right" open={open} onClose={handleClose}>
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
          <ModalHeader
            title="Add Credit Request"
            handleClose={handleClose}
            subtitle="Quickly Request Credit with VdeePay Now!"
          />
          <Box
            component="form"
            id="createCreditReq"
            validate="true"
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
                    onChange={handleAmountChange}
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
              <Grid item md={12} xs={12} sx={{ mx: 2 }}>
              <span style={{color:"green"}}>   {numToWords ? numToWords : ""}</span>
              </Grid>
              <Grid item md={12} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    label=""
                    id="file_upload"
                    size="small"
                    type="file"
                    variant="standard"
                    onChange={handleFileChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{
                      border: "none",
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item md={12} xs={12} sx={{ width: "100%", color: "red", mx: 2 }}>
                {errorMessage ? errorMessage : ""}
              </Grid>
            </Grid>
          </Box>
          <ModalFooter
            form="createCreditReq"
            request={request}
            cancelFunc={handleClose}
            btn="Proceed"
            // Disable "Proceed" button if no file is uploaded
            disabled={request || !fileValue}
          />
        </Box>
      </Drawer>
    </Box>
  );
};

export default CreateCreditRequest;
