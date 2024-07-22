import axios from "axios"

const api = axios.create({
  baseURL: "http://192.168.0.141:7000/", //process.env.EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
})

api.interceptors.response.use(
  function (response) {
    if (response.status === 200) {
      let { data } = response

      return data
    } else {
      return Promise.reject(response.data)
    }
  },
  (error) => {

    console.log({error})
    try {
      return Promise.reject(error.response?.data)
    } catch (err) {
      return Promise.reject({ status: false, error: err })
    }
  }
)

export { api }