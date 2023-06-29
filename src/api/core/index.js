import axios from "axios";

const instance = axios.create({
  baseURL: "http://13.209.245.103:8079",
});

export default instance;
