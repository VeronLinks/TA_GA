import { Console } from "console";
import { parse } from 'path';

const req = require("request");
const read = require("readline");

var actions = [];
var game;

const readLines = read.createInterface({
    input: process.stdin,
    output: process.stdout,
  });


  var apiLocation = "localhost:8080/api";
  req(apiLocation, catchResponse);

  readLines.on('line',)

  function processAction(action)
  {
    //HERE we are doing the request to the server to send us the next stage with its options, basically the journey continues
    if(action)
    {
      switch(action.trim())
      {
        case 'wtf':
          break;
        default:
          // try
          // {
            var answer = parseInt(action);
            if(answer < actions.length && answer >= 0)
            {
              reqOption(action);
            }
          // }
          // catch(err)
          // {

          // }
          
      }
    }
  }

  function readAnswer(answer)
  {
    var action = parseInt(answer);
    
  }

  function reqOption(option)
  {
    req.post(apiLocation+"/stages/");
  }

  function catchResponse(error, response, body)
  {
    //game = ;
  }

  function printActions(){
    console.log("Select one action: \n");

    for (let i = 0; i < actions.length; i++) {
      const actionText = actions[i];
      console.log(i + " : " + actionText);
    }
  }
