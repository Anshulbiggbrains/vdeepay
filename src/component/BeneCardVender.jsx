import React from "react";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import RetExpresTransferModal from "../modals/RetExpresTransferModal";
import ApiEndpoints from "../network/ApiEndPoints";
import DeleteBeneficiaryModal from "../modals/DeleteBeneficiaryModal";
import AccountVerificationModal from "../modals/AccountVerificationModal";
import { capitalize1 } from "../utils/TextUtil";
import { randomColors } from "../theme/setThemeColor";
import VerifiedIcon from "@mui/icons-material/Verified";
import PortBeneficiaries from "../modals/PortBeneficiaries";

const BeneCardVender = ({
  ben,
  index,
  type,
  mobile,
  remitterStatus,
  getRemitterStatus,
  dmtValue,
  view,
}) => {
  return (
    <Card
    
      className="card-css"
      key={index}
      sx={{
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
        px: 2,    
        py: 1.5,
        m: { md: 2, sm: 1, xs: 1 },
        ml: { md: 2, sm: 0, xs: 0.5 },
        position: "relative", 
      }}
    >
      <Grid
        sx={{
          alignItems: "center",
          justifyContent: "center",
          display: { md: "flex", sm: "none", xs: "none" },
          background: randomColors(
            ben && ben.name
              ? ben.name.charAt(0).toUpperCase()
              : ben.bene_name.charAt(0).toUpperCase()
          ),
          borderRadius: "4px",
          height: "64px",
          width: "64px",
          position: "relative",
          p: 1,
        }}
      >
        <Typography sx={{ fontSize: "40px" }}>
          {ben && ben.name
            ? ben.name.charAt(0).toUpperCase()
            : ben.bene_name.charAt(0).toUpperCase()}
        </Typography>
      </Grid>

      <Grid
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
        
          width: "100%",
          alignContent: "center",
          ml:2
        }}
      >
       
         
          <Grid container sx={{display:"flex"}} >
    <Grid item xs={12} sm={4}>
      <Typography sx={{ textAlign: "left", fontWeight: "500" }}>
        Name
      </Typography>
      <Typography sx={{ textAlign: "left" }}>
      {ben.name ? capitalize1(ben.name) : capitalize1(ben.bene_name)}
      </Typography>
    </Grid>
    <Grid item xs={12} sm={4} >
      <Typography sx={{ textAlign: "left", fontWeight: "500" }}>
        Account No 
      </Typography>
      <Typography sx={{ textAlign: "left" }}>
      {ben.account ? ben.account : ben.bene_acc}
      </Typography>
    </Grid>
    <Grid item xs={12} sm={4}>
      <Typography sx={{ textAlign: "left", fontWeight: "500" }}>
        IFSC
      </Typography>
      <Typography sx={{ textAlign: "left" }}>
      {ben.ifsc}
      </Typography>
    </Grid>
  </Grid> 
        <Grid
          sx={{
            display: "flex", // Changed to flex for horizontal alignment
            alignItems: "center",
            mt: { md: 0, sm: 1, xs: 1 },
            gap: 2, // Added gap for spacing between elements
          }}
        >
          {/* <PortBeneficiaries
        ben={ben}
        dmtValue={dmtValue}
        remitterStatus={remitterStatus}
        getRemitterStatus={getRemitterStatus}
        view={view}
      /> */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {(ben.last_success_date &&
                                    ben.last_success_date !== null) ? (
              <>
                <VerifiedIcon sx={{ fontSize: "17px", color: "#1977f2", mr: 0.5 }} />
                <Typography sx={{ color: "#1977f2" }}>Verified</Typography>
              </>
            ) : (
                                 <AccountVerificationModal
                                        ben={ben}
                                        rem_number={mobile}
                                        remitterStatus={remitterStatus}
                                        getRemitterStatus={getRemitterStatus}
                                        view={
                                          type === "express"
                                            ? "express"
                                            : "super"
                                        }
                                      />
            )}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <RetExpresTransferModal
                                    type="NEFT"
                                    ben={ben}
                                    rem_number={mobile && mobile}
                                    rem_details={remitterStatus}
                                    apiEnd={
                                      type === "express"
                                        ? ApiEndpoints.EXP_TRANSFER
                                        : ApiEndpoints.SUPER_TRANSFER
                                    }
                                    view={
                                      type === "express"
                                        ? "Express Transfer"
                                        : "Super Transfer"
                                    }
                                  />
                                  <RetExpresTransferModal
                                    type="IMPS"
                                    ben={ben}
                                    rem_number={mobile && mobile}
                                    rem_details={remitterStatus}
                                    apiEnd={
                                      type === "express"
                                        ? ApiEndpoints.EXP_TRANSFER
                                        : ApiEndpoints.SUPER_TRANSFER
                                    }
                                    view={
                                      type === "express"
                                        ? "Express Transfer"
                                        : "Super Transfer"
                                    }
                                  />
            <Box sx={{ display: { md: "none", sm: "block", xs: "block" } }}>
              {ben.verificationDt && ben.verificationDt !== null ? (
                <Button
                  size="small"
                  sx={{
                    fontSize: "10px",
                    padding: "0px 5px !important",
                    textTransform: "uppercase",
                    minWidth: "59px !important",
                    color: "#00bf78",
                    fontWeight: "bold",
                  }}
                >
                  Already Verified
                </Button>
              ) : null}
            </Box>
          </Box>
        </Grid>
        </Grid>

      {/* Position the Delete button in the top right corner */}
      <Box
        sx={{
          position: "absolute",
          top: "3px",
          right: "2px",
        }}
      >
                                  <DeleteBeneficiaryModal
                                    bene={ben}
                                    mob={mobile && mobile}
                                    getRemitterStatus={getRemitterStatus}
                                    apiEnd={ApiEndpoints.REMOVE_BENE_EXPRESS}
                                    view="expressTransfer"
                                  />
      </Box>

      
    </Card>
  );
};

export default BeneCardVender;
