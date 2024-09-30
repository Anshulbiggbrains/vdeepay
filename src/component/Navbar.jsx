import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../iconsImports";
import LogoComponent from "./LogoComponent";
import { getEnv } from "../theme/setThemeColor";
import useCommonContext from "../store/CommonContext";

//change color on scroll
const theme2 = {
  background: "rgba(255, 255, 255, 0)",
  boxShadow: "none !Important",
  backdropFilter: "blur(0px)",
  color: "#000",
};
const theme = {
  background: "#fff",
  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
  color: "#000",
};
function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    style: trigger ? theme : theme2,
    elevation: trigger ? 4 : 0,
  });
}
ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};
//menu items
const pagesLg = [
  { navItems: "ABOUT US", to: "/about-us", id: "about-us", sName: "aboutSec" },
  {
    navItems: "OUR SERVICES",
    to: "/our-services",
    id: "our-services",
    sName: "servicesSec",
  },
  {
    navItems: "OUR PARTNERS",
    to: "/our-partners",
    id: "our-partners",
    sName: "partnerSec",
  },
  {
    navItems: "CONTACT US",
    to: "/contact-us",
    id: "contact-us",
    sName: "contactSec",
  },
];
const pagesSm = [
  { navItems: "ABOUT US", to: "/about-us", sName: "aboutSec" },
  { navItems: "OUR SERVICES", to: "/our-services", sName: "servicesSec" },
  { navItems: "OUR PARTNERS", to: "/our-partners", sName: "partnerSec" },
  { navItems: "CONTACT US", to: "/contact-us", sName: "contactSec" },
  { navItems: "LOGIN/SIGN UP", to: "/login", sName: "" },
];

if (process.env.REACT_APP_TITLE === "MoneyOddr") {
  pagesLg.unshift({
    navItems: "HOME",
    to: "/",
    id: "landing-intro",
    sName: "homeSec",
  });
}

//scroll function for moneyoddr
const handleClickScroll = (id) => {
  console.log("id", id);
  if (id === "landing-intro") {
    let ele = document.getElementById("landing-intro");
    if (ele) window.scrollTo(0, ele.offsetTop - 80, { behavior: "smooth" });

    // .scrollIntoView({ behavior: "smooth" });
  }
  if (id === "about-us") {
    // document.getElementById("about-us").scrollIntoView({
    //   behavior: "smooth",
    //   block: "end",
    //   inline: "nearest",
    // });
    let ele = document.getElementById("about-us");
    console.log("ele in about", ele);
    if (ele) window.scrollTo(0, ele.offsetTop - 80, { behavior: "smooth" });
  }
  if (id === "contact-us") {
    let ele = document.getElementById("contact-us");
    if (ele) window.scrollTo(0, ele.offsetTop - 80, { behavior: "smooth" });

    // .scrollIntoView({ behavior: "smooth" });
  }
  if (id === "our-services") {
    let ele = document.getElementById("our-services");
    if (ele) window.scrollTo(0, ele.offsetTop - 80, { behavior: "smooth" });

    // .scrollIntoView({ behavior: "smooth" });
  }
  if (id === "our-partners") {
    let ele = document.getElementById("our-partners");
    if (ele) window.scrollTo(0, ele.offsetTop - 80, { behavior: "smooth" });

    // .scrollIntoView({ behavior: "smooth" });
  }
  if (id === "landing-intro") {
    let ele = document.getElementById("landing-intro");
    if (ele) window.scrollTo(0, ele.offsetTop - 80, { behavior: "smooth" });

    // .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  }
};

export default function Navbar(props) {
  const { section } = useCommonContext();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };
  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar>
          <Container maxWidth="xl">
            <Toolbar
              disableGutters
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                  transition: "transform .2s",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              >
                <LogoComponent />
                {/* <img src={Logo} width="150px" alt="logo" /> */}
              </Typography>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  justifyContent: "left",
                  textDecoration: "none",
                  transition: "transform .2s",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              >
                <img src={Logo} width="150px" alt="logo" />
              </Typography>
              <Box
                sx={{
                  display: { xs: "flex", md: "none" },
                  justifyContent: "right",
                }}
              >
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {/* {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))} */}
                  {pagesSm.map((item) => {
                    return (
                      <MenuItem className="navitems">
                        <Link
                          to={item.to}
                          onClick={() => {
                            handleCloseNavMenu();
                          }}
                          className="navLinks"
                        >
                          {item.navItems}
                        </Link>
                      </MenuItem>
                    );
                  })}
                </Menu>
              </Box>
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  justifyContent: "end",
                }}
              >
                {pagesLg.map((item) => {
                  return (
                    <MenuItem
                      className={`${item.sName === section ? "" : ""}`}
                      onClick={(id) => {
                        if (getEnv() === "MoneyOddr") {
                          handleClickScroll(item.id);
                        } else {
                          console.log("ihere");
                          navigate(item.to);
                        }
                      }}
                    >
                      {getEnv() === "MoneyOddr" ? (
                        <Box
                          className={`${
                            item.sName === section ? "test-hover" : "navitems"
                          } `}
                        >
                          {item.navItems}
                        </Box>
                      ) : (
                        <Link className="navLinks">{item.navItems}</Link>
                      )}
                    </MenuItem>
                  );
                })}
                <Button
                  className="button-red"
                  // className="the-gradient-button"
                  onClick={() => {
                    navigate("/login");
                  }}
                  variant="contained"
                  sx={{
                    fontSize: { lg: "15px", md: "10px", xs: "10px" },
                  }}
                >
                  Login / Signup
                </Button>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  );
}
