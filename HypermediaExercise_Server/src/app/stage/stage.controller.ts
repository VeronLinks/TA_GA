import { Service } from 'typedi';
import { Stage } from './stage.model';
import { StageService } from './stage.service';

@Service()
export class StageController {

  constructor(
    private stageService: StageService
  ) {
  }

 /**
   * @api PUT /stages/:id
   * 
   * @param req 
   * @param res 
   * @param next 
   */
  update(req, res, next) {
    if (req.params.id) {
      this.stageService.update(req.params.id)
        .then((stage:Stage | null) => {
          res.send(stage);
        })
        .catch((error:Error) => {
          res.sendStatus(500);
        });
    }
  }
 /**
   * @api POST /stages/:id
   * 
   * @param req 
   * @param res 
   * @param next 
   */
  create(req, res, next) {
    if (req.params.id) {
      this.stageService.create(req.params.id)
        .then((stage:Stage | null) => {
          res.send(stage);
        })
        .catch((error:Error) => {
          res.sendStatus(500);
        });
    }
  } /**
  * @api DELETE /stages/:id
  * 
  * @param req 
  * @param res 
  * @param next 
  */
 delete(req, res, next) {
   if (req.params.id) {
     this.stageService.delete(req.params.id)
       .then((stage:Stage | null) => {
         res.send(stage);
       })
       .catch((error:Error) => {
         res.sendStatus(500);
       });
   }
 } /**
 * @api GET /stages/:id
 * 
 * @param req 
 * @param res 
 * @param next 
 */
findById(req, res, next) {
  if (req.params.id) {
    this.stageService.findById(req.params.id)
      .then((stage:Stage | null) => {
        res.send(stage);
      })
      .catch((error:Error) => {
        res.sendStatus(500);
      });
  }
}
  /**
   * @api GET /stages
   * 
   * @param req 
   * @param res 
   * @param next 
   */
  getFirst(req, res, next) {
    this.stageService.find()
      .then((firstStage:Stage) => {
        res.send(firstStage);
      });
  }
}