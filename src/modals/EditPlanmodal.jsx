import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  Grid,
  TextField,
  Tooltip,
  IconButton,
  MenuItem,
} from "@mui/material";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import ApiEndpoints from "../network/ApiEndPoints";
import { apiErrorToast, okSuccessToast } from "../utils/ToastUtil";
import { get, postJsonData } from "../network/ApiController";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "../component/loading-screen/Loader";
import { Icon } from "@iconify/react";

const EditPlanModal = ({ refresh, row }) => {
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState(false);
  const [operator, setOperator] = useState("");
  const [operatorVal, setOperatorVal] = useState([]);
  const getOperatorVal = () => {
    get(
      ApiEndpoints.GET_OPERATOR,
      "",
      setRequest,
      (res) => {
        setOpen(true);
        const opArray = res.data.data;
        setOperatorVal(
          opArray &&
            opArray.map((item) => {
              return {
                code: item.code,
                name: item.name,
              };
            })
        );
      },
      (error) => {
        apiErrorToast(error);
      }
    );
  };
  // useEffect(() => {
  //   getOperatorVal();
  // }, []);

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
    getOperatorVal();
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = {
      operator: operator,
      plan: form.plan.value,
      validity: form.validity.value,
      description: form.description.value,
    };
    setRequest(true);
    postJsonData(
      ApiEndpoints.EDIT_PLAN,
      data,
      setRequest,
      (res) => {
        okSuccessToast("Plan updated successfully");
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
      <Tooltip title="Edit Account">
        <IconButton onClick={handleOpen}>
          <Icon
            icon="basil:edit-solid"
            style={{ fontSize: "22px" }}
            className="refresh-icon-risk"
          />
        </IconButton>
      </Tooltip>

      <Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="sm_modal">
            <Loader loading={request} />
            <ModalHeader title="Edit Plan" handleClose={handleClose} />
            <Box
              component="form"
              id="addPlan"
              validate="true"
              autoComplete="off"
              onSubmit={handleSubmit}
              sx={{
                "& .MuiTextField-root": { m: 1 },
              }}
            >
              <Grid container sx={{ pt: 1 }}>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth>
                    <TextField autoComplete="off"
                      select
                      size="small"
                      defaultValue={row.operator}
                      onChange={(e) => {
                        setOperator(e.target.value);
                      }}
                    >
                      <MenuItem dense value="operator">
                        Operator
                      </MenuItem>
                      {operatorVal &&
                        operatorVal.map((item) => {
                          return (
                            <MenuItem dense value={item.code}>
                              {item.name}
                            </MenuItem>
                          );
                        })}
                    </TextField>
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl sx={{ width: "100%" }}>
                    <TextField autoComplete="off"
                      label="Plan"
                      id="plan"
                      size="small"
                      required
                      defaultValue={row.plan}
                    />
                  </FormControl>
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormControl sx={{ width: "100%" }}>
                    <TextField autoComplete="off"
                      label="Validity"
                      id="validity"
                      size="small"
                      required
                      defaultValue={row.validity}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl sx={{ width: "100%" }}>
                    <TextField autoComplete="off"
                      label="Description"
                      id="description"
                      size="small"
                      required
                      defaultValue={row.description}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <ModalFooter form="addPlan" request={request} />
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};
export default EditPlanModal;
