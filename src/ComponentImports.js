import { useEffect } from "react";
import AdminDashboard from "./component/AdminDashboard";

export const Admindashboard = ({
  graphDuration,
  setGraphDuration,
  user,
  request,
  userData,
  graphRequest,
  setGraphRequest,
  getTxnData,
  txnDataReq,
  txnData,
}) => {
  useEffect(() => {}, []);
  return (
    <>
      <AdminDashboard
        graphDuration={graphDuration}
        setGraphDuration={setGraphDuration}
        user={user}
        request={request}
        userData={userData}
        graphRequest={graphRequest}
        setGraphRequest={setGraphRequest}
        getTxnData={getTxnData}
        txnDataReq={txnDataReq}
        txnData={txnData}
      />
    </>
  );
};
