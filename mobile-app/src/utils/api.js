import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.142:7000/", // Ensure this URL is correct and the server is running.
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  function (response) {

    console.log({st : response.status})
    if (response.status === 200 || response.status === 201 ) {
      let { data } = response;
      return data;
    } else {
      return Promise.reject(response.data);
    }
  },
  (error) => {
    console.log({ error });
    try {
      return Promise.reject(error.response?.data);
    } catch (err) {
      return Promise.reject({ status: false, error: err });
    }
  }
);

export { api };
