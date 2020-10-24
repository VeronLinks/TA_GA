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
      new Stage(0,"¿Qué paso anoche?",["No me acuerdo.", "Estoy perfectamente." ,"¿Por qué hay pota en mi mascarilla?"],[1,2,3]),

      new Stage(1,"Quizas sea buena idea mirar el móvil...",["Abrir móvil."],[5]),

      new Stage(2,"Intenta levantarte, si tan bien estás.",["Igual no estoy tan bien..."],[1]),

      new Stage(3,"Espero que sea mía.",["La pruebo.","No la pruebo."],[4,1]),

      new Stage(4,"No es mía",["¿Y de quién es?"],[1]),

      new Stage(5,"¿Qué aplicación abro?",["Galería", "Cámara","WhatsApp"],[6,7,9]),

      new Stage(6,"La ves a ella...",["Sales de la aplicación.","Sigues viendo fotos."],[5,7]),

      new Stage(7,"No ha sido buena idea.",["Te pones triste, pero sigues mirando.","Te pones triste y sales de la aplicación."],[8,5]),

      new Stage(8,"Lloras.",["Sales de la aplicacion"],[5]),

      new Stage(9,"¡Hay un montón de chats sin leer!",["AAMama","Ella","El cremas", "Casero"],[10,11,12,13]),

      new Stage(10,"'-Nañaa n vou a comwr'\n'-Ok.'",["Sales del chat."],[9]),

      new Stage(11,"Un audio tuyo de 20 minutos y un mensaje suyo al final: 'Adios.'",["Lloras y sales del chat."],[9]),

      new Stage(12,"La que liaste ayer bro, te dejaste las llaves y los calzoncillos. Además te llevaste mi mascarilla de la basura.",
        ["Por eso hay pota en mi mascarilla. Voy a buscar las llaves a casa del Cremas."],[14]),

      new Stage(13,"'¿Por qué rompiste la ventana para entrar en casa?'",["Sales de la aplicacion sin contestar."],[15]),

      new Stage(14,"Me visto y salgo de casa. Gané.",[],[]), //you won, has recuperado las llaves

      new Stage(15,"Me he quedado sin llaves y sin ventana. Perdí.",[],[]) //you lost
      ];
  }

  // Update for starting the game
  async update(stageId: number): Promise<Stage | null>
  {
    return this.stages[stageId] || null;
  }

  // Find for going to a stage
  async find(): Promise<Stage> 
  {
    if (this.stages == null || this.stages.length == 0)
    {
      this.createStages();
    }
    return this.stages[0];
  }
}
