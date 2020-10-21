import { DatabaseService } from '../../../database/database';
import { Service } from 'typedi';

import { CompanyType } from '../company-type.model';

@Service()
export class CompanyTypeRepository {

  constructor(private readonly databaseService: DatabaseService) { }

  async findAll(): Promise<CompanyType[]> {
    const queryDoc = {
      sql: 'SELECT * FROM core.company_types'
    };

    const companyTypes = await this.databaseService.execQuery(queryDoc);

    return companyTypes.rows;
  }

}
