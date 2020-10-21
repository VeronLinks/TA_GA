import { Service } from 'typedi';
import { Company } from './company.model';
import { CompanyService } from './company.service';

@Service()
export class CompanyController {

  constructor(
    private companyService: CompanyService
  ) {
  }

  /**
   * @api POST /companies
   * 
   * This method creates a new company
   * 
   * @param req 
   * @param res 
   * @param next 
   */
  create(req, res, next) {
    if (req.body) {
      const company = req.body;

      this.companyService.create(company)
        .then((newCompany:Company) => {
          res.send(newCompany);
        })
        .catch((error:Error) => {
          res.sendStatus(500);
        });
    }
  }

  /**
   * @api GET /companies
   * 
   * @param req
   * @param res 
   * @param next 
   */
  getAll(req, res, next) {
    this.companyService.findAll()
      .then((companyList:Company[])=> {
        res.send(companyList);
      })
      .catch((error:Error) => {
        res.sendStatus(500);
      });
  }

 /**
   * @api PUT /companies/:id
   * 
   * @param req 
   * @param res 
   * @param next 
   */
  update(req, res, next) {
    if (req.body && req.params.id ) {
      const company = req.body;
      company.id = req.params.id;

      this.companyService.update(company)
        .then((updatedCompany:Company) => {
          res.send(updatedCompany);
        })
        .catch((error:Error) => {
          res.sendStatus(500);
        });
    }
  }

  /**
   * @api GET /companies/:id
   * 
   * @param req 
   * @param res 
   * @param next 
   */
  getById(req, res, next) {
    if (req.params.id) {
      this.companyService.findById(req.params.id)
        .then((company:Company | null) => {
          res.send(company);
        })
        .catch((error:Error) => {
          res.sendStatus(500);
        });
    }
  }

  /**
   * 
   * @api DELETE /companies/:id
   * 
   * @param req 
   * @param res 
   * @param next 
   */
  delete(req, res, next) {
    if (req.params.id) {
      this.companyService.remove(req.params.id)
        .then(()=> {
          res.sendStatus(200);
        })
        .catch((error:Error) => {
          res.sendStatus(500);
        });
    }
  }
}