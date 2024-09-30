import "../scss/PaymentReceipt.css";
import MyButton from "./MyButton";
import { toInt } from "../utils/TextUtil";
import { datemonthYear, myDateDDMMyy } from "../utils/DateUtils";
import { numIn2Dec } from "../utils/RupeeUtil";
import LogoComponent from "./LogoComponent";
import { useContext } from "react";
import AuthContext from "../store/AuthContext";
import PrintIcon from "@mui/icons-material/Print";
import { useEffect } from "react";
import { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  Grid,
} from "@mui/material";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TableContainer,
} from "@mui/material";
import { LocationOn, Email, Phone } from "@mui/icons-material";
import { breakAmt } from "../utils/MTBreakAmtUtil";

let row_data = [];
// let rowMapping = [];
let totalAmount = 0;
let dateToday = new Date();
let date = dateToday.getDate();
let month = dateToday.getMonth() + 1;
let year = dateToday.getFullYear();
let separator = "-";
let invoiceDate = `${year}${separator}${
  month < 10 ? `0${month}` : `${month}`
}${separator}${date}`;

const PaymentReceipt = () => {
  const [rowMapping, setRowMapping] = useState([]);
  row_data = JSON.parse(localStorage.getItem("selectedRow"));
  // console.log("localStorage=> ", row_data);
  const authCtx = useContext(AuthContext);
  const user = authCtx.user;
  const [value, setValue] = useState(1);

  const [firstTime, setFirstTime] = useState(true);
  const [splitAmtArr, setSplitAmtArr] = useState([]);
  // console.log("splitamtarr", splitAmtArr);
  // console.log("first", firstTime);
  //   user = JSON.parse(localStorage.getItem("localUser"));

  const handleChange = (event) => {
    setValue(event.target.value * 1);
  };
  const dummyData = {
    outletName: "RAHUL TELECOM",
    mobileNo: "9999445469",
    beneficiary: "Sonu",
    accountNo: "37296396227",
    bankName: "Bank of Baroda",
    dateTime: "28/03/2024 06:39 PM",
    tid: "3729639622665567",
    utr: "40881977779",
    amount: 5000,
    status: "Success",
  };

  useEffect(() => {
    // 1 is large 2 is small
    if (value === 1) {
      setRowMapping(
        row_data && row_data.length > 0
          ? // eslint-disable-next-line array-callback-return
            row_data.map((payment, index) => {
              //
              if (
                payment.operator === "Super Transfer" ||
                payment.operator === "Vendor Payments"
              ) {
                if (firstTime) totalAmount += toInt(payment?.amount);
                const amt_arr = breakAmt(payment?.amount, 5000);
                const arrData = amt_arr.map((splitItem, index) => {
                  return {
                    amount: splitItem,
                    created_at: payment.created_at,
                    number: payment.number,
                    ben_name: payment.ben_name,
                    operator: payment.operator,
                    ben_acc: payment.ben_acc,
                    ifsc: payment.ifsc,
                    op_id: payment.op_id,
                    status: payment.status,
                  };
                });
                let splitAmt = arrData.reverse();
                // console.log("amt_arr", amt_arr);
                setSplitAmtArr(splitAmt);
              } else {
                if (firstTime) totalAmount += toInt(payment?.amount);

                // console.log(`payment ${index} => ${JSON.stringify(payment, null, 2)}`)
                return (
                  <tr style={{ fontSize: "12px" }}>
                    <td>
                      {payment && payment.created_at
                        ? datemonthYear(payment.created_at)
                        : ""}
                    </td>
                    <td
                      style={{
                        textTransform: "lowercase",
                      }}
                    >
                      {payment && payment.number ? payment.number : " "} <br />
                      {payment && payment.ben_name ? payment.ben_name : " "}
                    </td>
                    <td
                      style={{
                        textTransform: "lowercase",
                      }}
                    >
                      {payment &&
                      payment.operator &&
                      (payment.operator === "Vendor Payments" ||
                        payment.operator === "Express Transfer" ||
                        payment.operator === "Domestic Money Transfer" ||
                        payment.operator === "Domestic Money Transfer 2")
                        ? "Money Transfer"
                        : payment.operator}
                    </td>
                    <td>
                      {payment && payment.ben_acc ? payment.ben_acc : ""}
                      <br />
                      {payment && payment.ifsc ? payment.ifsc : ""}
                    </td>
                    {/* <td>{payment && payment.ifsc ? payment.ifsc : ""}</td> */}
                    <td>{payment && payment.op_id ? payment.op_id : ""}</td>
                    <td>
                      {payment && payment.amount
                        ? `${numIn2Dec(payment.amount)} INR`
                        : ""}
                      <br />

                      {payment.operator === "Nepal Transfer" &&
                      payment &&
                      payment.amount
                        ? `${numIn2Dec(payment.amount * 1.6)} NPR`
                        : ""}
                    </td>
                    <td>{payment && payment.status ? payment.status : ""}</td>
                  </tr>
                );
              }
            })
          : []
      );
    } else {
      setRowMapping(
        row_data && row_data.length > 0
          ? row_data.map((payment, index) => {
              if (firstTime) totalAmount += toInt(payment?.amount);

              // console.log(`payment ${index} => ${JSON.stringify(payment, null, 2)}`)
              return (
                <div className="just-dashed-divider just-padding">
                  <tr style={{ fontSize: "12px" }}>
                    <td>Date</td>
                    <td>
                      {payment && payment.created_at
                        ? datemonthYear(payment.created_at)
                        : ""}
                    </td>
                  </tr>
                  {/*  */}
                  <tr style={{ fontSize: "12px", minHeight: "45px" }}>
                    <td>Customer</td>
                    <td
                      style={{
                        textTransform: "lowercase",
                      }}
                    >
                      {payment && payment.number ? payment.number : " "} <br />
                      {payment && payment.ben_name ? payment.ben_name : " "}
                    </td>
                  </tr>
                  {/*  */}
                  <tr style={{ fontSize: "12px" }}>
                    <td>Operator</td>
                    <td
                      style={{
                        textTransform: "lowercase",
                      }}
                    >
                      {payment &&
                      payment.operator &&
                      (payment.operator === "Vendor Payments" ||
                        payment.operator === "Express Transfer" ||
                        payment.operator === "Domestic Money Transfer" ||
                        payment.operator === "Domestic Money Transfer 2")
                        ? "Money Transfer"
                        : payment.operator}
                    </td>
                  </tr>
                  {/*  */}
                  {/* <tr style={{ fontSize: "12px" }}>
                    <td>Operator</td>
                    <td
                      style={{
                        textTransform: "lowercase",
                      }}
                    >
                      {payment && payment.operator
                        ? payment.operator === "Vendor Payments"
                          ? "Express Transfer"
                          : payment.operator
                        : ""}
                    </td>
                  </tr> */}
                  {/*  */}
                  <tr style={{ fontSize: "12px", minHeight: "45px" }}>
                    <td>Acc Details</td>
                    <td>
                      {payment && payment.ben_acc ? payment.ben_acc : ""}
                      <br />
                      {payment && payment.ifsc ? payment.ifsc : ""}
                    </td>
                  </tr>
                  {/*  */}
                  <tr style={{ fontSize: "12px" }}>
                    <td> Operator ID</td>
                    <td>{payment && payment.op_id ? payment.op_id : ""}</td>
                  </tr>
                  {/*  */}
                  <tr style={{ fontSize: "12px" }}>
                    <td>Amount</td>
                    <td>
                      {payment && payment.amount
                        ? `${numIn2Dec(payment.amount)} INR`
                        : ""}
                      <br />
                      {payment.operator === "Nepal Transfer" &&
                      payment &&
                      payment.amount
                        ? `${numIn2Dec(payment.amount * 1.6)} NPR`
                        : ""}
                    </td>
                  </tr>
                  {/*  */}
                  <tr style={{ fontSize: "12px" }}>
                    <td>Status</td>
                    <td>{payment && payment.status ? payment.status : ""}</td>
                  </tr>
                </div>
              );
            })
          : []
      );
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (value === 1) {
      row_data &&
        row_data.length > 0 &&
        // eslint-disable-next-line array-callback-return
        row_data.map((payment) => {
          // if (payment.operator === "Super Transfer") {
          // console.log("here in oter effet");

          // }
          if (
            payment.operator === "Super Transfer" ||
            payment.operator === "Vendor Payments"
          ) {
            setRowMapping(
              splitAmtArr.map((splitItem) => {
                return (
                  <tr style={{ fontSize: "12px" }}>
                    <td>
                      {splitItem && splitItem.created_at
                        ? datemonthYear(splitItem.created_at)
                        : ""}
                    </td>
                    <td
                      style={{
                        textTransform: "lowercase",
                      }}
                    >
                      {splitItem && splitItem.number ? splitItem.number : " "}{" "}
                      <br />
                      {splitItem && splitItem.ben_name
                        ? splitItem.ben_name
                        : " "}
                    </td>
                    <td
                      style={{
                        textTransform: "lowercase",
                      }}
                    >
                      {splitItem && splitItem.operator
                        ? splitItem.operator === "Vendor Payments"
                          ? "Express Transfer"
                          : splitItem.operator
                        : ""}
                    </td>
                    <td>
                      {splitItem && splitItem.ben_acc ? splitItem.ben_acc : ""}
                      <br />
                      {splitItem && splitItem.ifsc ? splitItem.ifsc : ""}
                    </td>
                    {/* <td>{splitItem && splitItem.ifsc ? splitItem.ifsc : ""}</td> */}
                    <td>
                      {splitItem && splitItem.op_id ? splitItem.op_id : ""}
                    </td>
                    <td>
                      {splitItem && splitItem.amount
                        ? numIn2Dec(splitItem.amount)
                        : ""}
                    </td>
                    <td>
                      {splitItem && splitItem.status ? splitItem.status : ""}
                    </td>
                  </tr>
                );
              })
            );
          }
        });
    } else {
      row_data.length > 0 &&
        // eslint-disable-next-line array-callback-return
        row_data.map((payment) => {
          if (
            payment.operator === "Super Transfer" ||
            payment.operator === "Vendor Payments"
          ) {
            setRowMapping(
              splitAmtArr && splitAmtArr.length > 0
                ? splitAmtArr.map((splitItem) => {
                    // if (firstTime) totalAmount += toInt(payment?.amount);

                    // console.log(`payment ${index} => ${JSON.stringify(payment, null, 2)}`)
                    return (
                      <div className="just-dashed-divider just-padding">
                        <tr style={{ fontSize: "12px" }}>
                          <td>Date</td>
                          <td>
                            {splitItem && splitItem.created_at
                              ? datemonthYear(splitItem.created_at)
                              : ""}
                          </td>
                        </tr>
                        {/*  */}
                        <tr style={{ fontSize: "12px" }}>
                          <td>Customer</td>
                          <td
                            style={{
                              textTransform: "lowercase",
                            }}
                          >
                            {splitItem && splitItem.number
                              ? splitItem.number
                              : " "}{" "}
                            <br />
                            {splitItem && splitItem.ben_name
                              ? splitItem.ben_name
                              : " "}
                          </td>
                        </tr>
                        {/*  */}
                        <tr style={{ fontSize: "12px" }}>
                          <td>Operator</td>
                          <td
                            style={{
                              textTransform: "lowercase",
                            }}
                          >
                            {splitItem && splitItem.operator
                              ? splitItem.operator === "Vendor Payments"
                                ? "Express Transfer"
                                : splitItem.operator
                              : ""}
                          </td>
                        </tr>
                        {/*  */}
                        {/* <tr style={{ fontSize: "12px" }}>
                          <td>Operator</td>
                          <td
                            style={{
                              textTransform: "lowercase",
                            }}
                          >
                            {splitItem && splitItem.operator
                              ? splitItem.operator === "Vendor Payments"
                                ? "Express Transfer"
                                : splitItem.operator
                              : ""}
                          </td>
                        </tr> */}
                        {/*  */}
                        <tr style={{ fontSize: "12px" }}>
                          <td>Acc Details</td>
                          <td>
                            {splitItem && splitItem.ben_acc
                              ? splitItem.ben_acc
                              : ""}
                            <br />
                            {splitItem && splitItem.ifsc ? splitItem.ifsc : ""}
                          </td>
                        </tr>
                        {/*  */}
                        <tr style={{ fontSize: "12px" }}>
                          <td> Operator ID</td>
                          <td>
                            {splitItem && splitItem.op_id
                              ? splitItem.op_id
                              : ""}
                          </td>
                        </tr>
                        {/*  */}
                        <tr style={{ fontSize: "12px" }}>
                          <td>Amount</td>
                          <td>
                            {splitItem && splitItem.amount
                              ? numIn2Dec(splitItem.amount)
                              : ""}
                          </td>
                        </tr>
                        {/*  */}
                        <tr style={{ fontSize: "12px" }}>
                          <td>Status</td>
                          <td>
                            {splitItem && splitItem.status
                              ? splitItem.status
                              : ""}
                          </td>
                        </tr>
                      </div>
                    );
                  })
                : []
            );
          }
        });
    }
  }, [value, splitAmtArr]);

  if (value === 2) {
    return (
      <div className="like-parent-border">
        <div className="d-flex btnPrint">
          <FormControl fullWidth sx={{ textAlign: "left" }}>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={(e) => {
                setFirstTime(false);
                handleChange(e);
              }}
              default
              row
            >
              <FormControlLabel
                value={1}
                control={<Radio />}
                label="Large Receipt"
                // labelPlacement="top"
              />
              <FormControlLabel
                value={2}
                control={<Radio />}
                label="Small Receipt"
                // labelPlacement="top"
              />
            </RadioGroup>
          </FormControl>
          <MyButton
            text="Print"
            icon={<PrintIcon />}
            onClick={() => {
              setTimeout(() => {
                window.print();
              }, 300);
            }}
          />
        </div>
        <Grid className="parent-border-vertical">
          {/*  */}
          <Grid
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
            }}
          >
            <Grid>
              <LogoComponent width="60%" />
            </Grid>

            <Grid className="just-text-right">
              {user ? user.establishment : "Null"}

              {user ? user.username : "Null"}
            </Grid>
          </Grid>
          {/*  */}
          <div
            className="d-flex justify-content-center"
            style={{
              marginBottom: "0.2cm",
              marginTop: "0.2cm",
            }}
          >
            <h6>Transaction Summary</h6>
          </div>
          {/*  */}
          <div className="just-divider"></div>
          <table className="" style={{ borderSpacing: 0, width: "100%" }}>
            {rowMapping}
          </table>

          <div className="parent  parent-invoice-total mb-3">
            <span className="invoice-total-text child">TOTAL :</span>
            <span className="invoice-total child diff-fonts">
              ₹ {totalAmount}/-
            </span>
          </div>
          <div className="btnPrint d-flex justify-content-center mx-5 my-1">
            <MyButton
              text="Print"
              icon={<PrintIcon />}
              onClick={() => {
                window.print();
              }}
            />
          </div>
        </Grid>
      </div>
    );
  } else {
    return (
      <>
        <div className="like-parent-border btnPrint">
          <FormControl fullWidth sx={{ textAlign: "left" }}>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={(e) => {
                setFirstTime(false);
                handleChange(e);
              }}
              default
              row
            >
              <FormControlLabel
                value={1}
                control={<Radio />}
                label="Large Receipt"
                // labelPlacement="top"
              />
              <FormControlLabel
                value={2}
                control={<Radio />}
                label="Small Receipt"
                // labelPlacement="top"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <Grid className="parent-border">
          <Box sx={{ px: 2, py: 1, border: "2px solid #1877F2", mt: 2 }}>
            <Grid container justifyContent="space-between" lg={12}>
              {/* Left Side - Logo */}
              <Grid item lg={6} sx={{ textAlign: "left", mt: 1 }}>
                <LogoComponent width="40%" />
                <Typography
                  variant="body2"
                  sx={{ fontSize: "0.875rem", color: "#256BC5", mt: 1 }}
                >
                  Mobifast Solutions Private Limited
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "1.2rem", color: "#000000", mt: 2 }}
                >
                  Payment Confirmation
                </Typography>
              </Grid>

              {/* Right Side - Location, Email, and Phone */}
              <Grid item lg={6}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                  marginLeft="2rem"
                >
                  {/* Align to the right */}

                  {/* Location Icon with Dummy Address */}
                  <Box sx={{ display: "flex", mt: 1, color: "#256BC5" }}>
                    <LocationOn color="#256BC5" fontSize="small" />
                    <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                      Flat No. 8, Pocket 6, Sector 22, Rohini, Delhi, 110086
                    </Typography>
                  </Box>

                  {/* Email Icon with Dummy Email */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mt: 1,
                      gap: 1,
                    }}
                  >
                    <Email color="primary" fontSize="small" />
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "0.875rem", color: "#256BC5" }}
                    >
                      Email: impsguru@gmail.com
                    </Typography>
                  </Box>

                  {/* Phone Icon with Dummy Mobile Number */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mt: 1,
                      gap: 1,
                    }}
                  >
                    <Phone color="primary" fontSize="small" />
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "0.875rem", color: "#256BC5" }}
                    >
                      Phone: 84474445497
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            {/* <Typography>Payment Confirmations</Typography> */}
            <Grid
              container
              sx={{ justifyContent: "start", fontSize: "17px", mt: 5 }}
            >
              {/* Left column */}
              <Grid item xs={12} sm={6} container>
                <Grid item xs={12} lg={6} sm={6}>
                  <Typography variant="body" sx={{ color: "#295A9B" }}>
                    Outlet Name:
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={6} sm={6}>
                  <Typography variant="body" sx={{ color: "#256BC5" }}>
                    {dummyData.outletName}
                  </Typography>
                </Grid>

                <Grid item xs={12} lg={6} sm={6}>
                  <Typography variant="body" sx={{ color: "#295A9B" }}>
                    Beneficiary:
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={6} sm={6}>
                  <Typography variant="body" sx={{ color: "#256BC5" }}>
                    {dummyData.beneficiary}
                  </Typography>
                </Grid>

                <Grid item xs={12} lg={6} sm={6}>
                  <Typography variant="body" sx={{ color: "#295A9B" }}>
                    Bank Name:
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={6} sm={6}>
                  <Typography variant="body" sx={{ color: "#256BC5" }}>
                    {dummyData.bankName}
                  </Typography>
                </Grid>
              </Grid>

              {/* Right column */}
              <Grid
                item
                xs={12}
                sm={6}
                container
                justifyContent="center"
                textAlign="left"
              >
                <Grid item xs={12} lg={6} sm={6}>
                  <Typography variant="body" sx={{ color: "#295A9B" }}>
                    Mobile No:
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={6} sm={6}>
                  <Typography variant="body" sx={{ color: "#256BC5" }}>
                    {dummyData.mobileNo}
                  </Typography>
                </Grid>

                <Grid item xs={12} lg={6} sm={6}>
                  <Typography variant="body" sx={{ color: "#295A9B" }}>
                    Account No:
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={6} sm={6}>
                  <Typography variant="body" sx={{ color: "#256BC5" }}>
                    {dummyData.accountNo}
                  </Typography>
                </Grid>

                <Grid item xs={12} lg={6} sm={6}>
                  <Typography variant="body" sx={{ color: "#295A9B" }}>
                    Date & Time:
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={6} sm={6}>
                  <Typography variant="body" sx={{ color: "#256BC5" }}>
                    {dummyData.dateTime}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Box display="flex" justifyContent="center" textAlign="center">
              <Typography
                variant="body"
                color="#FF0800"
                sx={{
                  width: "auto", // Change from 40% to auto to avoid width affecting centering
                  backgroundColor: "#FFEFD5",
                  padding: "5px 22px ",
                  textAlign: "center",
                  borderRadius: "20px",
                  border: "1px solid #F7C992",
                  font: "16px",
                  mt: 4,
                }}
              >
                Transaction Summary
              </Typography>
            </Box>

            <TableContainer
              sx={{
                mt: 1.5,
                textAlign: "left",
                color: "#256BC5",
                fontweight: 700,
              }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ border: "1px solid blue" }}>TID</TableCell>
                    <TableCell sx={{ border: "1px solid blue" }}>
                      Type
                    </TableCell>
                    <TableCell sx={{ border: "1px solid blue" }}>UTR</TableCell>
                    <TableCell sx={{ border: "1px solid blue" }}>
                      Amount
                    </TableCell>
                    <TableCell sx={{ border: "1px solid blue" }}>
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ border: "1px solid blue" }}>
                      {dummyData.tid}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid blue" }}>
                      IMPS
                    </TableCell>
                    <TableCell sx={{ border: "1px solid blue" }}>
                      {dummyData.utr}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid blue" }}>
                      {dummyData.amount}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid blue" }}>
                      {dummyData.status}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Grid
              sx={{
                justifyContent: "space-between",
                display: "flex",
                color: "#256BC5",
              }}
            >
              <Grid sx={{ justifyContent: "start" }}>
                <Box
                  sx={{
                    justifyContent: "start",
                    display: "flex",
                    mt: 2,
                    color: "#256BC5",
                    fontWeight: 800,
                  }}
                >
                  <Typography variant="body1">
                    Total Amount: Rs. {dummyData.amount}
                  </Typography>
                </Box>
                <Box sx={{ justifyContent: "start", display: "flex", mt: 1 }}>
                  <Typography variant="body1">
                    Amount ( In Words ) : Five Thousand Only
                  </Typography>
                </Box>
              </Grid>

              <Grid mt={3} sx={{ textAlign: "right", mr: 2, fontSize: "13px" }}>
                <div className="btnPrint ">
                  <MyButton
                    text="Print"
                    icon={<PrintIcon />}
                    onClick={() => {
                      window.print();
                    }}
                  />
                </div>
              </Grid>
            </Grid>

            <div
              sx={{
                textAlign: "right",
                alignItems: "end",
                color: "#256BC5",
              }}
            >
              <Typography variant="caption">
                This is a system generated receipt, hence no seal or signature
                required.
              </Typography>
            </div>
            <Box
              sx={{
                textAlign: "left",
                alignItems: "end",
                color: "#256BC5",
              }}
            >
              <Typography variant="caption">
                2024 All Rights Reserved
              </Typography>
            </Box>
          </Box>
        </Grid>
      </>
    );
  }
};

export default PaymentReceipt;
