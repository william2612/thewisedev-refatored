import { Course, Module, Lecture } from '../../src/entities'

import { ExistingElementError } from '../../src/entities/errors/existing-element-error'



describe('Course', () => {
  it('should be able to add modules to courses', () => {
    const course = new Course('azure-devops',
      'Continuous Delivery and DevOps with Azure DevOps: Source Control with Git')
    const module = new Module('Fundamentals')
    const lecture: Lecture = new Lecture('Branching', 'https://youtube.com/1234')
    module.add(lecture)
    course.add(module)
    expect(course.includes(module)).toBeTruthy()
  })

  it('should not be able to add modules with same name', () => {
    const course = new Course('azure-devops',
      'Continuous Delivery and DevOps with Azure DevOps: Source Control with Git')
    const module1 = new Module('Fundamentals')
    const lecture: Lecture = new Lecture('Branching', 'https://youtube.com/1234')

    const module2 = new Module('Fundamentals')

    module1.add(lecture)
    const ok= course.add(module1). value as void
    const error = course.add(module2).value as ExistingElementError 
    expect(ok).toEqual(undefined)
    expect(course.includes(module1)).toBeTruthy()
    expect(course.numberOfModules).toEqual(1)
    expect(error.message).toEqual('Element already exists.')

  })

  it('should be able to rearrange the order of modules', () => {
    const course = new Course('azure-devops', 'Continuous Delivery and DevOps with Azure DevOps: Source Control with Git')
    const fundamentalsModule = new Module('Fundamentals')
    const branchingLecture: Lecture = new Lecture('Branching', 'https://youtube.com/1234')
    fundamentalsModule.add(branchingLecture)

    const courseOverviewModule = new Module('Course Overview')
    const courseOverviewLecture = new Lecture('Course Overview', 'https://youtube.com/3456')
    courseOverviewModule.add(courseOverviewLecture)

    const gitModule = new Module('Source Control with Git on Azure DevOps')
    const introductionLecture = new Lecture('Introduction', 'https://youtube.com/6789')
    gitModule.add(introductionLecture)

    course.add(fundamentalsModule)
    course.add(courseOverviewModule)
    course.add(gitModule)

    course.move(courseOverviewModule, 1)

    expect(course.position(courseOverviewModule)).toBe(1)
    expect(course.position(fundamentalsModule)).toBe(2)
    expect(course.position(gitModule)).toBe(3)
  })

  it('should handle exceeding position while rearranging', () => {
    const course = new Course('azure-devops', 'Continuous Delivery and DevOps with Azure DevOps: Source Control with Git')
    const fundamentalsModule = new Module('Fundamentals')
    const branchingLecture: Lecture = new Lecture('Branching', 'https://youtube.com/1234')
    fundamentalsModule.add(branchingLecture)

    const courseOverviewModule = new Module('Course Overview')
    const courseOverviewLecture = new Lecture('Course Overview', 'https://youtube.com/3456')
    courseOverviewModule.add(courseOverviewLecture)

    const gitModule = new Module('Source Control with Git on Azure DevOps')
    const introductionLecture = new Lecture('Introduction', 'https://youtube.com/6789')
    gitModule.add(introductionLecture)

    course.add(fundamentalsModule)
    course.add(courseOverviewModule)
    course.add(gitModule)

    course.move(fundamentalsModule, 10)

    expect(course.position(fundamentalsModule)).toBe(1)
    expect(course.position(courseOverviewModule)).toBe(2)
    expect(course.position(gitModule)).toBe(3)
  })

  it('should handle negative position while rearranging', () => {
    const course = new Course('azure-devops', 'Continuous Delivery and DevOps with Azure DevOps: Source Control with Git')
    const fundamentalsModule = new Module('Fundamentals')
    const branchingLecture: Lecture = new Lecture('Branching', 'https://youtube.com/1234')
    fundamentalsModule.add(branchingLecture)

    const courseOverviewModule = new Module('Course Overview')
    const courseOverviewLecture = new Lecture('Course Overview', 'https://youtube.com/3456')
    courseOverviewModule.add(courseOverviewLecture)

    const gitModule = new Module('Source Control with Git on Azure DevOps')
    const introductionLecture = new Lecture('Introduction', 'https://youtube.com/6789')
    gitModule.add(introductionLecture)

    course.add(fundamentalsModule)
    course.add(courseOverviewModule)
    course.add(gitModule)

    course.move(courseOverviewModule, -1)

    expect(course.position(fundamentalsModule)).toBe(1)
    expect(course.position(courseOverviewModule)).toBe(2)
    expect(course.position(gitModule)).toBe(3)
  })

  it('should be able to move a lecture to a different module', () => {
    const course = new Course('azure-devops', 'Continuous Delivery and DevOps with Azure DevOps: Source Control with Git')
    const fundamentalsModule = new Module('Fundamentals')
    const branchingLecture: Lecture = new Lecture('Branching', 'https://youtube.com/1234')
    fundamentalsModule.add(branchingLecture)

    const courseOverviewModule = new Module('Course Overview')
    const courseOverviewLecture = new Lecture('Course Overview', 'https://youtube.com/3456')
    courseOverviewModule.add(courseOverviewLecture)

    const gitModule = new Module('Source Control with Git on Azure DevOps')
    const introductionLecture = new Lecture('Introduction', 'https://youtube.com/6789')
    const lecture2 = new Lecture('Lecture 2', 'https://youtube.com/6789')
    gitModule.add(introductionLecture)
    gitModule.add(lecture2)

    course.add(fundamentalsModule)
    course.add(courseOverviewModule)
    course.add(gitModule)

    course.moveLecture(branchingLecture, fundamentalsModule, gitModule, 2)

    expect(fundamentalsModule.numberOfLectures).toEqual(0)
    expect(gitModule.numberOfLectures).toEqual(3)
    expect(gitModule.position(branchingLecture)).toEqual(2)
  })
})
