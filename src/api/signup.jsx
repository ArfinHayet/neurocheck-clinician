

// const getAllSeriesPost = async () => {
//   const response = await fetch(`${domain}/api/series`, {
//     method: "GET",
//     headers: {
//       authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//     },
//   });

import { domain } from "../../secret";

//   const data = await response.json();

//   return data;
// };

const sendOtp = async (obj) => {
  // //console.log("hello series", obj);

  const response = await fetch(`${domain}/auth/send-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //     authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify(obj),
  });

  const data = await response.json();
  console.log("data", data);

  return data;
};

// const deleteSeries = async (obj) => {
//   const response = await fetch(`${domain}/api/series`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(obj),
//   });

//   const data = await response.json();
//   return data;
// };

export { sendOtp };
