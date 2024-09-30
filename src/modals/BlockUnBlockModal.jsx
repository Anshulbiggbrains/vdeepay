import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Avatar, FormControl, Grid, Tooltip, Typography } from "@mui/material";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";
import { info } from "../iconsImports";
import ApiEndpoints from "../network/ApiEndPoints";
import { postFormData } from "../network/ApiController";
import { apiErrorToast, okSuccessToast } from "../utils/ToastUtil";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import PinInput from "react-pin-input";
import { useState } from "react";

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

const BlockUnBlockModal = ({ row }) => {
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState(false);
  const [mpin, setMpin] = useState("");

  const blockUnblock = (event) => {
    event.preventDefault();
    postFormData(
      ApiEndpoints.BLOCK_UNBLOCK,
      { id: row.id, mpin: mpin },
      setRequest,
      (res) => {
        handleClose();
        okSuccessToast("data saved");
      },
      (error) => {
        apiErrorToast("error=>", error);
      }
    );
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: "grid",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "100%" }} onClick={handleOpen}>
        {row.status === 1 ? (
          <Tooltip title="Unblocked">
            <LockOpenOutlinedIcon sx={{ color: "#00BF78" }} />
          </Tooltip>
        ) : (
          <Tooltip title="Block">
            <LockOutlinedIcon sx={{ color: "#DC5F5F" }} />
          </Tooltip>
        )}
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="sm_modal">
          <ModalHeader title="Block Unblock User" handleClose={handleClose} />
          <Box
            component="form"
            id="blockUnblockId"
            noValidate
            autoComplete="off"
            onSubmit={blockUnblock}
            className="text-center"
            sx={{
              "& .MuiTextField-root": { m: 2 },
              objectFit: "contain",
              display: "grid",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Avatar
                src={info}
                sx={{
                  width: 160,
                  height: 160,
                  objectFit: "cover",
                  objectPosition: "100% 0",
                }}
                alt="logo"
              />
            </Box>
            <Typography
              id="modal-modal-title"
              variant="h6"
              sx={{ textAlign: "center" }}
            >
              {row.status === 1 ? "Block User!!" : "Unblock User!!"}
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, textAlign: "center" }}
            >
              {row.status === 1
                ? "Do you want to block user " + row.username
                : "Do you want to Unblock user " + row.username}
            </Typography>
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
                  type="text"
                  onChange={(value, index) => {
                    setMpin(value);
                  }}
                  inputMode="text"
                  regexCriteria={/^[0-9]*$/}
                />
              </FormControl>
            </Grid>
          </Box>
          <ModalFooter form="blockUnblockId" request={request} btn="YES" />
        </Box>
      </Modal>
    </Box>
  );
};
export default BlockUnBlockModal;
