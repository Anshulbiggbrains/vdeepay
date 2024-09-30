import React, { useState } from "react";
import {
  Box,
  Modal,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Switch,
  styled,
  Tooltip,
} from "@mui/material";
import ModalHeader from "./ModalHeader";
import ApiEndpoints from "../network/ApiEndPoints";
import Loader from "../component/loading-screen/Loader";
import { postJsonData } from "../network/ApiController";
import { apiErrorToast } from "../utils/ToastUtil";
import SettingsIcon from "@mui/icons-material/Settings";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  boxShadow: 24,
  fontFamily: "Poppins",
  height: "max-content",
  overflowY: "scroll",
  p: 2,
};

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 40,
  height: 22,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "& + .MuiSwitch-track": {
      backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#989898",
      opacity: 1,
      border: 0,
    },
    "&.Mui-checked": {
      transform: "translateX(17px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor:
          theme.palette.mode === "dark" ? "#2ECA45" : "#49af4150",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 18,
    height: 18,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const UserServiceSetting = ({ row, refresh }) => {
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState(false);
  // const [switchVal, setSwitchVal] = useState();
  // const [paramVal, setParamVal] = useState("");
  // const [servicesData, setservicesData] = useState();
  const [allServices, setAllServices] = useState([]);

  // console.log("servicesData", servicesData);

  const handleOpen = () => {
    getServices();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getServices = () => {
    postJsonData(
      ApiEndpoints.USER_SERVICES,
      { id: row.id },
      setRequest,
      (res) => {
        const servicesData = res?.data?.data;
        setOpen(true);
        // setservicesData();

        let services = [
          {
            name: "Domestic Money  Transfer 1",
            value: servicesData.dmt1,
            param: "dmt1",
          },
          {
            name: "Domestic Money  Transfer 2",
            value: servicesData.dmt2,
            param: "dmt2",
          },
          { name: "Account Ledger", value: servicesData.acst, param: "acst" },
          {
            name: "Express Money Transfer",
            value: servicesData.dmt4,
            param: "dmt4",
          },
          { name: "AEPS", value: servicesData.aeps, param: "aeps" },
          { name: "Super Transfer", value: servicesData.st, param: "st" },
          { name: "BBPS", value: servicesData.bbps, param: "bbps" },
          {
            name: "Nepal Transfer",
            value: servicesData.nepal_transfer,
            param: "nepal_transfer",
          },
          { name: "UPI QR code", value: servicesData.upi_qr, param: "upi_qr" },
          {
            name: "UPI Transfer",
            value: servicesData.upi_transfer,
            param: "upi_transfer",
          },
          {
            name: "Recharge",
            value: servicesData.recharge,
            param: "recharge",
          },
          {
            name: "Wallet Transfer",
            value: servicesData.wallet_transfer,
            param: "wallet_transfer",
          },
          {
            name: "Payment Gateway",
            value: servicesData.pg,
            param: "pg",
          },
          {
            name: "Flight",
            value: servicesData.ft,
            param: "ft",
          },
        ];
        setAllServices(services);
      },
      (err) => {
        apiErrorToast(err);
      }
    );
  };

  // console.log("allservices", allServices);
  const changeSwitch = (paramVal, sVal) => {
    const data = { [paramVal]: sVal ? 1 : 0, id: row.id };

    postJsonData(
      ApiEndpoints.ADMIN_SERVICES,
      data,
      setRequest,
      (res) => {
        const servicesData = res?.data?.data;

        let services = [
          {
            name: "Domestic Money  Transfer 1",
            value: servicesData.dmt1,
            param: "dmt1",
          },
          {
            name: "Domestic Money  Transfer 2",
            value: servicesData.dmt2,
            param: "dmt2",
          },
          { name: "Account Ledger", value: servicesData.acst, param: "acst" },
          {
            name: "Express Money Transfer",
            value: servicesData.dmt4,
            param: "dmt4",
          },
          { name: "AEPS", value: servicesData.aeps, param: "aeps" },
          { name: "Super Transfer", value: servicesData.st, param: "st" },
          { name: "BBPS", value: servicesData.bbps, param: "bbps" },
          {
            name: "Nepal Transfer",
            value: servicesData.nepal_transfer,
            param: "nepal_transfer",
          },
          { name: "UPI QR code", value: servicesData.upi_qr, param: "upi_qr" },
          {
            name: "UPI Transfer",
            value: servicesData.upi_transfer,
            param: "upi_transfer",
          },
          {
            name: "Recharge",
            value: servicesData.recharge,
            param: "recharge",
          },
          {
            name: "Wallet Transfer",
            value: servicesData.wallet_transfer,
            param: "wallet_transfer",
          },
          {
            name: "Payment Gateway",
            value: servicesData.pg,
            param: "pg",
          },
          {
            name: "Flight",
            value: servicesData.ft,
            param: "ft",
          },
        ];
        setAllServices(services);
      },
      (err) => {
        apiErrorToast(err);
      }
    );
  };

  // const changeSwitchVal = (e) => {
  //   if (e.target.checked) {
  //     setSwitchVal(1);
  //   } else {
  //     setSwitchVal(0);
  //   }
  //   setParamVal(param);
  // };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "end",
      }}
    >
      <Tooltip title="Services">
        <IconButton onClick={handleOpen} size="small" sx={{ color: "#592727" }}>
          {request ? (
            <Loader loading={request} size={22} />
          ) : (
            <SettingsIcon size="small" />
          )}
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="sm_modal">
          <Loader loading={request} />
          <ModalHeader title="User service setting" handleClose={handleClose} />
          <Grid>
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              <Grid container>
                {allServices &&
                  allServices.length > 0 &&
                  allServices.map((item, index) => {
                    return (
                      <Grid md={6} lg={6} sm={12} xs={12} key={index}>
                        <ListItem sx={{ px: 5 }}>
                          <ListItemText primary={item.name} />
                          <ListItemAvatar>
                            <Grid>
                              <IOSSwitch
                                size="small"
                                sx={{
                                  "&.MuiSwitch-root .MuiSwitch-switchBase": {
                                    color: "#fff",
                                  },
                                  "&.MuiSwitch-root .Mui-checked": {
                                    color: "#49af41",
                                  },
                                }}
                                defaultChecked={item.value === 1 ? true : false}
                                onChange={(e) => {
                                  changeSwitch(item.param, e.target.checked);
                                }}
                              />
                            </Grid>
                            {/* <CommonSwitch
                              row={row}
                              value={switchVal}
                              valueSetfunc={setSwitchVal}
                              param={item.param}
                              setParamVal={setParamVal}
                              defaultval={item.value}
                              changeSwitch={changeSwitch}
                            /> */}
                          </ListItemAvatar>
                        </ListItem>
                      </Grid>
                    );
                  })}
              </Grid>
            </List>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
};
export default UserServiceSetting;
