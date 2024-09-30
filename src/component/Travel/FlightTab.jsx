import React from "react";
import OneWayFlightForm from "./OneWayFlightForm";
// import RoundTripFlightForm from "./RoundTripFlightForm";
import { AppBar, Grid, Tab, Tabs } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { setArrivalDate, setTripType } from "../../features/flight/flightSlice";

const FlightTab = () => {
  const dispatch = useDispatch();
  const { tripType } = useSelector((state) => state?.flight);

  const handleChange = (event, newValue) => {
    if (newValue === "0") {
      dispatch(setArrivalDate(""));
    }
    dispatch(setTripType(newValue));
  };

  return (
    <>
    <Grid  className="search-engine">

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
