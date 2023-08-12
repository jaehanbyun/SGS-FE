import axios from "axios";

const instance = axios.create({
  baseURL: "https://sgs.p-e.kr:8000",
});

export default instance;
