import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Avatar, Drawer, IconButton, Tooltip, Typography } from "@mui/material";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";
import { info } from "../iconsImports";
import ApiEndpoints from "../network/ApiEndPoints";
import { postFormData } from "../network/ApiController";
import { apiErrorToast, okSuccessToast } from "../utils/ToastUtil";
import { useState } from "react";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

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

const DeleteNotification = ({ row, refresh }) => {
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState(false);

  const blockUnblock = (event) => {
    event.preventDefault();
    postFormData(
      ApiEndpoints.DELETE_NOTIFICATION,
      { notification_id: row.notification_id },
      setRequest,
      (res) => {
        handleClose();
        okSuccessToast(res.data.message);
        if (refresh) {
          refresh();
        }
      },
      (error) => {
        apiErrorToast(error);
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
      <IconButton sx={{ width: "100%" }} onClick={handleOpen}>
        <Tooltip title="Delete">
          <DeleteForeverOutlinedIcon sx={{ color: "#DC5F5F" }} />
        </Tooltip>
      </IconButton>

      <Box>
        <Drawer
          open={open}
          onClose={handleClose}
        anchor="right"
        >
          <Box sx={{width:400}} className="sm_modal">
            <ModalHeader title="Delete Plan" handleClose={handleClose} subtitle="Clear Your Space: Delete Notifications Instantly" />
            <Box
              component="form"
              id="DeleteNotification"
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
              <Typography variant="h6" sx={{ textAlign: "center" }}>
                Are you sure?
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2, textAlign: "center" }}
              >
                you want to delete Notification {row.notification_id}
              </Typography>
            </Box>
            <ModalFooter
              form="DeleteNotification"
              request={request}
              btn="YES"
            />
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
};
export default DeleteNotification;
