import { Test, TestingModule } from '@nestjs/testing';
import { TagAreasService } from './tag-areas.service';

describe('TagAreasService', () => {
  let service: TagAreasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagAreasService],
    }).compile();

    service = module.get<TagAreasService>(TagAreasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
