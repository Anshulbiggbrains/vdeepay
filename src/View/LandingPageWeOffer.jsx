import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import MobileFriendlyIcon from "@mui/icons-material/MobileFriendly";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useNavigate } from "react-router-dom";
import { primaryColor } from "../theme/setThemeColor";

const LandingPageWeOffer = () => {
  const navigate = useNavigate();
  const weOffer = [
    {
      icon: (
        <MobileFriendlyIcon
          onClick={() => {
            navigate("/our-services");
          }}
        />
      ),
      head: "BILL PAYMENT AND RECHARGE",
      para: "Get you prepaid mobile/tv/ott recharged instantly with earning opportunities on every transaction. Do best recharge with updated plans & offers. ",
    },
    {
      icon: <AccountBalanceIcon />,
      head: "BANKING      ",
      para: "We offer new account opening(axis bank), Indo-Nepal remittances, account deposit, withdrawal, balance enquiry, bulk transfer, payout solution. Mini atm within a single app.",
    },
    {
      icon: <VolunteerActivismIcon />,
      head: "INSURANCE",
      para: "Get the best quote for your insurance requirements for life , health & vehicle insurance. Merchants can earn competitive commision on each policy booking.",
    },
    {
      icon: <ReceiptIcon />,
      head: "UTILITY",
      para: "Instant update all your utility bill payments including electricity, water & gas bill, credit card bills, emi installments, wallet top-ups.",
    },
  ];
  return (
    <Box className="sectionBreake whoWeAre_bg">
      <Container maxWidth="lg" sx={{ mt: 7 }}>
        <Grid container xs={12}>
          <Grid md={5} sx={{ display: "flex", alignItems: "center" }}>
            <Box
              component="div"
              sx={{ margin: "0 auto", px: { lg: 4, md: 3, sm: 0, xs: 0 } }}
            >
              <div
                className="landingPageHeadings "
                style={{ display: "flex", justifyContent: "left" }}
              >
                What We Offer
              </div>
              <div
                className="landingPageSubHeading"
                style={{
                  display: "flex",
                  textAlign: "left",
                }}
              >
                A consumer-friendly solution for mobile recharge, money
                transfer, and bill paying
              </div>
              <div
                className="landingPagePara"
                style={{
                  display: "flex",
                  justifyContent: "left",
                  marginTop: "15px",
                  textAlign: "justify",
                }}
              >
                Open a savings account, buy stocks and mutual funds, pay your
                bills, recharge, reserve flights and movie tickets, and much
                more.With us anyone can be paid anywhere. Pay securely and
                without a card in-person or online with the Paytm Wallet or
                directly from your bank account. You can also send and receive
                money from anyone.
              </div>
            </Box>
          </Grid>
          <Grid md={7} sx={{ mt: 4 }}>
            <Grid container xs={12}>
              {weOffer &&
                weOffer.map((item) => {
                  return (
                    <>
                      <Grid item md={6} lg={6}>
                        <Card
                          sx={{
                            width: "90%",
                            height: "350px",
                            mx: 3,
                            my: 2,
                            py: 3,
                            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                            "&:hover": {
                              boxShadow:
                                "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                              borderRadius: "20px",
                            },
                          }}
                        >
                          <CardContent>
                            <Typography
                              sx={{
                                fontSize: 14,
                                backgroundColor: primaryColor(),
                                width: "70px",
                                height: "70px",
                                padding: "20px",
                                borderRadius: "50%",
                                margin: "0 auto",
                                mb: 2,
                              }}
                              gutterBottom
                            >
                              <span style={{ color: "#fff" }}>{item.icon}</span>
                            </Typography>

                            <Typography sx={{ mb: 1.5, fontWeight: "bold" }}>
                              {item.head}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "#555c6" }}
                            >
                              {item.para}
                            </Typography>
                          </CardContent>
                          <CardActions
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <Button
                              onClick={() => {
                                navigate("/our-services");
                              }}
                              size="small"
                              sx={{
                                fontWeight: "bold",
                                color: primaryColor(),
                              }}
                            >
                              Learn More
                            </Button>
                          </CardActions>
                        </Card>{" "}
                      </Grid>
                    </>
                  );
                })}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPageWeOffer;
