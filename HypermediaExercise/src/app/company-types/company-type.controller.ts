import { Service } from 'typedi';
import { CompanyType } from './company-type.model';
import { CompanyTypeService } from './company-type.service';

@Service()
export class CompanyTypeController {

  constructor(
    private companyTypeService: CompanyTypeService
  ) {
  }
  /**
   * @api GET /companyTypes
   * 
   * @param req
   * @param res 
   * @param next 
   */
  getAll(req, res, next) {
    this.companyTypeService.findAll()
      .then((companyTypeList:CompanyType[])=> {
        res.send(companyTypeList);
      });
  }


}