import { Box, Container } from "@mui/material";
import React from "react";

const RefundPolicy = () => {
  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <div className="landing-bg_biggpay_font">Refund &amp; Policy</div>
        <Box
          style={{
            width: "60px",
            height: "10px",
            backgroundColor: "#dc5f5f",
          }}
        ></Box>
        <div>
          <div>
            <div>
              <p className="landing-bg_para">
                Once a User chooses to avail any service plan/offer announced by{" "}
                <strong> MOBIFAST SOLUTIONS</strong> and agrees to buy that
                plan/offer by due payment for that plan/offer to{" "}
                <strong> MOBIFAST SOLUTIONS</strong>, such payment by User shall
                not be refunded by <strong> MOBIFAST SOLUTIONS</strong> under
                any circumstances whatsoever. Please note that such act of
                buying
                <strong> MOBIFAST SOLUTIONS</strong> plan is irreversible
                process under the applicable law.
              </p>

              <p className="landing-bg_para">
                Post receipt of payment from the User for the above-mentioned
                plan, <strong> MOBIFAST SOLUTIONS</strong> shall create User ID
                in its system ONLY post successful KYC verification of such
                User. If the User is unable to get successful KYC done,{" "}
                <strong> MOBIFAST SOLUTIONS</strong> shall not be able to create
                User ID of such User. Thus, in order to avail
                <strong> MOBIFAST SOLUTIONS</strong> services on its portal,
                User has to mandatorily get his successful KYC verification
                done.
              </p>
              <p className="landing-bg_para">
                Post User Id creation, while availing various services on
                <strong> MOBIFAST SOLUTIONS</strong> portal, a transactions
                which have failed for any reason directly attributable to{" "}
                <strong> MOBIFAST SOLUTIONS</strong> and
                <strong> MOBIFAST SOLUTIONS</strong> has received corresponding
                confirmation from the payment gateway, will be automatically
                refunded to User’s bank account within 3-21 working days from
                the date of transaction and a confirmation mail will be sent to
                User’s email id registered with{" "}
                <strong> MOBIFAST SOLUTIONS</strong>. Please note that only the
                actual transaction amount will be refunded excluding payment
                gateway charges and all applicable taxes. However, for cases
                where User has received a successful completion confirmation but
                not received services, User is required to submit a complaint by
                sending an e-mail to customer care Email ID given on this
                website. <strong> MOBIFAST SOLUTIONS</strong> shall enquire the
                matter after receiving the complaint from the User and based on
                the enquiry
                <strong> MOBIFAST SOLUTIONS</strong> may refund the payment. In
                all cases,
                <strong> MOBIFAST SOLUTIONS</strong> liability will be
                restricted to providing User a valid refund to the extent of
                corresponding payment received by{" "}
                <strong> MOBIFAST SOLUTIONS</strong> with respect to a
                particular transaction. <strong> MOBIFAST SOLUTIONS</strong>{" "}
                shall not be responsible for any other claim or consequential
                liability arising out of failed services on our system.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default RefundPolicy;
