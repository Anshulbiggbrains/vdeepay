import { Icon } from "@iconify/react";
import React from "react";

// 1 = (active, green ), 2= (pending, yellow), 0 = (inactive, red)

const CommonStatus = ({
  status,
  fontSize = "16px",
  rejectedStatusText = "Un-verified",

  approvedStatusText = "Verified",
  pendingStatusText = "Pending",
  refundStatusText = "return",
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
    <div
      className={
        status === 1 ||
        status === "SUCCESS" ||
        status === "APPROVED" ||
        status === "OPEN"
          ? "status-design-active"
          : status === 2 || status === "PENDING"
          ? "status-design-pending"
          : status === 0 || status === "REJECTED"
          ? "status-design-rejected"
          : status === "REFUND"
          ? "status-design-refund"
          : "status-design-inactive"
      }
      style={{ minWidth: minWidth, maxWidth: maxWidth, fontSize: fontSize }}
    >
      <Icon
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
          color:
            status === 1 || status === "SUCCESS" || status === "OPEN"
              ? "#02B062 "
              : status === 2 || status === "PENDING"
              ? "#e0b64b "
              : status === 0 || status === "REJECTED"
              ? "#e01a1a "
              : status === "REFUND"
              ? "#32b83b "
              : "#e77774 ",
        }}
      />
      <span className="ms-1">{makeStatusReadable(status)}</span>
    </div>
  );
};

export default CommonStatus;
