import { Router } from 'express';
import { Service } from 'typedi';
import { GameController } from '../../app/gameServer/gameServercontroller';


@Service()
export class Api {
  private apiRouter: Router;

  constructor(private gameController : GameController
  ) {
    this.initRouterAndSetApiRoutes();
  }

  getApiRouter(): Router {
    return this.apiRouter;
  }

  private initRouterAndSetApiRoutes(): void {
    this.apiRouter = Router();

    //Start game //GET
    this.apiRouter.get(
      '/start_Game',
      (req, res, next) => this.gameController.startGame(req, res, next)
    );

    //Go next stage //PUT
    this.apiRouter.put(
      '/update_Game',
      (req, res, next) => this.gameController.nextStage(req, res, next)
    );

  }

}
