import 'reflect-metadata';

import { Container } from 'typedi';

import { CompanyType } from './company-type.model';
import { CompanyTypeService } from './company-type.service';
import { CompanyTypeRepository } from './repository/company-type.repository';

describe('Company-type service module', () => {
  let companyTypeService: CompanyTypeService;
  let companyTypeRepositoryMock: any;
  let companyTypes: CompanyType[];

  beforeAll(() => {
    companyTypes = [
      { id: 1, type: 'minorista' },
      { id: 2, type: 'mayorista' }
    ];

    companyTypeRepositoryMock = {
      findAll: jest.fn().mockImplementation(() => companyTypes)
    };
  });

  beforeAll(() => {
    Container.set(CompanyTypeRepository, companyTypeRepositoryMock);
    companyTypeService = Container.get(CompanyTypeService);
  });

  describe('#findAll', () => {

    it('should get all company types of the database', () => {
      return companyTypeService.findAll()
        .then(_companyTypes => {
          expect(_companyTypes).not.toBeNull();
          expect(_companyTypes.length).toBe(companyTypes.length);
          expect(_companyTypes).toEqual(companyTypes);
        });
    });

  });

});
