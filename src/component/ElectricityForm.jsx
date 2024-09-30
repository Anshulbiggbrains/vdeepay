/* eslint-disable array-callback-return */
import { Box, FormControl, Grid, TextField, Typography } from "@mui/material";
import React, { useContext, useState, useEffect, useRef } from "react";
import { postJsonData, get } from "../network/ApiController";
import ApiEndpoints from "../network/ApiEndPoints";
import { apiErrorToast, okSuccessToast } from "../utils/ToastUtil";
import EnterMpinModal from "../modals/EnterMpinModal";
import SuccessRechargeModal from "../modals/SuccessRechargeModal";
import Loader from "../component/loading-screen/Loader";
import AuthContext from "../store/AuthContext";
import BillPaymentModal from "../modals/BillPaymentModal";
import OperatorSearch from "./OperatorSearch";
import CardComponent from "./CardComponent";
import { faListSquares } from "@fortawesome/free-solid-svg-icons";

const ElectricityForm = ({ title, subType, setOperatorIcon, operatorIcon }) => {
  const authCtx = useContext(AuthContext);
  const location = authCtx.location;
  const [fetchRequest, setFetchRequest] = useState(false);
  const [billPayRequest, setBillPayRequest] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [operatorId, setOperatorId] = useState("");
  const [opName, setOpName] = useState("");
  const [successRecharge, setSuccessRechage] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [params, setParams] = useState([]);
  const [changeFetchToPay, setChangeFetchToPay] = useState(false);
  const [billDetails, setBillDetails] = useState();
  const [paramsValue, setparamsValue] = useState({});
  const [data, setData] = useState("");
  const [visibleAmount, setVisibleAmount] = useState(false);
  const [amountValue, setAmountValue] = useState("");
  const [operatorList, setOperatorList] = useState([]);
  const [operatorVal, setOperatorVal] = useState([]);
  const [IsOptSelected, setIsOptSelected] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(false); 
  const [selectedCard, setSelectedCard] = useState(null); 
  
  const operatorRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    const data = {};
    params.forEach((item, index) => {
      if (item || item !== "") {
        data["param" + (index + 1)] = document.getElementById(
          "param" + (index + 1)
        )?.value;
      }
    });
    setData(data);
  };

  const fetchBill = () => {
    const data = {
      latitude: location.lat,
      longitude: location.long,
      operator: operatorId,
    };
    params.forEach((item, index) => {
      if (item && item !== "") {
        data["param" + (index + 1)] = document.getElementById(
          "param" + (index + 1)
        ).value;
      }
    });

    if (!data.param1) {
      apiErrorToast("All Fields are required");
    } else {
      postJsonData(
        ApiEndpoints.RECH_FETCH_BILL,
        data,
        setFetchRequest,
        (res) => {
          setBillDetails(res.data.data);
          okSuccessToast(
            res.data.message.param1
              ? res.data.message.param1[0]
              : res.data.message
          );
          if (!res.data.message.param1) {
            if (
              res.data.message.toLowerCase() ===
              "Bill Fetch Service Is Down Please Enter The Amount Manually".toLowerCase()
            ) {
              setVisibleAmount(true);
              setChangeFetchToPay(true);
              handleSubmit();
            }
          }
        },
        (err) => {
          apiErrorToast(err);
        }
      );
    }
  };

  const handleOperatorChange = (event) => {
    const selectedOperator = operatorVal.find(
      (item) => item.code === event.target.value
    );
    setOpName(selectedOperator ? selectedOperator.name : ""); // Set the operator name
    setOperatorIcon(selectedOperator ? selectedOperator.img : "");
  };

  const getOperator = () => {
    get(
      ApiEndpoints.GET_OPERATOR,
      `sub_type=${subType}`,
      null,
      (res) => {
        setOperatorList(res.data.data);
        setOperatorVal(res.data.data);
        const allParams = res.data.data.flatMap(op => [op.param1, op.param2, op.param3]).filter(Boolean);
        setParams(allParams);
      },
      (error) => {
        apiErrorToast(error);
      }
    );
  };

  useEffect(() => {
    getOperator();
  }, []);

  const handleOpenVal = (operator) => {
    setIsOptSelected(true);
    setOperatorId(operator.code);
    setSelectedCard(operator.code);
    setOpName(operator.name);
    setParams([operator.param1, operator.param2, operator.param3]); // Show all fields by default
  };
