import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SideBarContext from "../store/SideBarContext";
import { whiteColor } from "../theme/setThemeColor";
import { Box } from "@mui/material";
import { keyframes } from "@mui/system";
import AuthContext from "../store/AuthContext";

const NavItemComponent = ({
  item,
  open,
  index,
  setOpen,
  handleDrawerToggle,
  mobileOpen,
  handleLogout, // Add a logout handler passed as a prop
}) => {
  const sidebarCtx = useContext(SideBarContext);
  const authCtx = useContext(AuthContext)
  const setActiveIndex = sidebarCtx.setActiveIndex;
  const authCtx = useContext(AuthContext);
  const location = useLocation();
  const currentPath = location.pathname;
  let isCurrentActive = currentPath === item?.to;

  if (
    currentPath.includes("/admin/accountStatement") &&
    item?.to === "/admin/accounts"
  ) {
    isCurrentActive = true;
  } else if (
    currentPath.includes("/admin/bankStatement") &&
    item?.to === "/admin/banks"
  ) {
    isCurrentActive = true;
  }

  const pulse = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  `;

  const handleItemClick = () => {
    if (item.title === "Logout") {
      authCtx.logout();
      // handleLogout(); 
    } else {
      setActiveIndex({
        index: index,
        subIndex: -1,
      });
      if (mobileOpen) {
        handleDrawerToggle();
      } else setOpen(false);
    }
  };

  return (
    <div>
      <ListItem
        key={item.title}
        disablePadding
        sx={{
          display: "block",
          mt: 2,
        }}
        onClick={handleItemClick} // Use the custom handler here
      >
        <NavLink
          to={item.to}
          key={item.to}
          target={item.title === "IRCTC" && "_blank"}
          style={({ isActive }) => {
            return {
              display: "block",
              margin: "0.2rem 0",
              textDecoration: "none",
              padding: open ? "0px 8px 0px 8px" : "0px 8px 0px 8px",
            };
          }}
        >
          <ListItemButton
            className="icon-hover"
            sx={{
              justifyContent: open ? "initial" : "center",
              backgroundColor: isCurrentActive ? "#D48628" : "",
              backdropFilter: isCurrentActive ? "blur(5px)" : "",
              border: isCurrentActive
                ? "1px solid rgba(159, 134, 192, 0.3)"
                : "",
              "&:hover": {
                backgroundColor: isCurrentActive ? "#212b5a" : "",
                color: "white",
              },
              "& img": {
                transform: "scale(1.07)",
                animation: "pulse 1s infinite",
              },
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              fontSize: "18px",
            }}
          >
            <Box
              sx={{
                mr: open ? 2 : "auto",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <img
                width="22px"
                src={item.icon}
                alt=""
                style={{
                  filter: isCurrentActive
                    ? "invert(100%) brightness(1000%)"
                    : "",
                }}
              />
            </Box>

            <ListItemText
              className="menu-title"
              primary={item.title}
              disableTypography
              sx={{
                opacity: open ? 1 : 0,
                color: isCurrentActive ? "white" : "white",
                fontSize: "16px",
                fontFamily: "Montserrat, sans-serif",
                "&:hover": {
                  color: isCurrentActive ? "white" : "white",
                },
              }}
            />
          </ListItemButton>
        </NavLink>
      </ListItem>
    </div>
  );
};

export default NavItemComponent;
