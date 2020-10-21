import 'reflect-metadata';

import { DatabaseService } from '../../../database/database';
import { Container } from 'typedi';

import { Company } from '../company.model';
import { CompanyRepository } from './company.repository';

describe('Company repository module', () => {
  let companyRepository: CompanyRepository;
  let databaseServiceMock: any;

  beforeAll(() => {
    databaseServiceMock = {
      execQuery: jest.fn()
    };
  });

  beforeAll(() => {
    Container.set(DatabaseService, databaseServiceMock);
    companyRepository = Container.get(CompanyRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#create', () => {
    let company: any;

    beforeAll(() => {
      databaseServiceMock.execQuery.mockImplementationOnce(
        _company => {
          /**
           * Estas 3 propiedades del recurso "company" les da el valor por
           * defecto la Base de datos, por tanto, mockeamos los valores que
           * les daría.
           */
          company.id = 1;
          company.active = false;
          company.admin = false;

          return { rows: [company], rowCount: 1 }
        })
    });

    it('should create a new company in the database', () => {
      company = {
        company_typeId: 1, name: '10labs'
      };

      return companyRepository.create(company)
        .then(newCompany => {
          expect(newCompany).not.toBeNull();
          expect(newCompany.id).not.toBeNull();
          expect(newCompany.name).toBe(company.name);
          expect(newCompany.active).toBe(false);
          expect(newCompany.admin).toBe(false);
        });
    });

  });

  describe('#update', () => {
    let companyInDB: any;

    beforeAll(() => {
      databaseServiceMock.execQuery.mockImplementationOnce(
        sqlParams => {
          /**
           * Este método simula la actualización de los datos en la base de datos
           */
          companyInDB.name = sqlParams.params[0];
          companyInDB.address = sqlParams.params[1];
          companyInDB.phone = sqlParams.params[2];
          companyInDB.cif = sqlParams.params[3];

          return { rows: [companyInDB], rowCount: 1 }
        })
    });

    it('should update the company in the database', () => {
      companyInDB = {
        id: 1, company_typeId: 1, name: '10labs'
      };

      const newCompany = {
        id: 1,
        company_typeId: 1,
        name: '10labs test',
        address: 'zaragoza',
        phone: '56793',
        cif: 'testCif',
        active: true,
        admin: false
      }

      return companyRepository.update(newCompany.id, newCompany)
        .then(updatedCompany => {
          expect(updatedCompany).not.toBeNull();
          expect(updatedCompany.name).toBe(companyInDB.name);
          expect(updatedCompany.address).toBe(companyInDB.address);
          expect(updatedCompany.phone).toBe(companyInDB.phone);
          expect(updatedCompany.cif).toBe(companyInDB.cif);
        });
    });

  });

  describe('#findAll', () => {
    let companyFindAllSpy: jest.SpyInstance;
    let companies: Company[];

    beforeAll(() => {
      companyFindAllSpy = jest.spyOn(databaseServiceMock, 'execQuery');
    });

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

      databaseServiceMock.execQuery.mockImplementation(
        () => ({ rows: companies, rowCount: companies.length })
      );
    });

    describe('when there are not any filter options', () => {

      it('should get all companies of the database', () => {
        return companyRepository.findAll()
          .then(_companies => {
            expect(_companies).not.toBeNull();
            expect(_companies.length).toBe(companies.length);
            expect(_companies).toEqual(companies);
          });
      });

    });

    describe('when there are pagination options', () => {

      it('should call to execQuery with this parameters', async () => {
        const searchOptions = {
          pagination: {
            limit: 1,
            page: 2
          }
        };

        await companyRepository.findAll(searchOptions);

        expect(companyFindAllSpy).toHaveBeenCalledWith(
          { sql: 'SELECT * FROM core.companies OFFSET 1 LIMIT 1', params: [] }
        );
      });

    });

    describe('when there are search options', () => {

      it('should call to execQuery with this parameters', async () => {
        const searchOptions = {
          search: {
            text: 'hola',
            fields: ['name', 'cif']
          }
        };

        await companyRepository.findAll(searchOptions);

        expect(companyFindAllSpy).toHaveBeenCalledWith({
          sql: `SELECT * FROM core.companies WHERE (name LIKE $1 OR cif LIKE $2)`,
          params: ['%hola%', '%hola%']
        });
      });

    });

    describe('when there are order options', () => {

      it('should call to execQuery with this parameters', async () => {
        const searchOptions = {
          orderBy: {
            field: 'name',
            type: 'asc'
          }
        };

        await companyRepository.findAll(searchOptions);

        expect(companyFindAllSpy).toHaveBeenCalledWith(
          { sql: 'SELECT * FROM core.companies ORDER BY name asc', params: [] }
        );
      });

    });

  });

  describe('#setActivationFlag', () => {

    beforeAll(() => {
      databaseServiceMock.execQuery.mockImplementation(
        sqlParams => {
          return { rows: [{ active: sqlParams.params[0] }], rowCount: 1 }
        })
    });

    describe('when the company is active', () => {

      it('should deactivate the company in the database', () => {
        return companyRepository.setActivationFlag(1, false)
          .then(updatedCompany => {
            expect(updatedCompany).not.toBeNull();
            expect(updatedCompany.active).toBe(false);
          });
      });

    });

    describe('when the company is not active', () => {

      it('should activate the company in the database', () => {
        return companyRepository.setActivationFlag(1, true)
          .then(updatedCompany => {
            expect(updatedCompany).not.toBeNull();
            expect(updatedCompany.active).toBe(true);
          });
      });

    });

  });

  describe('#remove', () => {

    describe('when the company exists in the database', () => {
      let company: Company;

      beforeAll(() => {
        company = {
          id: 1,
          company_typeId: 1,
          name: '10labs',
          active: true,
          admin: false
        };

        // Este método simula lo que devolvería la BD si borrara el registro indicado
        databaseServiceMock.execQuery.mockImplementationOnce(
          sqlParams => ({ rows: [company], rowCount: 1 })
        );
      });

      it('should return the company removed', () => {
        return companyRepository.remove(1)
          .then(_company => {
            expect(_company).not.toBeNull();
            expect(_company).toEqual(company);
          });
      });

    });

    describe('when the company not exists in the database', () => {

      beforeAll(() => {
        // Este método simula lo que devolvería la BD si borrara el registro indicado
        databaseServiceMock.execQuery.mockImplementationOnce(
          sqlParams => ({ rows: [], rowCount: 0 })
        );
      });

      it('should return a null value', () => {
        return companyRepository.remove(1)
          .then(_company => {
            expect(_company).toBeNull();
          });
      });

    });

  });

  describe('#findById', () => {

    describe('when the company exists in the database', () => {
      let company: Company;

      beforeAll(() => {
        company = {
          id: 1,
          company_typeId: 1,
          name: '10labs',
          active: true,
          admin: false
        };

        // Este método simula lo que devolvería la BD si borrara el registro indicado
        databaseServiceMock.execQuery.mockImplementationOnce(
          sqlParams => ({ rows: [company], rowCount: 1 })
        );
      });

      it('should return the company removed', () => {
        return companyRepository.findById(1)
          .then(_company => {
            expect(_company).not.toBeNull();
            expect(_company).toEqual(company);
          });
      });

    });

    describe('when the company not exists in the database', () => {

      beforeAll(() => {
        // Este método simula lo que devolvería la BD si borrara el registro indicado
        databaseServiceMock.execQuery.mockImplementationOnce(
          sqlParams => ({ rows: [], rowCount: 0 })
        );
      });

      it('should return a null value', () => {
        return companyRepository.findById(1)
          .then(_company => {
            expect(_company).toBeNull();
          });
      });

    });

  });

});