console.log("oppp",opName);

  return (
    <div className="position-relative" id="whole">
      <Loader loading={fetchRequest} circleBlue />
      {!IsOptSelected && (
      <Grid container spacing={2}>
      {operatorVal &&
        operatorVal.map((operator, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <CardComponent
              title={operator.name}
              img={operator.code}
              onClick={() => handleOpenVal(operator)} 
              
             
            />
          </Grid>
        ))}
    </Grid>
    
      )}
      {IsOptSelected && (
        <Grid container spacing={2}>
          <Grid
            item
            lg={4}
            xs={12}
            sm={4}
            sx={{
              height: "600px",
              width: "600px",
              overflowY: "auto",
              p: 2,
            }}
          >
           {operatorVal &&
  operatorVal.map((operator, index) => (
    <CardComponent
      key={index}
      title={operator.name}
      img={operator.code}
      height="55px"
      onClick={() => {
        handleOpenVal(operator);
      }}
      isSelected={opName === operator.name?true:false}

    />
  ))}

          </Grid>

          {/* Right Form Section */}
          <Grid item lg={8} xs={12} sm={8} sx={{ mr: -4 }}>
            <Box
              sx={{
                p: 3,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontSize: "24px", fontWeight: "bold", ml: "15px" }}>
                  {title}
                </Typography>
              </div>
              <Box
                component="form"
                id="electricity"
                validate="true"
                autoComplete="off"
                onSubmit={handleSubmit}
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "100%" },
                  overflowY: "auto",
                  maxHeight: "400px",
                }}
              >
                <Grid container spacing={2}>
      
                  {params.map((item, i) => (
                    <Grid item xs={12} key={i }  >
                      {item && item !== "" && (
                        <FormControl sx={{ width: { xs: "100%", sm: "80%", md: "80%", lg: "80%", xl: "80%" }, mr: "19%" }}>
                          <TextField
                            label={item}
                            id={"param" + (i + 1).toString()}
                            size="small"
                            sx={{
                              "& .MuiInputBase-input": {
                                fontSize: "12px",
                                color: "black",
                              },
                              "& .MuiInputBase-input::placeholder": {
                                fontSize: "12px",
                                opacity: 1,
                              },
                            }}
                            onChange={(e) => {
                              setparamsValue({
                                ...paramsValue,
                                [e.currentTarget.id]: e.currentTarget?.value,
                              });
                            }}
                            required
                          />
                        </FormControl>
                      )}
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    <FormControl sx={{ width: { xs: "100%", sm: "80%", md: "80%", lg: "80%", xl: "80%" }, mr: "19%" }}>
                      <TextField
                        label="Amount"
                        id="amount"
                        size="small"
                        sx={{
                          "& .MuiInputBase-input": {
                            fontSize: "12px",
                            color: "black",
                          },
                          "& .MuiInputBase-input::placeholder": {
                            fontSize: "12px",
                            opacity: 1,
                          },
                        }}
                        value={amountValue}
                        onChange={(e) => {
                          setAmountValue(e.target.value);
                        }}
                        required
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>

              {/* Payment Modal */}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <BillPaymentModal
                  changeFetchToPay={changeFetchToPay}
                  amountValue={amountValue}
                  fetchBill={fetchBill}
                  billDetails={billDetails}
                  setBillDetails={setBillDetails}
                  payRequest={billPayRequest}
                  setBillPayRequest={setBillPayRequest}
                  modalVisible={modalVisible}
                  setModalVisible={setModalVisible}
                  operatorId={operatorId}
                  operatorName={opName}
                  successRecharge={successRecharge}
                  setSuccessRechage={setSuccessRechage}
                  showSuccess={showSuccess}
                  setShowSuccess={setShowSuccess}
                  data={data}
                />
              </div>
            </Box>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default ElectricityForm;
