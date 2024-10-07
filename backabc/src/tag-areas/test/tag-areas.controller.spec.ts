import { Test, TestingModule } from '@nestjs/testing';
import { TagAreasController } from './tag-areas.controller';
import { TagAreasService } from './tag-areas.service';

describe('TagAreasController', () => {
  let controller: TagAreasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagAreasController],
      providers: [TagAreasService],
    }).compile();

    controller = module.get<TagAreasController>(TagAreasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
