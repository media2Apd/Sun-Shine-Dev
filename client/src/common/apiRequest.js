import axios from "axios";

const apiRequest = async (apiConfig, payload) => {
  const token = localStorage.getItem("token");

  const res = await axios({
    url: apiConfig.url,
    method: apiConfig.method,
    data: payload, // used only for POST / PUT
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    withCredentials: true,
  });

  return res.data;
};

export default apiRequest;
