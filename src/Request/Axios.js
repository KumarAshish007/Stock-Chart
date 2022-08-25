import axios from "axios";
import url from "../urls/Url";

export default axios.create({
  baseURL: url.SERVER_URL,
  headers: {
    Authorization: localStorage["TRADINGTOKEN"],
  },
});
