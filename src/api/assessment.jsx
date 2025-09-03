import { token } from "@/components/utils/token";
import { domain } from "../../secret";


const getAllanswers = async () => {
  const response = await fetch(`${domain}/answers`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return data;
};

const getAllsubmissions = async () => {
  const response = await fetch(`${domain}/submissions`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return data;
};



export { getAllanswers , getAllsubmissions};
