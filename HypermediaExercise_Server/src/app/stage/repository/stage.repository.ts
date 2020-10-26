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
    var url = "http://localhost:8080/api/stages/";
    this.stages = [
      new Stage(0,"¿Qué paso anoche?",["No me acuerdo.", "Estoy perfectamente." ,"¿Por qué hay pota en mi mascarilla?"],[1,2,3],"PUT", url),

      new Stage(1,"Quizas sea buena idea mirar el móvil...",["Abrir móvil."],[5],"POST", url),

      new Stage(2,"Intenta levantarte, si tan bien estás.",["Igual no estoy tan bien..."],[1],"PUT", url),

      new Stage(3,"Espero que sea mía.",["La pruebo.","No la pruebo."],[4,1],"PUT", url),

      new Stage(4,"No es mía",["¿Y de quién es?"],[1],"GET", url),

      new Stage(5,"¿Qué aplicación abro?",["Galería", "Cámara","WhatsApp"],[6,7,9],"POST", url),

      new Stage(6,"La ves a ella...",["Sales de la aplicación.","Sigues viendo fotos."],[5,7],"PUT", url),

      new Stage(7,"No ha sido buena idea.",["Te pones triste, pero sigues mirando.","Te pones triste y sales de la aplicación."],[8,5],"POST", url),

      new Stage(8,"Lloras.",["Sales de la aplicacion"],[5],"DELETE", url),

      new Stage(9,"¡Hay un montón de chats sin leer!",["AAMama","Ella","El cremas", "Casero"],[10,11,12,13],"PUT", url),

      new Stage(10,"'-Nañaa n vou a comwr'\n'-Ok.'",["Sales del chat."],[9],"GET", url),

      new Stage(11,"Un audio tuyo de 20 minutos y un mensaje suyo al final: 'Adios.'",["Lloras y sales del chat."],[9],"DELETE", url),

      new Stage(12,"La que liaste ayer bro, te dejaste las llaves y los calzoncillos. Además te llevaste mi mascarilla de la basura.",
        ["Por eso hay pota en mi mascarilla. Voy a buscar las llaves a casa del Cremas."],[14],"POST", url),

      new Stage(13,"'¿Por qué rompiste la ventana para entrar en casa?'",["Sales de la aplicacion sin contestar."],[15],"GET", url),

      new Stage(14,"Me visto y salgo de casa. Gané.",[],[],"PUT", url), //you won, has recuperado las llaves

      new Stage(15,"Me he quedado sin llaves y sin ventana. Perdí.",[],[],"DELETE", url) //you lost
      ];
  }

  // Update for starting the game
  async update(stageId: number): Promise<Stage | null>
  {
    return this.stages[stageId] || null;
  }

  async findById(stageId: number): Promise<Stage | null>
  {
    return this.stages[stageId] || null;
  }  
  
  async create(stageId: number): Promise<Stage | null>
  {
    return this.stages[stageId] || null;
  }  
  
  async delete(stageId: number): Promise<Stage | null>
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
