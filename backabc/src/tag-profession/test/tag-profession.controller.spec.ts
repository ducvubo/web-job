import { Test, TestingModule } from '@nestjs/testing';
import { TagProfessionController } from './tag-profession.controller';
import { TagProfessionService } from './tag-profession.service';

describe('TagProfessionController', () => {
  let controller: TagProfessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagProfessionController],
      providers: [TagProfessionService],
    }).compile();

    controller = module.get<TagProfessionController>(TagProfessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
