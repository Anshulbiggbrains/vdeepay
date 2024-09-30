
// Internal Onboarding is postpond. In future if required use below code.

import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  Grid,
  Button,
  Tooltip,
  IconButton,
} from "@mui/material";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import ApiEndpoints from "../network/ApiEndPoints";
import { apiErrorToast, okSuccessToast } from "../utils/ToastUtil";
import { get, postJsonData } from "../network/ApiController";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
import { useForm } from "react-hook-form";
import RHFSelect from "../component/RHFSelect";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Yup validation schema
const schema = yup.object().shape({
  role: yup.string().required("Role is required"),
});

const AddUserModel = ({ refresh }) => {
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState(false);
  const [roles, setRoles] = useState([]);

  const {
    control,
    // handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getUserRoles = () => {
    get(
      ApiEndpoints.GET_USERROLES,
      "",
      setRequest,
      (res) => {
        setRoles(res?.data);
      },
      (error) => {
        apiErrorToast(error);
      }
    );
  };

  const handleOpen = () => {
    getUserRoles();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    // const data = {

    // }
    const data = {
      operator: operator,
      plan: form.plan.value,
      validity: form.validity.value,
      description: form.description.value,
    };
    setRequest(true);
    postJsonData(
      ApiEndpoints.ADD_USER,
      payload,
      setRequest,
      (res) => {
        okSuccessToast("User added successfully");
        handleClose();
        if (refresh) refresh();
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
    bgcolor: "background.paper",
    boxShadow: 24,
    fontFamily: "Poppins",
    p: 2,
    height: "max-content",
    overflowY: "scroll",
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "end",
      }}
    >
      <Tooltip title="Add User">
        <Button
          variant="outlined"
          className="refresh-icon-risk"
          onClick={handleOpen}
          startIcon={
            <IconButton
              sx={{
                p: 0,
              }}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          }
          sx={{ py: 0.3 }}
        >
          Add User
        </Button>
      </Tooltip>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Add User"
        aria-describedby="User Onboarding"
      >
        <Box sx={style} className="sm_modal">
          <ModalHeader title="Add User" handleClose={handleClose} />
          <Box
            component="form"
            id="Add User"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)} // Use handleSubmit from react-hook-form
            sx={{
              "& .MuiTextField-root": { m: 1 },
            }}
          >
            <Grid container sx={{ pt: 1 }}>
              <Grid item md={6} xs={12}>
                <FormControl fullWidth>
                  {/* RHFSelect component for selecting the role */}
                  <RHFSelect
                    label="Role"
                    name="role"
                    defaultValue=""
                    control={control}
                    errors={errors}
                  >
                    <option value="" />
                    {roles.map((item) => (
                      <option key={item.key} value={item.value}>
                        {item.key}
                      </option>
                    ))}
                  </RHFSelect>
                  {/* Display error if role is not selected */}
                  {errors.role && (
                    <p style={{ color: "red" }}>{errors.role.message}</p>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <ModalFooter form="Add User" request={request} />
        </Box>
      </Modal>
    </Box>
  );
};

export default AddUserModel;
