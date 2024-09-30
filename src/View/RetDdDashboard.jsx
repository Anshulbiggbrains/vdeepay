import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import RetProductionSaleComponent from "../component/RetProductionSaleComponent";
import AskForDocsModal from "../modals/AskForDocsModal";
import AuthContext from "../store/AuthContext";
import Mount from "../component/Mount";
import { USER_ROLES } from "../utils/constants";
import MyEarnings from "../component/dashboard/retailer/MyEarnings";

const RetDdDashboard = () => {
  const [graphDuration, setGraphDuration] = useState("TODAY");
  const [graphRequest, setGraphRequest] = useState(false);
  const [open, setopen] = useState(false);
  const location = useLocation();
  const authCtx = useContext(AuthContext);
  const role = authCtx.user.role;

  useEffect(() => {
    if (
      authCtx.ifDocsUploaded &&
      (authCtx.ifDocsUploaded.pan_image === 0 ||
        authCtx.ifDocsUploaded.aadhaar_image === 0) &&
      location?.state?.login
    ) {
      setTimeout(() => {
        setopen(true);
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <RetProductionSaleComponent
        graphDuration={graphDuration}
        setGraphDuration={setGraphDuration}
        graphRequest={graphRequest}
        setGraphRequest={setGraphRequest}
        role={role}
        USER_ROLES={USER_ROLES}
      />
      {/* <Mount
        visible={
          role !== USER_ROLES.ASM &&
          role !== USER_ROLES.ACC &&
          role !== USER_ROLES.API
        }
      >
        <MyEarnings />
      </Mount> */}
      <AskForDocsModal open={open} setopen={setopen} />
    </>
  );
};

export default RetDdDashboard;
