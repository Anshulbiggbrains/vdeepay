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
import AccountVerificationUpi from "../modals/AccountVerificationUpi";
import RetUpiTransferModal from "../modals/RetUpiTransferModal";

const BeneCardUpi = ({
  ben,
  index,
  mobile,
  remitterStatus,
  getRemitterStatus,
 
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
      m: { md: 1, sm: 0.5, xs: 0.5,lg:0.5}, 
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
         display:"flex",
         justifyContent:"flex-start"
        }}
      >
        <Grid container>
          <Grid item xs={4} sm={4} md={4}>
            <Typography sx={{ textAlign: "left", fontWeight: "500" }}>
            VPA  
          </Typography>
            <Typography sx={{ textAlign: "left" ,fontSize:"12px"}}>
              {ben.account ? ben.account : ben.bene_acc}
            </Typography>
          </Grid>
         
        </Grid>
        <Grid
          sx={{
            display: "flex", 
            alignItems: "center",
            mt: { md: 2, sm: 1, xs: 1,lg:2 },
            justifyContent: "flex-end", // Align to the right
          }}
        >
        
          <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
          {ben.last_success_date ? (
              <>
                <Typography sx={{ color: "#1977f2" }}>Verified</Typography>
                <VerifiedIcon sx={{ fontSize: "17px", color: "#1977f2", mr: 0.5 }} />
              </>
            ) :(
            <AccountVerificationUpi rem_number={mobile} ben={ben} />
            )}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: 1 }}>
          <RetUpiTransferModal ben={ben} rem_number={mobile} />

            
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
                                mob={mobile}
                                getRemitterStatus={getRemitterStatus}
                                apiEnd={ApiEndpoints.REMOVE_BENE_UPI}
                                view="expressTransfer"
                              />
      </Box>
    </Card>
    // <Card
    //   className="card-css"
    //   key={index}
    //   sx={{
    //     display: "flex",
    //     justifyContent: "space-between", // Changed to space-between
    //     alignItems: "center",
    //     px: 2,
    //     py: 1.5,
    //     m: { md: 2, sm: 1, xs: 1 },
    //     position: "relative",
    //   }}
    // >
    //   <Grid
    //     sx={{
    //       alignItems: "center",
    //       justifyContent: "center",
    //       display: { md: "flex", sm: "none", xs: "none" },
    //       background: randomColors(
    //         ben && ben.name
    //           ? ben.name.charAt(0).toUpperCase()
    //           : ben.bene_name.charAt(0).toUpperCase()
    //       ),
    //       borderRadius: "4px",
    //       height: "64px",
    //       width: "64px",
    //       position: "relative",
    //       p: 1,
    //     }}
    //   >
    //     <Typography sx={{ fontSize: "40px" }}>
    //       {ben && ben.name
    //         ? ben.name.charAt(0).toUpperCase()
    //         : ben.bene_name.charAt(0).toUpperCase()}
    //     </Typography>
    //   </Grid>

    //   <Grid
    //     sx={{
    //       flexDirection: { xs: "column", md: "row" },
    //       width: "100%",
    //       ml: 2,
    //      display:"flex"
    //     }}
    //   >
    //     <Grid container>
          
    //       <Grid item xs={4} sm={4}md={4} >
    //         <Typography sx={{ textAlign: "left", fontWeight: "500" }}>
    //           Account No
    //         </Typography>
    //         <Typography sx={{ textAlign: "left"}}>
    //           {ben.account ? ben.account : ben.bene_acc}
    //         </Typography>
    //       </Grid>
         
    //     </Grid>
    //     <Box sx={{  display: "flex", 
    //         alignItems: "center",
    //         mt: { md: 2, sm: 1, xs: 1,lg:2 },
    //         justifyContent: "flex-end", }}>
    //             {ben.last_success_date ? (

    //           <>
    //             <Typography sx={{ color: "#1977f2" }}>Verified</Typography>
    //             <VerifiedIcon sx={{ fontSize: "17px", color: "#1977f2", mr: 0.5 }} />

    //           </>
    //         ) : (
    //           <AccountVerificationUpi rem_number={mobile} ben={ben} />
    //         )}
    //       </Box>
    //     <Grid
    //       sx={{
    //         display: "flex", 
    //         alignItems: "center",
    //         mt: { md: 2, sm: 1, xs: 1,lg:2 },
    //         justifyContent: "flex-end", // Align to the right
    //       }}
    //     >

    //  <RetUpiTransferModal ben={ben} rem_number={mobile} />
    //     </Grid>
    //   </Grid>

    //   {/* Position the Delete button in the top right corner */}
    //   <Box
    //     sx={{
    //       position: "absolute",
    //       top: "3px",
    //       right: "2px",
    //     }}
    //   >
    //       <DeleteBeneficiaryModal
    //                        bene={ben}
    //                              mob={mobile}
    //                             getRemitterStatus={getRemitterStatus}
    //                             apiEnd={ApiEndpoints.REMOVE_BENE_UPI}
    //                             view="expressTransfer"
    //                          />
    //   </Box>
    // </Card>
  );
};

export default BeneCardUpi;
