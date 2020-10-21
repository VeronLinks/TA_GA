import { Service } from 'typedi';

import { CompanyType } from './company-type.model';
import { CompanyTypeRepository } from './repository/company-type.repository';

@Service()
export class CompanyTypeService {

  constructor(private readonly companyTypeRepository: CompanyTypeRepository) { }

  async findAll(): Promise<CompanyType[]> {
    return await this.companyTypeRepository.findAll();
  }

}
