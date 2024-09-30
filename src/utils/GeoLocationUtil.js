// function handlePermission() {
//   navigator.permissions.query({ name: "geolocation" }).then(function (result) {
//     if (result.state.toLowerCase() === "granted") {
//       report(result.state);
//       // geoBtn.style.display = "none";
//     } else if (result.state.toLowerCase() === "prompt") {
//       report(result.state);
//       // geoBtn.style.display = "none";
//       navigator.geolocation.getCurrentPosition(
//         (revealPosition) => {

//         },
//         (positionDenied) => {

//         },
//         (geoSettings) => { }
//       );
//     } else if (result.state.toLowerCase() === "denied") {
//       report(result.state);
//       // geoBtn.style.display = "inline";
//     }
//     result.addEventListener("change", function () {
//       report(result.state);
//     });
//   });
// }

// function report(state) {
//   console.log("Permission " + state);
// }

function checkLocationPermission() {
  if ("geolocation" in navigator) {
    // console.log("Geo Locator Available");
  } else {
    // console.log("Not Available");
    // handlePermission();
  }
  return "geolocation" in navigator;
}

function getLatLong(onSuccess, onFailed) {
  if (checkLocationPermission(onFailed)) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        onSuccess(position.coords.latitude, position.coords.longitude);
      },
      (err) => {
        console.log("Error in Location :", err.message);
        onFailed(err.message);
      }
    );
  } else {
    onFailed("No Location Permission given");
  }
}

export const getGeoLocation = (onSuccess, onFailed) => {
  let lat, long;
  console.log("Calling getGeoLocation")
  return () => {
    if (!lat && !long) {
      getLatLong(
        (latX, longX) => {
          lat = latX;
          long = longX;
          onSuccess(lat, long);
        },
        (err) => {
          onFailed(err);
        }
      );
    } else {
      onSuccess(lat, long);
      return [lat, long];
    }
  };
};
