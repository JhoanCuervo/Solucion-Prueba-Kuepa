import { Program } from '@app/models'
import { programService } from '@app/domains/program/programService'
import { IConsole } from '@client/client'

export const run = async (_params, console: IConsole) => {
  try {
    const programs = [
      { name: 'Administración de Empresas', description: '' },
      { name: 'Contaduría Pública', description: '' },
      { name: 'Ingeniería de Software', description: '' },
      { name: 'Marketing Digital', description: '' },
      { name: 'Tecnología en Gestión de Talento Humano', description: '' },
      { name: 'Ingeniería de Sistemas', description: '' },
    ]

    for (const program of programs) {
      const exists = await Program.findOne({ name: program.name }).lean()
      if (exists) {
        program['_id'] = exists._id
        const update = await Program.updateOne({_id: exists._id}, {$set: program})
      }
      await programService.upsert(program)
    }
  } catch (error) {
    console.log('error', error)
    return false
  }
  return true
}