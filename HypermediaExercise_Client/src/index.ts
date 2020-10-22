import { Console } from "console";

const req = require("request");
const read = require("readline");

var actions = [
    "Bebi mucho loco no me acuerdo", "Me folle a un travesti" ,"Me pote en la mascarilla"
    //Aqui se supone que hacemos una request de las opciones almacenadas en la dataBase, 
    //cada turno hace un print de 3 acciones (string) y van cambiando segun el stage (int)
];

const readLines = read.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("-Oh its seems like you were wasted last night, let's try to remeber where did you lose your keys.");
  console.log("-What is the last thing you remember?");
  printActions();

  function selectAction(action)
  {
    //HERE we are doing the request to the server to send us the next stage with its options, basically the journey continues
  }

  function readAnswer(answer)
  {
    var action = parseInt(answer);
    if(action < actions.length && action >= 0)
    {
      selectAction(action);
    }
  }

  function printActions(){
    console.log("Select one action: \n");

    for (let i = 0; i < actions.length; i++) {
      const actionText = actions[i];
      console.log(i + " : " + actionText);
    }
  }
