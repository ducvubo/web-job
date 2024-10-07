import { Test, TestingModule } from '@nestjs/testing';
import { TagProfessionService } from './tag-profession.service';

describe('TagProfessionService', () => {
  let service: TagProfessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagProfessionService],
    }).compile();

    service = module.get<TagProfessionService>(TagProfessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
