import { get, post } from "../util/http"
const api = '/program'
export const programService = {
  api,
  list: async() => await get({api: `${api}/`})
}

