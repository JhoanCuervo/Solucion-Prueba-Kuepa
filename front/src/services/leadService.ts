import { IData } from "@/pages/leads/interfaceLeads"
import { get, post } from "../util/http"
const api = '/lead'
export const leadService = {
  api,
  get: async({_id}:{_id:string}) =>{
    return await get({api: `${api}/get/${_id}`})
  },
  
  upsert: async (data:IData) => await post({ api: `${api}/upsert`, options: { data } }),

}

