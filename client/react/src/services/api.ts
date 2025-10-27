import axios from "axios";


const api = axios.create(
  {
    baseURL:"http://localhost:8486",
    headers : {
      "Content-Type" : "application/json",
    }
  }
)

export default api;