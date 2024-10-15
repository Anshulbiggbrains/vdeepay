import React from "react";
import { Container } from "@mui/system";
import { Box, Grid } from "@mui/material";
import { getEnv } from "../theme/setThemeColor";

const LandingPageBuildSecurity = () => {
  return (
    <Grid xs={12} className="builSecurity_bg">
      <Container maxWidth="lg">
        <div className="landing-bg_main_font" style={{ textAlign: "center" }}>
          Built With Security In Mind
        </div>
        <div className="landingPageSubHeading" style={{ textAlign: "center" }}>
          We provide services that are safe, secure, and compliant.
        </div>

        <Grid container xs={12} sx={{ mt: 5 }}>
          <Grid md={12}>
            <Box
              component="div"
              sx={{
                fontSize: { lg: "7rem", md: "7 rem", sm: "3rem", xs: "3rem" },
                fontWeight: "700",
                display: "flex",
                justifyContent: "left",
                mt: { lg: 0, md: 0, sm: 10, xs: 10 },
                mb: { lg: 0, md: 0, sm: 3, xs: 3 },
              }}
            >
              <span style={{ color: "#d35400" }}>01</span>
              <div
                style={{
                  display: "inline",
                }}
              >
                <span className="landing-bg_main_font">Safe</span>
              </div>
            </Box>
            <Box
              sx={{
                textAlign: "justify",
                display: "flex",
                marginLeft: {
                  lg: "8rem",
                  md: "8rem",
                  sm: "0rem",
                  xs: "0rem",
                },
                width: {
                  lg: "40%",
                  md: "40%",
                  sm: "100%",
                  xs: "100%",
                },
                marginTop: "-40px",
              }}
            >
              <span className="landing-bg_para">
                We ensure you get a good night’s sleep with your money staying
                with large and highly stable banks in India.
              </span>
            </Box>
          </Grid>
          <Grid md={12}>
            <Box
              component="div"
              sx={{
                fontSize: { lg: "7rem", md: "7 rem", sm: "3rem", xs: "3rem" },
                fontWeight: "700",
                display: "flex",
                flexDirection: "column",
                mt: { lg: 0, md: 0, sm: 10, xs: 10 },
                mb: { lg: 0, md: 0, sm: 3, xs: 3 },
                alignItems: "flex-end",
              }}
            >
              <div
                style={{
                  display: "inline",
                }}
              >
                <span className="landing-bg_main_font">Secure </span>
                <span style={{ color: "#d35400" }}> 02</span>
              </div>
              <Box
                component="div"
                sx={{
                  textAlign: " !important",
                  display: "flex",

                  marginRight: {
                    lg: "8rem",
                    md: "8rem",
                    sm: "0rem",
                    xs: "0rem",
                  },
                  width: {
                    lg: "40%",
                    md: "40%",
                    sm: "100%",
                    xs: "100%",
                  },
                  marginTop: {
                    lg: "-40px",
                    md: "-40px",
                    sm: "-25px",
                    xs: "-25px",
                  },
                }}
              >
                <span
                  className="landing-bg_para"
                  style={{ textAlign: "right", marginRight: "15px" }}
                >
                  Enjoy secure access to your account with 2-factor
                  authentication and TLS/SSL encryption of your data.
                </span>
              </Box>
              {/* <div className="landing-bg_para">
                We ensure you get a good night’s sleep with your money staying
                with large and highly stable banks in India.
              </div> */}
            </Box>
          </Grid>
          <Grid md={12}>
            <Box
              component="div"
              sx={{
                fontSize: { lg: "7rem", md: "7 rem", sm: "3rem", xs: "3rem" },
                fontWeight: "700",
                display: "flex",
                mt: { lg: 0, md: 0, sm: 10, xs: 10 },
                mb: { lg: 0, md: 0, sm: 3, xs: 3 },
                justifyContent: "left",
              }}
            >
              <span style={{ color: "#d35400", marginRight: "10px" }}>03</span>
              <div
                style={{
                  display: "inline",
                  color: "#851414 !important",
                }}
              >
                <span className="landing-bg_main_font">Compliant</span>
              </div>
            </Box>
            <Box
              sx={{
                textAlign: "left",
                display: "flex",
                marginLeft: {
                  lg: "8rem",
                  md: "8rem",
                  sm: "0rem",
                  xs: "0rem",
                },
                width: {
                  lg: "40%",
                  md: "40%",
                  sm: "100%",
                  xs: "100%",
                },
                marginTop: "-33px",
              }}
            >
              <span className="landing-bg_para" style={{ marginLeft: "15px" }}>
                {getEnv()} complies with the same set of strict security
                standards as traditional banks in India follow.
              </span>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};

export default LandingPageBuildSecurity;
