import { json } from 'express';
import { parse } from 'path';

const req = require("request");
const read = require("readline");

var text;
var actionsText = [];
var actions = [];

const readLines = read.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  var apiLocation = "localhost:8080/api";
  req.put(apiLocation, catchResponse);

  readLines.on('line', processAction);

  function processAction(action)
  {
    //HERE we are doing the request to the server to send us the next stage with its options, basically the journey continues
    if(action)
    {
      switch(action.trim())
      {
        case 'exit':
          readLines.close();
          break;
        default:
          // try
          // {
            var answer = parseInt(action);
            if(answer < actions.length && answer >= 0)
            {
              reqOptions(action);
            }
            else
            {
              console.log("That action is not valid. Choose one of the given ones.\n");
            }
          // }
          // catch(err)
          // {

          // }
          
      }
    }
  }

  function reqOptions(option)
  {
    req.get(apiLocation + "/stages/" + actions[option], catchResponse);
  }

  function catchResponse(error, response, body)
  {
    var stage = JSON.parse(body);
    
    text = stage.text;
    actionsText = stage.options;
    actions = stage.nextStages;

    console.log(text + "\n");
    printActions();
  }

  function printActions(){
    console.log("Select one action: \n");
    for (let i = 0; i < actionsText.length; i++) {
      const actionText = actionsText[i];
      console.log(i + " : " + actionText);
    }
  }
