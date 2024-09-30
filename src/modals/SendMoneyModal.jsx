import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  Grid,
  TextField,
  IconButton,
  Tooltip,
} from "@mui/material";
import ApiEndpoints from "../network/ApiEndPoints";
import { get, postJsonData } from "../network/ApiController";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import { apiErrorToast, okSuccessToast } from "../utils/ToastUtil";
import { useState } from "react";
import PinInput from "react-pin-input";
import CallMadeIcon from "@mui/icons-material/CallMade";
import ResetMpin from "./ResetMpin";
import Loader from "../component/loading-screen/Loader";
import useCommonContext from "../store/CommonContext";
import { PATTERNS } from "../utils/ValidationUtil";
import { validateApiCall } from "../utils/LastApiCallChecker";

const SendMoneyModal = ({ refresh }) => {
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState(false);
  const [mpin, setMpin] = useState("");
  const [err, setErr] = useState();
  const [isMobv, setIsMobv] = useState(true);
  const { getRecentData } = useCommonContext();
  const [usernameAdded, setUsernameAdded] = useState(false);
  const [getUser, setGetUser] = useState("");
  const fetchUser = (mobile) => {
    get(
      ApiEndpoints.GET_USER_BY_USERNAME,
      `username=${mobile}`,
      setRequest,
      (res) => {
        if (res && res.data && res.data) {
          setGetUser(res.data.data);
          setUsernameAdded(true);
        } else setGetUser();
      },
      (error) => {
        apiErrorToast(error);
      }
    );
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: "40%",
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
    setUsernameAdded(false);
    setErr("");
    setMpin("");
    setGetUser("");
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let amt = document.getElementById("amount").value;
    const data = {
      to_id: getUser && getUser.id,
      pf: "WEB",
      req_type: "OTHER",
      amount: amt,
      mpin: mpin,
    };
    if (mpin !== "" && validateApiCall()) {
      postJsonData(
        ApiEndpoints.MONEY_TRANSFER,
        data,
        setRequest,
        (res) => {
          getRecentData();
          okSuccessToast("Amount Transfer Successfull");
          handleClose();
          setMpin("");
          setErr("");
          if (refresh) refresh();
        },
        (error) => {
          setMpin("");
          setErr("");
          if (error && error) {
            if (error.response.data.message === "Invalid M Pin") {
              setErr(error.response.data);
            } else {
              apiErrorToast(error);
            }
          }
        }
      );
    } else if (amt === "") {
      setErr("");
      const error = {
        message: "The amount field is required.",
      };
      setErr(error);
    } else if (mpin === "") {
      setErr("");
      setMpin("");
      const error = {
        message: "MPIN required",
      };
      setErr(error);
    } else {
      setErr("");
      setMpin("");
      const error = {
        message: "Kindly wait some time before another request",
      };
      setErr(error);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        // justifyContent: "end",
      
      }}
    >
      <IconButton onClick={handleOpen} sx={{ display: "contents" }}>
        <Tooltip title="Send Money" placement="left">
          <CallMadeIcon className="hover-white hover-zoom" size="1.2rem" />
        </Tooltip>
      </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="sm_modal">
          <Loader loading={request} />
          <ModalHeader title="Send Money" handleClose={handleClose} />
          <Box
            component="form"
            id="money_transfer"
            validate
            autoComplete="off"
            onSubmit={handleSubmit}
            sx={{
              "& .MuiTextField-root": { m: 2 },
            }}
          >
            <Grid container sx={{ pt: 1 }}>
              <Grid item md={12} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField autoComplete="off"
                    label="Mobile"
                    id="mobile"
                    size="small"
                    type="tel"
                    inputProps={{
                      form: {
                        autocomplete: "off",
                      },
                      maxLength: 10,
                    }}
                    onKeyDown={(e) => {
                      if ((e.which >= 65 && e.which <= 90) || e.key === "+") {
                        e.preventDefault();
                      }
                      if (e.target.value.length === 10) {
                        if (e.key.toLowerCase() !== "backspace") {
                          e.preventDefault();
                        }

                        if (e.key.toLowerCase() === "backspace") {
                        }
                      }
                    }}
                    error={!isMobv}
                    helperText={!isMobv ? "Enter valid Mobile" : ""}
                    onChange={(e) => {
                      setIsMobv(PATTERNS.MOBILE.test(e.target.value));
                      if (e.target.value === "") setIsMobv(true);
                      if (PATTERNS.MOBILE.test(e.target.value)) {
                        if (e.target.value.length === 10) {
                          fetchUser(e.target.value);
                        } else {
                          setUsernameAdded(false);
                          setGetUser("");
                        }
                      }
                    }}
                    required
                  />
                </FormControl>
              </Grid>
              {usernameAdded && usernameAdded ? (
                <Grid item md={12} xs={12}>
                  <Box
                    id="userData"
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <FormControl sx={{ width: "100%" }}>
                      <TextField autoComplete="off"
                        label="Name"
                        id="name"
                        size="small"
                        defaultValue={getUser && getUser.name}
                        disabled
                        required
                      />
                    </FormControl>
                    <FormControl sx={{ width: "100%" }}>
                      <TextField autoComplete="off"
                        label="Establishment"
                        id="name"
                        size="small"
                        defaultValue={getUser && getUser.establishment}
                        disabled
                        required
                      />
                    </FormControl>
                  </Box>
                </Grid>
              ) : (
                ""
              )}

              <Grid item md={12} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField autoComplete="off"
                    label="Amount"
                    id="amount"
                    size="small"
                    type="number"
                    inputProps={{
                      form: {
                        autocomplete: "off",
                      },
                    }}
                    InputProps={{
                      inputProps: {
                        max: 500000,
                        min: 100,
                      },
                    }}
                    required
                    onKeyDown={(e) => {
                      if (e.key === "+" || e.key === "-") {
                        e.preventDefault();
                      }
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
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    M-PIN
                  </div>
                  <PinInput
                    length={6}
                    focus
                    type="password"
                    onChange={(value, index) => {
                      if (err !== "") {
                        setErr("");
                      }
                      setMpin(value);
                    }}
                    inputMode="text"
                    regexCriteria={/^[0-9]*$/}
                  />
                  <Grid
                    item
                    md={12}
                    xs={12}
                    sx={{ display: "flex", justifyContent: "end", mt: 1 }}
                  >
                    <ResetMpin variant="text" />
                  </Grid>
                </FormControl>
              </Grid>

              {err && err && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                    fontSize: "12px",
                    px: 2,
                    color: "#DC5F5F",
                  }}
                >
                  {err.message && err.message && (
                    <div>{err && err.message}</div>
                  )}

                  {err.data && err.data && (
                    <div className="blink_text">
                      Attempts remaining:{err && 5 - Number(err.data)}
                    </div>
                  )}
                </Box>
              )}
            </Grid>
          </Box>
          <ModalFooter
            form="money_transfer"
            request={request}
            btn="Send"
            disable={err}
          />
        </Box>
      </Modal>
    </Box>
  );
};
export default SendMoneyModal;
