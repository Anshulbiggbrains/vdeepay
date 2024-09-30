/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, IconButton, Stack, Tooltip, Typography } from "@mui/material";

import { getStatusColor } from "../../theme/setThemeColor";
import LogoComponent from "../LogoComponent";
import { currencySetter } from "../../utils/Currencyutil";
import { capitalize1 } from "../../utils/TextUtil";
import Timeline from "./Timeline";
import Mount from "../Mount";
import { useContext } from "react";
import AuthContext from "../../store/AuthContext";
import { createFileName, useScreenshot } from "use-react-screenshot";
import { createRef } from "react";
import { Icon } from "@iconify/react";
import { datemonthYear } from "../../utils/DateUtils";
import Loader from "../loading-screen/Loader"; 
import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";
import CommonSnackBar from "../CommonSnackBar";

export default function RightSidePannel({
  state,
  setState,
  row,
  setRow,
  buttons,
}) {
  // console.log("row", row);
  // console.log("state", state);
  const authCtx = useContext(AuthContext);
  const user = authCtx.user;
  const role = user?.role.toLowerCase();

  // screenshot
  const [image, takeScreenshot] = useScreenshot({
    type: "image/png",
    quality: 1.0,
  });
  const download = (
    image,
    { name = "Transaction Details", extension = "png" } = {}
  ) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const LabelComponent = ({ label }) => {
    return (
      <span style={{ textAlign: "left", fontSize: "13px", minWidth: "100px" }}>
        {label}
      </span>
    );
  };

  const DetailsComponent = ({ details }) => {
    return (
      <CommonSnackBar>
        <span
          style={{ textAlign: "right", fontSize: "13px" }}
          className="fw-bold"
        >
          {details}
        </span>
      </CommonSnackBar>
    );
  };

  const ref = createRef(null);
  const downloadScreenshot = () => {
    takeScreenshot(ref.current).then(download);
  };

  const handleClose = () => {
    if (setRow) setRow(false);
    setState(false);
  };

  // useEffect(() => {
  //   if (user && role !== "admin" && state) {
  //     // console.log("we are here closing");
  //     Crisp.configure(process.env.REACT_APP_CRISP_WEB_KEY, { autoload: false });
  //     Crisp.chat.hide();
  //   } else if (user && role !== "admin" && state) {
  //     Crisp.configure(process.env.REACT_APP_CRISP_WEB_KEY, { autoload: false });
  //     Crisp.chat.show();
  //   } else {
  //   }
  // }, [state]);

  return (
    <React.Fragment key={"right"}>
      <Drawer anchor={"right"} open={state} onClose={() => handleClose()}>
        <Box
          className="drawer-bg"
          sx={{
            height: "100vh",
            overflowY: "scroll",
            position: "relative",
            width: { md: 450, sm: "auto", xs: "auto" },
          }}
          ref={ref}
        >
          {/* condition here for to show loading */}
          {row ? (
            <>
              <Box
                sx={{
                  background: `${getStatusColor(row?.status && row.status)}40`,
                  px: 2,
                }}
              >
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <>
                    <IconButton className="simple-hover">
                      <CloseIcon onClick={() => handleClose()} />
                    </IconButton>
                  </>
                  <LogoComponent width="100px" />
                </Stack>

                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: "40px",
                        fontWeight: "600",
                        color: "#001d3d",
                      }}
                    >
                      {currencySetter(row.amount).split(".")[0]}
                    </span>
                    .
                    <span style={{ opacity: "0.7", fontSize: "16px" }}>
                      {currencySetter(row.amount).split(".")[1]}
                    </span>
                  </div>

                  <h4
                    style={{
                      letterSpacing: "1px",
                      color: getStatusColor(row?.status),
                    }}
                  >
                    {capitalize1(row?.status)}
                  </h4>
                </Stack>

                <Grid
                  sx={{
                    textAlign: "right",
                    fontSize: "13px",
                    color: "#566573",
                  }}
                >
                  {datemonthYear(row.created_at)},
                  {datemonthYear(row.updated_at)}
                </Grid>
                {/* ############ THE DIVIDER ############ */}
                <Box
                  sx={{
                    height: "5px",
                  }}
                ></Box>
              </Box>

              {/* ############################### */}
              {/* BODY ########################## */}
              {/* ############################### */}
              <Box
                sx={{
                  pt: 0.5,
                  px: 3,
                }}
              >
                <Timeline data={row} />
                <div className="separator--primary">
                  <Grid container sx={{ mb: 1 }}>
                    <Grid
                      item
                      md={12}
                      xs={12}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <div className="mx-2">{buttons}</div>
                      <div className="">
                        <Tooltip title="Download">
                          <IconButton onClick={downloadScreenshot}>
                            <Icon
                              icon="lucide:download"
                              style={{ fontSize: "20px", color: "#1877F2" }}
                            />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </Grid>

                    <Typography sx={{ fontSize: "16px", display: "flex" }}>
                      <Typography sx={{ fontWeight: "bold" }}>
                        Transaction
                      </Typography>
                      <Typography sx={{ ml: 0.5 }}>details</Typography>
                    </Typography>
                    <Grid item md={12} xs={12} className="details-section">
                      <div>
                        <LabelComponent label="Operator" />

                        <DetailsComponent details={row?.operator} />
                      </div>
                      <div>
                        <LabelComponent label="Operator Id" />
                        <DetailsComponent details={row?.op_id} />
                      </div>
                      <div>
                        <LabelComponent label="Order ID" />
                        <DetailsComponent details={row?.order_id} />
                      </div>
                      <Mount visible={row?.mop}>
                        <div>
                          <LabelComponent label="MOP" />
                          <DetailsComponent details={row?.mop} />
                        </div>
                      </Mount>
                      <Mount visible={row?.number}>
                        <div>
                          <LabelComponent label="Customer number" />
                          <DetailsComponent details={row?.number} />
                        </div>
                      </Mount>
                    </Grid>
                  </Grid>

                  <Mount visible={role === "asm"}>
                    <Grid container>
                      <div className="grey-divider-horizontal"></div>
                      <Grid
                        item
                        md={6}
                        xs={12}
                        sm={12}
                        sx={{
                          display: { md: "flex" },
                          justifyContent: { md: "space-between" },
                          alignItems: "flex-end",
                        }}
                      >
                        <Box
                          sx={{
                            fontSize: "12px",
                            width: "90%",

                            paddingRight: { md: "5px" },
                          }}
                          className="details-section"
                        >
                          <Typography className="fw-bold">RET</Typography>
                          <div>
                            <LabelComponent label="Comm" />
                            <DetailsComponent
                              details={currencySetter(row?.ret_comm)}
                            />
                          </div>
                          <div>
                            <LabelComponent label="TDS" />
                            <DetailsComponent
                              details={currencySetter(row?.ret_tds)}
                            />
                          </div>
                          <div>
                            <LabelComponent label="Charge" />
                            <DetailsComponent
                              details={currencySetter(row?.ret_charge)}
                            />
                          </div>
                        </Box>
                        <div className="divider-inright-nav"></div>
                      </Grid>

                      <Grid
                        item
                        md={6}
                        xs={12}
                        sm={12}
                        sx={{
                          display: { md: "flex" },
                          justifyContent: { md: "flex-end" },
                          mt: { md: 0, xs: 1 },
                        }}
                      >
                        <Box
                          sx={{
                            fontSize: "12px",
                            width: "90%",
                            paddingRight: { md: "5px" },
                          }}
                          className="details-section"
                        >
                          <Typography className="fw-bold">AD</Typography>
                          <div>
                            <LabelComponent label="Comm" />
                            <DetailsComponent
                              details={currencySetter(row?.ad_comm)}
                            />
                          </div>
                          <div>
                            <LabelComponent label="TDS" />
                            <DetailsComponent
                              details={currencySetter(row?.ad_tds)}
                            />
                          </div>
                        </Box>
                      </Grid>
                    </Grid>
                  </Mount>
                </div>

                <Mount visible={row.ben_acc}>
                  <div className="separator--primary">
                    <Grid container sx={{ my: 1 }}>
                      <Typography sx={{ fontSize: "16px", display: "flex" }}>
                        <Typography sx={{ fontWeight: "bold" }}>
                          Beneficiary
                        </Typography>
                        <Typography sx={{ ml: 0.5 }}>details</Typography>
                      </Typography>
                      <Grid item md={12} xs={12} className="details-section">
                        <div>
                          <LabelComponent label="Name" />
                          <DetailsComponent details={row?.ben_name} />
                        </div>
                        <div>
                          <LabelComponent label="Account" />
                          <DetailsComponent details={row?.ben_acc} />
                        </div>
                        <div hidden={!row.ifsc}>
                          <LabelComponent label="IFSC" />
                          <DetailsComponent details={row?.ifsc} />
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                </Mount>
              </Box>
            </>
          ) : (
            <Loader loading={!row} />
          )}
        </Box>
      </Drawer>
    </React.Fragment>
  );
}
