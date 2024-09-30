import { Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useState } from "react";
import Loader from "../component/loading-screen/Loader";
import { get, postJsonData } from "../network/ApiController";
import ApiEndpoints from "../network/ApiEndPoints";
import { primaryColor } from "../theme/setThemeColor";
import { apiErrorToast, okSuccessToast } from "../utils/ToastUtil";

const ChangeRouteMenu = ({ row, refresh }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [progress, setProgress] = useState(false);
  const [routeSelected, setRouteSelected] = useState("");
  const [routeVal, setRouteVal] = useState([]);

  const getRouteVal = () => {
    get(
      ApiEndpoints.GET_ROUTE,
      "",
      "",
      (res) => {
        const routeArray = res.data.data;
        const routeData = routeArray.map((item) => {
          return {
            code: item.code,
            name: item.name,
          };
        });
        setRouteVal(routeData);
      },
      (error) => {
        apiErrorToast(error);
      }
    );
  };
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    getRouteVal();
    setAnchorEl(event.currentTarget);
  };
  const handleSubmit = (route) => {
    postJsonData(
      ApiEndpoints.CHANGE_ROUTE_OPERATOR,
      {
        id: row.id,
        route: route,
      },
      setProgress,
      (res) => {
        okSuccessToast(res.data.message);
        if (refresh) {
          refresh();
        }
        handleClose();
      },
      (err) => {
        apiErrorToast(err);
      }
    );
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          width: "15px",
          height: "15px",
          fontSize: "13px",

          color: primaryColor(),
          "&:hover": {
            color: "#fff",
            backgroundColor: primaryColor(),
          },
          borderRadius: "5px",
          padding: "13px",
          mt: 0.5,
        }}
      >
        {row.route}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        // className="position-relative"
      >
        <Loader loading={progress} circleBlue />
        {routeVal &&
          routeVal.map((item, index) => {
            return (
              <MenuItem
                onClick={() => {
                  setRouteSelected(item.code);
                  handleSubmit(item.code);
                }}
                key={index}
              >
                {item.name}
              </MenuItem>
            );
          })}
      </Menu>
    </div>
  );
};

export default ChangeRouteMenu;
