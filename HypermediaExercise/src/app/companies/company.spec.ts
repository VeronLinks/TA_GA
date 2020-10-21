import 'reflect-metadata';

import { Container } from 'typedi';

import { Company } from './company.model';
import { CompanyService } from './company.service';
import { CompanyRepository } from './repository/company.repository';

describe('Company service module', () => {
  let companyService: CompanyService;
  let companyRepositoryMock: any;
  let companies: Company[];

  beforeAll(() => {
    companies = [
      {
        id: 1,
        company_typeId: 1,
        name: '10labs',
        active: true,
        admin: false
      },
      {
        id: 2,
        company_typeId: 1,
        name: 'gamerin',
        active: true,
        admin: false
      }
    ];

    companyRepositoryMock = {
      create: jest.fn(),
      update: jest.fn(),
      setActivationFlag: jest.fn(),
      findAll: jest.fn().mockImplementation(() => companies),
      findById: jest.fn(),
      remove: jest.fn()
    };
  });

  beforeAll(() => {
    Container.set(CompanyRepository, companyRepositoryMock);
    companyService = Container.get(CompanyService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#create', () => {
    let companyCreationSpy: jest.SpyInstance;

    beforeAll(() => {
      companyCreationSpy = jest.spyOn(companyRepositoryMock, 'create');
    });

    describe('when the company input object is valid', () => {

      it('should call to company creation method', async () => {
        const company = {
          company_typeId: 1,
          name: '10labs'
        };

        await companyService.create(company);
        expect(companyCreationSpy).toHaveBeenCalledWith(company);
      });

    });

    describe('when the company input object is not valid', () => {

      it('should throw a CompanyInputValidationError', () => {
        return expect(companyService.create({})).rejects.toThrow('CompanyInputValidationError');
      });

      it('should throw a CompanyInputValidationError', () => {
        return expect(companyService.create({name: 1, company_typeId: 1})).rejects.toThrow('CompanyInputValidationError');
      });

      it('should throw a CompanyInputValidationError', () => {
        return expect(companyService.create({ name: '10labs', company_typeId: '1' })).rejects.toThrow('CompanyInputValidationError');
      });

      it('should throw a CompanyInputValidationError', () => {
        return expect(companyService.create({ name: '10labs' })).rejects.toThrow('CompanyInputValidationError');
      });

      it('should throw a CompanyInputValidationError', () => {
        return expect(companyService.create({ company_typeId: 1 })).rejects.toThrow('CompanyInputValidationError');
      });

    });

  });

  describe('#update', () => {
    let companyUpdateSpy: jest.SpyInstance;

    beforeAll(() => {
      companyUpdateSpy = jest.spyOn(companyRepositoryMock, 'update');
    });

    describe('when the company input object and companyId are valid', () => {

      it('should call to company update method', async () => {
        const company = {
          id: 1,
          company_typeId: 1,
          name: '10labs'
        };

        await companyService.update(1, company);
        expect(companyUpdateSpy).toHaveBeenCalledWith(1, company);
      });

    });

    describe('when the companyId is not valid', () => {

      it('should throw a InvalidCompanyIdError', () => {
        const company = {
          id: 1,
          company_typeId: 1,
          name: '10labs'
        };

        return expect(companyService.update(-1, company)).rejects.toThrow('InvalidCompanyIdError');
      });

      it('should throw a InvalidCompanyIdError', () => {
        const company = {
          id: 1,
          company_typeId: 1,
          name: '10labs'
        };

        return expect(companyService.update(0, company)).rejects.toThrow('InvalidCompanyIdError');
      });

    });

    describe('when the company input object is not valid', () => {

      it('should throw a CompanyInputValidationError', () => {
        return expect(companyService.update(1, {})).rejects.toThrow('CompanyInputValidationError');
      });

      it('should throw a CompanyInputValidationError', () => {
        return expect(companyService.update(1, { name: 1, company_typeId: 1 })).rejects.toThrow('CompanyInputValidationError');
      });

      it('should throw a CompanyInputValidationError', () => {
        return expect(companyService.update(1, { name: '10labs', company_typeId: '1' })).rejects.toThrow('CompanyInputValidationError');
      });

      it('should throw a CompanyInputValidationError', () => {
        return expect(companyService.update(1, { name: '10labs' })).rejects.toThrow('CompanyInputValidationError');
      });

      it('should throw a CompanyInputValidationError', () => {
        return expect(companyService.update(1, { company_typeId: 1 })).rejects.toThrow('CompanyInputValidationError');
      });

    });

  });

  describe('#activate', () => {
    let companySetActivationFlagSpy: jest.SpyInstance;

    beforeAll(() => {
      companySetActivationFlagSpy = jest.spyOn(companyRepositoryMock, 'setActivationFlag');
    });

    describe('when the companyId is valid', () => {

      it('should call to company activate method', async () => {
        await companyService.activate(1);
        expect(companySetActivationFlagSpy).toHaveBeenCalledWith(1, true);
      });

    });

    describe('when the companyId is not valid', () => {

      it('should throw a InvalidCompanyIdError', () => {
        return expect(companyService.activate(-1)).rejects.toThrow('InvalidCompanyIdError');
      });

    });

  });

  describe('#deactivate', () => {
    let companySetActivationFlagSpy: jest.SpyInstance;

    beforeAll(() => {
      companySetActivationFlagSpy = jest.spyOn(companyRepositoryMock, 'setActivationFlag');
    });

    describe('when the companyId is valid', () => {

      it('should call to company deactivate method', async () => {
        await companyService.deactivate(1);
        expect(companySetActivationFlagSpy).toHaveBeenCalledWith(1, false);
      });

    });

    describe('when the companyId is not valid', () => {

      it('should throw a InvalidCompanyIdError', () => {
        return expect(companyService.deactivate(-1)).rejects.toThrow('InvalidCompanyIdError');
      });

    });

  });

  describe('#findAll', () => {

    it('should get all companies of the database', () => {
      return companyService.findAll()
        .then(_companies => {
          expect(_companies).not.toBeNull();
          expect(_companies.length).toBe(companies.length);
          expect(_companies).toEqual(companies);
        });
    });

  });

  describe('#findById', () => {
    let companyUpdateSpy: jest.SpyInstance;

    beforeAll(() => {
      companyUpdateSpy = jest.spyOn(companyRepositoryMock, 'findById');
    });

    describe('when the companyId is valid', () => {

      it('should call to company delete method', async () => {
        await companyService.findById(1);
        expect(companyUpdateSpy).toHaveBeenCalledWith(1);
      });

    });

    describe('when the companyId is not valid', () => {

      it('should throw a InvalidCompanyIdError', () => {
        return expect(companyService.findById(-1)).rejects.toThrow('InvalidCompanyIdError');
      });

    });

  });

  describe('#remove', () => {
    let companyUpdateSpy: jest.SpyInstance;

    beforeAll(() => {
      companyUpdateSpy = jest.spyOn(companyRepositoryMock, 'remove');
    });

    describe('when the companyId is valid', () => {

      it('should call to company delete method', async () => {
        await companyService.remove(1);
        expect(companyUpdateSpy).toHaveBeenCalledWith(1);
      });

    });

    describe('when the companyId is not valid', () => {

      it('should throw a InvalidCompanyIdError', () => {
        return expect(companyService.remove(-1)).rejects.toThrow('InvalidCompanyIdError');
      });

    });

  });

});
