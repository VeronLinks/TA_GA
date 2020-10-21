import { DatabaseService } from '../../../database/database';
import { Service } from 'typedi';

import { SearchFilter } from '../../common/search-filter';
import { SearchFilterService } from '../../common/search-filter.service';
import { Company } from '../company.model';

@Service()
export class CompanyRepository {

  constructor(
    private readonly databaseService: DatabaseService,
    private readonly searchFilterService: SearchFilterService
  ) {}

  async create(
    { company_typeId, name, address = null, phone = null, cif = null, admin = false }
  ): Promise<Company> {
    const queryDoc = {
      sql: 'INSERT INTO core.companies ("company_typeId", name, address, phone, cif, admin) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      params: [ company_typeId, name, address, phone, cif, admin ]
    };

    const company = await this.databaseService.execQuery(queryDoc);
    return company.rows[0];
  }

  async update(companyId: number, company: Company): Promise<Company> {
    const { name, address, phone, cif } = company;
    const queryDoc = {
      sql: 'UPDATE core.companies SET name = $1, address = $2, phone = $3, cif = $4 WHERE id = $5 RETURNING *',
      params: [name, address, phone, cif, companyId ]
    };

    const updatedCompany = await this.databaseService.execQuery(queryDoc);
    return updatedCompany.rows[0];
  }

  async setActivationFlag(companyId: number, isActive: boolean): Promise<Company> {
    const queryDoc = {
      sql: 'UPDATE core.companies SET active = $1 WHERE id = $2 RETURNING *',
      params: [isActive, companyId]
    };

    const updatedCompany = await this.databaseService.execQuery(queryDoc);
    return updatedCompany.rows[0];
  }

  async findAll(searchFilter?: SearchFilter): Promise<Company[]> {
    const queryDoc: any = {
      sql: 'SELECT * FROM core.companies'
    };

    if (searchFilter != null) {
      const whereDoc = this.searchFilterService.transformSearchFilterToSQL(searchFilter);

      if (searchFilter.search != null || searchFilter.filter != null) {
        queryDoc.sql = queryDoc.sql + ` WHERE `;
      }

      queryDoc.sql = queryDoc.sql + whereDoc.sql;
      queryDoc.params = whereDoc.params;
    }

    const companies = await this.databaseService.execQuery(queryDoc);
    return companies.rows;
  }

  async findById(companyId: number): Promise<Company | null> {
    const queryDoc = {
      sql: 'SELECT * FROM core.companies WHERE id = $1',
      params: [companyId]
    };

    const companies = await this.databaseService.execQuery(queryDoc);
    return companies.rows[0] || null;
  }

  async remove(companyId: number): Promise<Company | null> {
    const queryDoc = {
      sql: 'DELETE FROM core.companies WHERE id = $1 RETURNING *',
      params: [ companyId ]
    };

    const updatedCompany = await this.databaseService.execQuery(queryDoc);
    return updatedCompany.rows[0] || null;
  }

}
