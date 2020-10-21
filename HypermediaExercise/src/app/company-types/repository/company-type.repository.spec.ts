import 'reflect-metadata';

import { DatabaseService } from '../../../database/database';
import { Container } from 'typedi';

import { CompanyType } from '../company-type.model';
import { CompanyTypeRepository } from './company-type.repository';

describe('Company-type repository module', () => {
  let companyTypeRepository: CompanyTypeRepository;
  let databaseServiceMock: any;
  let companyTypes: CompanyType[];

  beforeAll(() => {
    companyTypes = [
      { id: 1, type: 'minorista' },
      { id: 2, type: 'mayorista' }
    ];

    databaseServiceMock = {
      execQuery: jest.fn().mockImplementation(
        () => ({ rows: companyTypes, rowCount: companyTypes.length})
      )
    };
  });

  beforeAll(() => {
    Container.set(DatabaseService, databaseServiceMock);
    companyTypeRepository = Container.get(CompanyTypeRepository);
  });

  describe('#findAll', () => {

    it('should get all company types of the database', () => {
      return companyTypeRepository.findAll()
        .then(_companyTypes => {
          expect(_companyTypes).not.toBeNull();
          expect(_companyTypes.length).toBe(companyTypes.length);
          expect(_companyTypes).toEqual(companyTypes);
        });
    });

  });

});
