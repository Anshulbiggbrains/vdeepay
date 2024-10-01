import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  Tooltip,
  Switch,
  TextField,
  FormControl,
  Typography,
  Button,
  Card,
} from "@mui/material";
import AuthContext from "../store/AuthContext";
import { postFormData } from "../network/ApiController";
import ApiEndpoints from "../network/ApiEndPoints";
import { apiErrorToast, okSuccessToast } from "../utils/ToastUtil";
import SendMoneyModal from "../modals/SendMoneyModal";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import { upiWeb } from "../iconsImports";
import QRCode from "react-qr-code";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Loader from "../component/loading-screen/Loader";
import { numberSetter } from "../utils/Currencyutil";
import WalletTransfer from "../modals/WalletTransfer";
import useCommonContext from "../store/CommonContext";
import OutletRegistration from "./OutletRegistration";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import QRWarningModal from "../modals/QRWarningModal";
import { validateApiCall } from "../utils/LastApiCallChecker";
import Mount from "./Mount";
import RefreshComponent from "./RefreshComponent";
import RecentHistory from "./right_sidenav/RecentHistory";
import BankTransfer from "./right_sidenav/BankTransfer";
import AddBalanceViaPG from "../modals/AddBalanceViaPG";
import { useLocation } from "react-router-dom";





const WalletCard = () => {
  const authCtx = useContext(AuthContext);
  const user = authCtx.user;
  const userLat = authCtx.location && authCtx.location.lat;
  const userLong = authCtx.location && authCtx.location.long;
  const [showQr, setShowQr] = useState(false);
  const [open, setOpen] = useState(false);
  const [showWalletTransfer, setShowWalletTransfer] = useState(false);
  const [showBankTransfer, setShowBankTransfer] = useState(false);
  const instId = user && user.instId;
  const [walletTransferErrMsg, setWalletTransferErrMsg] = useState("");
  const [request, setRequest] = useState(false);
  const { getRecentData, refreshUser, userRequest } = useCommonContext();
  const [err, setErr] = useState();
  const location = useLocation();

  console.log("user is",user);
  const selfqrValue =
    instId && instId
      ? `upi://pay?pa=ipay.133876.` +
        instId +
        "@icici" +
        `&pn=${user && user.establishment}` +
        "&cu=INR"
      : "";

  // ######################################
  // W2 TO W1 TRANSFER API CALL ...........
  // ######################################
  const handleW2ToW1Transfer = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      amount: form.w2_amount.value,
      pf: "WEB",
      latitude: userLat,
      longitude: userLong,
    };

    if (validateApiCall()) {
      postFormData(
        ApiEndpoints.W2TOW1_TRANSFER,
        data,
        setRequest,
        (res) => {
          okSuccessToast(res.data.message);
          setWalletTransferErrMsg("");
          document.getElementById("w2_amount").value = "";
          document.getElementById("w2_amount").focused = "off";
          refreshUser();
          getRecentData();
          setErr("");
        },
        (err) => {
          setErr("");
          if (
            err.response.data.message.amount &&
            err.response.data.message.amount
          ) {
            setWalletTransferErrMsg(err.response.data.message.amount);
          } else {
            setWalletTransferErrMsg("");
            apiErrorToast(err);
            refreshUser();
            getRecentData();
          }
        }
      );
    } else {
      setErr("");
      const error = {
        message: "Kindly wait some time before another request",
      };
      setErr(error);
    }
  };

  useEffect(() => {
    getRecentData();
  }, []);

  const handleOpen = () => {
    // const timer = setTimeout(() => {
    if (authCtx?.isLoggedIn) refreshUser();
    // }, 30000);
    // return () => clearTimeout(timer);
  };

  // ############################################
  // TRANSFER CARDS COMPONENT HANDLING FUNCTIONS
  // ############################################
  const handleWalletTransfer = () => {
    if (showWalletTransfer && showWalletTransfer) {
      setShowWalletTransfer(!showWalletTransfer);
    }
  };
  const handleBankTransfer = () => {
    if (showBankTransfer && showBankTransfer) {
      setShowBankTransfer(!showBankTransfer);
    }
  };
  const [isMainWallet, setIsMainWallet] = useState(false);

  const handleWalletToggle = () => {
     setIsMainWallet(!isMainWallet)
  };
  return(
    <Grid container spacing={2}  >

      <Grid item xs={6}>
        <Box
          sx={{
            padding: '4px 6px 3px 4px ',               
            backgroundColor: '#E3F2FD',   
            borderRadius: '8px',          
            mr:2,
            display: 'flex',
            alignItems: 'center',         
            width: '99%',
            maxWidth: '250px',  
            border: '2px solid black',
          }}
        >
          {/* Wallet Icon on the left */}
          <AccountBalanceWalletIcon sx={{ fontSize: 20, color: '#1C2E46', mr: 2 }} /> {/* Larger blue icon */}
          <Box>
            
            <Typography variant="subtitle1" sx={{ color: '#1C2E46' }}>
              Wallet 1
            </Typography>
           
            <Typography variant="body2" sx={{ color: '#1C2E46', fontWeight: 'bold' }}>
              {numberSetter(user.w1 / 100)} ₹
            </Typography>
           
          </Box>
          <RefreshComponent refresh={userRequest} onClick={() => refreshUser()}  sx={{mb:2, color:"#000",fontSize:20,ml:2}} />
        </Box>
        
      </Grid>

      {/* Wallet 2 */}
      <Grid item xs={6} >
        <Box
          sx={{
            padding: '4px 6px 3px 4px ',                
            backgroundColor: '#E3F2FF',   
            borderRadius: '8px',          
            display: 'flex',
            alignItems: 'center',         
            width: '99%',    
            maxWidth: '250px',  
            border: '2px solid black',            
            mr:2
          }}
        >
         
          <AccountBalanceWalletIcon sx={{ fontSize: 20, color: '#1C2E46', mr: 2 }} /> {/* Larger blue icon */}
          <Box>

            <Typography variant="subtitle1" sx={{ color: '#1C2E46' }}>
              Wallet 2
            </Typography>
            {/* Balance */}
            <Typography variant="body2" sx={{ color: '#1C2E46', fontWeight: 'bold' }}>
              {numberSetter(user.w2 / 100)} ₹
            </Typography>
          </Box>
          <RefreshComponent refresh={userRequest} onClick={() => refreshUser()}  sx={{mb:2, color:"#000",fontSize:20,ml:2}} />
        </Box>
    
      </Grid>

      
    
      
    </Grid>

  )

}

export default WalletCard