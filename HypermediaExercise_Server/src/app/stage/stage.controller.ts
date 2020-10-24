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
    if (req.body && req.params.id ) {
      const stage = req.body;
      stage.id = req.params.id;

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
   * @api GET /stages/
   * 
   * @param req 
   * @param res 
   * @param next 
   */
  getFirst(req, res, next) {
    if (req.params.id) {
      this.stageService.find()
        .then((firstStage:Stage) => {
          res.send(firstStage);
        })
        .catch((error:Error) => {
          res.sendStatus(500);
        });
    }
  }
}