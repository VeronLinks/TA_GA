import {Game} from './gameServerModel'
import {Stage} from '../stage/stageModel'
export class GameController
{

    stages : Stage[];

    constructor(){
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

            new Stage(9,"Un monton de chats sin leer",["AAMama","Ella","El cremas", "Casero cabron"],[10,11,12,13]),

            new Stage(10,"'-Mañana no voy a comer'\n'-Ok'",["Sales del chat"],[9]),

            new Stage(11,"Un audio de 20 minutos y al final pone: 'Adios'",["Lloras y sales del chat"],[9]),

            new Stage(12,"La que liaste ayer bro, te dejaste las llaves y los calzoncillos. Pero te llevaste mi mascarilla de la basura",["Por eso hay pota en mi mascarilla. Voy a buscar las llaves"
            ],[14]),

            new Stage(13,"'¿Por qué rompiste la ventana para entrar en casa?'",["Sales de la aplicacion sin contestar"],[15]),

            new Stage(14,"Me visto y salgo de casa",[],[]), //you won, has recuperado las llaves

            new Stage(15,"Me he quedado sin llaves y sin ventana, perdí",[],[]) //you lost

            




            // "Bebi mucho loco no me acuerdo", "Tuve un accidente" ,"Me pote en la mascarilla"
            // //Aqui se supone que hacemos una request de las opciones almacenadas en la dataBase, 
            // //cada turno hace un print de 3 acciones (string) y van cambiando segun el stage (int)
        ];
    }

    /**
     * @api GET /start
     * 
     * This method creates a new game
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    startGame(req, res, next) {
        res.send(new Game(this.stages[0],"WHERE AM I?"));
    }

    /**
     * @api POST /room/:id/forward
     * 
     * This method tries to apply an action in the game provided
     * 
     * @param req 
     * @param res 
     * @param next 
     */

    nextStage(req, res, next) {
        if(req.params.id && req.body){
            //res.send(this.goToNextStage());
        }
     }

     goToNextStage(id,option)
     {
        
     }


}


