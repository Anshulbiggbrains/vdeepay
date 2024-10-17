import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import {
  Logo,
  globeIcon,
  impsguruStamp,
  iphoneIcon,
  locIcon,
  messIcon,
} from "../iconsImports";
import { getEnv } from "../theme/setThemeColor";
import { getFirmAddress } from "../theme/setThemeColor";
import robotoBold from "../fonts/Roboto-Bold.ttf";
import { ddmmyyyy } from "../utils/DateUtils";
import moment from "moment";

// Font.register(`https://fonts.googleapis.com/css2?family=Poppins&display=swap`, {
//   family: "Poppins-Light",
//   weight: "100,200,300",
// });
Font.register({
  family: "roboto-bold",
  src: robotoBold,
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 50,
    position: "relative",
  },
  section: {
    marginBottom: "30px",
  },
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },
  image: {
    width: "160px",
  },
  stamp_image: {
    width: "200px",
    marginLeft: "-15px",
  },
  bigtext: {
    fontSize: "200px",
    letterSpacing: "0.4px",
  },
  text: {
    fontSize: "11px",
    letterSpacing: "0.4px",
    marginBottom: "30px",
  },
  bold: {
    fontWeight: 900,
  },
});
const BcPdf = ({ user }) => {
  const envName = getEnv();

  return (
    <Document>
      {/* page 1 */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Image src={Logo} style={styles.image} />
        </View>

        <Text style={styles.text}>
          Letter Date: {moment(Date.now()).format("Do MMM YYYY")}
        </Text>

        <Text
          style={{
            textAlign: "center",
            textTransform: "uppercase",
            textDecoration: "underline",
            fontSize: "15px",
            marginBottom: "35px",
          }}
        >
          TO WHOMSOEVER IT MAY CONCERN
        </Text>

        <Text style={styles.text}>
          LINKSTECH SERVICES PRIVATE LIMITED s Private Limited (“{envName}”) a
          company incorporated under The Companies Act, 1956 and having its
          registered office at {getFirmAddress()} is a Business Correspondent
          with BCs.
        </Text>

        <Text style={styles.text}>
          {envName} is authorized by the above BCs to act as a Business
          Correspondent and appoint Distribution Partners to deliver mainstream
          financial and citizen services to Customers under the guidelines
          issued by RBI vide RBI/2010-11/217 DBOD. No.BL.BC.43/22.01.009/2010-11
          dated September 28, 2010.
        </Text>

        <Text style={styles.text}>
          {envName} has authorised{" "}
          <Text style={{ fontFamily: "roboto-bold" }}>
            {user?.name?.toUpperCase()}
          </Text>{" "}
          of{" "}
          <Text style={{ fontFamily: "roboto-bold" }}>
            {user?.establishment?.toUpperCase()}
          </Text>{" "}
          as a Distribution Partner to undertake cash management activities like
          cash deposits and cash withdrawals for the customers
        </Text>

        <Text
          style={{
            fontSize: "11px",
            fontFamily: "roboto-bold",
            letterSpacing: "0.4px",
            marginBottom: "50px",
          }}
        >
          In view of the recent Coronavirus (COVID 19) outbreak, banking
          services provided by banks & business correspondents have been
          classified as “Essential Services” according to the notification
          released by Ministry of Home Affairs’ Order No. 40-3/2020-DM-I (A)
          Dated 24 March 2020, Section E, sub-clause (b) to Clause 4.
        </Text>

        <Image src={impsguruStamp} style={styles.stamp_image} />

        <Text style={styles.text}>Authorised Signatory</Text>

        <Text style={styles.text}>Enclosures: 1. 194N Letter</Text>

        {/* footer */}
        <View style={{ position: "absolute", bottom: "16px", left: "48px" }}>
          <Text
            style={{ fontSize: "8px", color: "#1877f2", marginBottom: "0px" }}
          >
            LINKSTECH SERVICES PRIVATE LIMITED s Private Limited |{" "}
            <Text style={{ marginBottom: "0px" }}>
              CIN: U74999DL2017PTC316608
            </Text>
          </Text>
          <Text style={{ marginBottom: "10px", color: "#1877f2" }}>
            __________________________________________________
          </Text>

          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              position: "",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                src={locIcon}
                style={{ width: "18px", marginRight: "8px" }}
              />
              <Text
                style={{
                  fontSize: "8px",
                  color: "#1877f2",
                  marginBottom: "0px",
                }}
              >
                {`Plot No. 8 Pocket, 6, Sector 22, Rohini,
           Delhi, 110086`}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                src={iphoneIcon}
                style={{ width: "15px", marginRight: "8px" }}
              />
              <Text
                style={{
                  fontSize: "8px",
                  color: "#1877f2",
                  marginBottom: "0px",
                }}
              >
                01149954822
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                src={messIcon}
                style={{ width: "15px", marginRight: "8px" }}
              />
              <Text
                style={{
                  fontSize: "8px",
                  color: "#1877f2",
                  marginBottom: "0px",
                }}
              >
                impsguru@gmail.com
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                src={globeIcon}
                style={{ width: "15px", marginRight: "8px" }}
              />
              <Text
                style={{
                  fontSize: "8px",
                  color: "#1877f2",
                  marginBottom: "0px",
                }}
              >
                www.impsguru.com
              </Text>
            </View>
          </View>
        </View>
      </Page>
      {/* page 2 */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Image src={Logo} style={styles.image} />
        </View>

        <Text style={styles.text}>
          Letter Date: {moment(Date.now()).format("Do MMM YYYY")}
        </Text>

        <Text
          style={{
            fontSize: "11px",
            letterSpacing: "0.4px",
            marginBottom: "15px",
          }}
        >
          To,
        </Text>

        <Text
          style={{
            textAlign: "center",
            textTransform: "uppercase",
            textDecoration: "underline",
            fontSize: "15px",
            marginBottom: "25px",
          }}
        >
          TO WHOMSOEVER IT MAY CONCERN
        </Text>

        <Text
          style={{
            fontSize: "11px",
            letterSpacing: "0.4px",
            marginBottom: "20px",
          }}
        >
          We,{" "}
          <Text style={{ fontFamily: "roboto-bold" }}>
            LINKSTECH SERVICES PRIVATE LIMITED s Private Limited
          </Text>{" "}
          (CIN: U74999DL2017PTC316608), a company registered under Companies act
          1956 having its registered office at {getFirmAddress()}{" "}
          <Text style={{ fontFamily: "roboto-bold" }}>
            (“
            {envName}”)
          </Text>{" "}
          is Business Correspondent of Instantpay India Limited and various
          other banks. Being a Business Correspondent, {envName} is permitted by
          Instantpay India Limited to undertake Business Correspondent Services
          (“Services”) and appoint BC agents for Bank in accordance with the
          goals envisaged by Reserve Bank of India (“RBI”) for enhanced
          financial inclusion and in achieving greater outreach of the banking
          sector.
        </Text>

        <Text
          style={{
            fontSize: "11px",
            letterSpacing: "0.4px",
            marginBottom: "20px",
          }}
        >
          We hereby undertake and affirm that{" "}
          <Text style={{ fontFamily: "roboto-bold" }}>{envName}</Text> appointed{" "}
          <Text style={{ fontFamily: "roboto-bold" }}>
            {user?.name?.toUpperCase()}{" "}
          </Text>{" "}
          of{" "}
          <Text style={{ fontFamily: "roboto-bold" }}>
            {user?.establishment?.toUpperCase()}
          </Text>{" "}
          having its registered office at{" "}
          <Text style={{ fontFamily: "roboto-bold" }}>{user?.address}</Text> as
          a “Partner” in accordance with the Agreement signed on{" "}
          <Text style={{ fontFamily: "roboto-bold" }}>
            {ddmmyyyy(user?.created_at)}
          </Text>{" "}
          for appointing AePS service enabled BC agents. Basis Partner request,{" "}
          {envName} states that it has no objection for Partner to appoint BC
          agent to facilitate the above service/s strictly in accordance with
          the applicable laws and local permissions..
        </Text>

        <Text
          style={{
            fontSize: "11px",
            fontWeight: "600",
            letterSpacing: "0.4px",
            marginBottom: "20px",
          }}
        >
          This letter is issued basis request of Partner and on no liability
          basis. {envName} reserves the right to revoke the authority granted
          herein under this letter and Partner shall ensure that, forthwith on
          communication of such revocation, Partner shall discontinue use of
          this letter, failing which Partner shall be solely liable and
          responsible for all losses, claim, damages arising out of acts,
          omissions by Partner or BC agent/personnel.
        </Text>

        <Text
          style={{
            fontSize: "11px",
            letterSpacing: "0.4px",
            marginBottom: "20px",
          }}
        >
          We authorize Partner to issue letter to BC agents under Section 194
          N(iii) of Income Tax Act, 1961 regarding exemption to Business
          Correspondents from TDS on cash withdrawals only in the approved
          enclosed format. Any deviations/changes/edits if any made by the
          Partner in the enclosed letter will negate the authority given to the
          Partner.
        </Text>

        <Image src={impsguruStamp} style={styles.stamp_image} />

        <Text style={styles.text}>Authorised Signatory</Text>

        <Text style={styles.text}>
          Date: {moment(Date.now()).format("Do MMM YYYY")}
        </Text>

        {/* footer */}
        <View style={{ position: "absolute", bottom: "16px", left: "48px" }}>
          <Text
            style={{ fontSize: "8px", color: "#1877f2", marginBottom: "0px" }}
          >
            LINKSTECH SERVICES PRIVATE LIMITED s Private Limited |{" "}
            <Text style={{ marginBottom: "0px" }}>
              CIN: U74999DL2017PTC316608
            </Text>
          </Text>
          <Text style={{ marginBottom: "10px", color: "#1877f2" }}>
            __________________________________________________
          </Text>

          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              position: "",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                src={locIcon}
                style={{ width: "18px", marginRight: "8px" }}
              />
              <Text
                style={{
                  fontSize: "8px",
                  color: "#1877f2",
                  marginBottom: "0px",
                }}
              >
                {`Plot No. 8 Pocket, 6, Sector 22, Rohini,
           Delhi, 110086`}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                src={iphoneIcon}
                style={{ width: "15px", marginRight: "8px" }}
              />
              <Text
                style={{
                  fontSize: "8px",
                  color: "#1877f2",
                  marginBottom: "0px",
                }}
              >
                01149954822
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                src={messIcon}
                style={{ width: "15px", marginRight: "8px" }}
              />
              <Text
                style={{
                  fontSize: "8px",
                  color: "#1877f2",
                  marginBottom: "0px",
                }}
              >
                impsguru@gmail.com
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                src={globeIcon}
                style={{ width: "15px", marginRight: "8px" }}
              />
              <Text
                style={{
                  fontSize: "8px",
                  color: "#1877f2",
                  marginBottom: "0px",
                }}
              >
                www.impsguru.com
              </Text>
            </View>
          </View>
        </View>
      </Page>
      {/* page 3 */}
      <Page size="A4" style={styles.page}>
        <Text
          style={{
            fontSize: "11px",
            letterSpacing: "0.4px",
            marginBottom: "5px",
          }}
        >
          The Branch Manager
        </Text>

        <Text style={{ marginBottom: "5px" }}>________________</Text>
        <Text style={{ marginBottom: "15px" }}>________________</Text>

        <Text
          style={{
            fontSize: "11px",
            letterSpacing: "0.4px",
            marginBottom: "15px",
            fontFamily: "roboto-bold",
          }}
        >
          Subject: Exemption to Business Correspondents from TDS on cash
          withdrawal above Rs.1 Crore u/s 194N (iii) of Income Tax Act, 1961.
        </Text>

        <Text
          style={{
            fontSize: "11px",
            letterSpacing: "0.4px",
            marginBottom: "15px",
          }}
        >
          Dear Sir/Madam,
        </Text>

        <Text
          style={{
            fontSize: "11px",
            letterSpacing: "0.4px",
            marginBottom: "15px",
          }}
        >
          This is to certify that we, LINKSTECH SERVICES PRIVATE LIMITED s
          Private Limited, a company registered under Companies Act, 1956 and
          having its registered office at {getFirmAddress()} (ImpsGuru) is
          Corporate Business Correspondent of Instantpay India Limited and other
          banks in accordance with the Guidelines, RBI/2010-11/217 DBOD. NO.
          BL.BC.43/22.01.009/2010-11 dated September 28, 2010 issued by Reserve
          Bank of India. The following are the details of Business Correspondent
          Agent (“BC Agent”) who maintains an account with your branch for
          managing cash flows for Business Correspondent activities. The said
          Agent is agent/sub-agent of ImpsGuru.
        </Text>
        <Text
          style={{
            fontSize: "11px",
            letterSpacing: "0.4px",
            marginBottom: "20px",
            textDecoration: "underline",
            fontFamily: "roboto-bold",
          }}
        >
          Business Correspondent Agent Details:
        </Text>
        <Text
          style={{
            fontSize: "11px",
            letterSpacing: "0.4px",
            marginBottom: "5px",
          }}
        >
          Name _____________________
        </Text>
        <Text
          style={{
            fontSize: "11px",
            letterSpacing: "0.4px",
            marginBottom: "5px",
          }}
        >
          PAN Number ______________________
        </Text>
        <Text
          style={{
            fontSize: "11px",
            letterSpacing: "0.4px",
            marginBottom: "15px",
          }}
        >
          Account Number ____________________
        </Text>
        <Text
          style={{
            fontSize: "11px",
            letterSpacing: "0.4px",
            marginBottom: "20px",
          }}
        >
          In light of recent directive as per Income Tax Act advising banks to
          exempt the TDS on withdrawals of Cash above Rs. 1 Crore from above
          account u/s 194N (iii). It may be noted that the amount settled by us
          from our Corporate BC Settlement Account shall be exempt from TDS
          deduction and any additional amount withdrawn by Business
          Correspondent Agent shall attract the said Income Tax provision for
          TDS deduction. The BC Agent confirms that the cash withdrawal during
          the Financial Year commencing from March 31, 2024 to April 1, 2023
          would be made exclusively for the purpose of business correspondent
          activities in accordance with the RBI Master Circular dated July 01,
          2014.
        </Text>
        <Text
          style={{
            fontSize: "11px",
            letterSpacing: "0.4px",
            marginBottom: "20px",
          }}
        >
          In the event there is any income tax demand (including interest or
          penalty) on the bank due to placing reliance on this declaration or
          the documents submitted by the BC Agent to bank or otherwise, we
          authorize bank to recover the same immediately on demand from the BC
          Agent whose details are mentioned above and provide the Bank with all
          information/documents that may be necessary for any proceedings
          including proceedings before Income tax authorities in India. It may
          be noted that any additional amount withdrawn or any other
          non-compliance by the Agent shall attract the said Income Tax
          Provision for TDS deduction.
        </Text>
        <Text
          style={{
            fontSize: "11px",
            letterSpacing: "0.4px",
            marginBottom: "20px",
          }}
        >
          Hence, we request your cooperation in this matter by not withholding
          any TDS for withdrawals performed by the above mentioned account
          holder.
        </Text>
        <Text
          style={{
            fontSize: "11px",
            letterSpacing: "0.4px",
            marginBottom: "20px",
          }}
        >
          For ___________________
        </Text>
        <Text
          style={{
            fontSize: "11px",
            letterSpacing: "0.4px",
            marginBottom: "20px",
          }}
        >
          Authorised Signatory
        </Text>
        {/* </View> */}
        <View style={{ position: "absolute", bottom: "16px", left: "48px" }}>
          <Text
            style={{ fontSize: "8px", color: "#1877f2", marginBottom: "0px" }}
          >
            LINKSTECH SERVICES PRIVATE LIMITED s Private Limited |{" "}
            <Text style={{ marginBottom: "0px" }}>
              CIN: U74999DL2017PTC316608
            </Text>
          </Text>
          <Text style={{ marginBottom: "10px", color: "#1877f2" }}>
            __________________________________________________
          </Text>
          {/* footer */}
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              position: "",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                src={locIcon}
                style={{ width: "18px", marginRight: "8px" }}
              />
              <Text
                style={{
                  fontSize: "8px",
                  color: "#1877f2",
                  marginBottom: "0px",
                }}
              >
                {`Plot No. 8 Pocket, 6, Sector 22, Rohini,
           Delhi, 110086`}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                src={iphoneIcon}
                style={{ width: "15px", marginRight: "8px" }}
              />
              <Text
                style={{
                  fontSize: "8px",
                  color: "#1877f2",
                  marginBottom: "0px",
                }}
              >
                01149954822
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                src={messIcon}
                style={{ width: "15px", marginRight: "8px" }}
              />
              <Text
                style={{
                  fontSize: "8px",
                  color: "#1877f2",
                  marginBottom: "0px",
                }}
              >
                impsguru@gmail.com
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                src={globeIcon}
                style={{ width: "15px", marginRight: "8px" }}
              />
              <Text
                style={{
                  fontSize: "8px",
                  color: "#1877f2",
                  marginBottom: "0px",
                }}
              >
                www.impsguru.com
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default BcPdf;
