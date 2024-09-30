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

const BeneCardComponent = ({
  ben,
  index,
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
        justifyContent: "space-between", // Changed to space-between
        alignItems: "center",
        px: 2,
        py: 1.5,
        m: { md: 2, sm: 1, xs: 1 },
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
          flexDirection: { xs: "column", md: "row" },
          width: "100%",
          ml: 2,
         display:"flex"
        }}
      >
        <Grid container>
          <Grid item xs={4} sm={4} md={4} >
            <Typography sx={{ textAlign: "left", fontWeight: "500" }}>
              Name
            </Typography>
            <Typography sx={{ textAlign: "left" }}>
              {ben.name ? capitalize1(ben.name) : capitalize1(ben.bene_name)}
            </Typography>
          </Grid>
          <Grid item xs={4} sm={4}md={4} >
            <Typography sx={{ textAlign: "left", fontWeight: "500" }}>
              Account No
            </Typography>
            <Typography sx={{ textAlign: "left"}}>
              {ben.account ? ben.account : ben.bene_acc}
            </Typography>
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
            <Typography sx={{ textAlign: "left", fontWeight: "500" }}>
              IFSC
            </Typography>
            <Typography sx={{ textAlign: "left" }}>{ben.ifsc}</Typography>
          </Grid>
        </Grid>
        <Box sx={{  display: "flex", 
            alignItems: "center",
            mt: { md: 2, sm: 1, xs: 1,lg:2 },
            justifyContent: "flex-end", }}>
            {(ben.verificationDt && ben.verificationDt !== null) ||
            ben.verified === "1" ||
            ben.status === 1 ? (
              <>
                <Typography sx={{ color: "#1977f2" }}>Verified</Typography>
                <VerifiedIcon sx={{ fontSize: "17px", color: "#1977f2", mr: 0.5 }} />

              </>
            ) : (
              <AccountVerificationModal
                ben={ben}
                rem_number={mobile}
                remitterStatus={remitterStatus}
                getRemitterStatus={getRemitterStatus}
                dmtValue={dmtValue}
              />
            )}
          </Box>
        <Grid
          sx={{
            display: "flex", 
            alignItems: "center",
            mt: { md: 2, sm: 1, xs: 1,lg:2 },
            justifyContent: "flex-end", // Align to the right
          }}
        >

          <PortBeneficiaries
            ben={ben}
            dmtValue={dmtValue}
            remitterStatus={remitterStatus}
            getRemitterStatus={getRemitterStatus}
            view={view}
          />
          

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: 1 }}>
            <RetExpresTransferModal
              dmtValue={dmtValue}
              type="NEFT"
              ben={ben}
              rem_number={mobile && mobile}
              rem_details={remitterStatus}
              apiEnd={
                dmtValue === "dmt1"
                  ? ApiEndpoints.DMR_MONEY_TRANSFER
                  : ApiEndpoints.DMT2_MT
              }
              view="Money Transfer"
              limit_per_txn={
                remitterStatus.limitPerTransaction
                  ? remitterStatus.limitPerTransaction
                  : 5000
              }
              remDailyLimit={remitterStatus?.limitDetails?.availableDailyLimit}
            />
            <RetExpresTransferModal
              type="IMPS"
              ben={ben}
              rem_number={mobile && mobile}
              rem_details={remitterStatus}
              apiEnd={
                dmtValue === "dmt1"
                  ? ApiEndpoints.DMR_MONEY_TRANSFER
                  : ApiEndpoints.DMT2_MT
              }
              view="Money Transfer"
              limit_per_txn={
                remitterStatus.limitPerTransaction
                  ? remitterStatus.limitPerTransaction
                  : 5000
              }
            />
            {/* <Box sx={{ display: { md: "none", sm: "block", xs: "block" } }}>
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
            </Box> */}
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
          dmtValue={dmtValue}
          bene={ben}
          mob={mobile && mobile}
          getRemitterStatus={getRemitterStatus}
          apiEnd={
            dmtValue === "dmt1"
              ? ApiEndpoints.REMOVE_BENE
              : ApiEndpoints.DMT2_REM_BENE
          }
          view="moneyTransfer"
        />
      </Box>
    </Card>
  );
};

export default BeneCardComponent;
