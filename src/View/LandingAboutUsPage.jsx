import {
  Avatar,
  Card,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect } from "react";
import { aboutUs } from "../iconsImports";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { getEnv, primaryColor } from "../theme/setThemeColor";
import StorefrontIcon from "@mui/icons-material/Storefront";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import LockClockOutlinedIcon from "@mui/icons-material/LockClockOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";

const mWhyChooseUs = [
  {
    title: "User-friendly platorm",
    body: "Our digital banking platform is designed with simplicity and ease of use in mind. We prioritise user experience and strive to create an intuitive interface that makes banking convenient and accessible.",
    icon: <PeopleAltOutlinedIcon />,
  },
  {
    title: "Minimum Investment",
    body: "Unlock financial opportunities with our platform requiring minimal investment. Our platform offers the flexibility to start investing with a low minimum investment, allowing you to take advantage of various investment options and grow your wealth. Experience the power of growing your wealth with even the smallest amounts.",
    icon: <TrendingUpOutlinedIcon />,
  },

  {
    title: "Quick Onboarding",
    body: "Experience hassle-free onboarding with us! Our streamlined process ensures quick and efficient account setup, allowing you to start enjoying our services in no time.",
    icon: <ContactsOutlinedIcon />,
  },
  {
    title: "Dedicated Merchant Support",
    body: "We prioritise customer satisfaction and offer exceptional support whenever you need it. Our dedicated merchant/customer support team is just a call or message away, and ready to assist you with any questions or concerns.",
    icon: <HandshakeOutlinedIcon />,
  },
  {
    title: "Safe & Secure Transactions",
    body: "We prioritise the security of our customers' financial information and adhere to strict compliance standards. With our robust security measures, you can trust that your transactions are confidential, protected, and carried out with integrity. Your peace of mind is our utmost priority.",

    icon: <LockClockOutlinedIcon />,
  },
  {
    title: "Multiple Banking Services",
    body: "We offer a wide range of digital banking services, including online banking, mobile banking, savings and checking accounts, insurance, and more. Our aim is to provide a comprehensive suite of services that cater to the diverse financial needs of our customers.",
    icon: <AccountBalanceOutlinedIcon />,
  },
];
const LandingAboutUsPage = () => {
  const envName = getEnv();
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <div id="about-us " className="aboutUs">
      <Grid container className="builSecurity_bg">
        {/* about us */}
        <Grid md={12} xs={12}>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              fontWeight: "700",
            }}
            variant="h4"
          >
            {/* <span className="the-slash"></span> */}
            <div className="landingPageHeadings">ABOUT US</div>
            {/* <span className="the-slash"></span> */}
          </Typography>
        </Grid>
        {/* paragraphs */}
        <Container maxWidth="lg" sx={{ my: 5, px: 2 }}>
          <Grid container className="d-flex justify-content-center">
            <Grid
              item
              md={5}
              sx={{ textAlign: "left", mr: { md: 1.5, sm: 0, xs: 0 } }}
            >
              <div className="justify-content">
                India's current mottos are "financial inclusion" and
                "AatmaNirbharta".
              </div>
              <div className="mt-2 justify-content">
                Our story starts at the cusp of these two ideologies. Lakhs of
                hard-working people in the unorganized retail sector form the
                backbone of India's economy.
              </div>

              <div className="mt-2 justify-content">
                Whether in a village, town or a large city, shopkeepers and
                kirana store owners have been unable to join the digital
                revolution because of factors like lack of awareness, knowledge
                and proper fintech support.
              </div>
            </Grid>
            <Grid
              item
              md={5}
              sx={{ textAlign: "left", ml: { md: 1.5, sm: 0, xs: 0 } }}
              className="justify-content"
            >
              This is the problem {getEnv()} was built to address. Established
              by a team of professionals with decades of experience in the BFSI
              industry, {getEnv()} focuses on developing insights into the deep
              market potential of the financial transaction and financial
              technology space in India. We aim to lead this pool of persevering
              small-scale entrepreneurs into a financially inclusive,
              financially stronger future.
            </Grid>
          </Grid>
        </Container>
        {/* the about us image */}
        {envName !== "MoneyOddr" && (
          <Grid md={12} container>
            <Grid md={5.5} sx={{ mb: { md: 0, xs: 5 } }}>
              <img src={aboutUs} width="90%" alt="About us img" />
            </Grid>
            <Grid
              md={6.5}
              container
              sx={{
                mt: { md: 15, xs: 0 },
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Grid
                md={5}
                className="bottom2top"
                sx={{
                  my: { md: 0, xs: 5 },
                  minWidth: { md: "0", xs: "350px" },
                }}
              >
                <div className="flex-hs-vs">
                  <StorefrontIcon
                    sx={{
                      color: primaryColor(),
                      fontSize: "2.2rem",
                      mr: { md: 1.2, xs: 0 },
                      mt: 1.1,
                    }}
                  />
                  <div className="flex-hc-vs flex-d-col">
                    <span
                      className="landing-small-font less-thick-font"
                      style={{ paddingLeft: "0px" }}
                    >
                      5000+
                    </span>
                    <div style={{ fontSize: "12px", textAlign: "left" }}>
                      <span
                        style={{
                          fontWeight: "900",
                          fontSize: "15px",
                        }}
                      >
                        Merchants
                      </span>
                      More than 5000 merchants
                      <br />
                      onboarded
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid
                md={5}
                className="bottom2top"
                sx={{
                  my: { md: 0, xs: 5 },
                  minWidth: { md: "0", xs: "350px" },
                }}
              >
                <div className="flex-hs-vs">
                  <GroupAddIcon
                    sx={{
                      color: primaryColor(),
                      fontSize: "2.2rem",
                      mr: { md: 1.2, xs: 0 },
                      mt: 1.1,
                    }}
                  />
                  <div className="flex-hc-vs flex-d-col">
                    <span
                      className="landing-small-font less-thick-font"
                      style={{ paddingLeft: "0px" }}
                    >
                      11 Lakh+
                    </span>
                    <div style={{ fontSize: "12px", textAlign: "left" }}>
                      <span
                        style={{
                          fontWeight: "900",
                          fontSize: "15px",
                        }}
                      >
                        Customers
                      </span>
                      More than 11 Lakh happy customers
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid
                md={5}
                className="bottom2top"
                sx={{
                  my: { md: 0, xs: 5 },
                  minWidth: { md: "0", xs: "350px" },
                }}
              >
                <div className="flex-hs-vs">
                  <ApartmentIcon
                    sx={{
                      color: primaryColor(),
                      fontSize: "2.2rem",
                      mr: { md: 1.2, xs: 0 },
                      mt: 1.1,
                    }}
                  />
                  <div className="flex-hc-vs flex-d-col">
                    <span
                      className="landing-small-font less-thick-font"
                      style={{ paddingLeft: "0px" }}
                    >
                      5000+
                    </span>
                    <div style={{ fontSize: "12px", textAlign: "left" }}>
                      <span
                        style={{
                          fontWeight: "900",
                          fontSize: "15px",
                        }}
                      >
                        City
                      </span>
                      Spread across 5000 plus cities
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid
                md={5}
                className="bottom2top"
                sx={{
                  my: { md: 0, xs: 5 },
                  minWidth: { md: "0", xs: "350px" },
                }}
              >
                <div className="flex-hs-vs">
                  <StorefrontIcon
                    sx={{
                      color: primaryColor(),
                      fontSize: "2.2rem",
                      mr: { md: 1.2, xs: 0 },
                      mt: 1.1,
                    }}
                  />
                  <div className="flex-hc-vs flex-d-col">
                    <span
                      className="landing-small-font less-thick-font"
                      style={{ paddingLeft: "0px" }}
                    >
                      5,00,000+
                    </span>
                    <div style={{ fontSize: "12px", textAlign: "left" }}>
                      <span
                        style={{
                          fontWeight: "900",
                          fontSize: "15px",
                        }}
                        className="mr-2"
                      >
                        Transactions
                      </span>
                      More than 5,00,000 Transactions Monthly
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
      <>
        {envName !== "MoneyOddr" && (
          <>
            <Container maxWidth="lg" sx={{ my: 15 }} className="sectionBreake">
              <Grid container xs={12} className="top2Bottom ">
                <Box
                  sx={{
                    width: { lg: "50%", md: "50%", sm: "100%", xs: "100%" },
                  }}
                  className="landingPageHeadings"
                >
                  Why the focus on the Indian unorganized retail sector ?
                </Box>
              </Grid>
            </Container>

            <Grid className="beforeBgColor" sx={{ marginTop: "-60px" }}>
              <Container maxWidth="lg">
                <Card
                  sx={{
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    background: "#FCEAFD",
                    width: { lg: "60%", md: "70%", sm: "80%", xs: "90%" },
                    p: 4,
                    mx: 3,
                    marginLeft: { lg: "40%", md: "30%", sm: "0", xs: "0" },
                    textAlign: "justify",
                  }}
                >
                  <div className="landing-bg_para justify-content">
                    Almost 95% of India's retail market consists of kirana
                    stores, brick-and-mortar establishments and mom-and-pop
                    stores. Isn't that massive potential? We want to focus on
                    organizing this enormous unorganized sector by giving it
                    access to modern fintech support. We believe this will help
                    nurture smaller businesses and enable them to jump onto the
                    modern trade bandwagon. We understand the challenges in this
                    sector and the potential to convert them into opportunities.
                    We want to create the "AatmaNirbhar Dukandar" and help him
                    achieve true financial empowerment. {getEnv()} aims to
                    create an organized digital network of India's unorganized
                    retail sector through a retail tech platform that provides
                    retailers with digital financial and business solutions to
                    enable business expansion and scaling.
                  </div>
                </Card>
              </Container>
            </Grid>
          </>
        )}

        {/* what we do */}
        <Container maxWidth="lg" sx={{ mt: 10 }} className="bottom2top">
          <div className="landingPageHeadings ">
            {envName === "MoneyOddr" ? "Why Choose Us" : "What We Do"}
          </div>

          {envName === "MoneyOddr" ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  my: 5,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "600" }}>
                  Attractive Commision
                </Typography>
                <Typography variant="body">
                  Maximise Your Income with our Irresistible & Best Commission
                  Rates!
                </Typography>
              </Box>
              <Grid container>
                {mWhyChooseUs &&
                  mWhyChooseUs.map((item) => {
                    return (
                      <Grid
                        lg={6}
                        md={6}
                        sm={12}
                        xs={12}
                        sx={{
                          mt: { lg: 2, md: 2, sm: 3, xs: 3 },
                          px: { lg: 1, md: 1, sm: 0, xs: 0 },
                        }}
                      >
                        <List
                          sx={{
                            width: "100%",

                            bgcolor: "background.paper",
                            position: "relative",
                          }}
                        >
                          <ListItem>
                            <ListItemAvatar
                              sx={{
                                position: "absolute",
                                // left: "-30px",
                                top: 20,
                              }}
                            >
                              <Avatar sx={{ backgroundColor: "#0096DD" }}>
                                {item.icon}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              sx={{ ml: 8 }}
                              primary={
                                <Typography
                                  variant="h6"
                                  sx={{ fontWeight: "600" }}
                                >
                                  {item.title}
                                </Typography>
                              }
                              secondary={
                                <Typography
                                  variant="body"
                                  sx={{ display: "flex", textAlign: "justify" }}
                                >
                                  {item.body}
                                </Typography>
                              }
                            />
                          </ListItem>
                        </List>
                      </Grid>
                    );
                  })}
              </Grid>
            </>
          ) : (
            <>
              <Grid container sx={{ mt: 5 }}>
                <Grid
                  lg={4}
                  md={4}
                  sm={12}
                  xs={12}
                  sx={{
                    mt: { lg: 2, md: 2, sm: 3, xs: 3 },
                    px: { lg: 1, md: 1, sm: 0, xs: 0 },
                  }}
                >
                  <div div className="whatWedoCard-hilight">
                    <div
                      style={{
                        fontSize: "1.8rem",
                        fontWeight: 400,
                        color: "#fff",
                      }}
                    >
                      Multiple Banking <br /> Services
                    </div>
                    <div className="landing-bg_para" style={{ color: "#fff" }}>
                      We offer a wide range of digital banking services,
                      including online banking, mobile banking, savings and
                      checking accounts, insurance, and more. Our aim is to
                      provide a comprehensive suite of services that cater to
                      the diverse financial needs of our customers.
                    </div>
                    <div>
                      <TipsAndUpdatesIcon
                        sx={{
                          fontSize: "80px",
                          color: "#fff",
                          mt: 1,
                        }}
                      />
                    </div>
                  </div>
                </Grid>
                <Grid
                  lg={4}
                  md={4}
                  sm={12}
                  xs={12}
                  sx={{
                    mt: { lg: 2, md: 2, sm: 3, xs: 3 },
                    px: { lg: 1, md: 1, sm: 0, xs: 0 },
                  }}
                >
                  <div div className="whatWedoCard">
                    <div className="whatWeDo-bg_heading">
                      We provide banking and financial services by using safe
                      and secure technology to assist people with:
                    </div>
                    <div
                      style={{
                        fontSize: "1rem",
                        fontWeight: 200,
                        marginTop: "10px",
                      }}
                    >
                      Bill payments and recharges,Banking services,Payment and
                      cash collection services, Travel and e-governance
                      services, Khata management services
                    </div>
                    <div>
                      <TipsAndUpdatesIcon
                        sx={{
                          fontSize: "80px",
                          color: "",
                          mt: 1,
                        }}
                      />
                    </div>
                  </div>
                </Grid>
                <Grid
                  lg={4}
                  md={4}
                  sm={12}
                  xs={12}
                  sx={{
                    mt: { lg: 2, md: 2, sm: 3, xs: 3 },
                    px: { lg: 1, md: 1, sm: 0, xs: 0 },
                  }}
                >
                  <div div className="whatWedoCard">
                    <div className="whatWeDo-bg_heading">
                      We network with -Retailers,Distributors
                    </div>
                    <div
                      style={{
                        fontSize: "1rem",
                        fontWeight: 200,
                        marginTop: "10px",
                      }}
                    >
                      Enable them to increase earnings, provide loan facilities,
                      provide branding and discounted services, provide
                      no-rental digital payment devices.
                    </div>
                    <div>
                      <TipsAndUpdatesIcon
                        sx={{
                          fontSize: "80px",
                          color: "",
                          mt: 1,
                        }}
                      />
                    </div>
                  </div>
                </Grid>
              </Grid>
            </>
          )}

          {/* mission vission and values section */}

          <Grid container md={12} xs={12}>
            {/* 01 */}
            <Grid
              sx={{
                mt: 15,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
              md={12}
              className="bottom2top"
            >
              <Box
                component="div"
                sx={{
                  display: "flex",
                  flexDirection: {
                    lg: "row",
                    md: "row",
                    sm: "column",
                    xs: "column",
                  },
                  width: "80%",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    backgroundColor:
                      envName === "MoneyOddr" ? "#EC9706" : "#ED7014",
                    color: "#fff",
                    width: "70px",
                    height: "70px",
                    fontSize: "2.2rem",
                    pt: 1,
                    fontWeight: "bold",
                    mr: 2,
                  }}
                >
                  01
                </Box>
                <span
                  className="landingPageHeadings"
                  style={{ letterSpacing: "0.2rem", color: "#fff" }}
                >
                  Our Vission
                </span>
              </Box>

              {envName === "MoneyOddr" ? (
                <Box
                  className="landing-bg_para"
                  component="div"
                  sx={{
                    textAlign: "justify",
                    width: { lg: "80%", md: "80%", sm: "80%", xs: "100%" },
                  }}
                >
                  <span style={{ fontWeight: "900" }}>MoneyOddR</span> is
                  founded with a mission to engage every Indian in mainstream
                  banking by providing last mile services.
                  <span style={{ fontWeight: "900", color: "#00BF78" }}>
                    “Har Ghar – Har Nagar”
                  </span>
                </Box>
              ) : (
                <Box
                  className="landing-bg_para"
                  component="div"
                  sx={{
                    textAlign: "justify",
                    width: { lg: "80%", md: "80%", sm: "80%", xs: "100%" },
                  }}
                >
                  To become India's best digital financial solutions provider in
                  the unorganized sector. To enable the adoption of fintech in
                  every small business and retail store in India in a quest to
                  grow their business and help expand their offerings. To spur
                  job creation by aiding micro-entrepreneurship, specifically in
                  the rural and semi-urban sectors.
                </Box>
              )}
            </Grid>

            {/* 02 */}
            <Grid
              md={12}
              className="bottom2top"
              sx={{
                mt: 6,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Box
                component="div"
                sx={{
                  display: "flex",
                  flexDirection: {
                    lg: "row",
                    md: "row",
                    sm: "column",
                    xs: "column",
                  },
                  width: "80%",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    backgroundColor:
                      envName === "MoneyOddr" ? "#2C3D69" : "#ED7014",
                    color: "#fff",
                    width: {
                      lg: "70px",
                      md: "70px",
                      sm: "100px",
                      xs: "100px",
                    },
                    height: "70px",
                    fontSize: "2.2rem",
                    pt: 1,
                    fontWeight: "bold",
                    mr: 2,
                  }}
                >
                  02
                </Box>
                <span
                  className="landingPageHeadings"
                  style={{ letterSpacing: "0.2rem", color: "#fff" }}
                >
                  Our Mission
                </span>
              </Box>

              {envName === "MoneyOddr" ? (
                <Box
                  className="landing-bg_para"
                  component="div"
                  sx={{
                    textAlign: "justify",
                    width: { lg: "80%", md: "80%", sm: "100%", xs: "100%" },
                  }}
                >
                  <span style={{ fontWeight: "900" }}>MoneyOddR</span> is
                  created to become the best and user-friendly banking platform
                  to serve India's unorganized sectors & rural india.
                </Box>
              ) : (
                <Box
                  className="landing-bg_para"
                  component="div"
                  sx={{
                    textAlign: "justify",
                    width: { lg: "80%", md: "80%", sm: "100%", xs: "100%" },
                  }}
                >
                  To become a one-stop digital payment and banking point and
                  superior distribution channel to improve India's monetization
                  infrastructure, specifically in the unorganized retail sector.
                </Box>
              )}
            </Grid>
            {/* 03 */}
            <Grid
              sx={{
                mt: 6,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
              md={12}
              className="bottom2top"
            >
              <Box
                component="div"
                sx={{
                  display: "flex",
                  flexDirection: {
                    lg: "row",
                    md: "row",
                    sm: "column",
                    xs: "column",
                  },
                  width: "80%",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    backgroundColor:
                      envName === "MoneyOddr" ? "#2C3D69" : "#ED7014",
                    color: "#fff",
                    width: "70px",
                    height: "70px",
                    fontSize: "2.2rem",
                    pt: 1,
                    fontWeight: "bold",
                    mr: 2,
                  }}
                >
                  03
                </Box>
                <span
                  className="landingPageHeadings"
                  style={{ letterSpacing: "0.2rem", color: "#fff" }}
                >
                  Our Values
                </span>
              </Box>

              {envName === "MoneyOddr" ? (
                <Box
                  className="landing-bg_para"
                  component="div"
                  sx={{
                    textAlign: "justify",
                    width: { lg: "80%", md: "80%", sm: "80%", xs: "100%" },
                  }}
                >
                  <span style={{ fontWeight: "900" }}>
                    Availability, Reliability, Transparency & Trust
                  </span>
                  are the key values of
                  <span style={{ fontWeight: "900" }}>MoneyOddR</span> and we
                  are committed to serve each of our Retailer, Distributors and
                  other associated partners as per our Values.
                </Box>
              ) : (
                <Box
                  className="landing-bg_para"
                  component="div"
                  sx={{
                    textAlign: "justify",
                    width: { lg: "80%", md: "80%", sm: "80%", xs: "100%" },
                  }}
                >
                  Insight-led - We make decisions based on cutting-edge,
                  technologically-driven research and data. Innovation - We
                  continually evolve to create technology-enabled solutions and
                  campaigns for our users. Integrity - We encourage conducting
                  business by adhering to the highest standards of trust and
                  ethics. Collaboration - We endeavour to strengthen and develop
                  mutually beneficial relations with our customers and partners.
                </Box>
              )}
            </Grid>
          </Grid>
        </Container>
      </>
    </div>
  );
};

export default LandingAboutUsPage;
