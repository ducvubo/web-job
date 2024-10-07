import { Test, TestingModule } from '@nestjs/testing'
import { TagSkillsController } from '../tag-skills.controller'
import { TagSkillsService } from '../tag-skills.service'

describe('TagSkillsController', () => {
  let controller: TagSkillsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagSkillsController],
      providers: [TagSkillsService]
    }).compile()

    controller = module.get<TagSkillsController>(TagSkillsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
