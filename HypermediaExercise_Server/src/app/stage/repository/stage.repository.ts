import { Service } from 'typedi';
import { Stage } from '../stage.model';

@Service()
export class StageRepository {

  stages : Stage[];

  constructor() 
  {
    this.createStages();
  }

  async createStages() {
    this.stages = [
      new Stage(0,"Que paso anoche?",["No me acuerdo", "Estoy perfectamente" ,"Por que hay pota en mi mascarilla?"],[1,2,3]),

      new Stage(1,"Quizas sea buena idea mirar el movil",["Abrir Movil"],[5]),

      new Stage(2,"Intenta levantarte",["Igual no estoy tan bien"],[1]),

      new Stage(3,"Espero que sea mia",["La pruebo","No la pruebo"],[4,1]),

      new Stage(4,"No es mia",["Y de quien es?"],[1]),

      new Stage(5,"Que aplicacion abro?",["Galería", "Camara","Whatsapp"],[6,7,9]),

      new Stage(6,"La ves a ella",["Sales de la aplicacion","Sigues viendo fotos"],[5,7]),

      new Stage(7,"No ha sido buena idea",["Te pones triste, pero sigues mirando","Te pones triste, pero sales de la aplicacion"],[5,8]),

      new Stage(8,"Lloras",["Te pones triste, pero sales de la aplicacion"],[5]),

      new Stage(9,"Un monton de chats sin leer",["AAMama","Ella","El cremas", "Casero"],[10,11,12,13]),

      new Stage(10,"'-Mañana no voy a comer'\n'-Ok'",["Sales del chat"],[9]),

      new Stage(11,"Un audio de 20 minutos y al final pone: 'Adios'",["Lloras y sales del chat"],[9]),

      new Stage(12,"La que liaste ayer bro, te dejaste las llaves y los calzoncillos. Pero te llevaste mi mascarilla de la basura",["Por eso hay pota en mi mascarilla. Voy a buscar las llaves"
      ],[14]),

      new Stage(13,"'¿Por qué rompiste la ventana para entrar en casa?'",["Sales de la aplicacion sin contestar"],[15]),

      new Stage(14,"Me visto y salgo de casa",[],[]), //you won, has recuperado las llaves

      new Stage(15,"Me he quedado sin llaves y sin ventana, perdí",[],[]) //you lost
      ];
  }

  // Update for starting the game
  async update(): Promise<Stage> {
    if (this.stages == null || this.stages.length == 0)
    {
      this.createStages();
    }
    return this.stages[0];
  }

  // Find for going to a stage
  async findById(stageId: number): Promise<Stage | null> 
  {
    if (this.stages == null || this.stages.length == 0)
    {
      this.createStages();
    }
    return this.stages[stageId] || null;
  }
}
