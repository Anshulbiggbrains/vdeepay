// import { m } from "framer-motion"
// import PropTypes from "prop-types"
// import { useContext } from "react"
// import { Box } from "@mui/material"
// // import { useRouter } from "next/router"
// import { AuthContextProvider } from "../../store/AuthContext"
// import { alpha, styled } from "@mui/material/styles"
// import { smLogo } from "../../iconsImports"

// const StyledRoot = styled("div")(() => ({
//   right: 0,
//   bottom: 0,
//   zIndex: 9998,
//   width: "100%",
//   height: "100%",
//   position: "fixed",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   backdropFilter: "blur(5px)",
//   background: "rgb(0, 0, 0,0.2)"
// }))

// const Loader = ({loading, children}) => {

//   return (
//     <div>
//       {loading ? (
//         <StyledRoot>
//           <m.div
//             animate={{
//               scale: [1, 0.9, 0.9, 1, 1],
//               opacity: [1, 0.48, 0.48, 1, 1]
//             }} 
//             transition={{
//               duration: 2,
//               ease: "easeInOut",
//               repeatDelay: 1,
//               repeat: Infinity
//             }}
//           >
//             <img
//               src={smLogo}
//               style={{ cursor: "pointer", width: 80 }}
//               alt="favicon"
//             />
//           </m.div>
//           <Box
//             component={m.div}
//             animate={{
//               scale: [1.6, 1, 1, 1.6, 1.6],
//               rotate: [270, 0, 0, 270, 270],
//               opacity: [0.25, 1, 1, 1, 0.25],
//               borderRadius: ["25%", "25%", "50%", "50%", "25%"]
//             }}
//             transition={{ ease: "linear", duration: 3.2, repeat: Infinity }}
//             sx={{
//               width: 100,
//               height: 100,
//               position: "absolute",
//               borderRadius: 4,
//               border: "solid 5px #1877F2"
//             }}
//           />
//           <Box
//             component={m.div}
//             animate={{
//               scale: [1, 1.2, 1.2, 1, 1],
//               rotate: [0, 270, 270, 0, 0],
//               opacity: [1, 0.25, 0.25, 0.25, 1],
//               borderRadius: ["25%", "25%", "50%", "50%", "25%"]
//             }}
//             transition={{
//               ease: "linear",
//               duration: 3.2,
//               repeat: Infinity
//             }}
//             sx={{
//               zIndex: 9999,
//               width: 120,
//               height: 120,
//               position: "absolute",
//               borderRadius: 4,
//               border: "solid 5px #F18D18"
//             }}
//           />
//         </StyledRoot>
//       ) : null}
//       {children}
//     </div>
//   )
// }
// // Loader.propTypes = {
// //   children: PropTypes.any.isRequired
// // }

// export default Loader

import { Box } from "@mui/material";
import { smLogo } from "../../iconsImports"; // Ensure this path is correct

const Loader = ({ loading, children }) => {
  return (
    <div>
      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(5px)",
            background: "rgba(0, 0, 0, 0.5)", // Darker backdrop for better visibility
            zIndex: 9998,
            flexDirection: "column",
          }}
        >
          <div className="loader-container">
            <img
              src={smLogo}
              style={{
                cursor: "pointer",
                width: 80,
                animation: "zoomInOut 1.5s infinite", // Zoom in/out animation for the logo
              }}
              alt="Loading..."
            />
            <div className="circle1" />
            <div className="circle2" />
          </div>
          <p className="loading-text">Please wait while we are processing your request...</p>
        </Box>
      )}
      {children}
      <style jsx>{`
        .loader-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .circle1,
        .circle2 {
          position: absolute;
          border-radius: 50%; /* Circular shape */
          animation: zoomInOut 2.5s infinite; /* Zoom in/out animation for circles */
        }

        .circle1 {
          width: 200px;
          height: 200px;
          border: 8px solid #1877F2;
          animation-delay: 0s; /* Starts immediately */
        }

        .circle2 {
          width: 220px;
          height: 220px;
          border: 8px solid #F18D18;
          animation-delay: 0.25s; /* Starts a bit later for a staggered effect */
          opacity: 0.3;
        }

        @keyframes rotateAnimation1 {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes rotateAnimation2 {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(-360deg);
          }
        }

        @keyframes zoomInOut {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1); /* Zoom in effect */
          }
        }

        .loading-text {
          margin-top: 5%;
          font-size: 20px;
          color: white;
          font-family: Arial, sans-serif;
          text-align: center; /* Center the text */
        }
      `}</style>
    </div>
  );
};

export default Loader;


