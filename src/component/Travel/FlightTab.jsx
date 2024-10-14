import React from "react";
import OneWayFlightForm from "./OneWayFlightForm";
// import RoundTripFlightForm from "./RoundTripFlightForm";
import { AppBar, Button, Grid, Tab, Tabs } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { setArrivalDate, setTripType } from "../../features/flight/flightSlice";
import { back } from "../../iconsImports";

const FlightTab = ({resetView}) => {
  const dispatch = useDispatch();
  const { tripType } = useSelector((state) => state?.flight);
const handleBack=()=>{
  resetView(false)
}
  const handleChange = (event, newValue) => {
    if (newValue === "0") {
      dispatch(setArrivalDate(""));
    }
    dispatch(setTripType(newValue));
  };

  return (
    <>
    <Grid  className="search-engine">
    <Grid
                   
                   item xs={12} sm="auto"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
            mr:2,
                mt:1
                  }}
                >
                  <Button
                    size="small"
                    id="verify-btn"
                    className="button-props"
                    onClick={handleBack}
                  >
                    <span style={{ marginRight: "5px" }}>Home</span>
                    <img
                      src={back}
                      alt="back"
                      style={{ width: "18px", height: "20px" }}
                    />
                  </Button>
                  </Grid>

    <TabContext value={tripType && tripType}  >
      {/* <!-- FLIGHT MULTIPLE SEARCH TAB --> */}
      <FLightSearchTab
        value={tripType && tripType}
        handleChange={handleChange}
      />
      {/* <!-- ONE WAY SEARCH --> */}
      <TabPanel
        value={"0"}
        sx={{
          padding: 0,
        }}
      >
        <OneWayFlightForm />
      </TabPanel>
      {/* <!-- ROUND TRIP SEARCH --> */}
      <TabPanel
        value={"1"}
        sx={{
          padding: 2,
        }}
      >
        <OneWayFlightForm />
      </TabPanel>
    </TabContext>
    </Grid>
  </>
  );
};

export default FlightTab;

// FLIGHT SEARCH TAB LIST..........
function FLightSearchTab({ value, handleChange }) {
  return (
    <AppBar position="static">
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="inherit"
        variant="scrollable"
        // variant="fullWidth"
        style={{ background: "#231942" }}
        aria-label="trip type width tabs"
      >
        <Tab label="One Way" value={"0"} />
        <Tab label="Round Trip" value={"1"} />
      </Tabs>
    </AppBar>
  );
}
