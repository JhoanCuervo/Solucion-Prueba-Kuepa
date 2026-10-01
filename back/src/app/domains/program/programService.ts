// @import_dependencies

// @import_services

// @import_models
import { Program, } from "@app/models"

// @import_utilities
import { responseUtility } from "@core/utilities/responseUtility"

// @import_types


class ProgramService {
  
  
  constructor () {}
  
  public async upsert (_params:any) {
    try{ 
      const {id} = _params;
  
      if(id){
        const exists = await Program.findOne({_id: id}).lean()
        if(!exists) return responseUtility.error('program.not_found');
        
        const object = await Program.findOneAndUpdate({_id: id}, {$set: _params}, {new:true, lean:true})
        return responseUtility.success({object})
      } else {
        const create = await Program.create(_params)
        const object = create.toObject()
        
        return responseUtility.success({object})
      }
    } catch (error) {
      console.log('error', error)
    }
  }
  
  
  
  
  public async list (_params:any) {
    
    try{
      const where:any = {}
  
      let programs = await Program.find(where)
      .sort({name:1})
      .limit(100)
      .lean()
      
      return responseUtility.success({
        list:programs
      })
    } catch (error) {
      console.log('error', error)
    }
  }

}



export const programService = new ProgramService()
export { ProgramService }
