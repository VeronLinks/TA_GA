import { Router } from 'express';
import { Service } from 'typedi';
import { CompanyController } from '../../app/companies/company.controller';
import { CompanyTypeController } from '../../app/company-types/company-type.controller';

@Service()
export class Api {
  private apiRouter: Router;

  constructor(private companyController: CompanyController,
              private companyTypeController: CompanyTypeController,
  ) {
    this.initRouterAndSetApiRoutes();
  }

  getApiRouter(): Router {
    return this.apiRouter;
  }

  private initRouterAndSetApiRoutes(): void {
    this.apiRouter = Router();

    //setRoutes
    //COMPANY TYPES 
    this.apiRouter.get(
      '/company_types',
      (req, res, next) => this.companyTypeController.getAll(req, res, next)
    );


    //COMPANIES
    this.apiRouter.post(
      '/companies',
      (req, res, next) => this.companyController.create(req, res, next)
    );

    this.apiRouter.get(
      '/companies',
      (req, res, next) => this.companyController.getAll(req, res, next)
    );

    this.apiRouter.get(
      '/companies/:id',
      (req, res, next) => this.companyController.getById(req, res, next)
    );

    this.apiRouter.put(
      '/companies/:id',
      (req, res, next) => this.companyController.update(req, res, next)
    );

    this.apiRouter.delete(
      '/companies/:id',
      (req, res, next) => this.companyController.delete(req, res, next)
    );

  }

}
