/* eslint-disable react-hooks/exhaustive-deps */
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  TextField,
  Typography,
  createFilterOptions,
  styled,
} from "@mui/material";
import React from "react";
import { get, postJsonData } from "../network/ApiController";
import ApiEndpoints from "../network/ApiEndPoints";
import { useState } from "react";
import { useEffect } from "react";
import { apiErrorToast, okSuccessToast } from "../utils/ToastUtil";
import { useContext } from "react";
import AuthContext from "../store/AuthContext";
import { CircularButton } from "../component/BBPSButtonComponent";
import Loader from "../component/loading-screen/Loader";
import OutletRegistration from "../component/OutletRegistration";
import BeneSearchBar from "../component/BeneSearchBar";
import { bbpsPng, cmsIcon } from "../iconsImports";
import BillDetailsModal from "../modals/BillDetailsModal";
import CommonMpinModal from "../modals/CommonMpinModal";
import useCommonContext from "../store/CommonContext";

import BackspaceIcon from "@mui/icons-material/Backspace";
import { validateApiCall } from "../utils/LastApiCallChecker";
import { Numbers } from "@mui/icons-material";
import CardComponent from "../component/CardComponent";
import ReplyIcon from '@mui/icons-material/Reply';
import BbpsCardComponent from "../component/BbpsCardComponent";

const OuterIcon = styled(Box)(({ theme, bg = '#08509E' }) => ({
  top: '-12px',
  zIndex: 1,
  right: '-12px',
  width: '100px',
  height: '100px',
  display: 'flex',
  borderRadius: '50%',
  position: 'absolute',
  alignItems: 'center',
  justifyContent: 'center',
  background: bg,
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px inset',
}));

