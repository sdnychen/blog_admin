import service from "./request"

export const get = (url: string, params: any) => {
  return service.get(url, {
    params
  })
}

export const post = (url: string, params: any) => {
  return service.post(url, params)
}

export const put = (url: string, params: any) => {
  return service.put(url, params)
}

export const del = (url: string, params: any) => {
  return service.delete(url, {
    params
  })
}
