import React from "react";
import { Box, styled } from "@mui/material";

const CircleComponent = ({ img}) => {
  const OuterIcon = styled(Box)(({ theme, bg = "#08509E" }) => ({
    top: "-12px",
   
    right: "-12px",
    width: "93px",
    height: "93px",
    display: "flex",
    borderRadius: "50%",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    background: bg,
   
  }));

  const InnerIcon = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1),
    width: "60px",
    height: "60px",
    display: "flex",
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
   
    background: theme.palette.common.white,
  }));
  let imageSrc;
  try {
    imageSrc = require(`../assets/operators/${img}.png`);
  } catch (error) {
    imageSrc = null; 
  }

  return (
    <Box  className="recharge-outer-card">
      <OuterIcon>
        <InnerIcon>
          <img
           src={imageSrc}
            alt="No Image"
            width="40px"
           
          
          />
        </InnerIcon>
      </OuterIcon>
    </Box>
  );
};

export default CircleComponent;
