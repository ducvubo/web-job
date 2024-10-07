import { Test, TestingModule } from '@nestjs/testing';
import { TagSkillsService } from './tag-skills.service';

describe('TagSkillsService', () => {
  let service: TagSkillsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagSkillsService],
    }).compile();

    service = module.get<TagSkillsService>(TagSkillsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
