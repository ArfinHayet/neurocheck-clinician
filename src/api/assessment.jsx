import { token } from "@/components/utils/token";
import { domain } from "../../secret";


const getAllanswers = async ({ assessmentId }) => {
  const response = await fetch(`${domain}/answers?assessmentId=${assessmentId}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${localStorage.getItem("accessToken")}`
      // Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return data;
};


const getAllsubmissions = async () => {
  const response = await fetch(`${domain}/submissions`, {
    method: "GET",
    headers: {
         authorization: `Bearer ${localStorage.getItem("accessToken")}`
    },
  });

  const data = await response.json();
  return data;
};


const updateStatus = async (id, obj) => {
 
    const response = await fetch(`${domain}/submissions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`
      },
      body: JSON.stringify(obj),
    });
  
    const data = await response.json();
    console.log("Update response:", data);
    return data;

};



export { getAllanswers , getAllsubmissions, updateStatus};
