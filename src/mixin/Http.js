import axios from "axios";

const root = `${process.env.VUE_APP_API_URL}`;

class Http {
  constructor() {
    let service = axios.create({});
    service.interceptors.request.use((config) => {
      // firebaseトークンをサーバー側で認証するためログイン時に保持していたトークンを送る
      const token = localStorage.getItem("token");
      config.headers.common["Authorization"] = "Bearer " + token;
      return config;
    });
    this.service = service;
  }

  redirectTo = (document, path) => {
    document.location = path;
  };

  get(path) {
    return this.service.get(root + path);
  }

  post(path, payload) {
    return this.service.request({
      method: "POST",
      url: root + path,
      responseType: "json",
      data: payload
    });
  }
}

export default new Http();
