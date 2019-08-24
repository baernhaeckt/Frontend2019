import axios from "axios";
import { settings } from "@/settings";

const API_SERVER = settings.API_SERVER;

export const api_routes = {
  user: {
    login: API_SERVER + "api/users/Login",
    check: API_SERVER + "api/users/Register",
    me: API_SERVER + "api/profile"
  }
};

export const apiCall = ({ url, method, ...args }) =>
  new Promise((resolve, reject) => {
    let token = localStorage.getItem("user-token") || "";

    if (token)
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;

    try {
      axios({
        method: method || "get",
        url: url,
        ...args
      })
        .then(resp => {
          resolve(resp.data);
        })
        .catch(error => {
          reject(error);
        });
    } catch (err) {
      reject(new Error(err));
    }
  });
