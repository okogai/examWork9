import axios from "axios";

const axiosAPI = axios.create({
  baseURL: "http://api.tvmaze.com/",
});

export default axiosAPI;
