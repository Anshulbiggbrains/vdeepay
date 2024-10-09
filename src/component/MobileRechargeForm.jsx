import {
  Box,
  Button,
  Card,
  styled,
  FormControl,
  Grid,
  InputAdornment,
  Menu,
  MenuItem,
  Switch,
  TextField,
  Tooltip,
  Typography,
  Avatar,
} from "@mui/material";
import React from "react";
import { get, postJsonData } from "../network/ApiController";
import ApiEndpoints from "../network/ApiEndPoints";
import { useState } from "react";
import { apiErrorToast } from "../utils/ToastUtil";
import RepeatRechargeModal from "../modals/RepeatRechargeModal";
import EnterMpinModal from "../modals/EnterMpinModal";
import { useEffect } from "react";
import SuccessRechargeModal from "../modals/SuccessRechargeModal";
import { useContext } from "react";
import AuthContext from "../store/AuthContext";
import Loader from "../component/loading-screen/Loader";
import { PATTERNS } from "../utils/ValidationUtil";
import AllPlansBar from "./AllPlansBar";
import { primaryColor, getEnv } from "../theme/setThemeColor";
import { PROJECTS } from "../utils/constants";
import CardComponent from "./CardComponent";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const MobileRechargeForm = ({ type, setOperatorIcon,operatorIcon, resetView }) => {
  const authCtx = useContext(AuthContext);
  const userLat = authCtx.location && authCtx.location.lat;
  const userLong = authCtx.location && authCtx.location.long;
  const [isMobV, setIsMobV] = useState(true);
  const [isCustomerIdV, setIsCustomerIdV] = useState(true);
  const [checked, setChecked] = React.useState(true);
  const [request, setRequest] = useState(false);
  const [infoFetched, setInfoFetched] = useState(false);
  const [numberinfo, setNumberinfo] = useState();

  // console.log("numberinfo", numberinfo);
  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState("");
    const [opName, setOpName] = useState("");
  const [amount, setAmount] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [operatorVal, setOperatorVal] = useState([]);
  const [selectedOperator,setSelectedOperator]=useState([null])
  const [defaultIcon, setdefaultIcon] = useState();
  // console.log("defaultIcons", defaultIcon);
  const [operator, setOperator] = useState();
  const [successRecharge, setSuccessRechage] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const[IsOptSelected, setIsOptSelected]=useState(false)

 
  let title = checked && checked ? "Prepaid" : "Postpaid";
  // console.log("title", title);
  const envName = getEnv();

  const getOperatorVal = () => {
    // setOperator("");
    get(
      ApiEndpoints.GET_OPERATOR,
      `sub_type=${type === "mobile" ? title : "DTH"}`,
      "",
      (res) => {
        const opArray = res.data.data;
        // setIsOptSelected(opArray)
        console.log("op array is",IsOptSelected);
        
        const op = opArray.map((item) => {
          return {
            code: item.code,
            name: item.name,
            img: item.img,
          };
        });
        setOperatorVal(op);
      },
      (error) => {
        apiErrorToast(error);
      }
    );
  };
  const [data, setData] = useState("");
  // console.log("data", data);

  const getNumberInfo = (number) => {
    setInfoFetched(false);
    postJsonData(
      ApiEndpoints.GET_NUMBER_INFO,
      {
        number: number,
        type: type === "mobile" ? "M" : "D",
      },
      setRequest,
      (res) => {
        if (res && res.data && res.data) {
          const data = res.data.info;
          const customNumInfo = data;
          customNumInfo.customer_no = number;
          setNumberinfo(customNumInfo);
          setInfoFetched(true);
          getOperatorVal();
        } else {
          setNumberinfo();
        }
      },
      (error) => {
        if (
          error &&
          error.response &&
          error.response.status &&
          (error.response.status === 403 || error.response.status === 404)
        ) {
          setInfoFetched(true);
        } else {
          apiErrorToast(error);
        }
      }
    );
  };
  useEffect(() => {
    getOperatorVal()
    // if (numberinfo && numberinfo) {
    //   const val = {
    //     op: numberinfo.operator,
    //     img: numberinfo.img,
    //   };
    //   setOperator(val);
    // }
    // if nothing is typed in the number text field then numberinfo = null
    if (!numberinfo) {
      setdefaultIcon("");
    }
  }, [numberinfo]);

  useEffect(() => {
    if (operatorVal && numberinfo) {
      operatorVal &&
        operatorVal.forEach((item) => {
          if (item.code === numberinfo.operator) {
            setdefaultIcon(item.img);
          }
        });
    }


    if (mobile === "" && type === "mobile") {
      setdefaultIcon("");
    }
  }, [operatorVal, numberinfo]);

  const handleSubmit = (event) => {
    if (infoFetched) {
      document.activeElement.blur();
      event.preventDefault();
      const form = event.currentTarget;
      const data = {
        number: title === "Prepaid" ? form.mobile.value : undefined,
        param1: title === "Postpaid" ? form.mobile.value : undefined,
        operator:
          operator && operator.op
            ? operator.op
            : numberinfo && numberinfo.operator,
        amount: form.amount.value,
        type: type === "mobile" ? title.toUpperCase() : "DTH",
        pf: "WEB",
        latitude: userLat && userLat,
        longitude: userLong && userLong,
      };
      setData(data);
      setModalVisible(true);
    } else {
      event.preventDefault();
      getNumberInfo(customerId);
    }
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    getOperatorVal();
    // setAnchorEl(event.currentTarget);
  };
  const handleCloseMenue = () => {
    setAnchorEl(null);
  };

  const handleOperatorChange = (event) => {
    const selectedOperator = operatorVal.find(item => item.code === event.target.value);
    setOperator(selectedOperator); 
    setOpName(selectedOperator ? selectedOperator.name : "");
    setOperatorIcon(selectedOperator ? selectedOperator.img : ""); // Update the operator image
  };


     const handleOpenVal = (operatorName) => {
     if (!IsOptSelected) {
      setIsOptSelected(true)
     } 
     setOpName(operatorName)
      // alert(`You clicked on: ${operatorVal}`);
    };

     console.log("deafault value ",infoFetched)
     
     const handleBack=()=>{
      resetView (false)
    }
     
  return (
   
    <div className="position-relative"  >
         <Button sx={{justifyContent:"start"}} onClick={handleBack}>
                  back
                  </Button>     
      <Loader loading={request} />
      {(!IsOptSelected&&
       <Grid container spacing={2}>
      {operatorVal &&
        operatorVal.map((operator, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            
            <CardComponent
              title={operator.name}
              img={operator.code}
              onClick={() => handleOpenVal(operator.name)} 
              
            />
          </Grid>
        ))}
      </Grid>
    )}

    {IsOptSelected && (
      <Grid container spacing={2}>
       <Grid item lg={4} xs={12} sm={3.8}>
          {operatorVal && operatorVal.map((operator, index) => (
            
            <CardComponent
              title={operator.name}
              img={operator.code}
              height="55px"
              onClick={() => handleOpenVal(operator.name)} 
              isSelected={ opName === operator.name?true:false}
            />
         
          ))}
        </Grid>
        <Grid item lg={8} xs={12} sm={8.2}>
          <Box sx={{ p: 3 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>
                {type === "mobile" ? title : "DTH"}
              </Typography>
              {type === "mobile" && (
                <div style={{ textAlign: "right" }}>
                  <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                    {title === "Prepaid" ? "Switch to Postpaid" : "Switch to Prepaid"}
                  </Typography>
                  <Tooltip title={title === "Prepaid" ? "Postpaid" : "Prepaid"}>
                    <Switch
                      checked={checked}
                      onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: primaryColor(),
                        },
                      }}
                    />
                  </Tooltip>
                </div>
              )}
            </div>
  
            <Box
              component="form"
              id="recharge"
              validate
              autoComplete="off"
              onSubmit={handleSubmit}
              sx={{
                "& .MuiTextField-root": { m: 2 },
                objectFit: "contain",
                overflowY: "scroll",
              }}
            >
              <Grid item xs={12}>
                {type === "mobile" && (
                  <FormControl sx={{ width: "100%" }}>
                    <TextField autoComplete="off"
                      label="Mobile Number"
                      id="mobile"
                      type="number"
                      size="small"
                      error={!isMobV}
                      helperText={!isMobV ? "Enter valid Mobile" : ""}
                      InputProps={{
                        inputProps: { maxLength: 10 },
                      }}
                      value={mobile}
                      onChange={(e) => {
                        setIsMobV(PATTERNS.MOBILE.test(e.target.value));
                        if (e.target.value === "") setIsMobV(true);
                        setMobile(e.target.value);
                        if (e.target.value.length === 10 && PATTERNS.MOBILE.test(e.target.value)) {
                          getNumberInfo(e.target.value);
                        } else {
                          setInfoFetched(false);
                          setAmount("");
                          setNumberinfo("");
                          setOperator("");
                        }
                      }}
                      required
                      disabled={request}
                    />
                  </FormControl>
                )}
                {type === "dth" && (
                  <FormControl sx={{ width: "100%" }}>
                    <TextField autoComplete="off"
                      label="Customer ID"
                      id="customer-id"
                      type="tel"
                      error={!isCustomerIdV}
                      helperText={!isCustomerIdV ? "Enter valid Customer Id" : ""}
                      size="small"
                      inputProps={{ maxLength: 20 }}
                      onChange={(e) => {
                        setCustomerId(e.target.value);
                        setIsCustomerIdV(PATTERNS.DTH.test(e.target.value));
                        if (e.target.value === "") {
                          setIsCustomerIdV(true);
                          setInfoFetched(false);
                          setAmount("");
                          setNumberinfo("");
                          setOperator("");
                        }
                      }}
                      required
                      InputProps={{
                        endAdornment: infoFetched && envName !== PROJECTS.moneyoddr && (
                          <InputAdornment position="end">
                            <Button variant="text" onClick={() => getNumberInfo(customerId)}>
                              get Info
                            </Button>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                )}
              </Grid>
  
              <Grid item xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <TextField autoComplete="off"
                    label="Amount"
                    id="amount"
                    size="small"
                    type="number"
                    value={amount || ""}
                    onChange={(e) => setAmount(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "+" || e.key === "-") {
                        e.preventDefault();
                      }
                    }}
                    InputProps={{
                      inputProps: { max: 10000, min: 10 },
                      endAdornment: infoFetched && type === "mobile" && (
                        <InputAdornment position="end">
                          <AllPlansBar operator={operator && operator.op} onClick={(plan) => setAmount(plan?.plan)} />
                        </InputAdornment>
                      ),
                    }}
                    required
                    disabled={request}
                  />
                </FormControl>
              </Grid>
  
              <Grid item xs={12}>
                <Button
                  type="submit"
                  form="recharge"
                  className="btn-background"
                  sx={{
                    width: "95%",
                    mt: 1,
                  }}
                  disabled={request}
                >
                  <span>
                    {infoFetched ? "Proceed to pay" : type === "mobile" ? "Proceed" : "Fetch Info"}
                  </span>
                </Button>
              </Grid>
  
              {infoFetched && numberinfo && (
                <RepeatRechargeModal data={numberinfo} setAmount={setAmount} />
              )}
              {modalVisible && (
                <EnterMpinModal
                  data={data}
                  setModalVisible={setModalVisible}
                  setSuccessRechage={setSuccessRechage}
                  apiEnd={ApiEndpoints.PREPAID_RECHARGE}
                  type="recharge"
                  setShowSuccess={setShowSuccess}
                  setMobile={setMobile}
                  setInfoFetched={setInfoFetched}
                />
              )}
              {showSuccess && (
                <SuccessRechargeModal successRecharge={successRecharge} setShowSuccess={setShowSuccess} />
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    )}
  </div>
  
    
  );
};

export default MobileRechargeForm;




