import server from "./request"

export const request = new server({
  baseURL: "http://localhost:8080/api",
  timeout: 5000,
  withCredentials: true
})
