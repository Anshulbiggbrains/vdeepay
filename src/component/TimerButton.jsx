import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";

const TimerButton = ({
  initialSeconds = 60,
  setIsResend = true,
  resetCount = 0,
  isresend,
}) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        clearInterval(myInterval);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  useEffect(() => {
    if (seconds === 0) {
      setIsResend(false);
    } else {
      setIsResend(true);
    }
    return () => {};
  }, [seconds]);

  useEffect(() => {
    setSeconds(initialSeconds);
    return () => {};
  }, [resetCount]);

  return (
    <Button
      variant="contained"
      disabled={isresend}
      sx={{
        width: "100%",
        textTransform: "none",
        height: "50px",
        fontSize: "0.95rem",
        backgroundColor: "#34ABF4",
        marginRight: "1rem",
      }}
    >
      <div>
        Resend OTP in
        <span style={{ color: "#000" }}> {seconds} s</span>
      </div>
    </Button>
  );
};

export default TimerButton;
