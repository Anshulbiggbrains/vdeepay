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
import { motion } from 'framer-motion';

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
      para: "Get your prepaid mobile/tv/ott recharged instantly with earning opportunities on every transaction. Do best recharge with updated plans & offers.",
    },
    {
      icon: <AccountBalanceIcon />,
      head: "BANKING",
      para: "We offer new account opening (axis bank), Indo-Nepal remittances, account deposit, withdrawal, balance enquiry, bulk transfer, payout solution. Mini ATM within a single app.",
    },
    {
      icon: <VolunteerActivismIcon />,
      head: "INSURANCE",
      para: "Get the best quote for your insurance requirements for life, health & vehicle insurance. Merchants can earn competitive commission on each policy booking.",
    },
    {
      icon: <ReceiptIcon />,
      head: "UTILITY",
      para: "Instant update all your utility bill payments including electricity, water & gas bills, credit card bills, EMI installments, wallet top-ups.",
    },
  ];

  return (
    <Box className="whoWeAre_bg">
      <Container maxWidth="lg" sx={{ mt: 7 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Typography   className="landingPageHeadings" variant="h2" sx={{ fontWeight: "bold" }}>
              What We Offer
            </Typography>
            <Typography  className="landingPageSubHeading" variant="h5" sx={{ mt: 2, }}>
              A consumer-friendly solution for mobile recharge, money transfer, and bill paying
            </Typography>
            <Typography   className="landingPagePara" variant="h6" sx={{ mt: 2, textAlign: "justify" }}>
              Open a savings account, buy stocks and mutual funds, pay your bills, recharge, reserve flights and movie tickets, and much more. With us anyone can be paid anywhere. Pay securely and without a card in person or online with the Paytm Wallet or directly from your bank account. You can also send and receive money from anyone.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {weOffer.map((item, index) => (
                <Grid item md={6} lg={6} key={index}>
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 1 }} // Animation on hover
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card
                      sx={{
                        width: "100%",
                        height: "350px",
                        mx: "auto",
                        my: 2,
                        py: 3,
                        background: 'linear-gradient(to right, #3e92cc, #d8315b)',
                        borderRadius: '16px', // Softer corners
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                        "&:hover": {
                          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
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
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          gutterBottom
                        >
                          <span style={{ color: "pink", fontSize: "2rem" }}>{item.icon}</span>
                        </Typography>

                        <Typography sx={{ mb: 1.5, fontWeight: "bold", textAlign: 'center' }}>
                          {item.head}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#555c6", textAlign: 'center' }}
                        >
                          {item.para}
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                        <Button
                          onClick={() => {
                            navigate("/our-services");
                          }}
                          size="small"
                          sx={{
                            fontWeight: "bold",
                            color: primaryColor(),
                            backgroundColor: 'white', // Button background color
                            borderRadius: '8px',
                            padding: '8px 16px',
                            "&:hover": {
                              backgroundColor: '#f1f1f1', // Button hover color
                            },
                          }}
                        >
                          Learn More
                        </Button>
                      </CardActions>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPageWeOffer;
