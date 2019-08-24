import axios from "axios";
import { settings } from "@/settings";

const API_SERVER = settings.API_SERVER;

export const api_routes = {
  user: {
    login: API_SERVER + "api/users/Login",
    check: API_SERVER + "api/users/Register",
    me: API_SERVER + "api/profile",
    update: API_SERVER + "api/profile"
  },
  friends: {
    list: API_SERVER + "api/friends",
    add: API_SERVER + "api/friends",
    remove: API_SERVER + "api/friends"
  },
  points: {
    list: API_SERVER + "api/users/{userId}/points",
  },
  rankings: {
    list_global: API_SERVER + "api/rankings/global",
    list_local: API_SERVER + "api/rankings/local",
    list_friends: API_SERVER + "api/rankings/friends",
    ranking_summary: API_SERVER + "api/rankings/summary"
  },
  tokens: {
    claim: API_SERVER + "api/tokens"
  },
  awards: {
    list_awards: API_SERVER + "api/awards"
  },
  sufficient_types: {
    list_baseline: API_SERVER + "api/sufficienttype/baseline",
    list_personal: API_SERVER + "api/sufficienttype/user"
  },
  widgets: {
    quiz: {
      get_question: API_SERVER + "api/widgets/quiz/question",
      answer_question: API_SERVER + "api/widgets/quiz/question"
    }
  }
};

const urlReplace = (url, urlData) => {
  for (let prop in urlData) {
    url = url.replace(`{${prop}}`, urlData[prop])
  }
  return url
}

export const apiCall = ({ url, method, urlData, ...args }) =>
  new Promise((resolve, reject) => {
    let token = localStorage.getItem("user-token") || "";

    if (token)
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;

    try {
      if (urlData) {
        url = urlReplace(url, urlData);
      }

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
