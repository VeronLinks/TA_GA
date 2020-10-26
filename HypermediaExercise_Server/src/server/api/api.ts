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

    // Next State
    this.apiRouter.put(
      '/stages/:id',
      (req, res, next) => this.stageController.update(req, res, next)
    );
    this.apiRouter.post(
      '/stages/:id',
      (req, res, next) => this.stageController.create(req, res, next)
    );
    this.apiRouter.get(
      '/stages/:id',
      (req, res, next) => this.stageController.findById(req, res, next)
    );
    this.apiRouter.delete(
      '/stages/:id',
      (req, res, next) => this.stageController.delete(req, res, next)
    );


    // Start Game
    this.apiRouter.get(
      '/stages',
      (req, res, next) => this.stageController.getFirst(req, res, next)
    );
  }
}
