import service from "./request"

// interface Resulve {
//   success: boolean,
//   code: number,
//   msg: string,
//   data: any
// }

export const get = (url: string, params?: object) => {
  return service.get(url, {params})
}

export const post = (url: string, params?: object) => {
  return service.post(url, params)
}

export const put = (url: string, params?: object) => {
  return service.put(url, params)
}

export const del = (url: string, params?: object) => {
  return service.delete(url, {params})
}
