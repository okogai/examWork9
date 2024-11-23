import axios from "axios";

const axiosAPI = axios.create({
  baseURL: "https://okogaidb-default-rtdb.europe-west1.firebasedatabase.app/",
});

export default axiosAPI;
