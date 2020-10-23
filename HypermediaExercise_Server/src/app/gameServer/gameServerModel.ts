import { Stage } from '../stage/stageModel';

export class Game {

    currentStage : Stage;
    message : string;

    constructor(initStage, message){
        this.currentStage = initStage;
        this.message = message;
    }
  }
  