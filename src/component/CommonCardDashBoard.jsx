import React from "react";
import { Box, Tooltip, Typography, Button } from "@mui/material";

const CommonCardDashBoard = ({ name, img, onClick }) => {
  return (
    <>
      <Tooltip title={name} placement="top">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column", // Stack items vertically
            alignItems: "center", // Center items horizontally
            justifyContent: "center",
            background:
              "linear-gradient(-65deg, var(--bg) 50%, var(--accent) 50%)",
            textAlign: "center", // Center the text
            cursor: "pointer",
            transition: "box-shadow 0.3s ease-in-out",
            width: "100%",
            height: "100%",
            overflow: "hidden",

            // Yellow box shadow on hover
          }}
          onClick={onClick}
        >
          <Box
            sx={{
              width: { xs: "60px", sm: "80px" },
              height: { xs: "60px", sm: "80px" },
              // boxShadow: '0px 4px 8px rgba(255, 217, 61, 0.7)',
              mt: 1,
              borderRadius: "50%",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: 2,
              background: "white",
              mb: 1, // Margin bottom for spacing between image and text
              transition:
                "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0px 4px 1px rgb(176,131,3)", // Larger yellow box shadow on hover
              },
            }}
          >
            <img
              src={img}
              alt={name}
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "30%", // Ensures the image is circular
              }}
            />
          </Box>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 500,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {name}
          </Typography>
        </Box>
      </Tooltip>
    </>
  );
};

export default CommonCardDashBoard;
