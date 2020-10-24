import { Router } from 'express';
import { Service } from 'typedi';
import { StageController } from '../../app/stage/stage.controller';


@Service()
export class Api {
  private apiRouter: Router;

  constructor(private stageController : StageController
  ) {
    this.initRouterAndSetApiRoutes();
  }

  getApiRouter(): Router {
    return this.apiRouter;
  }

  private initRouterAndSetApiRoutes(): void {
    this.apiRouter = Router();

    // Get State
    this.apiRouter.get(
      '/stages/:id',
      (req, res, next) => this.stageController.getById(req, res, next)
    );

    // Start Game
    this.apiRouter.put(
      '/stages',
      (req, res, next) => this.stageController.update(req, res, next)
    );
  }
}
