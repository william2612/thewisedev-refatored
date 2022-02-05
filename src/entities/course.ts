import { Lecture } from '.'
import { Either } from '../shared/either'
import { Container } from './container'

import { ExistingElementError } from './errors/existing-element-error'
import { UnexistingElementError } from './errors/unexisting-element-error'
import { Module } from './module'

export class Course {
  private readonly modules: Container<Module> = new Container<Module>()
  public reference: string
  public description: string

  constructor (reference: string, description: string) {
    this.reference = reference
    this.description = description
  }

  get numberOfModules (): number {
    return this.modules.numberOfElements
  }

  add (module: Module): Either <ExistingElementError, void> {
   return this.modules.add(module)
    
  }

  remove (module:Module):Either <UnexistingElementError, void>{
     return this.modules.remove(module)
  }

  includes (module: Module): boolean {
    return this.modules.includes(module)
  }

  move (module: Module, position: number): Either <UnexistingElementError, void >{
   return  this.modules.move(module, position)
  }

  position (module: Module): Either<UnexistingElementError, number> {
    return this.modules.position(module)
  }

  moveLecture (lecture: Lecture, fromModule: Module, toModule: Module, position: number): void {
    fromModule.remove(lecture)
    toModule.add(lecture)
    const currentLecturePosition = toModule.position(lecture).value
    if (currentLecturePosition !== position) toModule.move(lecture, position)
  }
}
