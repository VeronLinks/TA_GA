import { Service } from 'typedi';
import { isString, isNumber, toNumber } from 'lodash';

import { SearchFilter } from '../common/search-filter';
import { CompanyRepository } from './repository/company.repository';
import { Company } from './company.model';

@Service()
export class CompanyService {

  constructor(private readonly companyRepository: CompanyRepository) { }

  async create(company: any): Promise<Company> {
    if (!this.isValidCompany(company)) {
      return Promise.reject(new Error('CompanyInputValidationError'));
    }

    return await this.companyRepository.create(company);
  }

  async update(company: Company): Promise<Company> {
    if (!this.isValidId(company.id)) {
      return Promise.reject(new Error('InvalidCompanyIdError'));
    }

    if (!this.isValidCompany(company)) {
      return Promise.reject(new Error('CompanyInputValidationError'));
    }

    return await this.companyRepository.update(company.id, company);
  }

  async activate(companyId: number): Promise<Company> {
    if (!this.isValidId(companyId)) {
      return Promise.reject(new Error('InvalidCompanyIdError'));
    }

    return await this.companyRepository.setActivationFlag(companyId, true);
  }

  async deactivate(companyId: number): Promise<Company> {
    if (!this.isValidId(companyId)) {
      return Promise.reject(new Error('InvalidCompanyIdError'));
    }

    return await this.companyRepository.setActivationFlag(companyId, false);
  }

  async findAll(searchFilter?: SearchFilter): Promise<Company[]> {
    return await this.companyRepository.findAll(searchFilter);
  }

  async findById(companyId: number): Promise<Company | null> {
    if (!this.isValidId(companyId)) {
      return Promise.reject(new Error('InvalidCompanyIdError'));
    }

    return await this.companyRepository.findById(companyId);
  }

  async remove(companyId: number): Promise<Company | null> {
    if (!this.isValidId(companyId)) {
      return Promise.reject(new Error('InvalidCompanyIdError'));
    }

    return await this.companyRepository.remove(companyId);
  }

  private isValidId(companyId: any): boolean {
    return companyId != null && isNumber(toNumber(companyId)) && toNumber(companyId) > 0;
  }

  private isValidCompany(company: Company): boolean {
    return company != null
      && company.name != null && isString(company.name)
      && company.company_typeId != null && isNumber(toNumber(company.company_typeId));
  }

}
