// import { Icon } from "@iconify/react";
// import React from "react";

// // 1 = (active, green ), 2= (pending, yellow), 0 = (inactive, red)

// const CommonStatus = ({
//   status,
//   fontSize = "16px",
//   rejectedStatusText = "Un-verified",

//   approvedStatusText = "Verified",
//   pendingStatusText = "Pending",
//   refundStatusText = "return",
//   minWidth,
//   maxWidth,
// }) => {
//   const makeStatusReadable = (passedStatus) => {
//     if (passedStatus === 1) {
//       return approvedStatusText;
//     } else if (passedStatus === 0) {
//       return rejectedStatusText;
//     } else if (passedStatus === 2) {
//       return pendingStatusText;
//     } else if (passedStatus === "PENDING") {
//       return pendingStatusText;
//     } else if (
//       passedStatus === "SUCCESS" ||
//       passedStatus === "OPEN" ||
//       passedStatus === "ONLINE" ||
//       passedStatus === "APPROVED"
//     ) {
//       return approvedStatusText;
//     } else if (
//       passedStatus === "REJECTED" ||
//       passedStatus === "FAILED" ||
//       passedStatus === "CLOSED" ||
//       passedStatus === "OFFLINE"
//     ) {
//       return rejectedStatusText;
//     } else if (passedStatus === "REFUND") {
//       return refundStatusText;
//     }
//   };
//   return (
//     <div
//       className={
//         status === 1 ||
//         status === "SUCCESS" ||
//         status === "APPROVED" ||
//         status === "OPEN"
//           ? "status-design-active"
//           : status === 2 || status === "PENDING"
//           ? "status-design-pending"
//           : status === 0 || status === "REJECTED"
//           ? "status-design-rejected"
//           : status === "REFUND"
//           ? "status-design-refund"
//           : "status-design-inactive"
//       }
//       style={{ minWidth: minWidth, maxWidth: maxWidth, fontSize: fontSize }}
//     >
//       <Icon
//         icon={
//           status === 1 ||
//           status === "SUCCESS" ||
//           status === "APPROVED" ||
//           status === "OPEN"
//             ? "mdi:tick-circle"
//             : status === 2 || status === "PENDING"
//             ? "zondicons:exclamation-outline"
//             : status === 0 || status === "REJECTED"
//             ? "bx:x-circle"
//             : status === "REFUND"
//             ? "iconoir:undo-circle"
//             : "carbon:error"
//         }
//         style={{
//           fontSize: fontSize,
//           color:
//             status === 1 || status === "SUCCESS" || status === "OPEN"
//               ? "#02B062 "
//               : status === 2 || status === "PENDING"
//               ? "#e0b64b "
//               : status === 0 || status === "REJECTED"
//               ? "#e01a1a "
//               : status === "REFUND"
//               ? "#32b83b "
//               : "#e77774 ",
//         }}
//       />
//       <span className="ms-1">{makeStatusReadable(status)}</span>
//     </div>
//   );
// };

// export default CommonStatus;
import { Button, IconButton, Box } from "@mui/material";
import { Icon } from "@iconify/react";
import React from "react";

// 1 = (active, green ), 2= (pending, yellow), 0 = (inactive, red)

const CommonStatus = ({
  status,
  fontSize = "16px",
  rejectedStatusText = "Un-verified",
  approvedStatusText = "Verified",
  pendingStatusText = "Pending",
  refundStatusText = "Return",
  minWidth,
  maxWidth,
}) => {
  const makeStatusReadable = (passedStatus) => {
    if (passedStatus === 1) {
      return approvedStatusText;
    } else if (passedStatus === 0) {
      return rejectedStatusText;
    } else if (passedStatus === 2) {
      return pendingStatusText;
    } else if (passedStatus === "PENDING") {
      return pendingStatusText;
    } else if (
      passedStatus === "SUCCESS" ||
      passedStatus === "OPEN" ||
      passedStatus === "ONLINE" ||
      passedStatus === "APPROVED"
    ) {
      return approvedStatusText;
    } else if (
      passedStatus === "REJECTED" ||
      passedStatus === "FAILED" ||
      passedStatus === "CLOSED" ||
      passedStatus === "OFFLINE"
    ) {
      return rejectedStatusText;
    } else if (passedStatus === "REFUND") {
      return refundStatusText;
    }
  };

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "10px",
        minWidth: minWidth,
        maxWidth: maxWidth,
        fontSize: fontSize,
        color: "#312e2e",
        fontWeight: "bold",
        borderRadius: "8px",
        textTransform: "uppercase",
        transition: "all 0.3s ease",
        justifyContent: "center",
        background:
          status === 1 ||
          status === "SUCCESS" ||
          status === "APPROVED" ||
          status === "OPEN"
            ? "linear-gradient(45deg, #1ee383, #16de4c)"
            : status === 2 || status === "PENDING"
            ? "linear-gradient(45deg, #DB9D00, #f0c324)"
            : status === 0 || status === "REJECTED" || status === "FAILED"
            ? "linear-gradient(45deg, #ec2626, #d93025)"
            : status === "REFUND"
            ? "linear-gradient(45deg, #1260e0, #1751cf)"
            : "linear-gradient(45deg, #9e9e9e, #7e7e7e)",
        boxShadow:
          status === 1 ||
          status === "SUCCESS" ||
          status === "APPROVED" ||
          status === "OPEN"
            ? "0px 4px 15px rgba(0, 255, 150,0.2 )"
            : status === 2 || status === "PENDING"
            ? "0px 4px 15px rgba(255, 196, 0,0.2  )"
            : status === 0 || status === "REJECTED" || status === "FAILED"
            ? "0px 4px 15px rgba(255, 0, 0,0.2  )"
            : status === "REFUND"
            ? "0px 4px 15px rgba(0, 150, 255, 0.2 )"
            : "0px 4px 15px rgba(150, 150, 150, 0.2 )",
        "&:hover": {
          transform: "scale(1.05)",

          boxShadow:
            status === 1 ||
            status === "SUCCESS" ||
            status === "APPROVED" ||
            status === "OPEN"
              ? "0px 6px 20px rgba(0, 255, 150,0.2  )"
              : status === 2 || status === "PENDING"
              ? "0px 6px 20px rgba(255, 196, 0,0.2  )"
              : status === 0 || status === "REJECTED" || status === "FAILED"
              ? "0px 6px 20px rgba(255, 0, 0,0.2  )"
              : status === "REFUND"
              ? "0px 6px 20px rgba(0, 150, 255,0.2  )"
              : "0px 6px 20px rgba(150, 150, 150,0.2  )",
        },
      }}
    >
      {/* <Icon
        icon={
          status === 1 ||
          status === "SUCCESS" ||
          status === "APPROVED" ||
          status === "OPEN"
            ? "mdi:tick-circle"
            : status === 2 || status === "PENDING"
            ? "zondicons:exclamation-outline"
            : status === 0 || status === "REJECTED"
            ? "bx:x-circle"
            : status === "REFUND"
            ? "iconoir:undo-circle"
            : "carbon:error"
        }
        style={{
          fontSize: fontSize,
          marginRight: "8px",
          color:
            status === 1 || status === "SUCCESS" || status === "OPEN"
              ? "#02B062"
              : status === 2 || status === "PENDING"
              ? "#e0b64b"
              : status === 0 || status === "REJECTED"
              ? "#e01a1a"
              : status === "REFUND"
              ? "#32b83b"
              : "#e77774",
        }}
      /> */}
      <span>{makeStatusReadable(status)}</span>
    </Box>
  );
};

export default CommonStatus;