const InnerIcon = styled(Box)(({ theme }) => ({

  // padding: theme.spacing(1),
  width: '48px',
  height: '48px',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  background: theme.palette.common.white,
}));
const BBPSView = () => {
  const [progress, setProgress] = useState(false);

  const [catKey, setCatKey] = useState("");

  const [params, setParams] = useState([]);
  // console.log("params", params);

  const authCtx = useContext(AuthContext);
  const user = authCtx.user;
  const location = authCtx.location;
  const [billerId, setBillerId] = useState("");
  const [billers, setBillers] = useState([]);
  // console.log("billers", billers);
  const [fetchMandatory, setFetchMandatory] = useState("");
  const [action, setAction] = useState("");
  const [isActive, setIsActive] = useState("");
  const [search, setSearch] = useState("");
  const [categoryName, setCategoryName] = useState("");
  // console.log("categoryName", categoryName);
  const [currentBiller, setCurrentBiller] = useState(false);

  const [billDetails, setBillDetails] = useState(false);
  // const [request, setRequest] = useState(false);
  const [openMpin, setOpenMpin] = useState(false);
  const [mpinVal, setMpinVal] = useState(false);

  const [payRequest, setPayRequest] = useState(false);
  const[biller,setBiller]=useState([])
  // const [showSecondPage, setShowSecondPage] = useState(false)
  const [showSecondPage, setShowSecondPage] = useState(2)
  // const [isEdit, setIsEdit] = useState(false);

  const [categoryGroup, setCategoryGroup] = useState([])
  const [categoryData, setCategoryData] = useState([])
  
  const [selectedBillerId, setSelectedBillerId] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedBillerName, setSelectedBillerName] = useState("");
  const [biller_name,setBilerName]=useState()
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBillers, setFilteredBillers] = useState(biller);

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option) => option.billerName,
  });

  const getBillers = (cat_key) => {
    setBillers([]);
    setParams([]);
    setCurrentBiller("");
    setMpinVal(false);
    postJsonData(
      ApiEndpoints.BBPS_GET_BILLERS,
      { categoryKey: cat_key },
      setProgress,
      (res) => {
        const data = res.data.data.records;
        setBiller(data)
        // setShowSecondPage(true)
        setShowSecondPage(1)
        if (cat_key === "C03") {
          setBillers(
            data.filter((item) => {
              return item.type === "ONUS";
            })
          );
        } else {
          setBillers(data);
        }
        setFetchMandatory("");
      },
      (err) => {
        apiErrorToast(err);
      }
    );
  };
  const [categories, setCategories] = useState([]);

  const [filteredCategories, setFilteredCategories] = useState([]);
  const [billValue, setBillValue] = useState();
  const [pan, setPan] = useState("");
  const [err, setErr] = useState();
  const [billerValId, setBillerValId]=useState()

  const getCategories = () => {
    get(
      ApiEndpoints.BBPS_CATEGORIES,
      "pf=WEB",
      setProgress,
      (res) => {
        const data = res.data.data;
        setCategories(data);
        setShowSecondPage(0)
        const newCategoryGroup = groupCategories(data)
        setCategoryGroup(newCategoryGroup)
        setCategoryData(data)
        console.log("bbps")
        setCurrentBiller("");
        // categoryListChange(data);
      },
      (err) => {
        apiErrorToast(err);
      }
    );
  };

  const getBillersDetails = (billerId) => {
    postJsonData(
      ApiEndpoints.BBPS_GET_BILLERS_DETAILS,
      { billerId: billerId },
      setProgress,
      (res) => {
        const data = res.data.data;
        setShowSecondPage(2)
        setParams(data.parameters);
        setBilerName(data.billerInfo.name)
        setFetchMandatory(data.fetchRequirement);
        // console.log("data.parameters", data?.parameters[1]?.name);
        if (
          categoryName &&
          categoryName.categoryName === "Electricity" &&
          data?.parameters[1]?.desc !== "Mobile Number"
        ) {
          setParams((param) => [
            ...param,
            {
              name: "param2",
              desc: "Mobile Number",
              minLength: 10,
              maxLength: 10,
              inputType: "NUMERIC",
              mandatory: 1,
              regex: "/^[6-9]d{9}$/",
            },
          ]);
        }
        if (data.fetchRequirement === "NOT_SUPPORTED") {
          setParams((param) => [
            ...param,
            {
              name: "amount",
              desc: "Amount",
              minLength: 2,
              maxLength: 7,
              inputType: "NUMERIC",
              mandatory: 1,
              regex: "/^[6-9]d{9}$/",
            },
          ]);
        }
      },
      (err) => {
        apiErrorToast(err);
      }
    );
  };

  const { getRecentData } = useCommonContext();

  const fetchBill = (event) => {
    const data = {
      billerId: selectedBillerId,
      latitude: location.lat,
      longitude: location.long,
      amount: 0,
    };
    params.map((item) => {
      let propertyName = item.name;
      data[propertyName] =
        item.inputType === "NUMERIC"
          ? Number(document.getElementById(propertyName).value)
          : document.getElementById(propertyName).value;
      return data;
    });

    if (data.param1 === "") {
      apiErrorToast("Please fill out all the fields");
    } else if (data.hasOwnProperty("param2") && data.param2 === "") {
      apiErrorToast("Please fill out all the fields");
    } else if (data.hasOwnProperty("param3") && data.param3 === "") {
      apiErrorToast("Please fill out all the fields");
    } else if (data.hasOwnProperty("param4") && data.param4 === "") {
      apiErrorToast("Please fill out all the fields");
    } else {
      postJsonData(
        ApiEndpoints.BBPS_FETCH_BILL,
        data,
        setProgress,
        (res) => {
          setBillDetails(res.data.data.data);
        },
        (err) => {
          apiErrorToast(err);
        }
      );
    }
  };

  useEffect(() => {
    if (search) {
      const myList = categories.filter((item) => {
        return item.categoryName.toUpperCase().includes(search.toUpperCase());
      });
      setFilteredCategories(myList);
    } else {
      setFilteredCategories(categories);
    }

    return () => {};
  }, [search, categories]);

  useEffect(() => {
    if (user && user.instId) {
      getCategories();
    }
    
  }, []);

  const payBill = (event) => {
    event.preventDefault();
    const data = {
      billerId: selectedBillerId && selectedBillerId,
      biller_name: biller_name,
      amount: billValue,
      pan: pan ? pan : undefined,
      pf: "web",
      cat: categoryName && categoryName.categoryKey,
      mpin: mpinVal,
      latitude: location.lat,
      longitude: location.long,
      enquiryReferenceId: billDetails
        ? billDetails.enquiryReferenceId
        : "15486sfdgyf",
    };
    params &&
      params.map((item) => {
        let propertyName = item.name;
        data[propertyName] =
          item.inputType === "NUMERIC"
            ? Number(document.getElementById(propertyName).value)
            : document.getElementById(propertyName).value;
        return data;
      });

    console.log("data", data);
    if (validateApiCall()) {
      postJsonData(
        ApiEndpoints.BBPS_PAY_BILL,
        data,
        setPayRequest,
        (res) => {
          okSuccessToast(res.data.message);
          getRecentData();
          setBillDetails(false);
          setMpinVal(false);
          setErr("");
        },
        (error) => {
          setMpinVal(false);
          apiErrorToast(error);
          getRecentData();
          setErr("");
          // setBillDetails(false);
        }
      );
    } else {
      const error = {
        message: "Kindly wait some time before another request",
      };
      setErr(error);
    }
  };

  //  #### OLD FUNCTION DON'T REMOVE ######
  // const openMpinfunc = (e) => {
  //   e.preventDefault();
  //   if (!mpinVal) setOpenMpin(true);
  // };

  const openMpinfunc = (e) => {
    e.preventDefault();
    params.forEach((eachparam) => {
      if (
        eachparam.desc === "Amount" &&
        document.getElementById("amount").value > 50000 &&
        !document.getElementById("pan")
      ) {
        // console.log("here in amount 50000");
        setParams((param) => [
          ...param,
          {
            name: "pan",
            desc: "Pan",
            mandatory: 0,
            regex: "^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$",
          },
        ]);
        return;
      }
    });

    if (
      !mpinVal &&
      document.getElementById("amount") &&
      document.getElementById("amount").value < 50000
    ) {
      // console.log("here in less 50000 open mpin");
      setParams(params.filter((eachparam) => eachparam.name !== "pan"));
      setOpenMpin(true);
    } else if (
      !mpinVal &&
      document.getElementById("amount").value > 50000 &&
      document.getElementById("pan")
    ) {
      // console.log("here in greater 50000 open mpin");
      setOpenMpin(true);
    } else {
      //
    }
  };
  const handleChange = (e) => {
    if (e.target.value) {
      // console.log("if input=>", e.target.value);
      setCurrentBiller(e.target.value);
    } else {
      // console.log("else input=>", e.target.value);
      setCurrentBiller(e.target.value);
      setCurrentBiller("");
      setBillerId("");
    }
  };

  useEffect(() => {
    setCurrentBiller("");
    setBillerId("");
    const tf = document.getElementById("biller_textfield");
    if (tf) {
      tf.value = null;
    }
    return () => {};
  }, [billers]);

  const categoryBoxStyle = {
    p: 2,
    pb: { md: 2, xs: 0 },
    // height: action ? " 220px" : "auto",
    overflowY: "scroll",
    position: "relative",
    pt: 0.5,
  };
  const formStyle = {
    "& .MuiTextField-root": { m: 1 },
    display: "flex",
    justifyContent: { md: "center", sm: "left", xs: "left" },
    my: 4,
    mt:3,
    p: 2,
    mb: 12,
    // borderTop: "0.2px solid #d3d3d370",
  };
  console.log("filteredCategories.group" ,filteredCategories)


  const groupCategories = (categories) => {
    return categories.reduce((grouped, item) => {
      const group = item.group;
      if (!grouped[group]) {
        grouped[group] = [];
      }
      grouped[group].push(item);
      return grouped;
    }, {});
  };
  const groupedCategories = groupCategories(filteredCategories);
   // Initialize with full list
  const handleBackToCategories = () => {
    setShowSecondPage(0); // Set the state to 1 when the button is clicked
};
  const handleBackToBillerData = () => {
    setShowSecondPage(1); // Set the state to 1 when the button is clicked
};
  useEffect(() => {
    setFilteredBillers(biller); // Reset filtered billers when biller changes
  }, [biller]);

  // Function to handle search input changes
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter billers based on search query
    const filtered = biller.filter((item) =>
      item.billerName.toLowerCase().includes(query)
    );
    setFilteredBillers(filtered);
  };
 const handleBackToBiler=()=>{
    showSecondPage(1)
  }

  return (
    <>
      {user && !user.instId && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <OutletRegistration autoOpen />
        </Box>
      )}
      {user && user.instId && (
        <>
          <Box sx={{mt:-1.5}}

>

      <Box sx={{ padding: 2 }}>
      {/* First page - Category View */}
      {showSecondPage === 0 && (
        Object.keys(groupedCategories).map((groupName) => (
          <Box
            key={groupName}
            sx={{
              marginBottom: 2,
              border: "solid 1px lightgray",
              p: 3,
              borderRadius: 3,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Typography variant="h6" align="left" sx={{ pl: 1, mt: -2, mb: 1 }}>
              {groupName}
            </Typography>
            <Grid container spacing={2}>
              {groupedCategories[groupName].map((item, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  key={index}
                  sx={{ width: "100%", height: "100%" }}
                >
                  <BbpsCardComponent
                    onClick={() => {
                      setErr("");
                      setCatKey(item.categoryKey);
                      setCategoryName(item);
                      getBillers(item.categoryKey);
                      setAction(item.categoryName);
                      setIsActive(!isActive);
                    }}
                    isActive={action === item.categoryName}
                    title={item.categoryName}
                    img={item.iconUrl}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        ))
      )}
   
      {showSecondPage === 1 && (
        <Box>
       <Grid container justifyContent="space-between" alignItems="center" spacing={2}>

            <Grid item xs={12} sm="auto">
              <Typography variant="h6" align="left" sx={{ ml: 1 }}>
                {biller.length > 0 ? biller[0].categoryName : "No Category"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Search Biller"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={handleSearch}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#fff',
                  },
                  '& .MuiInputLabel-root': {
                    color: '#757575',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#cccccc',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#999999',
                  },
                  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#3f51b5',
                  },
                }}
              />
            </Grid>

        
            <Grid item xs={12} sm="auto">
              <Button
                variant="contained"
                onClick={handleBackToCategories} 
                sx={{ ml: 2 }}
              >
                <ReplyIcon/> Back
              </Button>
            </Grid>
          </Grid>

          <Divider sx={{ m: 1, backgroundColor: "grey.500", height: 1.5 }} />

          {/* Biller List */}
          <Grid container spacing={2}>
            {filteredBillers.length > 0 ? (
              filteredBillers.map((item, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  key={index}
                  sx={{ width: "100%", height: "75%" }}
                >
                  <BbpsCardComponent
                    onClick={() => {
                      setSelectedBillerId(item.billerId);
                      getBillersDetails(item.billerId);
                      setSelectedImage(item.iconUrl)
                      
                    }}
                    title={item.billerName}
                    img={item.iconUrl}
                    isActive={selectedBillerId === item.billerId}

                  />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant="h6" align="center">
                  No billers found
                </Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      )}

     
      {showSecondPage === 2 && (
  <Box 
    sx={{ 
      padding: 2, 
      borderRadius: 2, 
      border: "1px solid lightgrey", 
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", 
      maxHeight: "100vh", 
      overflow: "hidden" 
    }}
  >
    
    <Grid container spacing={2} sx={{ height: "100%" }}>
   
     
      <Grid item lg={4} xs={12} sm={4} sx={{ p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
    <Typography variant="h6" align="left">
      {biller[0]?.categoryName}
    </Typography>
    <Button variant="contained" onClick={handleBackToBillerData}>
      <ReplyIcon /> Back
    </Button>
  </Box>

        <Grid item xs={12} lg={12} sm={12} sx={{ mt: 1 }}>
          <TextField
            label="Search Biller"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearch}
            sx={{ 
              '& .MuiOutlinedInput-root': { borderRadius: '8px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }
            }}
          />
        </Grid>
        <Divider sx={{ m: 1, backgroundColor: "grey.500", height: 1.5 }} />

        {/* Scrollable list of billers */}
        <Box sx={{ maxHeight: {sm:"150px",xs:"150px",lg:"500px",md:"500px"}, overflowY: "auto" }}>
          {filteredBillers.length > 0 ? (
            filteredBillers.map((item, index) => (
              <Box key={index} sx={{ marginBottom: 2 }}>
                <CardComponent
                  height={"60px"}
                  title={item.billerName}
                  img={item.iconUrl}
                  onClick={() => {
                    setSelectedBillerId(item.billerId);
                    setSelectedBillerName(item.name) 
                    setSelectedImage(item.iconUrl)// Set selected biller ID
                    getBillersDetails(item.billerId); // Fetch params for the selected biller
                  }}
                  isSelected={selectedBillerId === item.billerId}
                />
              </Box>
            ))
          ) : (
            <Typography variant="h6" align="center">
              No billers found
            </Typography>
          )}
        </Box>
      </Grid>

      {/* Right side: Scrollable detailed view */}
      <Grid
  item
  xs={12}
  lg={8}
  sm={8}
  sx={{
    maxHeight: "1000px",
    overflowY: "auto",
    padding: 2,
    borderLeft: "1px solid lightgrey",
    position: "relative",
  }}
>
<OuterIcon>
        <InnerIcon>
        <img src={selectedImage} alt="bbps"  />
        </InnerIcon>
      </OuterIcon>
  
  {/* Back to Categories Button aligned to the right */}
 

  {selectedBillerId ? (
    <>
 

      <Box >
        {params && (
          <Box
            component="form"
            id="bbpsForm"
            validate="true"
            autoComplete="off"
            onSubmit={mpinVal ? payBill : openMpinfunc}
            sx={formStyle}
          >
            <Grid container spacing={2} sx={{ pt: 1, width: { md: "100%", sm: "100%", xs: "100%" } }}>
            <Typography variant="h6" align="left" sx={{ml:3,fontWeight:"300"}}>
      {biller_name}
    </Typography>
              {params.map((item, index) => (
                <Grid item md={12} xs={12} key={index}>
         
                  <FormControl sx={{ width: "100%" }}>
                    <TextField
                      autoComplete="off"
                      label={item.desc}
                      id={item.name}
                      inputProps={{
                        minLength: item.minLength,
                        maxLength: item.maxLength,
                        pattern: item.regex,
                      }}
                      size="small"
                      required={item.mandatory === 1}
                      type={item.inputType === "NUMERIC" ? "number" : "text"}
                      sx={{ marginBottom: 2 }} // Add spacing between text fields
                    />
                  </FormControl>
                </Grid>
              ))}

              {/* Error message below text fields */}
              {err && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                    fontSize: "12px",
                    px: 2,
                    color: "#DC5F5F",
                  }}
                >
                  <div>{err.message}</div>
                </Box>
              )}

              {/* Submit Button or Bill Details Modal */}
              <Grid item md={12} xs={12}>
                <FormControl sx={{ mt: 2, width: "100%" }}>
                  {fetchMandatory === "MANDATORY" ? (
                    <BillDetailsModal
                      billerId={billerId}
                      params={params}
                      currentBiller={currentBiller}
                      billDetails={billDetails}
                      setBillDetails={setBillDetails}
                      fetchBill={fetchBill}
                      categoryName={categoryName}
                      payRequest={payRequest}
                      payBill={payBill}
                      mpinVal={mpinVal}
                      setMpinVal={setMpinVal}
                      setOpenMpin={setOpenMpin}
                      billValue={billValue}
                      setBillValue={setBillValue}
                      setPan={setPan}
                      pan={pan}
                      err={err}
                    />
                  ) : (
                    <Button
                      type="submit"
                      form="bbpsForm"
                      className="btn-background"
                      sx={{ width: "100%", mt: 1 }}
                    >
                      {mpinVal ? "Pay Now" : "Continue"}
                    </Button>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </>
  ) : (
    <Typography variant="h6" align="center">
      Please select a biller to view details.
    </Typography>
  )}
</Grid>

    </Grid>
  </Box>
)}

    </Box>
</Box>

          <div
            className="card-css"
            style={{
              height: "max-content",
              marginTop: "12px",
              position: "relative",
            }}
          >
            <Loader loading={progress || payRequest} />           
          </div>
          <CommonMpinModal
            open={openMpin}
            setOpen={setOpenMpin}
            mPinCallBack={(mPinValue) => {
              setMpinVal(mPinValue);
            }}
          />
        </>
      )}
    </>
  );
};

export default BBPSView;
