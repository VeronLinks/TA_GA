const req = require("request");
const read = require("readline");

var text;
var actionsText = [];
var actions = [];

const readLines = read.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  var apiLocation = "http://localhost:8080/api";

  req.get(apiLocation + "/stages", catchResponse);

  readLines.on('line', processAction);

  function processAction(action)
  {
    //HERE we are doing the request to the server to send us the next stage with its options, basically the journey continues
    if(action)
    {
      switch(action.trim())
      {
        case 'exit':
          closeLines();
          break;
        case 'start':
          req.get(apiLocation + "/stages", catchResponse);
          break;
        default:
            var answer = parseInt(action);
            if(answer < actions.length && answer >= 0)
            {
              reqOptions(action);
            }
            else
            {
              console.log("Esa acción no está entre las contempladas.");
            }
            break;
      }
    }
  }

  function reqOptions(option)
  {
    console.log("\n");
    req.put(apiLocation + "/stages/" + actions[option], catchResponse);
  }

  function catchResponse(error, response, body)
  {
    if (response.statusCode == 200)
    {
      var stage = JSON.parse(body);

      text = stage.text;
      actionsText = stage.options;
      actions = stage.nextStages;
  
      console.log("\n" + text + "\n");

      printActions();
    }
    else
    {
      console.log("FAILURE: " + response.statusCode + ": " + error + "\n");
    }
  }

  function printActions(){
    if (actionsText.length > 0)
    {
      console.log("Elige una acción:");
      for (let i = 0; i < actionsText.length; i++) {
        const actionText = actionsText[i];
        console.log(i + " : " + actionText);
      }
    }
    else
    {
      closeLines();
    }
  }

  function closeLines()
  {
    console.log('¡Hasta la próxima!');
    readLines.close();
    process.exit(0);
  }