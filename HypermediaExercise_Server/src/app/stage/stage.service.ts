import { Service } from 'typedi';
import { isString, isNumber, toNumber } from 'lodash';

import { StageRepository } from './repository/stage.repository';
import { Stage } from './stage.model';

@Service()
export class StageService {

  constructor(private readonly stageRepository: StageRepository) { }

  async update(): Promise<Stage> {
    return await this.stageRepository.update();
  }

  async findById(stageId: number): Promise<Stage | null> {
    if (!this.isValidId(stageId)) {
      return Promise.reject(new Error('InvalidStageIdError'));
    }

    return await this.stageRepository.findById(stageId);
  }
  private isValidId(stageId: any): boolean {
    return stageId != null && isNumber(toNumber(stageId));
  }
}
